import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getDownloadContent } from "@/content/download";
import type { AppLocale } from "@/i18n/routing";
import type { PublicAppRelease } from "@/lib/mcp-client";
import { staggerContainer } from "@/lib/motion";

interface BetaInfoProps {
  release: PublicAppRelease | null;
  // AND-PR-001 follow-up (2026-08-26) -- separate from `release` on purpose:
  // versionCode is deliberately not part of PublicAppRelease (see
  // lib/mcp-client.ts's getPublicLatestVersionCode for why), so it's fetched
  // and passed down independently rather than bolted onto that type.
  latestVersionCode: number | null;
}

// AND-PR-001 (was WS-006N) -- version/channel/last-updated/version-code
// used to be static content (version-code was still hardcoded "10001" long
// after Beta 2 shipped -- the exact staleness this follow-up fixes); now all
// four are prepended live, falling back to unavailableLabel ("—") rather
// than a stale hardcoded value if the fetch failed. Android-minimum/
// architecture stay static (AppRelease has no column for either -- would
// need a schema migration to make those live too).
export async function BetaInfo({ release, latestVersionCode }: BetaInfoProps) {
  const locale = (await getLocale()) as AppLocale;
  const {
    betaInfo,
    betaInfoHeading,
    fileSize,
    fileSizeLabel,
    currentVersionLabel,
    releaseChannelLabel,
    lastUpdatedLabel,
    versionCodeLabel,
    unavailableLabel,
    channelNames,
  } = getDownloadContent(locale);

  const liveItems = [
    { label: currentVersionLabel, value: release?.version ?? unavailableLabel },
    {
      label: releaseChannelLabel,
      value: release ? channelNames[release.channel] : unavailableLabel,
    },
    {
      label: lastUpdatedLabel,
      value: release?.publishedAt
        ? new Date(release.publishedAt).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : unavailableLabel,
    },
    {
      label: versionCodeLabel,
      value: latestVersionCode != null ? String(latestVersionCode) : unavailableLabel,
    },
  ];

  const items = fileSize
    ? [...liveItems, ...betaInfo, { label: fileSizeLabel, value: fileSize }]
    : [...liveItems, ...betaInfo];

  return (
    <Section className="pt-0" aria-labelledby="beta-info-heading">
      <h2
        id="beta-info-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {betaInfoHeading}
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <MotionItem key={item.label}>
            <div className="flex h-full flex-col gap-1 bg-card p-5">
              <dt className="text-xs font-medium text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {item.value}
              </dd>
            </div>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
