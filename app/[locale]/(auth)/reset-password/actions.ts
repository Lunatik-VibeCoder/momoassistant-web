"use server";

import { redirect } from "next/navigation";

import { getResetPasswordContent } from "@/content/reset-password";
import type { AppLocale } from "@/i18n/routing";
import { McpError, resetPassword } from "@/lib/mcp-client";

export interface ResetPasswordFormState {
  status: "idle" | "error";
  message?: string;
}

// PASSWORD-RESET-WEB-2 -- unlike forgotPasswordAction (anti-enumeration,
// see its own comment), this endpoint has one legitimate, specific error to
// surface: an invalid/expired/already-used code (HTTP 401, one generic
// backend message covering all three cases by design -- never
// distinguished further here). That follows the same "verbatim
// error.message" convention as every other action in this app (login/
// register/verifyEmail/acceptInvitation). The one deliberate carve-out is
// rate-limiting (decision 7): never the raw backend throttler text, always
// the dedicated friendly copy, same as forgot-password/actions.ts.
//
// On success this NEVER calls createSession()/login() -- MCP mints no
// session/token on a password reset by design, so neither does this
// action. The agent signs in again with the new password (redirect to
// /login?reset=success, decision 4).
export async function resetPasswordAction(
  locale: AppLocale,
  _prevState: ResetPasswordFormState,
  formData: FormData,
): Promise<ResetPasswordFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();
  const newPassword = String(formData.get("newPassword") ?? "");

  try {
    await resetPassword({ email, code, newPassword });
  } catch (error) {
    if (error instanceof McpError) {
      if (error.kind === "rate_limited") {
        return { status: "error", message: getResetPasswordContent(locale).rateLimitedMessage };
      }
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  redirect(`/${locale}/login?reset=success`);
}
