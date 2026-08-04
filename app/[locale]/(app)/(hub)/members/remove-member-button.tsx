"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { MembersContent } from "@/content/members";
import { removeMemberAction } from "./actions";

export function RemoveMemberButton({
  organizationId,
  memberId,
  content,
}: {
  organizationId: string;
  memberId: string;
  content: MembersContent;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(content.removeConfirm)) {
      return;
    }
    startTransition(async () => {
      try {
        await removeMemberAction(organizationId, memberId);
        toast.success(content.removeSuccess);
      } catch {
        toast.error(content.removeError);
      }
    });
  }

  return (
    <Button variant="outline" size="sm" disabled={isPending} onClick={handleClick}>
      {content.removeButton}
    </Button>
  );
}
