import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { staggerContainer } from "@/lib/motion";

interface CtaBandAction {
  label: string;
  href: string;
  external?: boolean;
  event: string;
}

interface CtaBandProps {
  heading: string;
  description: string;
  primaryCta: CtaBandAction;
  secondaryCta: CtaBandAction;
}

/**
 * The closing conversion band every marketing page ends on. Takes its copy
 * as props rather than reading `content/homepage.ts` directly, so every
 * page (not just the homepage) renders the identical band instead of
 * hand-rolling its own closing section.
 */
export function CtaBand({ heading, description, primaryCta, secondaryCta }: CtaBandProps) {
  return (
    <Section aria-labelledby="cta-heading">
      <MotionSection variants={staggerContainer}>
        <div
          className="relative isolate overflow-hidden rounded-3xl border border-border px-6 py-16 text-center shadow-lifted sm:px-12 sm:py-20"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, color-mix(in oklch, var(--primary), transparent 88%), var(--card) 60%)",
          }}
        >
          <MotionItem>
            <h2
              id="cta-heading"
              className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
            >
              {heading}
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {description}
            </p>
          </MotionItem>
          <MotionItem className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton
              size="lg"
              href={primaryCta.href}
              external={primaryCta.external}
              event={primaryCta.event}
            >
              {primaryCta.label}
            </CTAButton>
            <CTAButton
              size="lg"
              variant="outline"
              href={secondaryCta.href}
              event={secondaryCta.event}
            >
              {secondaryCta.label}
            </CTAButton>
          </MotionItem>
        </div>
      </MotionSection>
    </Section>
  );
}
