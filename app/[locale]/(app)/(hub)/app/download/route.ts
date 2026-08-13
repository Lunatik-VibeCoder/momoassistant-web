import { NextResponse } from "next/server";

import { authorizeAppDownload, getActiveAppRelease, McpError } from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

// AND-PR-001 (was WS-006N) -- calls the Release Management flow this route
// was always meant to front: GET /app-releases/active to find the current
// release, then POST .../authorize-download to resolve a real URL. Both
// calls carry the user's own session token. No License check anymore
// (AND-PR-001 removed LicensesService.canDownloadBeta entirely) -- an
// authenticated, onboarded user is enough, same as the public path.
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
    const release = await getActiveAppRelease(session.accessToken);
    const authorization = await authorizeAppDownload(session.accessToken, release.id);
    return NextResponse.redirect(authorization.downloadUrl);
  } catch (error) {
    // No organization (onboarding incomplete), or no published release for
    // this channel -- land on Subscription rather than throwing an
    // unhandled error; that page is where an account-state problem is
    // actually visible.
    if (error instanceof McpError && (error.kind === "forbidden" || error.kind === "not_found")) {
      return NextResponse.redirect(new URL(`/${locale}/app/subscription`, request.url));
    }
    throw error;
  }
}
