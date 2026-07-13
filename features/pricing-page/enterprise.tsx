import { Building2 } from "lucide-react";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { staggerContainer } from "@/lib/motion";

export function Enterprise() {
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
              Running more than a handful of stations?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Enterprise adds custom runtime policies, dedicated onboarding,
              and priority support on top of everything in Business —
              scoped to how your organization actually operates.
            </p>
          </MotionItem>
          <MotionItem>
            <CTAButton href="/contact" event="pricing_enterprise_contact">
              Talk to Sales
            </CTAButton>
          </MotionItem>
        </div>
      </MotionSection>
    </Section>
  );
}
