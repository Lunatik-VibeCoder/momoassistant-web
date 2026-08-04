"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SettingsContent } from "@/content/settings";
import { updateProfileAction, type ActionFormState } from "./actions";

const initialState: ActionFormState = { status: "idle" };

export function ProfileForm({
  content,
  displayName,
  locale,
}: {
  content: SettingsContent;
  displayName: string;
  locale: "FR" | "EN" | null;
}) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(content.profile.success);
    }
  }, [state, content.profile.success]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.profile.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="displayName">{content.profile.displayNameLabel}</Label>
            <Input id="displayName" name="displayName" type="text" defaultValue={displayName} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="locale">{content.profile.localeLabel}</Label>
            <select
              id="locale"
              name="locale"
              defaultValue={locale ?? ""}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            >
              <option value="" disabled>
                —
              </option>
              <option value="EN">English</option>
              <option value="FR">Français</option>
            </select>
          </div>
          <Button type="submit" disabled={isPending} className="mt-2 self-start">
            {content.profile.submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
