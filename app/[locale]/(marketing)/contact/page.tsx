import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getContactContent } from "@/content/contact";
import { Channels } from "@/features/contact-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface ContactPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getContactContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getContactContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/contact" }]}
      />
      <Channels />
      <CtaBand
        heading={isFr ? "Pas encore prêt à discuter ?" : "Not ready to talk yet?"}
        description={
          isFr
            ? "Téléchargez la bêta et testez-la d'abord sur vos propres stations."
            : "Download the beta and try it on your own stations first."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: "/download",
          event: "download_apk_contact_cta",
        }}
        secondaryCta={{
          label: isFr ? "Voir les tarifs" : "View Pricing",
          href: "/pricing",
          event: "contact_cta_view_pricing",
        }}
      />
    </>
  );
}
