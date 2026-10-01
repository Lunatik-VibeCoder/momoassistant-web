import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getForgotPasswordContent } from "@/content/forgot-password";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { ForgotPasswordForm } from "./forgot-password-form";

interface ForgotPasswordPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: ForgotPasswordPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getForgotPasswordContent(locale);
  return {
    ...createMetadata({ locale, title: hero.title, description: hero.description, path: "/forgot-password" }),
    robots: { index: false, follow: false },
  };
}

export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getForgotPasswordContent(locale);

  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} />
      <ForgotPasswordForm content={content} locale={locale} />
    </>
  );
}
