import { Building2 } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getPricingContent } from "@/content/pricing";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Enterprise() {
  const locale = (await getLocale()) as AppLocale;
  const { enterprise } = getPricingContent(locale);

  return (
    <Section aria-labelledby="enterprise-heading">
      <MotionSection variants={staggerContainer}>
        <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <MotionItem>
            <Building2
              className="size-10 text-primary"
              aria-hidden="true"
            />
          </MotionItem>
          <MotionItem>
            <h2
              id="enterprise-heading"
              className="text-xl font-semibold text-foreground sm:text-2xl"
            >
              {enterprise.heading}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {enterprise.description}
            </p>
          </MotionItem>
          <MotionItem>
            <CTAButton href="/contact" event="pricing_enterprise_contact">
              {enterprise.ctaLabel}
            </CTAButton>
          </MotionItem>
        </div>
      </MotionSection>
    </Section>
  );
}
