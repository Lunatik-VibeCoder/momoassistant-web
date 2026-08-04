import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getOnboardingContent } from "@/content/onboarding";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { OnboardingForm } from "./onboarding-form";

interface OnboardingPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: OnboardingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getOnboardingContent(locale);
  return {
    ...createMetadata({ locale, title: hero.title, description: hero.description, path: "/onboarding" }),
    robots: { index: false, follow: false },
  };
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getOnboardingContent(locale);

  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} />
      <OnboardingForm content={content} locale={locale} />
    </>
  );
}
