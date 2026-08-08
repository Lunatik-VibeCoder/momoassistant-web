"use server";

import { redirect } from "next/navigation";

import { completeOnboarding, McpError } from "@/lib/mcp-client";
import { appDashboardPath, marketingPath } from "@/lib/constants";
import { requireSession } from "@/lib/session";
import type { AppLocale } from "@/i18n/routing";

export interface OnboardingFormState {
  status: "idle" | "error";
  message?: string;
}

export async function completeOnboardingAction(
  locale: AppLocale,
  _prevState: OnboardingFormState,
  formData: FormData,
): Promise<OnboardingFormState> {
  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }

  const tenantName = String(formData.get("tenantName") ?? "").trim();
  const organizationName = String(formData.get("organizationName") ?? "").trim();
  const agentNameRaw = String(formData.get("agentName") ?? "").trim();

  try {
    await completeOnboarding(session.accessToken, {
      tenantName,
      organizationName,
      agentName: agentNameRaw || undefined,
    });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  redirect(appDashboardPath(locale));
}
