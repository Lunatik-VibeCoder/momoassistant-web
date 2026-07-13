import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getAboutContent } from "@/content/about";
import { MissionVision, Story, Values } from "@/features/about-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText, siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface AboutPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getAboutContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/about",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getAboutContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/about" }]}
      />
      <Story />
      <MissionVision />
      <Values />
      <CtaBand
        heading={isFr ? "Voyez par vous-même" : "See it for yourself"}
        description={
          isFr
            ? "Téléchargez la bêta, ou contactez-nous pour discuter de la façon dont MoMo Assistant s'adapte à votre activité."
            : "Download the beta, or get in touch if you'd like to talk through how MoMo Assistant fits your operation."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_about_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "about_cta_request_demo",
        }}
      />
    </>
  );
}
