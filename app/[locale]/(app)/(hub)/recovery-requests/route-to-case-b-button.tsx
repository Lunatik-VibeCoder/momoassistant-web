"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { RecoveryRequestsContent } from "@/content/recovery-requests";
import { routeToCaseBAction } from "./actions";

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-5 -- same
// window.confirm+useTransition+toast shape as members' RemoveMemberButton
// (no data to collect for this action, unlike PC-4's RevokeDeviceDialog).
export function RouteToCaseBButton({
  requestId,
  content,
}: {
  requestId: string;
  content: RecoveryRequestsContent;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(content.routeConfirm)) {
      return;
    }
    startTransition(async () => {
      try {
        await routeToCaseBAction(requestId);
        toast.success(content.routeSuccess);
      } catch {
        toast.error(content.routeError);
      }
    });
  }

  return (
    <Button variant="outline" size="sm" disabled={isPending} onClick={handleClick}>
      {content.routeButton}
    </Button>
  );
}
