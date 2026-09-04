"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { OrganizationContent } from "@/content/organization";
import { createStationAction, type CreateStationFormState } from "./actions";

const initialState: CreateStationFormState = { status: "idle" };

// STATION-TREE-PHASE-B -- same shape as CreateWorkspaceSheet, bound to a
// specific workspaceId instead of the organizationId.
export function CreateStationSheet({
  workspaceId,
  content,
}: {
  workspaceId: string;
  content: OrganizationContent["stationTree"];
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createStationAction.bind(null, workspaceId),
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(content.createSuccess);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [state, content.createSuccess]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        {content.createStationButton}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>{content.createStationSheetTitle}</SheetTitle>
        </SheetHeader>
        <form action={formAction} className="flex flex-col gap-4 px-4">
          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`station-name-${workspaceId}`}>{content.nameLabel}</Label>
            <Input id={`station-name-${workspaceId}`} name="name" type="text" required maxLength={255} />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {content.createSubmitLabel}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
