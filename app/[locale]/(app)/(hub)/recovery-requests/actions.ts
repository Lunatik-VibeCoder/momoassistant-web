"use server";

import { revalidatePath } from "next/cache";

import { McpError, routeRecoveryRequestToCaseB } from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-5 -- called directly from
// the Route button (no form, no body to collect -- unlike PC-4's Revoke,
// which requires a mandatory reason), same "throws on failure, client
// component's own try/catch shows a toast" shape as members'
// removeMemberAction.
export async function routeToCaseBAction(id: string): Promise<void> {
  const session = await requireSession();
  if (!session) {
    throw new Error("Your session has expired. Please log in again.");
  }
  try {
    await routeRecoveryRequestToCaseB(session.accessToken, id);
  } catch (error) {
    if (error instanceof McpError) {
      throw new Error(error.message);
    }
    throw error;
  }
  revalidatePath("/[locale]/(app)/(hub)/recovery-requests", "page");
}
