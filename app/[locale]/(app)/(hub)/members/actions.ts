"use server";

import { revalidatePath } from "next/cache";

import { inviteMember, McpError, removeMember, type InvitableRole } from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

export interface InviteMemberFormState {
  status: "idle" | "error" | "success";
  message?: string;
}

export async function inviteMemberAction(
  organizationId: string,
  _prevState: InviteMemberFormState,
  formData: FormData,
): Promise<InviteMemberFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: "error", message: "Your session has expired. Please log in again." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const role = String(formData.get("role") ?? "AGENT") as InvitableRole;

  try {
    await inviteMember(session.accessToken, organizationId, { email, role });
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/[locale]/(app)/(hub)/members", "page");
  return { status: "success" };
}

// Called directly from the Remove button (no form) -- throws on failure so
// the client component's own try/catch can show a toast; the App Router
// treats a thrown Server Action the same as a rejected promise for a
// direct (non-form-bound) caller.
export async function removeMemberAction(organizationId: string, memberId: string): Promise<void> {
  const session = await requireSession();
  if (!session) {
    throw new Error("Your session has expired. Please log in again.");
  }
  await removeMember(session.accessToken, organizationId, memberId);
  revalidatePath("/[locale]/(app)/(hub)/members", "page");
}
