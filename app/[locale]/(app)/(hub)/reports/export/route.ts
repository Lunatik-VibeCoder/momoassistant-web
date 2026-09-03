import { NextResponse } from "next/server";

import { exportTransactionsCsv, getMe, McpError } from "@/lib/mcp-client";
import { parseReportsSearchParams, toApiQueryParams } from "@/lib/reports-query";
import { requireSession } from "@/lib/session";

// WS-013 Phase 9 -- WS-011 CONTRACT.md §12. Same rationale as
// app/[locale]/(app)/(hub)/app/download/route.ts: MCP returns raw CSV
// bytes (not JSON), so this Route Handler is the one place that proxies
// them to the browser with the right headers -- the browser never talks to
// MCP or sees its base URL/token directly (RFC-0011). The button that
// links here is a plain <a>; the browser's native download behavior does
// the rest, no client JS needed.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
): Promise<NextResponse> {
  const { locale } = await params;
  const session = await requireSession();
  if (!session) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  const url = new URL(request.url);
  const parsed = parseReportsSearchParams({
    period: url.searchParams.get("period") ?? undefined,
    startDate: url.searchParams.get("startDate") ?? undefined,
    endDate: url.searchParams.get("endDate") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    transactionType: url.searchParams.get("transactionType") ?? undefined,
    currency: url.searchParams.get("currency") ?? undefined,
  });

  try {
    const profile = await getMe(session.accessToken);
    if (!profile.organization) {
      return NextResponse.redirect(new URL(`/${locale}/onboarding`, request.url));
    }

    const result = await exportTransactionsCsv(
      session.accessToken,
      profile.organization.id,
      toApiQueryParams(parsed),
    );

    return new NextResponse(result.body, {
      status: 200,
      headers: {
        "Content-Type": result.contentType,
        "Content-Disposition": `attachment; filename="${result.filename}"`,
      },
    });
  } catch (error) {
    // Same expected-role-boundary handling as the RBAC-restricted pattern
    // elsewhere in the Hub (app/page.tsx) -- a 403 here means
    // transactions:read isn't granted; land back on the Report Hub page,
    // which already renders its own restricted state for that case.
    if (error instanceof McpError && (error.kind === "forbidden" || error.kind === "not_found")) {
      return NextResponse.redirect(new URL(`/${locale}/reports`, request.url));
    }
    throw error;
  }
}
