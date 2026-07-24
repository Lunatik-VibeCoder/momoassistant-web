import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getDocsContent } from "@/content/docs";
import { Categories } from "@/features/docs-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface DocsPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getDocsContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/docs",
  });
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getDocsContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/docs" }]}
      />
      <Categories />
      <CtaBand
        heading={isFr ? "Vous ne trouvez pas ce qu'il vous faut ?" : "Can't find what you need?"}
        description={
          isFr
            ? "Le centre de documentation complet est encore en construction. Contactez-nous et nous vous orienterons."
            : "The full documentation center is still being built. Reach out and we'll point you in the right direction."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: "/download",
          event: "download_apk_docs_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "docs_cta_request_demo",
        }}
      />
    </>
  );
}
