import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getFeaturesContent } from "@/content/features";
import { FeatureGroups } from "@/features/features-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface FeaturesPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: FeaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getFeaturesContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/features",
  });
}

export default async function FeaturesPage({ params }: FeaturesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getFeaturesContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/features" }]}
      />
      <FeatureGroups />
      <CtaBand
        heading={isFr ? "Voyez-le tourner sur vos stations" : "See it running on your stations"}
        description={
          isFr
            ? "Téléchargez la bêta et testez l'automatisation USSD sur vos propres appareils, ou demandez une démo avec votre équipe."
            : "Download the beta and try USSD automation on your own devices, or request a demo with your team."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: "/download",
          event: "download_apk_features_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "features_cta_request_demo",
        }}
      />
    </>
  );
}
