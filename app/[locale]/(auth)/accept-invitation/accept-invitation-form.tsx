"use client";

import Link from "next/link";
import { useActionState } from "react";

import { acceptInvitationAction, type AcceptInvitationFormState } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AppLocale } from "@/i18n/routing";

const initialState: AcceptInvitationFormState = { status: "idle" };

// AcceptInvitationContent.title/alreadyActiveDescription are functions --
// RSC cannot serialize a plain function across the Server->Client boundary
// (only "use server" actions can cross that way), so this Client Component
// takes only the plain-string fields it actually needs, resolved server-side
// (page.tsx), never the whole content object. Found live during Phase 3 E2E
// validation (real 500: "Functions cannot be passed directly to Client
// Components") -- the same rule now applies to alreadyActiveDescription too.
export function AcceptInvitationForm({
  passwordLabel,
  displayNameLabel,
  submitLabel,
  alreadyActiveTitle,
  alreadyActiveDescription,
  alreadyActiveHint,
  loginCta,
  locale,
  token,
}: {
  passwordLabel: string;
  displayNameLabel: string;
  submitLabel: string;
  alreadyActiveTitle: string;
  alreadyActiveDescription: string;
  alreadyActiveHint: string;
  loginCta: string;
  locale: AppLocale;
  token: string;
}) {
  const [state, formAction, isPending] = useActionState(
    acceptInvitationAction.bind(null, locale),
    initialState,
  );

  // INVITATION-ACCEPT-ACCOUNT-STATE-001 -- LOGIN_REQUIRED. Member access was
  // already granted server-side; this is purely informational, never a form.
  // The password just typed on this screen was NEVER saved for this account
  // (accept()'s own locked contract: an already-ACTIVE User's passwordHash is
  // structurally untouched) -- the copy must never imply otherwise.
  if (state.status === "already_active") {
    return (
      <Card className="mx-auto max-w-md px-6">
        <CardContent className="flex flex-col gap-4 text-center">
          <h2 className="font-heading text-lg font-medium">{alreadyActiveTitle}</h2>
          <p className="text-sm text-muted-foreground">{alreadyActiveDescription}</p>
          <p className="text-sm text-muted-foreground">{alreadyActiveHint}</p>
          <Link
            href={`/${locale}/login?email=${encodeURIComponent(state.email)}`}
            className={buttonVariants({ className: "mt-2" })}
          >
            {loginCta}
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-md px-6">
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <input type="hidden" name="token" value={token} />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="displayName">{displayNameLabel}</Label>
            <Input id="displayName" name="displayName" type="text" required autoComplete="name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">{passwordLabel}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
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
