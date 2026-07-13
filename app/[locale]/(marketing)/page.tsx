import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  Architecture,
  Cta,
  FaqPreview,
  Features,
  Hero,
  HowItWorks,
  PricingPreview,
  Security,
  SocialProof,
  Testimonials,
  WhyMomoAssistant,
} from "@/features/homepage";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface HomePageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata({ locale, path: "/" });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <Architecture />
      <Security />
      <HowItWorks />
      <WhyMomoAssistant />
      <Testimonials />
      <PricingPreview />
      <FaqPreview />
      <Cta />
    </>
  );
}
