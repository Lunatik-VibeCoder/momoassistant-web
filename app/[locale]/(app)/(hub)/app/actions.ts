"use server";

import { redirect } from "next/navigation";

import { logout as mcpLogout } from "@/lib/mcp-client";
import { marketingPath } from "@/lib/constants";
import { destroySession, requireSession } from "@/lib/session";
import type { AppLocale } from "@/i18n/routing";

export async function logoutAction(locale: AppLocale): Promise<void> {
  const session = await requireSession();
  if (session) {
    // Best-effort -- an already-invalid access token still results in the
    // local session being destroyed below regardless.
    await mcpLogout(session.accessToken).catch(() => undefined);
  }
  await destroySession();
  // Marketing root, not app.momoassistant.com's own bare path -- that would
  // just rewrite back to the (now unauthenticated) dashboard and bounce
  // through another redirect to get to the login page anyway.
  redirect(marketingPath(locale, ""));
}
