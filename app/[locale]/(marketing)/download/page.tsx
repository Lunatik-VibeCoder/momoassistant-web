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
import { getPublicLatestBetaRelease, type PublicBetaRelease } from "@/lib/mcp-client";
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
  // WS-006N (follow-up) -- fetched once here and passed down, rather than
  // each section independently calling this itself, so the page makes
  // exactly one live call to the backend per render/revalidation.
  const release: PublicBetaRelease | null = await getPublicLatestBetaRelease().catch(() => null);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/download" }]}
      />
      <DownloadCta />
      <BetaInfo release={release} />
      <ReleaseNotes />
      <BeforeYouInstall />
      <Integrity />
      <Feedback />
    </>
  );
}
