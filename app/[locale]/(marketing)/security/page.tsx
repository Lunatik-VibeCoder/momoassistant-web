import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getSecurityContent } from "@/content/security";
import { SecurityDomains } from "@/features/security-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface SecurityPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: SecurityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getSecurityContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/security",
  });
}

export default async function SecurityPage({ params }: SecurityPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getSecurityContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/security" }]}
      />
      <SecurityDomains />
      <CtaBand
        heading={isFr ? "Des questions sur notre gestion de la sécurité ?" : "Questions about how we handle security?"}
        description={
          isFr
            ? "Parlez-nous directement, ou téléchargez la bêta et voyez le modèle de confiance en action."
            : "Talk to us directly, or download the beta and see the trust model in action."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: "/download",
          event: "download_apk_security_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "security_cta_request_demo",
        }}
      />
    </>
  );
}
