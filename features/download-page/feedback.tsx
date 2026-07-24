import { Bug } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { getDownloadContent } from "@/content/download";
import type { AppLocale } from "@/i18n/routing";

export async function Feedback() {
  const locale = (await getLocale()) as AppLocale;
  const { feedback } = getDownloadContent(locale);

  return (
    <Section className="pt-0" aria-labelledby="feedback-heading">
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-muted/40 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <Bug className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 id="feedback-heading" className="text-lg font-semibold text-foreground">
              {feedback.heading}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
              {feedback.description}
            </p>
          </div>
        </div>
        <CTAButton
          variant="outline"
          href={feedback.ctaHref}
          event="download_page_report_bug"
          className="shrink-0"
        >
          {feedback.ctaLabel}
        </CTAButton>
      </div>
    </Section>
  );
}
