"use client";

import { useActionState } from "react";

import { verifyEmailAction, type VerifyEmailFormState } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VerifyEmailContent } from "@/content/verify-email";
import type { AppLocale } from "@/i18n/routing";

const initialState: VerifyEmailFormState = { status: "idle" };

export function VerifyEmailForm({
  content,
  locale,
  email,
}: {
  content: VerifyEmailContent;
  locale: AppLocale;
  email: string;
}) {
  const [state, formAction, isPending] = useActionState(
    verifyEmailAction.bind(null, locale),
    initialState,
  );

  return (
    <Card className="mx-auto max-w-md px-6">
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <input type="hidden" name="email" value={email} />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="code">{content.codeLabel}</Label>
            <Input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              autoComplete="one-time-code"
            />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {content.submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
