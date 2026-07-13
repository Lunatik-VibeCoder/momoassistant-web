import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { finalCta } from "@/content/homepage";
import { siteConfig } from "@/lib/constants";
import { staggerContainer } from "@/lib/motion";

export function Cta() {
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
              {finalCta.heading}
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {finalCta.description}
            </p>
          </MotionItem>
          <MotionItem className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton
              size="lg"
              href={siteConfig.downloadApkUrl}
              external
              event="download_apk_final_cta"
            >
              {finalCta.primaryCtaLabel}
            </CTAButton>
            <CTAButton
              size="lg"
              variant="outline"
              href={finalCta.secondaryCta.href}
              event="final_cta_talk_to_us"
            >
              {finalCta.secondaryCta.label}
            </CTAButton>
          </MotionItem>
        </div>
      </MotionSection>
    </Section>
  );
}
