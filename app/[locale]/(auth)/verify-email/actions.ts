"use server";

import { redirect } from "next/navigation";

import { createSession } from "@/lib/session";
import { McpError, verifyEmail } from "@/lib/mcp-client";
import type { AppLocale } from "@/i18n/routing";

export interface VerifyEmailFormState {
  status: "idle" | "error";
  message?: string;
}

export async function verifyEmailAction(
  locale: AppLocale,
  _prevState: VerifyEmailFormState,
  formData: FormData,
): Promise<VerifyEmailFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();

  let sessionData;
  try {
    sessionData = await verifyEmail({ email, code });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  // MCP auto-issues a session on successful verification (E1) -- the BFF
  // mirrors that here, the browser only ever receives the resulting
  // httpOnly cookie (RFC-0011 Invariant 1), never these tokens directly.
  await createSession(sessionData);
  redirect(`/${locale}/onboarding`);
}
