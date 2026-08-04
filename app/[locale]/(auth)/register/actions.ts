"use server";

import { McpError, register } from "@/lib/mcp-client";

export interface RegisterFormState {
  status: "idle" | "error" | "success";
  message?: string;
  email?: string;
}

export async function registerAction(
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayNameRaw = String(formData.get("displayName") ?? "").trim();

  try {
    await register({ email, password, displayName: displayNameRaw || undefined });
    return { status: "success", email };
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
