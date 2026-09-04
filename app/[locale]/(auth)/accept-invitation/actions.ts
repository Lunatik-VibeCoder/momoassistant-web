"use server";

import { redirect } from "next/navigation";

import { createSession } from "@/lib/session";
import { McpError, acceptInvitation } from "@/lib/mcp-client";
import type { AppLocale } from "@/i18n/routing";

export interface AcceptInvitationFormState {
  status: "idle" | "error";
  message?: string;
}

// MEMBERS-INVITATION-001 Piece 2 -- mirrors verifyEmailAction() in
// ../verify-email/actions.ts: MCP's POST /invitations/accept auto-issues a
// session on success, this action mirrors that via createSession(), then a
// real redirect (never a client-memory "success" state -- BUG-ONBOARDING-001's
// own lesson, register/actions.ts) to the existing Hub landing page.
//
// [password]/[displayName] are always sent even though MCP only requires
// them when no User exists yet for the invitation's email (accept()'s own
// contract, unchanged) -- this route has no way to know that ahead of time
// (preview() deliberately never exposes it, anti-enumeration) so the form
// always collects both; MCP silently ignores them when reusing an existing
// User.
export async function acceptInvitationAction(
  locale: AppLocale,
  _prevState: AcceptInvitationFormState,
  formData: FormData,
): Promise<AcceptInvitationFormState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim();

  let sessionData;
  try {
    sessionData = await acceptInvitation({ token, password, displayName: displayName || undefined });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  await createSession(sessionData);
  redirect(`/${locale}/app`);
}
