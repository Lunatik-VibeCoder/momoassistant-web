"use client";

import { useActionState } from "react";
import Link from "next/link";

import { registerAction, type RegisterFormState } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLink } from "@/components/shared/button-link";
import type { RegisterContent } from "@/content/register";

const initialState: RegisterFormState = { status: "idle" };

export function RegisterForm({ content, locale }: { content: RegisterContent; locale: string }) {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  if (state.status === "success") {
    return (
      <Card className="mx-auto max-w-md px-6">
        <CardContent>
          <h2 className="text-lg font-semibold text-foreground">{content.successTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{content.successDescription}</p>
        </CardContent>
        <CardFooter>
          <ButtonLink href={`/${locale}/verify-email?email=${encodeURIComponent(state.email ?? "")}`}>
            {content.continueToVerifyLabel}
          </ButtonLink>
        </CardFooter>
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">{content.emailLabel}</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">{content.passwordLabel}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="displayName">{content.displayNameLabel}</Label>
            <Input id="displayName" name="displayName" type="text" autoComplete="name" />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {content.submitLabel}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        {content.loginPrompt}{" "}
        <Link href={`/${locale}/login`} className="ml-1 text-primary underline-offset-4 hover:underline">
          {content.loginLinkLabel}
        </Link>
      </CardFooter>
    </Card>
  );
}
