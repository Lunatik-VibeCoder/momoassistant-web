import { NextRequest, NextResponse } from "next/server";

import { FALLBACK_APK_URL } from "@/lib/constants";

const MCP_API_URL = process.env.MCP_API_URL;

// WS-006N (follow-up) -- the single entry point every "Download" button on
// the marketing site now links to. Deliberately does NOT redirect the
// browser straight to MCP_API_URL/beta-releases/public-download: RFC-0011's
// invariant that "the browser never sees MCP's base URL" (see
// lib/mcp-client.ts) would otherwise be broken by this one route, since a
// browser redirect target is visible to the browser by definition. Instead
// this route follows that redirect itself, server-side, and re-redirects
// the browser straight to the resolved artifact URL -- which already lives
// on a public host (BETA_DOWNLOADS_BASE_URL), not on the API host.
export async function GET(request: NextRequest): Promise<NextResponse> {
  if (MCP_API_URL) {
    try {
      const response = await fetch(`${MCP_API_URL}/beta-releases/public-download`, {
        redirect: "manual",
        cache: "no-store",
      });
      const location = response.headers.get("location");
      if (location) {
        return NextResponse.redirect(location);
      }
    } catch {
      // MCP unreachable -- fall through to the static fallback below.
    }
  }
  return NextResponse.redirect(new URL(FALLBACK_APK_URL, request.url));
}
