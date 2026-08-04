"use server";

import { revalidatePath } from "next/cache";

import { changePassword, McpError, updateMe, type Locale } from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

export interface ActionFormState {
  status: "idle" | "error" | "success";
  message?: string;
}

export async function updateProfileAction(
  _prevState: ActionFormState,
  formData: FormData,
): Promise<ActionFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: "error", message: "Your session has expired. Please log in again." };
  }

  const displayName = String(formData.get("displayName") ?? "").trim();
  const localeRaw = String(formData.get("locale") ?? "");
  const locale = (localeRaw === "FR" || localeRaw === "EN" ? localeRaw : undefined) as
    | Locale
    | undefined;

  try {
    await updateMe(session.accessToken, {
      ...(displayName ? { displayName } : {}),
      ...(locale ? { locale } : {}),
    });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/[locale]/(app)/(hub)/settings", "page");
  return { status: "success" };
}

export async function changePasswordAction(
  _prevState: ActionFormState,
  formData: FormData,
): Promise<ActionFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: "error", message: "Your session has expired. Please log in again." };
  }

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  try {
    await changePassword(session.accessToken, { currentPassword, newPassword });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success" };
}
