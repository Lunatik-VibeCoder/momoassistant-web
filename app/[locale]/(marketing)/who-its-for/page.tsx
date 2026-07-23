import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getWhoContent } from "@/content/who";
import { Profiles } from "@/features/who-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText, siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface WhoPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: WhoPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getWhoContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/who-its-for",
  });
}

export default async function WhoPage({ params }: WhoPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getWhoContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/who-its-for" }]}
      />
      <Profiles />
      <CtaBand
        heading={isFr ? "Trouvez votre offre" : "Find your plan"}
        description={
          isFr
            ? "Consultez les tarifs, ou téléchargez la bêta pour commencer gratuitement."
            : "Check pricing, or download the beta to get started for free."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_who_cta",
        }}
        secondaryCta={{
          label: isFr ? "Voir les tarifs" : "View pricing",
          href: "/pricing",
          event: "who_cta_pricing",
        }}
      />
    </>
  );
}
