import { Inbox } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { getCareersContent } from "@/content/careers";
import type { AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants";

export async function OpenPositions() {
  const locale = (await getLocale()) as AppLocale;
  const { openPositions } = getCareersContent(locale);

  return (
    <Section aria-labelledby="open-positions-heading">
      <h2
        id="open-positions-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {openPositions.heading}
      </h2>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center">
        <Inbox className="size-8 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="font-medium text-foreground">
            {openPositions.emptyTitle}
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {openPositions.emptyDescription}
          </p>
        </div>
        <CTAButton
          variant="outline"
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(openPositions.mailSubject)}`}
          external
          event="careers_reach_out"
        >
          {openPositions.ctaLabel}
        </CTAButton>
      </div>
    </Section>
  );
}
