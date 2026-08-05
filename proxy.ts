import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import {
  refreshSessionCookie,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/session";

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (same NextRequest/
// NextResponse/matcher API) — next-intl's middleware factory still returns
// a standard handler, so it plugs in here unchanged.
const intlMiddleware = createMiddleware(routing);

// WS-005R P1 -- the silent session refresh used to live in
// lib/session.ts#requireSession(), called from page/layout Server
// Components. That's the one place cookie mutation is illegal in Next.js,
// so a refresh there could update the in-memory session for one render but
// never actually persist to the browser -- confirmed live during WS-005R's
// own audit (a session that outlived its 15-minute access token got bounced
// to /login instead of silently renewing). Middleware is the correct,
// legal place for this; see lib/session.ts's own comment on why the actual
// refresh logic is self-contained there rather than reusing
// requireSession()/mcp-client's mcpFetch (both depend on next/headers,
// which isn't available in Middleware).
export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const rawCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const result = await refreshSessionCookie(rawCookie);

  if (result.action === "set") {
    response.cookies.set(SESSION_COOKIE_NAME, result.value, SESSION_COOKIE_OPTIONS);
  } else if (result.action === "clear") {
    response.cookies.delete(SESSION_COOKIE_NAME);
  }

  return response;
}

export const config = {
  // Match every path except Next internals, API routes, and files with an
  // extension (static assets) — the standard next-intl matcher.
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
