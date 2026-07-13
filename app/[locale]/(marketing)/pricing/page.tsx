import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getPricingContent } from "@/content/pricing";
import { ComparisonTable, Enterprise, Faq, Plans } from "@/features/pricing-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText, siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface PricingPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getPricingContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/pricing",
  });
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getPricingContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/pricing" }]}
      />
      <Plans />
      <ComparisonTable />
      <Enterprise />
      <Faq />
      <CtaBand
        heading={isFr ? "Prêt à commencer ?" : "Ready to get started?"}
        description={
          isFr
            ? "Téléchargez l'offre Débutant gratuite dès aujourd'hui, ou parlez aux ventes de Business et Enterprise."
            : "Download the free Starter plan today, or talk to sales about Business and Enterprise."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_pricing_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "pricing_cta_request_demo",
        }}
      />
    </>
  );
}
