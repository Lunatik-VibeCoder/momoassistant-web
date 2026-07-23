import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getEnterpriseContent } from "@/content/enterprise";
import { Concepts } from "@/features/enterprise-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface EnterprisePageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: EnterprisePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getEnterpriseContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/enterprise",
  });
}

export default async function EnterprisePage({ params }: EnterprisePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getEnterpriseContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/enterprise" }]}
      />
      <Concepts />
      <CtaBand
        heading={isFr ? "Parlons de votre organisation" : "Let's talk about your organization"}
        description={
          isFr
            ? "Politiques personnalisées, intégration dédiée et support prioritaire, adaptés à la façon dont vous opérez réellement."
            : "Custom policies, dedicated onboarding, and priority support, scoped to how you actually operate."
        }
        primaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "enterprise_cta_contact",
        }}
        secondaryCta={{
          label: isFr ? "Voir les tarifs" : "View pricing",
          href: "/pricing",
          event: "enterprise_cta_pricing",
        }}
      />
    </>
  );
}
