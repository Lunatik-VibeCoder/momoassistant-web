import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getStatusContent } from "@/content/status";
import { ServiceList } from "@/features/status-page";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface StatusPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: StatusPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getStatusContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/status",
  });
}

export default async function StatusPage({ params }: StatusPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getStatusContent(locale);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/status" }]}
      />
      <ServiceList />
    </>
  );
}
