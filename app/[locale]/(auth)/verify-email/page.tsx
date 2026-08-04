import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getVerifyEmailContent } from "@/content/verify-email";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { VerifyEmailForm } from "./verify-email-form";

interface VerifyEmailPageProps {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ email?: string }>;
}

export async function generateMetadata({ params }: VerifyEmailPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getVerifyEmailContent(locale);
  return {
    ...createMetadata({ locale, title: hero.title, description: hero.description, path: "/verify-email" }),
    robots: { index: false, follow: false },
  };
}

export default async function VerifyEmailPage({ params, searchParams }: VerifyEmailPageProps) {
  const { locale } = await params;
  const { email } = await searchParams;
  setRequestLocale(locale);
  const content = getVerifyEmailContent(locale);

  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} />
      <VerifyEmailForm content={content} locale={locale} email={email ?? ""} />
    </>
  );
}
