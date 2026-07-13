import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (same NextRequest/
// NextResponse/matcher API) — next-intl's middleware factory still returns
// a standard handler, so it plugs in here unchanged.
export default createMiddleware(routing);

export const config = {
  // Match every path except Next internals, API routes, and files with an
  // extension (static assets) — the standard next-intl matcher.
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
