import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getRegisterContent } from "@/content/register";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { RegisterForm } from "./register-form";

interface RegisterPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: RegisterPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getRegisterContent(locale);
  return {
    ...createMetadata({ locale, title: hero.title, description: hero.description, path: "/register" }),
    robots: { index: false, follow: false },
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getRegisterContent(locale);

  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} />
      <RegisterForm content={content} locale={locale} />
    </>
  );
}
