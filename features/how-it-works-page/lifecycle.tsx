import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getHowItWorksContent } from "@/content/how-it-works";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Lifecycle() {
  const locale = (await getLocale()) as AppLocale;
  const { lifecycle } = getHowItWorksContent(locale);

  return (
    <Section aria-labelledby="lifecycle-heading">
      <div className="max-w-2xl">
        <h2
          id="lifecycle-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {lifecycle.heading}
        </h2>
        <p className="mt-3 text-muted-foreground">{lifecycle.description}</p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5"
      >
        {lifecycle.steps.map((item) => (
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
