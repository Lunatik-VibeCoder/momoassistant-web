"use server";

import { redirect } from "next/navigation";

import { appDashboardPath } from "@/lib/constants";
import { createSession } from "@/lib/session";
import { McpError, login } from "@/lib/mcp-client";
import type { AppLocale } from "@/i18n/routing";

export interface LoginFormState {
  status: "idle" | "error";
  message?: string;
}

export async function loginAction(
  locale: AppLocale,
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  let sessionData;
  try {
    sessionData = await login({ email, password });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  await createSession(sessionData);
  redirect(appDashboardPath(locale));
}
