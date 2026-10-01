import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getResetPasswordContent } from "@/content/reset-password";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { ResetPasswordForm } from "./reset-password-form";

interface ResetPasswordPageProps {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ email?: string }>;
}

// A conservative, deliberately permissive "is this even email-shaped"
// check -- never the source of truth for a real email (the backend's own
// /auth/forgot-password + /auth/reset-password validation is). Only guards
// against rendering a reset form with no address to show/submit at all
// (e.g. someone opening /reset-password directly with no query param).
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function generateMetadata({ params }: ResetPasswordPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getResetPasswordContent(locale);
  return {
    ...createMetadata({ locale, title: hero.title, description: hero.description, path: "/reset-password" }),
    robots: { index: false, follow: false },
  };
}

export default async function ResetPasswordPage({ params, searchParams }: ResetPasswordPageProps) {
  const { locale } = await params;
  const { email } = await searchParams;
  setRequestLocale(locale);
  const content = getResetPasswordContent(locale);

  const validEmail = email && looksLikeEmail(email) ? email : null;

  // PASSWORD-RESET-WEB-2 -- no email in the query string (or it's clearly
  // not email-shaped): don't render the form at all (there's nothing valid
  // to submit/display), and don't crash -- give a clear path back to
  // /forgot-password instead.
  if (!validEmail) {
    return (
      <>
        <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} />
        <Card className="mx-auto max-w-md px-6">
          <CardContent className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">{content.missingEmail.description}</p>
            <Link href={`/${locale}/forgot-password`} className={buttonVariants({ className: "mt-2" })}>
              {content.missingEmail.backLabel}
            </Link>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.codeSentTo(validEmail)}
      />
      <ResetPasswordForm
        email={validEmail}
        codeLabel={content.codeLabel}
        newPasswordLabel={content.newPasswordLabel}
        confirmPasswordLabel={content.confirmPasswordLabel}
        submitLabel={content.submitLabel}
        mismatchError={content.mismatchError}
        locale={locale}
      />
    </>
  );
}
