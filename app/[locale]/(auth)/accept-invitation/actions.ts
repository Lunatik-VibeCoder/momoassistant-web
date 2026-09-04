"use server";

import { redirect } from "next/navigation";

import { createSession } from "@/lib/session";
import { McpError, acceptInvitation } from "@/lib/mcp-client";
import type { AppLocale } from "@/i18n/routing";

export type AcceptInvitationFormState =
  | { status: "idle" }
  | { status: "error"; message: string }
  // INVITATION-ACCEPT-ACCOUNT-STATE-001 -- LOGIN_REQUIRED (already-ACTIVE
  // account). Member access was already granted server-side by this point;
  // this state exists purely to tell the form "stop, show the redirect-to-
  // login card" -- never render the password form again, never imply the
  // password just typed was saved.
  | { status: "already_active"; email: string };

// MEMBERS-INVITATION-001 Piece 2, extended by INVITATION-ACCEPT-ACCOUNT-STATE-001
// Phase 2 -- mirrors verifyEmailAction() in ../verify-email/actions.ts for the
// SESSION_ISSUED branch: MCP's POST /invitations/accept response is now a
// discriminated union (see lib/mcp-client.ts's AcceptInvitationOutcome).
// SESSION_ISSUED -> createSession() + a real redirect (never a client-memory
// success state -- BUG-ONBOARDING-001's own lesson). LOGIN_REQUIRED -> no
// session is created, no redirect -- the form re-renders in the
// "already_active" state instead so it can show the "you already have an
// account" card without a full navigation.
//
// [password]/[displayName] are always sent even though MCP only uses them for
// the nonexistent-User and INVITED-User branches (accept()'s own contract) --
// this route has no way to know the target account's status ahead of time
// (preview() deliberately never exposes it, anti-enumeration) so the form
// always collects both; MCP silently ignores them for an already-ACTIVE User
// (INVITATION-ACCEPT-ACCOUNT-STATE-001's own locked contract -- never a
// takeover vector).
export async function acceptInvitationAction(
  locale: AppLocale,
  _prevState: AcceptInvitationFormState,
  formData: FormData,
): Promise<AcceptInvitationFormState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim();

  let result;
  try {
    result = await acceptInvitation({ token, password, displayName: displayName || undefined });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  if (result.outcome === "LOGIN_REQUIRED") {
    return { status: "already_active", email: result.email };
  }

  await createSession(result.session);
  redirect(`/${locale}/app`);
}
