import "server-only";

import { cookies } from "next/headers";
import { getIronSession, sealData, unsealData, type IronSession } from "iron-session";

import { refreshSession as mcpRefresh } from "@/lib/mcp-client";

export const SESSION_COOKIE_NAME = "momo_session";
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  // Marketing (www.momoassistant.com) and the Customer Hub
  // (app.momoassistant.com) are now separate hosts sharing one session --
  // login happens on www, the Hub lives on app, so the cookie has to be
  // valid across both. Omitted in dev (no domain = host-only, keeps
  // localhost working exactly as before), same env-conditional as `secure`.
  ...(process.env.NODE_ENV === "production"
    ? { domain: ".momoassistant.com" }
    : {}),
};

// RFC-0011 (Web Platform <-> MCP Communication Boundary) -- the browser
// never holds a raw MCP JWT (Invariant 1). This is the only place those
// JWTs exist outside MCP itself: sealed inside an httpOnly cookie via
// iron-session (stateless, no database -- WEB_ARCHITECTURE.md's own "no
// database" constraint). No `role` is stored here (review amendment,
// WS-005 plan) -- the session is never a permissions source of truth;
// any page needing current permissions calls MCP's GET /users/me fresh.
export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
  tenantId: string | null;
  organizationId: string | null;
}

export interface SessionData {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  user: SessionUser;
}

interface IronSessionShape {
  data?: SessionData;
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET must be set");
  }
  return secret;
}

async function getIronSessionInstance(): Promise<IronSession<IronSessionShape>> {
  const cookieStore = await cookies();
  return getIronSession<IronSessionShape>(cookieStore, {
    cookieName: SESSION_COOKIE_NAME,
    password: getSessionSecret(),
    cookieOptions: SESSION_COOKIE_OPTIONS,
  });
}

export async function createSession(data: SessionData): Promise<void> {
  const session = await getIronSessionInstance();
  session.data = data;
  await session.save();
}

export async function destroySession(): Promise<void> {
  const session = await getIronSessionInstance();
  session.destroy();
}

// Read-only -- does not attempt a refresh. Callers that need a guaranteed
// non-expired session should use requireSession() instead.
export async function getSession(): Promise<SessionData | null> {
  const session = await getIronSessionInstance();
  return session.data ?? null;
}

// RFC-0011 SS2 -- silent, server-side renewal before the access token's own
// expiry, reusing MCP's existing refresh-token rotation (R4). The browser
// never sees this happen.
//
// WS-005R -- the real fix now lives in proxy.ts/refreshSessionCookie()
// above, which runs in Middleware where cookie mutation is actually legal
// and refreshes before a request ever reaches a page. This function's own
// refresh branch is now just a fallback for whatever Middleware's matcher
// doesn't cover (e.g. Route Handlers it's configured to skip) -- it still
// can't persist a refresh from a plain render, so session.save()/.destroy()
// below are still wrapped in try/catch for that case, same as before.
// --- Middleware-safe silent refresh (WS-005R P1 fix) ---------------------
//
// requireSession() below can't legally persist a refresh (Next.js only
// allows cookies().set()/.delete() from a Server Action, Route Handler, or
// Middleware). Middleware is the one place that's actually true, but
// Middleware has no next/headers `cookies()`/`headers()` context (that's
// App Router-render-scoped, not available here) and shouldn't assume a
// Node runtime, so this section is deliberately self-contained: it doesn't
// import getIronSession, mcp-client's mcpFetch (which calls next/headers'
// headers()), or Buffer -- only iron-session's standalone sealData/
// unsealData (edge-safe) and the Web-standard atob/fetch.
//
// proxy.ts calls refreshSessionCookie() with the raw cookie string from
// NextRequest.cookies, then applies the result to the outgoing
// NextResponse.cookies itself -- that's the only place cookie mutation is
// legal for a request already past render.

function base64UrlDecode(segment: string): string {
  const padded =
    segment.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (segment.length % 4)) % 4);
  return atob(padded);
}

function decodeAccessTokenExpiryMsEdgeSafe(accessToken: string): number {
  const payloadSegment = accessToken.split(".")[1];
  if (!payloadSegment) {
    return Date.now();
  }
  try {
    const payload = JSON.parse(base64UrlDecode(payloadSegment)) as { exp?: number };
    return payload.exp ? payload.exp * 1000 : Date.now();
  } catch {
    return Date.now();
  }
}

async function refreshViaMcpEdgeSafe(
  refreshToken: string,
): Promise<Pick<SessionData, "accessToken" | "refreshToken" | "accessTokenExpiresAt"> | null> {
  const MCP_API_URL = process.env.MCP_API_URL;
  if (!MCP_API_URL) {
    return null;
  }
  try {
    const res = await fetch(`${MCP_API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) {
      return null;
    }
    const tokens = (await res.json()) as { accessToken: string; refreshToken: string };
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresAt: decodeAccessTokenExpiryMsEdgeSafe(tokens.accessToken),
    };
  } catch {
    return null;
  }
}

export type MiddlewareSessionRefreshResult =
  | { action: "none" }
  | { action: "clear" }
  | { action: "set"; value: string };

export async function refreshSessionCookie(
  rawCookieValue: string | undefined,
): Promise<MiddlewareSessionRefreshResult> {
  if (!rawCookieValue) {
    return { action: "none" };
  }

  let parsed: IronSessionShape;
  try {
    parsed = await unsealData<IronSessionShape>(rawCookieValue, {
      password: getSessionSecret(),
    });
  } catch {
    // Undecryptable/corrupt cookie -- not this function's job to clear it,
    // requireSession()'s own read will simply see no valid session.
    return { action: "none" };
  }

  const data = parsed.data;
  if (!data) {
    return { action: "none" };
  }

  const isExpiringSoon = data.accessTokenExpiresAt - Date.now() < 30_000;
  if (!isExpiringSoon) {
    return { action: "none" };
  }

  const refreshed = await refreshViaMcpEdgeSafe(data.refreshToken);
  if (!refreshed) {
    return { action: "clear" };
  }

  const updated: SessionData = { ...data, ...refreshed };
  const sealed = await sealData({ data: updated } satisfies IronSessionShape, {
    password: getSessionSecret(),
  });
  return { action: "set", value: sealed };
}

export async function requireSession(): Promise<SessionData | null> {
  const session = await getIronSessionInstance();
  const data = session.data;
  if (!data) {
    return null;
  }

  const isExpiringSoon = data.accessTokenExpiresAt - Date.now() < 30_000;
  if (!isExpiringSoon) {
    return data;
  }

  const refreshed = await mcpRefresh(data.refreshToken);
  if (!refreshed) {
    try {
      session.destroy();
    } catch {
      // See note above -- expected when called from a Server Component.
    }
    return null;
  }

  const updated: SessionData = { ...data, ...refreshed };
  session.data = updated;
  try {
    await session.save();
  } catch {
    // See note above -- the render still gets the fresh tokens in memory
    // even though the cookie itself couldn't be persisted here.
  }
  return updated;
}
