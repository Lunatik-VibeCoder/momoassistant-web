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
    session.destroy();
    return null;
  }

  const updated: SessionData = { ...data, ...refreshed };
  session.data = updated;
  await session.save();
  return updated;
}
