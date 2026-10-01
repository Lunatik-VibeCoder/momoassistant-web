"use server";

import { redirect } from "next/navigation";

import { getForgotPasswordContent } from "@/content/forgot-password";
import type { AppLocale } from "@/i18n/routing";
import { forgotPassword, McpError } from "@/lib/mcp-client";

export interface ForgotPasswordFormState {
  status: "idle" | "error";
  message?: string;
}

// PASSWORD-RESET-WEB-2 -- POST /auth/forgot-password is deliberately
// anti-enumeration (see lib/mcp-client.ts's own comment): it always
// responds 204, whether or not the email belongs to a real account. There
// is no legitimate non-429 error this endpoint can return that would be
// safe to show verbatim -- unlike every other action in this app (login/
// register/verifyEmail/acceptInvitation, all of which surface
// error.message for any McpError), this one deliberately does NOT do that.
// Only the dedicated rate-limited message (decision 7) is ever shown;
// every other failure (an unexpected 5xx, a network error, anything else)
// funnels into the same generic fallback already used elsewhere in this
// app, so nothing about the backend's internal reasoning ever reaches the
// caller.
export async function forgotPasswordAction(
  locale: AppLocale,
  _prevState: ForgotPasswordFormState,
  formData: FormData,
): Promise<ForgotPasswordFormState> {
  const email = String(formData.get("email") ?? "").trim();

  try {
    await forgotPassword({ email });
  } catch (error) {
    if (error instanceof McpError && error.kind === "rate_limited") {
      return { status: "error", message: getForgotPasswordContent(locale).rateLimitedMessage };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  // PASSWORD-RESET-WEB-2 decision 2 -- email transported via ?email= query
  // param, same precedent as register -> verify-email (BUG-ONBOARDING-001:
  // a real redirect, never client-memory success state a refresh could
  // discard). No other sensitive data (no code, no token) is added to this
  // query string beyond the email itself.
  redirect(`/${locale}/reset-password?email=${encodeURIComponent(email)}`);
}
