import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getHowItWorksContent } from "@/content/how-it-works";
import {
  ArchitectureConcepts,
  Lifecycle,
  RuntimeSync,
} from "@/features/how-it-works-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface HowItWorksPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: HowItWorksPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getHowItWorksContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/how-it-works",
  });
}

export default async function HowItWorksPage({
  params,
}: HowItWorksPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getHowItWorksContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/how-it-works" }]}
      />
      <Lifecycle />
      <ArchitectureConcepts />
      <RuntimeSync />
      <CtaBand
        heading={isFr ? "Prêt à voir le moteur d'exécution en action ?" : "Ready to see the runtime in action?"}
        description={
          isFr
            ? "Téléchargez la bêta et exécutez votre première séquence automatisée, ou demandez une démonstration avec votre équipe."
            : "Download the beta and run your first automated sequence, or request a walkthrough with your team."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: "/download",
          event: "download_apk_how_it_works_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "how_it_works_cta_request_demo",
        }}
      />
    </>
  );
}
