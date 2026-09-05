import "server-only";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";

import type { SessionData, SessionUser } from "@/lib/session";

// RFC-0011 (Web Platform <-> MCP Communication Boundary) -- the only place
// in this app that ever calls MCP. Every function here is server-only; the
// browser never sees MCP's base URL, its JWTs, or its raw error shapes.

const MCP_API_URL = process.env.MCP_API_URL;
const WEB_PLATFORM_INTERNAL_SECRET = process.env.WEB_PLATFORM_INTERNAL_SECRET;

// RFC-0011 Invariant 9 (review amendment) -- every Web Platform -> MCP call
// carries a correlation ID, even though MCP doesn't consume/propagate it
// everywhere yet. Cheap now; retrofitting request tracing across
// Browser -> Web -> MCP -> (future) HustlerPay later is not.
function buildRequestId(): string {
  return randomUUID();
}

// The Web Platform's own reverse proxy sets x-forwarded-for on requests
// reaching this Next.js server; the first entry is the real visitor.
// RFC-0011/WS-005 Part 0 -- forwarded onward to MCP as x-forwarded-visitor-ip
// alongside the shared secret, so MCP's rate limiter can key on the real
// visitor instead of this single BFF server's own IP.
async function getVisitorIp(): Promise<string | null> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }
  return null;
}

export type McpErrorKind = "unauthorized" | "forbidden" | "not_found" | "conflict" | "validation" | "unknown";

// RFC-0011 SS5 -- the one place MCP's raw error shape gets translated into
// something every page switches on consistently. No raw MCP error body
// leaks past this module.
export class McpError extends Error {
  readonly kind: McpErrorKind;
  readonly status: number;

  constructor(kind: McpErrorKind, status: number, message: string) {
    super(message);
    this.kind = kind;
    this.status = status;
  }
}

function statusToKind(status: number): McpErrorKind {
  switch (status) {
    case 401:
      return "unauthorized";
    case 403:
      return "forbidden";
    case 404:
      return "not_found";
    case 409:
      return "conflict";
    case 400:
      return "validation";
    default:
      return "unknown";
  }
}

interface RequestOptions {
  accessToken?: string;
}

async function mcpFetch<T>(
  path: string,
  init: { method: "GET" | "POST" | "PATCH" | "DELETE"; body?: unknown },
  options: RequestOptions = {},
): Promise<T> {
  if (!MCP_API_URL) {
    throw new Error("MCP_API_URL must be set");
  }

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "x-request-id": buildRequestId(),
  };

  if (WEB_PLATFORM_INTERNAL_SECRET) {
    const visitorIp = await getVisitorIp();
    if (visitorIp) {
      requestHeaders["x-internal-auth"] = WEB_PLATFORM_INTERNAL_SECRET;
      requestHeaders["x-forwarded-visitor-ip"] = visitorIp;
    }
  }

  if (options.accessToken) {
    requestHeaders.Authorization = `Bearer ${options.accessToken}`;
  }

  const response = await fetch(`${MCP_API_URL}${path}`, {
    method: init.method,
    headers: requestHeaders,
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string | string[] };
    const message = Array.isArray(body.message) ? body.message.join(", ") : (body.message ?? response.statusText);
    throw new McpError(statusToKind(response.status), response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

interface McpAuthTokens {
  accessToken: string;
  refreshToken: string;
}

// MCP returns only the raw JWT pair (AuthService's real response shape) --
// no separate expiry field. The access token's own `exp` claim is the only
// authoritative source; decoded here for the BFF's own proactive-refresh
// bookkeeping only (MCP itself, not the BFF, is what actually verifies the
// token's signature/validity on every real API call).
function decodeAccessTokenExpiryMs(accessToken: string): number {
  const payloadSegment = accessToken.split(".")[1];
  if (!payloadSegment) {
    return Date.now();
  }
  const json = Buffer.from(payloadSegment, "base64url").toString("utf8");
  const payload = JSON.parse(json) as { exp?: number };
  return payload.exp ? payload.exp * 1000 : Date.now();
}

function toSessionData(tokens: McpAuthTokens, user: SessionUser): SessionData {
  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    accessTokenExpiresAt: decodeAccessTokenExpiryMs(tokens.accessToken),
    user,
  };
}

// MCP's real GET /users/me shape (UsersService.UserMeProfile) -- used by
// pages that need current, non-cached detail (e.g. the Organization's
// display name), per RFC-0011 SS3: the session cookie is never a
// permissions/data source of truth, pages call this fresh instead.
//
// WEB-RBAC-GATING-1 -- `role`/`permissions` were already present in this
// endpoint's real response (UsersService.buildMeProfile,
// `permissions: rolesService.getPermissionsForRole(record.role.code)`) --
// this repo just never typed/read them. Adding them here is the entire
// backend-facing half of RBAC action gating: zero new endpoint, zero new
// network call, and it can never drift from the server's own role->
// permission matrix (see lib/permissions.ts) the way a hardcoded map on
// this side already once did (Phase B's STATION_MANAGER/workspaces:write
// mistake). `permissions` is a flat `"resource:action"` string list,
// exactly `RolesService.getPermissionsForRole`'s own format.
export interface McpUserProfile {
  id: string;
  email: string | null;
  displayName: string;
  // Mini MCP sprint (Account Settings) -- GET /users/me now returns this;
  // null for every pre-existing user until they set it via PATCH /users/me.
  locale: "FR" | "EN" | null;
  role: { id: string; code: string; name: string };
  permissions: string[];
  organization: { id: string; name: string; status: string } | null;
}

async function fetchProfile(accessToken: string): Promise<McpUserProfile> {
  return mcpFetch<McpUserProfile>("/users/me", { method: "GET" }, { accessToken });
}

// tenantId isn't exposed by GET /users/me at all today; stored as null in
// the session (review amendment: reserve the field now rather than migrate
// the session shape once a real source for it exists -- an honest gap, not
// a fabricated value).
function toSessionUser(profile: McpUserProfile): SessionUser {
  return {
    id: profile.id,
    email: profile.email ?? "",
    displayName: profile.displayName,
    tenantId: null,
    organizationId: profile.organization?.id ?? null,
  };
}

export async function register(input: {
  email: string;
  password: string;
  displayName?: string;
}): Promise<void> {
  await mcpFetch("/auth/register", { method: "POST", body: { ...input, locale: "en" } });
}

export async function verifyEmail(input: { email: string; code: string }): Promise<SessionData> {
  const tokens = await mcpFetch<McpAuthTokens>("/auth/verify-email", { method: "POST", body: input });
  const profile = await fetchProfile(tokens.accessToken);
  return toSessionData(tokens, toSessionUser(profile));
}

export async function login(input: { email: string; password: string }): Promise<SessionData> {
  const tokens = await mcpFetch<McpAuthTokens>("/auth/login", { method: "POST", body: input });
  const profile = await fetchProfile(tokens.accessToken);
  return toSessionData(tokens, toSessionUser(profile));
}

// MEMBERS-INVITATION-001 Piece 2 -- MCP's InvitationPreview shape
// (GET /invitations/preview), deliberately narrow: shown to an
// UNAUTHENTICATED invitee before they've proven anything, never an id or
// anything that would let a caller enumerate invitations by probing tokens.
export interface InvitationPreview {
  organizationName: string;
  roleName: string;
  email: string;
  status: "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED";
}

// MEMBERS-INVITATION-001 Piece 2 -- public, unauthenticated (RFC-0011: the
// invitee has no session yet), same shape as getMe() but with no accessToken.
export async function previewInvitation(token: string): Promise<InvitationPreview> {
  return mcpFetch<InvitationPreview>(
    `/invitations/preview?token=${encodeURIComponent(token)}`,
    { method: "GET" },
  );
}

// INVITATION-ACCEPT-ACCOUNT-STATE-001 -- MCP's accept() response is now a
// discriminated union (never assume a session exists): SESSION_ISSUED for a
// brand-new or freshly-activated (was INVITED) account, same shape
// /auth/verify-email already returns; LOGIN_REQUIRED for an already-ACTIVE
// account -- Member access was just granted, but MCP deliberately minted no
// session (an invitation must never become an account-takeover vector, see
// InvitationsService.accept()'s own contract comment) -- the invitee's
// EXISTING password (never the one just typed on this form) is required.
export type AcceptInvitationOutcome =
  | { outcome: "SESSION_ISSUED"; session: SessionData }
  | { outcome: "LOGIN_REQUIRED"; email: string };

interface McpAcceptInvitationResponse {
  outcome: "SESSION_ISSUED" | "LOGIN_REQUIRED";
  accessToken?: string;
  refreshToken?: string;
  email?: string;
}

// This function never touches cookies -- the calling Server Action is
// responsible for createSession() on the SESSION_ISSUED branch, same
// division of responsibility as verifyEmailAction() already establishes.
export async function acceptInvitation(input: {
  token: string;
  password?: string;
  displayName?: string;
}): Promise<AcceptInvitationOutcome> {
  const response = await mcpFetch<McpAcceptInvitationResponse>(
    "/invitations/accept",
    { method: "POST", body: input },
  );

  if (response.outcome === "LOGIN_REQUIRED") {
    return { outcome: "LOGIN_REQUIRED", email: response.email! };
  }

  const tokens: McpAuthTokens = {
    accessToken: response.accessToken!,
    refreshToken: response.refreshToken!,
  };
  const profile = await fetchProfile(tokens.accessToken);
  return { outcome: "SESSION_ISSUED", session: toSessionData(tokens, toSessionUser(profile)) };
}

export async function completeOnboarding(
  accessToken: string,
  input: { tenantName: string; organizationName: string; agentName?: string },
): Promise<void> {
  await mcpFetch("/auth/complete-onboarding", { method: "POST", body: input }, { accessToken });
}

// MCP's /auth/logout is JwtAuthGuard-protected -- the credential is the
// still-live access token (Bearer), not the refresh token; it revokes the
// whole session server-side via the token's own sessionId claim.
export async function logout(accessToken: string): Promise<void> {
  await mcpFetch("/auth/logout", { method: "POST" }, { accessToken });
}

// Used by lib/session.ts's requireSession() for the silent refresh
// (RFC-0011 SS2) -- returns null (never throws) so the caller can decide to
// end the session cleanly rather than surface a raw MCP error mid-navigation.
export async function refreshSession(
  refreshToken: string,
): Promise<Pick<SessionData, "accessToken" | "refreshToken" | "accessTokenExpiresAt"> | null> {
  try {
    const tokens = await mcpFetch<McpAuthTokens>("/auth/refresh", {
      method: "POST",
      body: { refreshToken },
    });
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresAt: decodeAccessTokenExpiryMs(tokens.accessToken),
    };
  } catch {
    return null;
  }
}

export async function getMe(accessToken: string): Promise<McpUserProfile> {
  return fetchProfile(accessToken);
}

// ---------------------------------------------------------------------------
// WS-006 (Customer Hub) -- every type below mirrors the real backend
// interface field-for-field (momoassistant-platform's own service files),
// not re-invented.

export interface OrganizationSummary {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  organizationCode: string;
  status: string;
  ownerUserId: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getOrganization(
  accessToken: string,
  organizationId: string,
): Promise<OrganizationSummary> {
  return mcpFetch<OrganizationSummary>(
    `/organizations/${organizationId}`,
    { method: "GET" },
    { accessToken },
  );
}

export interface MemberSummary {
  id: string;
  userId: string;
  organizationId: string;
  workspaceId: string | null;
  status: string;
  invitedAt: string;
  joinedAt: string | null;
  role: { id: string; code: string; name: string };
  user: { displayName: string; email: string | null };
}

export async function listMembers(
  accessToken: string,
  organizationId: string,
): Promise<MemberSummary[]> {
  return mcpFetch<MemberSummary[]>(
    `/organizations/${organizationId}/members`,
    { method: "GET" },
    { accessToken },
  );
}

// Never SUPER_ADMIN -- the backend already forbids assigning it through
// this path (MembersService); the UI only ever offers the other 4.
export type InvitableRole = "TENANT_ADMIN" | "ORG_ADMIN" | "STATION_MANAGER" | "AGENT";

export interface InvitationSummary {
  id: string;
  organizationId: string;
  email: string;
  workspaceId: string | null;
  status: "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED";
  expiresAt: string;
  invitedAt: string;
  role: { id: string; code: string; name: string };
}

export async function inviteMember(
  accessToken: string,
  organizationId: string,
  input: { email: string; role: InvitableRole },
): Promise<InvitationSummary> {
  return mcpFetch<InvitationSummary>(
    `/organizations/${organizationId}/invitations`,
    { method: "POST", body: input },
    { accessToken },
  );
}

export async function removeMember(
  accessToken: string,
  organizationId: string,
  memberId: string,
): Promise<void> {
  await mcpFetch(
    `/organizations/${organizationId}/members/${memberId}`,
    { method: "DELETE" },
    { accessToken },
  );
}

export interface LicenseSummary {
  id: string;
  organizationId: string;
  productId: string;
  planId: string;
  seats: number | null;
  status: "TRIAL" | "ACTIVE" | "EXPIRED" | "REVOKED";
  issuedAt: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  // Mini backend enrichment (sprint-ws006-part0-license-plan-enrichment) --
  // product-plans:read/products:read are SUPER_ADMIN-only, so this is the
  // only way an org's own admin ever sees a human plan name.
  product: { code: string; name: string };
  plan: { code: string; name: string; price: string; currency: string; billingPeriod: "MONTHLY" | "YEARLY" };
}

// @@unique([organizationId]) on the backend means 0 or 1 -- this flattens
// the array response every caller would otherwise have to do themselves.
export async function getLicense(
  accessToken: string,
  organizationId: string,
): Promise<LicenseSummary | null> {
  const licenses = await mcpFetch<LicenseSummary[]>(
    `/organizations/${organizationId}/licenses`,
    { method: "GET" },
    { accessToken },
  );
  return licenses[0] ?? null;
}

export interface SubscriptionSummary {
  id: string;
  organizationId: string;
  licenseId: string;
  billingProvider: string | null;
  billingReference: string | null;
  status: "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELED";
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

// @@unique([licenseId]) means 0 or 1 subscription per organization today
// (one License per Organization too) -- same flattening as getLicense.
export async function getSubscription(
  accessToken: string,
  organizationId: string,
): Promise<SubscriptionSummary | null> {
  const subscriptions = await mcpFetch<SubscriptionSummary[]>(
    `/organizations/${organizationId}/subscriptions`,
    { method: "GET" },
    { accessToken },
  );
  return subscriptions[0] ?? null;
}

export interface InvoiceLineItemSummary {
  id: string;
  invoiceId: string;
  organizationId: string;
  subscriptionId: string;
  amount: string;
  description: string;
  createdAt: string;
}

export interface InvoiceSummary {
  id: string;
  tenantId: string;
  status: "DRAFT" | "OPEN" | "PAID" | "VOID";
  currency: string;
  paymentReference: string | null;
  issuedAt: string | null;
  dueAt: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  lineItems: InvoiceLineItemSummary[];
}

export async function listInvoices(
  accessToken: string,
  tenantId: string,
): Promise<InvoiceSummary[]> {
  return mcpFetch<InvoiceSummary[]>(`/tenants/${tenantId}/invoices`, { method: "GET" }, { accessToken });
}

export interface WorkspaceSummary {
  id: string;
  organizationId: string;
  name: string;
}

export async function listWorkspaces(
  accessToken: string,
  organizationId: string,
): Promise<WorkspaceSummary[]> {
  return mcpFetch<WorkspaceSummary[]>(
    `/organizations/${organizationId}/workspaces`,
    { method: "GET" },
    { accessToken },
  );
}

// STATION-TREE-PHASE-B -- same POST-returns-the-created-resource shape as
// inviteMember above.
export async function createWorkspace(
  accessToken: string,
  organizationId: string,
  name: string,
): Promise<WorkspaceSummary> {
  return mcpFetch<WorkspaceSummary>(
    `/organizations/${organizationId}/workspaces`,
    { method: "POST", body: { name } },
    { accessToken },
  );
}

export interface StationSummary {
  id: string;
  name: string;
}

export async function listStations(
  accessToken: string,
  workspaceId: string,
): Promise<StationSummary[]> {
  return mcpFetch<StationSummary[]>(
    `/workspaces/${workspaceId}/stations`,
    { method: "GET" },
    { accessToken },
  );
}

// STATION-TREE-PHASE-B -- same shape as createWorkspace above.
export async function createStation(
  accessToken: string,
  workspaceId: string,
  name: string,
): Promise<StationSummary> {
  return mcpFetch<StationSummary>(
    `/workspaces/${workspaceId}/stations`,
    { method: "POST", body: { name } },
    { accessToken },
  );
}

export type Locale = "FR" | "EN";

export async function updateMe(
  accessToken: string,
  input: { displayName?: string; locale?: Locale },
): Promise<McpUserProfile> {
  return mcpFetch(`/users/me`, { method: "PATCH", body: input }, { accessToken });
}

export async function changePassword(
  accessToken: string,
  input: { currentPassword: string; newPassword: string },
): Promise<void> {
  await mcpFetch("/auth/change-password", { method: "POST", body: input }, { accessToken });
}

// AND-PR-001 (was WS-006N's "Beta Distribution") -- Release Management as
// the single source of truth for the Android download, replacing a
// hardcoded static file path. Renamed BetaRelease -> AppRelease backend-side
// because this stopped being a beta-only concept once Version Policy needed
// to govern STABLE/RC the same way.

export interface PublicAppRelease {
  version: string;
  channel: "STABLE" | "BETA" | "RC";
  publishedAt: string | null;
  expiresAt: string | null;
  sha256: string | null;
}

// Deliberately does NOT go through mcpFetch: that helper hardcodes
// `cache: "no-store"`, which would flip /download and /pricing from static
// (current behavior) to full SSR on every request. This is also the one
// call in this file that's genuinely public and cacheable -- unlike every
// other function here, which is either sensitive or user-specific and must
// always be fresh. Also deliberately skips mcpFetch's x-internal-auth /
// x-forwarded-visitor-ip headers: attaching them requires calling
// next/headers' headers() (see getVisitorIp above), and merely calling that
// API anywhere in a render path forces the whole route into full dynamic
// rendering regardless of the revalidate option below -- exactly the SSR
// flip this function exists to avoid. Safe to skip: on the backend, those
// headers only affect which key TrustedForwarderThrottlerGuard rate-limits
// by (see that guard's own getTracker) -- never a guard/auth requirement,
// and this call only reaches the origin once per revalidate window anyway.
export async function getPublicLatestAppRelease(): Promise<PublicAppRelease> {
  if (!MCP_API_URL) {
    throw new Error("MCP_API_URL must be set");
  }
  const response = await fetch(`${MCP_API_URL}/app-releases/public-latest`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new McpError(statusToKind(response.status), response.status, response.statusText);
  }
  return (await response.json()) as PublicAppRelease;
}

// AND-PR-001 follow-up (2026-08-26) -- versionCode is deliberately stripped
// from public-latest (see AppReleasesController.getPublicLatest's own
// tests: `expect(result).not.toHaveProperty('versionCode')`, both unit and
// e2e), so it can't be added to PublicAppRelease above without reversing a
// tested backend decision. version-policy is Android's own already-public,
// unauthenticated endpoint and *does* return latestVersionCode by design --
// reused here for exactly one field, nothing else in its payload (title/
// message/status/etc. are Android-gate copy, not meaningful on a marketing
// page). MARKETING_SITE_PROBE_VERSION_CODE is deliberately high so this
// call always lands on getVersionPolicy's final SUPPORTED fallthrough
// (the only branch guaranteed to carry the real release's versionCode) --
// a low/0 caller version could otherwise trip API_TOO_OLD or
// SECURITY_UPDATE_REQUIRED, both of which are real, meaningful statuses for
// an actual outdated Android client but meaningless noise here.
const MARKETING_SITE_PROBE_VERSION_CODE = 999_999_999;

export interface PublicVersionPolicy {
  latestVersionCode: number;
}

export async function getPublicLatestVersionCode(
  channel: PublicAppRelease["channel"] = "BETA",
): Promise<number | null> {
  if (!MCP_API_URL) {
    throw new Error("MCP_API_URL must be set");
  }
  const response = await fetch(
    `${MCP_API_URL}/app-releases/version-policy?channel=${channel}&versionCode=${MARKETING_SITE_PROBE_VERSION_CODE}`,
    { next: { revalidate: 300 } },
  );
  if (!response.ok) {
    throw new McpError(statusToKind(response.status), response.status, response.statusText);
  }
  const policy = (await response.json()) as PublicVersionPolicy;
  return policy.latestVersionCode || null;
}

export interface AppReleaseMetadata extends PublicAppRelease {
  id: string;
  releaseNotes: string | null;
}

// GET /app-releases/active -- the authenticated route (the Customer Hub's
// own download flow, distinct from the public one above). AND-PR-001
// removed the License gate that used to sit behind this: an authenticated
// user who's completed onboarding is enough, no paid License required.
export async function getActiveAppRelease(accessToken: string): Promise<AppReleaseMetadata> {
  return mcpFetch<AppReleaseMetadata>("/app-releases/active", { method: "GET" }, { accessToken });
}

export interface AppReleaseAuthorization {
  downloadUrl: string;
  version: string;
  channel: "STABLE" | "BETA" | "RC";
  expiresAt: string | null;
}

// WS-009 (Dashboard / Live Operations, CONTRACT-V1) -- both mirror
// momoassistant-platform's own response shape field-for-field (commit
// 81506a8, DevicesService.findByOrganization / TransactionsService.
// findRecentByOrganization), same convention as every type above. Deliberately
// no currency/country/operator field on RecentTransactionSummary -- the
// backend contract doesn't expose them (privacy/scope decision made at
// CONTRACT-V1 time), so this UI shows the raw amount only, never a guessed
// currency suffix.

// POST-WS009-REMEDIATION-01C-G -- mirrors momoassistant-platform's
// CommunicationProfileSummary field-for-field (devices.service.ts, commit
// fb3233f). No currency field -- deliberately not invented here either,
// same discipline as RecentTransactionSummary above: this UI shows the raw
// verifiedBalance number with operator/country as context, never a guessed
// GHS/XOF suffix (formatCurrency() elsewhere in this repo is only ever
// called with a currency field the backend explicitly provided on that same
// object -- invoice.currency, license.plan.currency -- there is no
// country-to-currency mapping anywhere in this codebase to reuse here).
export interface CommunicationProfileSummary {
  id: string;
  type: string;
  iccid: string | null;
  eid: string | null;
  operatorId: string;
  countryId: string;
  logicalSlot: number | null;
  physicalSlot: number | null;
  verifiedBalance: string | null;
  balanceConfidence: string | null;
  balanceVerifiedAt: string | null;
  // WEB-TX-PRESENTATION-004-A -- sibling of the three balance fields above,
  // same discipline (no currency, no fabricated 0 -- null until a Commission
  // Check has actually synced). A distinct wallet snapshot on the same SIM,
  // never the same value as verifiedBalance and never merged with
  // Transaction.commission (a different fact -- money credited to the
  // agent, not a wallet snapshot; rendered nowhere near Reports/Transactions).
  verifiedCommission: string | null;
  commissionConfidence: string | null;
  commissionVerifiedAt: string | null;
  merchantLineId: string | null;
}

export interface OrganizationDeviceSummary {
  deviceId: string;
  deviceName: string;
  stationId: string | null;
  stationName: string | null;
  batteryLevel: number | null;
  lastHeartbeatAt: string | null;
  isStale: boolean;
  // POST-WS009-REMEDIATION-01C-G -- was `currentCommunicationProfile: ... |
  // null` (singular), which silently dropped every SIM past the first on a
  // dual-SIM device (fixed backend-side, commit fb3233f). This type had zero
  // real consumers before this sprint (DeviceStatusCard never read the old
  // field), so this is a straight rename, no compatibility shim.
  communicationProfiles: CommunicationProfileSummary[];
}

export async function listOrganizationDevices(
  accessToken: string,
  organizationId: string,
): Promise<OrganizationDeviceSummary[]> {
  return mcpFetch<OrganizationDeviceSummary[]>(
    `/organizations/${organizationId}/devices`,
    { method: "GET" },
    { accessToken },
  );
}

// STATION-TREE-PHASE-B -- same POST assigns-or-moves-a-Device endpoint
// backend-side (idempotent no-op if the Device already holds that Station,
// per the locked Phase B contract) -- one function covers both "assign"
// (currently unassigned) and "move" (already on another Station), same as
// the backend's own single assignStation() service method. Response is the
// backend's bare DeviceSummary (no stationId field) -- unused here, the
// caller revalidates the page and re-fetches listOrganizationDevices for
// the updated tree, same as removeMember's fire-and-forget shape below.
export async function assignDeviceToStation(
  accessToken: string,
  deviceId: string,
  stationId: string,
  reason?: string,
): Promise<void> {
  await mcpFetch(
    `/devices/${deviceId}/station`,
    { method: "POST", body: { stationId, reason } },
    { accessToken },
  );
}

// STATION-TREE-PHASE-B -- Station -> Unassigned.
export async function unassignDevice(
  accessToken: string,
  deviceId: string,
  reason?: string,
): Promise<void> {
  await mcpFetch(
    `/devices/${deviceId}/station`,
    { method: "DELETE", body: { reason } },
    { accessToken },
  );
}

// EXT-TX-UNIFICATION-001 -- explicit decision reopening the "no
// currency/country/operator" exclusion above for exactly this pair of
// fields. Both independently nullable -- never both required, never one
// derived from the other. Render whichever is non-null; never a
// "null"/"N/A" placeholder when both are absent (e.g. a commission credit).
export interface RecentTransactionSummary {
  transactionUid: string;
  stationId: string | null;
  stationName: string | null;
  status: string;
  transactionType: string;
  amount: string;
  createdAt: string;
  counterpartyName: string | null;
  counterpartyPhone: string | null;
  // EXT-TX-UNIFICATION-002 -- raw Android ExternalSubtype.name, only ever
  // non-null when transactionType === "EXTERNAL_TRANSACTION". Never a
  // derived direction -- see lib/treasury-direction.ts for the ported
  // classifyTreasury()/resolveTreasuryDirection() mapping consumed at
  // render time.
  externalSubtype: string | null;
}

export async function listRecentTransactions(
  accessToken: string,
  organizationId: string,
): Promise<RecentTransactionSummary[]> {
  return mcpFetch<RecentTransactionSummary[]>(
    `/organizations/${organizationId}/transactions/recent`,
    { method: "GET" },
    { accessToken },
  );
}

// ---------------------------------------------------------------------------
// WS-013 (Report Hub) -- every type below mirrors momoassistant-platform's
// WS-012 TransactionsService/TransactionsController field-for-field
// (WS-011 CONTRACT.md, production-verified WS-012 Phase 9), same discipline
// as the WS-006 block above. Deliberately NO country/operator field on
// ReportTransaction -- the real, locked backend DTO never exposed them
// (verified against the live endpoint, not just the doc); never invented
// here to match an illustrative UI mock.

export type ReportPeriod = "TODAY" | "LAST_7_DAYS" | "LAST_30_DAYS" | "CUSTOM";
export type ReportCurrency = "GHS" | "XOF";
export type ReportTransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export interface ReportQueryParams {
  period?: ReportPeriod;
  // WS-011 CONTRACT.md §6.2 -- required together for period: "CUSTOM", ISO
  // 8601. Half-open [start, end) UTC is enforced entirely server-side; this
  // client never recomputes or second-guesses the boundary.
  startDate?: string;
  endDate?: string;
  status?: ReportTransactionStatus;
  transactionType?: string;
  stationId?: string;
  currency?: ReportCurrency;
}

export interface ListTransactionsParams extends ReportQueryParams {
  cursor?: string;
  limit?: number;
}

// Typed as the two real param interfaces (not Record<string, ...>) so
// callers get real autocomplete/type-checking on the fields that exist --
// the cast inside is a value-level assertion (always legal in TS, unlike a
// parameter-position assignment), not a loosening of what callers can pass.
function buildReportQuery(params: ReportQueryParams | ListTransactionsParams): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params as Record<string, string | number | undefined>)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

// WS-011 CONTRACT.md §7.5 -- field-for-field mirror of the real
// TransactionsService.ReportTransaction. userId never included (never was,
// on the backend side either -- not a redaction happening here).
export interface ReportTransaction {
  transactionUid: string;
  status: string;
  transactionType: string;
  amount: string;
  currency: string | null;
  fee: string;
  commission: string;
  stationId: string | null;
  stationName: string | null;
  reference: string;
  createdAt: string;
  // EXT-TX-UNIFICATION-001 -- see RecentTransactionSummary's own comment.
  counterpartyName: string | null;
  counterpartyPhone: string | null;
  // EXT-TX-UNIFICATION-002 -- see RecentTransactionSummary's own comment.
  externalSubtype: string | null;
}

export interface ReportTransactionPage {
  items: ReportTransaction[];
  nextCursor: string | null;
}

export async function listTransactions(
  accessToken: string,
  organizationId: string,
  params: ListTransactionsParams,
): Promise<ReportTransactionPage> {
  return mcpFetch<ReportTransactionPage>(
    `/organizations/${organizationId}/transactions${buildReportQuery(params)}`,
    { method: "GET" },
    { accessToken },
  );
}

// WS-011 CONTRACT.md §8.2 -- one row per currency, never a combined total.
export interface ReportCurrencyAggregate {
  currency: string;
  transactionCount: number;
  volume: string;
  fees: string;
  commissions: string;
}

// WS-011 CONTRACT.md §8.2/§8.4 -- transactionCount/byStatus/byCurrency/
// successRate are ALL scoped to money-movement types only (BALANCE_CHECK/
// COMMISSION_CHECK excluded server-side, §4.2). successRate is null (never
// NaN/0/a guessed 100%) when the denominator is 0 -- rendered as-is, never
// coerced to a number here.
export interface ReportSummary {
  transactionCount: number;
  byStatus: { SUCCESS: number; FAILED: number; PENDING: number; CANCELLED: number };
  byCurrency: ReportCurrencyAggregate[];
  successRate: number | null;
}

export async function getTransactionsSummary(
  accessToken: string,
  organizationId: string,
  params: ReportQueryParams,
): Promise<ReportSummary> {
  return mcpFetch<ReportSummary>(
    `/organizations/${organizationId}/transactions/summary${buildReportQuery(params)}`,
    { method: "GET" },
    { accessToken },
  );
}

// WS-011 CONTRACT.md §9.2 -- one row per (day, currency) pair, daily UTC
// buckets, same money-movement scope as summary (locked 2026-09-03, see
// momoassistant-platform commit a516cc3) -- never merged/summed across
// currency here, matching what the backend already refuses to do.
export interface ReportTrendPoint {
  period: string;
  currency: string;
  transactionCount: number;
  volume: string;
}

export async function getTransactionsTrends(
  accessToken: string,
  organizationId: string,
  params: ReportQueryParams,
): Promise<ReportTrendPoint[]> {
  return mcpFetch<ReportTrendPoint[]>(
    `/organizations/${organizationId}/transactions/trends${buildReportQuery(params)}`,
    { method: "GET" },
    { accessToken },
  );
}

export interface TransactionsExportResult {
  body: string;
  contentType: string;
  filename: string;
}

// WS-011 CONTRACT.md §12 -- deliberately bypasses mcpFetch (same rationale
// as getPublicLatestAppRelease above, different reason): the backend
// returns raw CSV text with Content-Disposition, not JSON. The Route
// Handler at app/[locale]/(app)/(hub)/reports/export/route.ts is the only
// caller -- the browser never talks to MCP or sees its base URL/token
// directly (RFC-0011), same boundary as every other function in this file.
export async function exportTransactionsCsv(
  accessToken: string,
  organizationId: string,
  params: ReportQueryParams,
): Promise<TransactionsExportResult> {
  if (!MCP_API_URL) {
    throw new Error("MCP_API_URL must be set");
  }
  const response = await fetch(
    `${MCP_API_URL}/organizations/${organizationId}/transactions/export${buildReportQuery(params)}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    },
  );
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string | string[] };
    const message = Array.isArray(body.message) ? body.message.join(", ") : (body.message ?? response.statusText);
    throw new McpError(statusToKind(response.status), response.status, message);
  }
  const disposition = response.headers.get("content-disposition") ?? "";
  const filenameMatch = /filename="([^"]+)"/.exec(disposition);
  return {
    body: await response.text(),
    contentType: response.headers.get("content-type") ?? "text/csv",
    filename: filenameMatch?.[1] ?? `transactions-${organizationId}.csv`,
  };
}

export async function authorizeAppDownload(
  accessToken: string,
  releaseId: string,
): Promise<AppReleaseAuthorization> {
  return mcpFetch<AppReleaseAuthorization>(
    `/app-releases/${releaseId}/authorize-download`,
    { method: "POST" },
    { accessToken },
  );
}
