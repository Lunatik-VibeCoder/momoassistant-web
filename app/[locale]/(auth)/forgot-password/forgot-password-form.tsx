"use client";

import Link from "next/link";
import { useActionState } from "react";

import { forgotPasswordAction, type ForgotPasswordFormState } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ForgotPasswordContent } from "@/content/forgot-password";
import type { AppLocale } from "@/i18n/routing";

const initialState: ForgotPasswordFormState = { status: "idle" };

export function ForgotPasswordForm({
  content,
  locale,
}: {
  content: ForgotPasswordContent;
  locale: AppLocale;
}) {
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction.bind(null, locale),
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">{content.emailLabel}</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {content.submitLabel}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        <Link href={`/${locale}/login`} className="text-primary underline-offset-4 hover:underline">
          {content.backToLoginLabel}
        </Link>
      </CardFooter>
    </Card>
  );
}
