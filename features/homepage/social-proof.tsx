import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function SocialProof() {
  const locale = (await getLocale()) as AppLocale;
  const { socialProof } = getHomepageContent(locale);

  return (
    <Section aria-labelledby="social-proof-heading" className="py-10 sm:py-12">
      <h2
        id="social-proof-heading"
        className="text-center text-sm font-medium text-muted-foreground"
      >
        {socialProof.heading}
      </h2>
      {/* Illustrative placeholders — swap for real customer names once available. */}
      <MotionSection
        variants={staggerContainer}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
      >
        {socialProof.logos.map((logo) => (
          <MotionItem key={logo.name}>
            <span className="text-sm font-medium tracking-tight text-muted-foreground/80">
              {logo.name}
            </span>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
