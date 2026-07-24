import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getDownloadContent } from "@/content/download";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function BetaInfo() {
  const locale = (await getLocale()) as AppLocale;
  const { betaInfo, betaInfoHeading, fileSize, fileSizeLabel } = getDownloadContent(locale);
  const items = fileSize
    ? [...betaInfo, { label: fileSizeLabel, value: fileSize }]
    : betaInfo;

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
