"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SettingsContent } from "@/content/settings";
import { changePasswordAction, type ActionFormState } from "./actions";

const initialState: ActionFormState = { status: "idle" };

export function ChangePasswordForm({ content }: { content: SettingsContent }) {
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(content.password.success);
      formRef.current?.reset();
    }
  }, [state, content.password.success]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.password.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currentPassword">{content.password.currentPasswordLabel}</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">{content.password.newPasswordLabel}</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              required
            />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2 self-start">
            {content.password.submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
