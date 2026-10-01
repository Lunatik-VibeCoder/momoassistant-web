"use client";

import { useActionState, useState, type FormEvent } from "react";

import { resetPasswordAction, type ResetPasswordFormState } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AppLocale } from "@/i18n/routing";

const initialState: ResetPasswordFormState = { status: "idle" };

// PASSWORD-RESET-WEB-2 -- plain-string props only, never the whole
// ResetPasswordContent object (it carries a function field, codeSentTo,
// which cannot cross the Server -> Client boundary -- same RSC
// serialization constraint already documented on
// content/accept-invitation.ts/AcceptInvitationForm).
export function ResetPasswordForm({
  email,
  codeLabel,
  newPasswordLabel,
  confirmPasswordLabel,
  submitLabel,
  mismatchError,
  locale,
}: {
  email: string;
  codeLabel: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  submitLabel: string;
  mismatchError: string;
  locale: AppLocale;
}) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction.bind(null, locale),
    initialState,
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mismatch, setMismatch] = useState(false);

  // This form is wired to a Server Action through `action` (useActionState),
  // not a plain onSubmit -- there is no existing password-confirmation
  // precedent in this repo to extend (settings/change-password-form.tsx has
  // no confirm field at all), so this check is new and kept local to this
  // one form, deliberately not a generic reusable abstraction. onSubmit
  // only ever intervenes to BLOCK a mismatched submission before it
  // reaches the network: event.preventDefault() stops the native submit
  // entirely, which also stops React from invoking the bound Server Action
  // at all -- no fetch, no McpError roundtrip, for a check that's purely
  // local to this browser tab. When the passwords match, onSubmit does NOT
  // call preventDefault(), so the action fires normally.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (newPassword !== confirmPassword) {
      event.preventDefault();
      setMismatch(true);
      return;
    }
    setMismatch(false);
  }

  return (
    <Card className="mx-auto max-w-md px-6">
      <CardContent>
        <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mismatch ? (
            <Alert variant="destructive">
              <AlertDescription>{mismatchError}</AlertDescription>
            </Alert>
          ) : (
            state.status === "error" &&
            state.message && (
              <Alert variant="destructive">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )
          )}
          <input type="hidden" name="email" value={email} />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="code">{codeLabel}</Label>
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">{newPasswordLabel}</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">{confirmPasswordLabel}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
