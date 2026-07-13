import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { MotionSection } from "@/components/shared/motion-section";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";

export async function FaqPreview() {
  const locale = (await getLocale()) as AppLocale;
  const { faqPreview } = getHomepageContent(locale);

  return (
    <Section aria-labelledby="faq-heading" className="bg-muted/40">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="faq-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {faqPreview.heading}
        </h2>
      </div>

      <MotionSection className="mx-auto mt-12 max-w-2xl">
        <FaqAccordion items={faqPreview.items} />

        <div className="mt-8 text-center">
          <CTAButton variant="outline" href="/demo#faq" event="faq_view_all">
            {locale === "fr" ? "Voir toutes les FAQ" : "View all FAQs"}
          </CTAButton>
        </div>
      </MotionSection>
    </Section>
  );
}
