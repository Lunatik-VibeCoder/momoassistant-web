import { NextResponse, type NextRequest } from "next/server";
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

const APP_HOST = "app.momoassistant.com";
const LOCALE_PATTERN = routing.locales.join("|");
const PATH_PATTERN = new RegExp(`^/(${LOCALE_PATTERN})(?:/([^/]+))?(?:/.*)?$`);

// Customer Hub route segments (WS-006) -- everything else on app.* is
// marketing-only content that must never accidentally render there.
const HUB_SEGMENTS = new Set([
  "app",
  "organization",
  "members",
  "license",
  "subscription",
  "billing",
  "health",
  "settings",
  "reports",
]);

// The subdomain split (marketing on www.*, Customer Hub on app.*) --
// operates on the pathname *after* next-intl has already resolved a
// missing locale prefix (see the `location` header check below), so every
// case here can assume the path already looks like /:locale/... .
function applyAppHostRouting(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  const match = pathname.match(PATH_PATTERN);
  if (!match) {
    return null;
  }
  const [, locale, firstSegment] = match;

  if (!firstSegment) {
    // Bare /:locale IS the dashboard on this host -- rewritten internally
    // to the existing (unmoved) /app route, invisibly to the browser.
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/app`;
    return NextResponse.rewrite(url);
  }

  if (firstSegment === "app") {
    // Canonicalize -- the dashboard has exactly one URL on this host, not
    // two working ones (bare root and /app both rendering the same page).
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url, 308);
  }

  if (HUB_SEGMENTS.has(firstSegment)) {
    return null; // a real Hub page -- let it through unchanged.
  }

  // Marketing-only path requested on the app host -- a real 404, not a
  // silent fallthrough to marketing content and not a redirect either.
  return new NextResponse(null, { status: 404 });
}

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

  // A `location` header here means next-intl itself decided to redirect
  // (typically adding a missing locale prefix) -- let that happen first;
  // the app-host routing above only makes sense once a locale is present,
  // and the redirected request will come back through this same
  // Middleware once it is.
  if (!response.headers.has("location")) {
    const host = request.headers.get("host") ?? "";
    if (host === APP_HOST) {
      const hostResponse = applyAppHostRouting(request);
      if (hostResponse) {
        return hostResponse;
      }
    }
  }

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
