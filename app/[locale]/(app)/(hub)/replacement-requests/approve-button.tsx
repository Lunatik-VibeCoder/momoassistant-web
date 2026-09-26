"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { ReplacementRequestsContent } from "@/content/replacement-requests";
import { approveReplacementRequestAction } from "./actions";

// AUTH-SECURITY-2 Case B B1.8 -- same window.confirm+useTransition+toast
// shape as recovery-requests' RouteToCaseBButton (no data to collect for
// this action).
export function ApproveButton({
  requestId,
  content,
}: {
  requestId: string;
  content: ReplacementRequestsContent;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(content.approveConfirm)) {
      return;
    }
    startTransition(async () => {
      try {
        await approveReplacementRequestAction(requestId);
        toast.success(content.approveSuccess);
      } catch {
        toast.error(content.approveError);
      }
    });
  }

  return (
    <Button variant="outline" size="sm" disabled={isPending} onClick={handleClick}>
      {content.approveButton}
    </Button>
  );
}
