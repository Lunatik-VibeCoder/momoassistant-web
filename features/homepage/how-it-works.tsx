import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function HowItWorks() {
  const locale = (await getLocale()) as AppLocale;
  const { howItWorks } = getHomepageContent(locale);

  return (
    <Section aria-labelledby="how-it-works-heading" className="bg-muted/40">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="how-it-works-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {howItWorks.heading}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {howItWorks.description}
        </p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {howItWorks.items.map((item) => (
          <MotionItem key={item.step}>
            <div className="flex size-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
              {item.step}
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {item.description}
            </p>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
