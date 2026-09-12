"use server";

import { revalidatePath } from "next/cache";

import { McpError, revokeDevice } from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

export interface RevokeDeviceFormState {
  status: "idle" | "error" | "success";
  message?: string;
}

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-4 -- same
// findByOrganization-then-revalidate shape as members' inviteMemberAction.
// deviceId is bound via .bind(null, ...) from the client component, same
// pattern as inviteMemberAction(organizationId, ...) -- the backend itself
// resolves the device's organizationId server-side and re-checks
// devices:write there (assertOrganizationAccess), this is not the
// authorization boundary, just where the call originates from.
export async function revokeDeviceAction(
  deviceId: string,
  _prevState: RevokeDeviceFormState,
  formData: FormData,
): Promise<RevokeDeviceFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: "error", message: "Your session has expired. Please log in again." };
  }

  const reason = String(formData.get("reason") ?? "").trim();

  try {
    await revokeDevice(session.accessToken, deviceId, reason);
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/[locale]/(app)/(hub)/devices", "page");
  return { status: "success" };
}
