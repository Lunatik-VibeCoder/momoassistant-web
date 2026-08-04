import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";

// WS-005M.1 -- the marketing (locale) layout is statically prerendered
// (generateStaticParams) for every page under it; calling next/headers'
// cookies() directly in that layout would force the entire marketing site
// into per-request dynamic rendering just to read one boolean. Header
// (a client component) calls this tiny endpoint after mount instead --
// only this route itself is dynamic, every marketing page stays static.
export async function GET(): Promise<NextResponse> {
  const session = await getSession();
  return NextResponse.json(
    { isAuthenticated: !!session },
    { headers: { "Cache-Control": "no-store" } },
  );
}
