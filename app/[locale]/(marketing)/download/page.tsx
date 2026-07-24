import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getDownloadContent } from "@/content/download";
import {
  BeforeYouInstall,
  BetaInfo,
  DownloadCta,
  Feedback,
  Integrity,
  ReleaseNotes,
} from "@/features/download-page";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface DownloadPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: DownloadPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getDownloadContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/download",
  });
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getDownloadContent(locale);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/download" }]}
      />
      <DownloadCta />
      <BetaInfo />
      <ReleaseNotes />
      <BeforeYouInstall />
      <Integrity />
      <Feedback />
    </>
  );
}
