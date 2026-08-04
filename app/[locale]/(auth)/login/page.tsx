import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getLoginContent } from "@/content/login";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { LoginForm } from "./login-form";

interface LoginPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getLoginContent(locale);
  return {
    ...createMetadata({ locale, title: hero.title, description: hero.description, path: "/login" }),
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getLoginContent(locale);

  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} title={content.hero.title} description={content.hero.description} />
      <LoginForm content={content} locale={locale} />
    </>
  );
}
