import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getLoginContent } from "@/content/login";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { LoginForm } from "./login-form";

interface LoginPageProps {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ email?: string; reset?: string }>;
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getLoginContent(locale);
  return {
    ...createMetadata({ locale, title: hero.title, description: hero.description, path: "/login" }),
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { locale } = await params;
  const { email, reset } = await searchParams;
  setRequestLocale(locale);
  const content = getLoginContent(locale);

  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} />
      {/* PASSWORD-RESET-WEB-2 decision 4 -- server-rendered, never a toast
          (no <Toaster/> exists in the (auth) layout, deliberately kept that
          way). Alert/AlertDescription is the sole success-message display
          mechanism in this layout, same component reused for every error
          state above. */}
      {reset === "success" && (
        <div className="mx-auto mb-4 max-w-md px-6">
          <Alert>
            <AlertDescription>{content.resetSuccessMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <LoginForm content={content} locale={locale} email={email} />
    </>
  );
}
