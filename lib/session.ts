import "server-only";

import { cookies } from "next/headers";
import { getIronSession, type IronSession } from "iron-session";

import { refreshSession as mcpRefresh } from "@/lib/mcp-client";

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
    cookieName: "momo_session",
    password: getSessionSecret(),
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
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
// Found during WS-006 manual verification, not previously caught: this
// function's only real callers are page/layout Server Components, but
// Next.js only allows cookies().set()/.delete() from a Server Action,
// Route Handler, or Middleware -- never from a plain render. Both
// session.save() and session.destroy() below hit that restriction and
// throw once a request actually lands in the near-expiry window (every
// earlier verification pass happened to finish within one access token's
// 15-minute lifetime, so this never fired before). Catching here stops the
// 500 and keeps the redirect-to-login behavior working; it does not fully
// fix the underlying gap -- a successful-but-unpersisted refresh still
// leaves a now-rotated-away refresh token in the browser's cookie, so the
// next request's retry can trip R4's reuse-detection and force a real
// logout instead of silently renewing. The correct fix is renewing the
// session in Next Middleware (where cookie mutation is actually legal),
// not patched here -- flagged as its own follow-up, out of WS-006's scope.
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
