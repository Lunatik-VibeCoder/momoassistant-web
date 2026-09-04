"use client";

import { useActionState } from "react";
import Link from "next/link";

import { loginAction, type LoginFormState } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginContent } from "@/content/login";
import type { AppLocale } from "@/i18n/routing";

const initialState: LoginFormState = { status: "idle" };

export function LoginForm({
  content,
  locale,
  email,
}: {
  content: LoginContent;
  locale: AppLocale;
  email?: string;
}) {
  const [state, formAction, isPending] = useActionState(loginAction.bind(null, locale), initialState);

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
            <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={email} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">{content.passwordLabel}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {content.submitLabel}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        {content.registerPrompt}{" "}
        <Link href={`/${locale}/register`} className="ml-1 text-primary underline-offset-4 hover:underline">
          {content.registerLinkLabel}
        </Link>
      </CardFooter>
    </Card>
  );
}
