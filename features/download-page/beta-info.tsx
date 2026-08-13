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
}

// AND-PR-001 (was WS-006N) -- version/channel/last-updated used to be
// static content; now prepended live from the backend's public-latest
// release, falling back to unavailableLabel ("—") rather than a stale
// hardcoded value if the fetch failed. Every other entry in betaInfo stays
// static (AppRelease has no column for Android-minimum/version-code/
// architecture today -- would need a schema migration to make those live too).
export async function BetaInfo({ release }: BetaInfoProps) {
  const locale = (await getLocale()) as AppLocale;
  const {
    betaInfo,
    betaInfoHeading,
    fileSize,
    fileSizeLabel,
    currentVersionLabel,
    releaseChannelLabel,
    lastUpdatedLabel,
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
