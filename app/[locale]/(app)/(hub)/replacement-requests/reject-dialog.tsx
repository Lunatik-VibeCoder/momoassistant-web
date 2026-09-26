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
import type { ReplacementRequestsContent } from "@/content/replacement-requests";
import {
  rejectReplacementRequestAction,
  type RejectReplacementRequestFormState,
} from "./actions";

const initialState: RejectReplacementRequestFormState = { status: "idle" };

// AUTH-SECURITY-2 Case B B1.8 -- same Sheet+form+useActionState shape as
// devices' RevokeDeviceDialog: rejecting a replacement requires a
// mandatory reason (RejectReplacementRequestDto, backend-enforced min 10
// chars), a window.confirm() dialog can't collect free text. The
// minLength/maxLength below are client-side UX only -- the backend's own
// normalizeRejectionReason (B1.3, locked) remains authoritative, per the
// B1.8 GO's explicit security rule.
export function RejectDialog({
  requestId,
  content,
}: {
  requestId: string;
  content: ReplacementRequestsContent;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    rejectReplacementRequestAction.bind(null, requestId),
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(content.rejectSuccess);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [state, content.rejectSuccess]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="destructive" size="sm" />}>
        {content.rejectButton}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>{content.rejectSheetTitle}</SheetTitle>
        </SheetHeader>
        <form action={formAction} className="flex flex-col gap-4 px-4">
          <Alert variant="destructive">
            <AlertDescription>{content.rejectWarning}</AlertDescription>
          </Alert>
          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reject-reason">{content.rejectReasonLabel}</Label>
            <textarea
              id="reject-reason"
              name="reason"
              required
              minLength={10}
              maxLength={500}
              rows={3}
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            />
            <p className="text-xs text-muted-foreground">{content.rejectReasonHint}</p>
          </div>
          <Button type="submit" variant="destructive" disabled={isPending} className="mt-2">
            {content.rejectSubmitLabel}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
