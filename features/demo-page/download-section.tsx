import { CheckCircle2, Download } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getDemoContent } from "@/content/demo";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { staggerContainer } from "@/lib/motion";

export async function DownloadSection() {
  const locale = (await getLocale()) as AppLocale;
  const { downloadInfo } = getDemoContent(locale);
  const text = getSiteText(locale);

  return (
    <Section aria-labelledby="download-heading">
      <MotionSection
        variants={staggerContainer}
        className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14"
      >
        <MotionItem>
          <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-soft">
            <Download className="size-7 text-primary" aria-hidden="true" />
          </div>
        </MotionItem>
        <div>
          <MotionItem>
            <h2
              id="download-heading"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {downloadInfo.heading}
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {downloadInfo.description}
            </p>
          </MotionItem>
          <MotionItem className="mt-6">
            <ul className="flex flex-col gap-2">
              {downloadInfo.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </MotionItem>
          <MotionItem className="mt-6">
            <CTAButton
              size="lg"
              href="/download"
              event="download_apk_demo_page"
            >
              {text.primaryCtaLabel}
            </CTAButton>
          </MotionItem>
        </div>
      </MotionSection>
    </Section>
  );
}
