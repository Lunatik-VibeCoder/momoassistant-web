"use server";

import { redirect } from "next/navigation";

import type { AppLocale } from "@/i18n/routing";
import { McpError, register } from "@/lib/mcp-client";

export interface RegisterFormState {
  status: "idle" | "error";
  message?: string;
}

// BUG-ONBOARDING-001 (found via production manual verification, WS-006) --
// this used to return { status: "success" } and let the client component
// render a "Continue to verify" button from ephemeral useActionState memory.
// A refresh (or losing the tab, or the user just not clicking it right
// away) remounted the form with fresh initial state, silently discarding
// the only path to /verify-email -- the account already existed server-side
// (so re-registering said "email already in use") but was stuck INVITED
// forever (so login correctly, if confusingly, rejected it). A real
// redirect (matching every other auth Server Action in this app --
// completeOnboardingAction, login, etc.) makes the destination a real URL
// instead of memory that a refresh can lose.
export async function registerAction(
  locale: AppLocale,
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayNameRaw = String(formData.get("displayName") ?? "").trim();

  try {
    await register({ email, password, displayName: displayNameRaw || undefined });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  redirect(`/${locale}/verify-email?email=${encodeURIComponent(email)}`);
}
