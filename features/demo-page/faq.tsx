import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { MotionSection } from "@/components/shared/motion-section";
import { getDemoContent } from "@/content/demo";
import type { AppLocale } from "@/i18n/routing";

export async function Faq() {
  const locale = (await getLocale()) as AppLocale;
  const { faq } = getDemoContent(locale);

  return (
    <Section id="faq" aria-labelledby="demo-faq-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="demo-faq-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {faq.heading}
        </h2>
      </div>

      <MotionSection className="mx-auto mt-10 max-w-2xl">
        <FaqAccordion items={faq.items} />
      </MotionSection>
    </Section>
  );
}
