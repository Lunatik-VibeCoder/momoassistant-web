"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { MembersContent } from "@/content/members";
import type { InvitableRole } from "@/lib/mcp-client";
import { inviteMemberAction, type InviteMemberFormState } from "./actions";

const INVITABLE_ROLES: InvitableRole[] = ["ORG_ADMIN", "TENANT_ADMIN", "STATION_MANAGER", "AGENT"];

const initialState: InviteMemberFormState = { status: "idle" };

export function InviteMemberDialog({
  organizationId,
  content,
}: {
  organizationId: string;
  content: MembersContent;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    inviteMemberAction.bind(null, organizationId),
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(content.inviteSuccess);
      // Closing the sheet here is a reaction to the Server Action's result,
      // not state synchronized from an external system -- there's no other
      // hook into "the action just resolved" that useActionState exposes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [state, content.inviteSuccess]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button />}>{content.inviteButton}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>{content.inviteSheetTitle}</SheetTitle>
        </SheetHeader>
        <form action={formAction} className="flex flex-col gap-4 px-4">
          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-email">{content.inviteEmailLabel}</Label>
            <Input id="invite-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-role">{content.inviteRoleLabel}</Label>
            <select
              id="invite-role"
              name="role"
              defaultValue="AGENT"
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            >
              {INVITABLE_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {content.inviteSubmitLabel}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
