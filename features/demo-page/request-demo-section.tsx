import { Users } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getDemoContent } from "@/content/demo";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { staggerContainer } from "@/lib/motion";

export async function RequestDemoSection() {
  const locale = (await getLocale()) as AppLocale;
  const { requestDemoInfo } = getDemoContent(locale);
  const text = getSiteText(locale);

  return (
    <Section aria-labelledby="request-demo-heading" className="bg-muted/40">
      <MotionSection
        variants={staggerContainer}
        className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14"
      >
        <MotionItem>
          <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-soft">
            <Users className="size-7 text-primary" aria-hidden="true" />
          </div>
        </MotionItem>
        <div>
          <MotionItem>
            <h2
              id="request-demo-heading"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {requestDemoInfo.heading}
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {requestDemoInfo.description}
            </p>
          </MotionItem>
          <MotionItem className="mt-6">
            <CTAButton
              size="lg"
              variant="outline"
              href="/contact"
              event="demo_page_request_demo"
            >
              {text.secondaryCtaLabel}
            </CTAButton>
          </MotionItem>
        </div>
      </MotionSection>
    </Section>
  );
}
