import { NextResponse } from "next/server";

import { authorizeBetaDownload, getActiveBetaRelease, McpError } from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

// WS-006N (follow-up) -- now actually calls the license-gated Beta
// Distribution flow this route was always meant to front (see the
// superseded review-amendment note this replaces): GET /beta-releases/active
// to find the current release, then POST .../authorize-download to resolve
// a real URL. Both calls carry the user's own session token, so MCP's own
// per-organization License check (LicensesService.canDownloadBeta) is what
// actually gates this now, not just "is logged in."
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
  try {
    const release = await getActiveBetaRelease(session.accessToken);
    const authorization = await authorizeBetaDownload(session.accessToken, release.id);
    return NextResponse.redirect(authorization.downloadUrl);
  } catch (error) {
    // No License, no organization, or no published release for this
    // channel -- land on Subscription rather than throwing an unhandled
    // error; that page is where a licensing problem is actually visible.
    if (error instanceof McpError && (error.kind === "forbidden" || error.kind === "not_found")) {
      return NextResponse.redirect(new URL(`/${locale}/app/subscription`, request.url));
    }
    throw error;
  }
}
