import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getWhyContent } from "@/content/why";
import { Comparisons } from "@/features/why-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText, siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface WhyPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: WhyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getWhyContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/why",
  });
}

export default async function WhyPage({ params }: WhyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getWhyContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/why" }]}
      />
      <Comparisons />
      <CtaBand
        heading={isFr ? "Voyez la différence par vous-même" : "See the difference for yourself"}
        description={
          isFr
            ? "Téléchargez la bêta et testez l'automatisation sur vos propres appareils."
            : "Download the beta and try the automation on your own devices."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_why_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "why_cta_request_demo",
        }}
      />
    </>
  );
}
