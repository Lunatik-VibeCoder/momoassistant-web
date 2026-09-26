"use server";

import { revalidatePath } from "next/cache";

import {
  approveReplacementRequest,
  McpError,
  rejectReplacementRequest,
} from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

// AUTH-SECURITY-2 Case B B1.8 -- same throws-on-failure/client-catches-a-
// toast shape as recovery-requests' routeToCaseBAction (no form, no body
// to collect). The backend (approveReplacementRequest, B1.3, locked)
// remains the sole authority on eligibility (PENDING_APPROVAL only) and
// self-approval (CB-6) -- this action never pre-checks either, it only
// forwards the call and lets McpError surface whatever the backend
// decided.
export async function approveReplacementRequestAction(id: string): Promise<void> {
  const session = await requireSession();
  if (!session) {
    throw new Error("Your session has expired. Please log in again.");
  }
  try {
    await approveReplacementRequest(session.accessToken, id);
  } catch (error) {
    if (error instanceof McpError) {
      throw new Error(error.message);
    }
    throw error;
  }
  revalidatePath("/[locale]/(app)/(hub)/replacement-requests", "page");
}

export interface RejectReplacementRequestFormState {
  status: "idle" | "error" | "success";
  message?: string;
}

// Same findByOrganization-then-revalidate shape as devices'
// revokeDeviceAction -- reason is forwarded verbatim, the backend's own
// normalizeRejectionReason (B1.3, locked) remains the authoritative
// validator (client-side minLength/maxLength in reject-dialog.tsx is
// UX-only, per the B1.8 GO's explicit security rule).
export async function rejectReplacementRequestAction(
  id: string,
  _prevState: RejectReplacementRequestFormState,
  formData: FormData,
): Promise<RejectReplacementRequestFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: "error", message: "Your session has expired. Please log in again." };
  }

  const reason = String(formData.get("reason") ?? "").trim();

  try {
    await rejectReplacementRequest(session.accessToken, id, reason);
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/[locale]/(app)/(hub)/replacement-requests", "page");
  return { status: "success" };
}
