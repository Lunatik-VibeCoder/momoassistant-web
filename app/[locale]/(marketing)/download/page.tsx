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
import {
  getPublicLatestAppRelease,
  getPublicLatestVersionCode,
  type PublicAppRelease,
} from "@/lib/mcp-client";
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
  // AND-PR-001 (was WS-006N) -- fetched once here and passed down, rather
  // than each section independently calling this itself. Two separate live
  // calls now (both public-latest and version-policy), run in parallel --
  // versionCode is deliberately not part of public-latest's response (see
  // getPublicLatestVersionCode's own comment), so it can't be folded into
  // the single release object above.
  const [release, latestVersionCode]: [PublicAppRelease | null, number | null] =
    await Promise.all([
      getPublicLatestAppRelease().catch(() => null),
      getPublicLatestVersionCode().catch(() => null),
    ]);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/download" }]}
      />
      <DownloadCta />
      <BetaInfo release={release} latestVersionCode={latestVersionCode} />
      <ReleaseNotes />
      <BeforeYouInstall />
      <Integrity release={release} />
      <Feedback />
    </>
  );
}
