"use client";

import { useActionState } from "react";

import { completeOnboardingAction, type OnboardingFormState } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OnboardingContent } from "@/content/onboarding";
import type { AppLocale } from "@/i18n/routing";

const initialState: OnboardingFormState = { status: "idle" };

export function OnboardingForm({ content, locale }: { content: OnboardingContent; locale: AppLocale }) {
  const [state, formAction, isPending] = useActionState(
    completeOnboardingAction.bind(null, locale),
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
            <Label htmlFor="tenantName">{content.tenantNameLabel}</Label>
            <Input id="tenantName" name="tenantName" type="text" required autoComplete="organization" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="organizationName">{content.organizationNameLabel}</Label>
            <Input id="organizationName" name="organizationName" type="text" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="agentName">{content.agentNameLabel}</Label>
            <Input id="agentName" name="agentName" type="text" autoComplete="name" />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {content.submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
