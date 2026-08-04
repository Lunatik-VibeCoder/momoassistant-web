"use server";

import { redirect } from "next/navigation";

import { logout as mcpLogout } from "@/lib/mcp-client";
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
  redirect(`/${locale}`);
}
