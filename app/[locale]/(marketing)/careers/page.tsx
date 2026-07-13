import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getCareersContent } from "@/content/careers";
import { Benefits, Culture, OpenPositions } from "@/features/careers-page";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface CareersPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: CareersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getCareersContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/careers",
  });
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getCareersContent(locale);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/careers" }]}
      />
      <Culture />
      <Benefits />
      <OpenPositions />
    </>
  );
}
