import { ArrowRight } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/shared/button-link";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function WhyMomoAssistant() {
  const locale = (await getLocale()) as AppLocale;
  const { whyMomoAssistant } = getHomepageContent(locale);

  return (
    <Section aria-labelledby="why-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="why-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {whyMomoAssistant.heading}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {whyMomoAssistant.description}
        </p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2"
      >
        {whyMomoAssistant.items.map((point) => (
          <MotionItem key={point.title} className="flex gap-4">
            <point.icon
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {point.description}
              </p>
            </div>
          </MotionItem>
        ))}
      </MotionSection>

      <div className="mt-10 text-center">
        <ButtonLink href={whyMomoAssistant.ctaHref} variant="link">
          {whyMomoAssistant.ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </Section>
  );
}
