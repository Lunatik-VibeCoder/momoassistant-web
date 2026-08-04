import { NextResponse } from "next/server";

import { APK_URL } from "@/lib/constants";
import { requireSession } from "@/lib/session";

// Review amendment (WS-005 plan) -- the Dashboard's download CTA hits this
// BFF route rather than linking straight to the static APK. No license
// check, download logging, or stable/beta/RC selection is built yet
// (nothing in this sprint needs it) -- only the indirection, so those can
// be added later without moving where the button points.
//
// `locale` is typed as a plain string, not `AppLocale` -- Next's generated
// route type validator expects Promise<{ locale: string }> for this route
// shape; it's only used here to build a redirect path, never re-validated
// against the two real locales.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
): Promise<NextResponse> {
  const { locale } = await params;
  const session = await requireSession();
  if (!session) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  return NextResponse.redirect(new URL(APK_URL, request.url));
}
