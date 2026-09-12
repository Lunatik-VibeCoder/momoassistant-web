"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { DevicesContent } from "@/content/devices";
import { revokeDeviceAction, type RevokeDeviceFormState } from "./actions";

const initialState: RevokeDeviceFormState = { status: "idle" };

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-4 -- Sheet+form+useActionState,
// same shape as members' InviteMemberDialog: unlike RemoveMemberButton's
// plain window.confirm (no data to collect), revoking a device requires a
// mandatory reason (RevokeDeviceDto, backend-enforced min 10 chars) -- a
// confirm() dialog can't collect free text, a form can.
export function RevokeDeviceDialog({
  deviceId,
  deviceName,
  content,
}: {
  deviceId: string;
  deviceName: string;
  content: DevicesContent;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    revokeDeviceAction.bind(null, deviceId),
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(content.revokeSuccess);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [state, content.revokeSuccess]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="destructive" size="sm" />}>
        {content.revokeButton}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>
            {content.revokeSheetTitle} — {deviceName}
          </SheetTitle>
        </SheetHeader>
        <form action={formAction} className="flex flex-col gap-4 px-4">
          <Alert variant="destructive">
            <AlertDescription>{content.revokeWarning}</AlertDescription>
          </Alert>
          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="revoke-reason">{content.revokeReasonLabel}</Label>
            <textarea
              id="revoke-reason"
              name="reason"
              required
              minLength={10}
              maxLength={500}
              rows={3}
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            />
            <p className="text-xs text-muted-foreground">{content.revokeReasonHint}</p>
          </div>
          <Button type="submit" variant="destructive" disabled={isPending} className="mt-2">
            {content.revokeSubmitLabel}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
