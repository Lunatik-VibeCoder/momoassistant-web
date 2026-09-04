"use server";

import { revalidatePath } from "next/cache";

import {
  assignDeviceToStation,
  createStation,
  createWorkspace,
  McpError,
  unassignDevice,
} from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

// STATION-TREE-PHASE-B -- mirrors members/actions.ts exactly: form-bound
// actions (useActionState) return an idle/error/success state; direct-call
// actions (assign/unassign, invoked from a <select>/confirm button rather
// than a <form>) throw on failure so the client component's own try/catch
// can show a toast (App Router treats a thrown Server Action the same as a
// rejected promise for a direct, non-form-bound caller).

export interface CreateWorkspaceFormState {
  status: "idle" | "error" | "success";
  message?: string;
}

export async function createWorkspaceAction(
  organizationId: string,
  _prevState: CreateWorkspaceFormState,
  formData: FormData,
): Promise<CreateWorkspaceFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: "error", message: "Your session has expired. Please log in again." };
  }

  const name = String(formData.get("name") ?? "").trim();

  try {
    await createWorkspace(session.accessToken, organizationId, name);
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/[locale]/(app)/(hub)/organization", "page");
  return { status: "success" };
}

export interface CreateStationFormState {
  status: "idle" | "error" | "success";
  message?: string;
}

export async function createStationAction(
  workspaceId: string,
  _prevState: CreateStationFormState,
  formData: FormData,
): Promise<CreateStationFormState> {
  const session = await requireSession();
  if (!session) {
    return { status: "error", message: "Your session has expired. Please log in again." };
  }

  const name = String(formData.get("name") ?? "").trim();

  try {
    await createStation(session.accessToken, workspaceId, name);
  } catch (error) {
    if (error instanceof McpError) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/[locale]/(app)/(hub)/organization", "page");
  return { status: "success" };
}

export async function assignDeviceStationAction(deviceId: string, stationId: string): Promise<void> {
  const session = await requireSession();
  if (!session) {
    throw new Error("Your session has expired. Please log in again.");
  }
  await assignDeviceToStation(session.accessToken, deviceId, stationId);
  revalidatePath("/[locale]/(app)/(hub)/organization", "page");
}

export async function unassignDeviceAction(deviceId: string): Promise<void> {
  const session = await requireSession();
  if (!session) {
    throw new Error("Your session has expired. Please log in again.");
  }
  await unassignDevice(session.accessToken, deviceId);
  revalidatePath("/[locale]/(app)/(hub)/organization", "page");
}
