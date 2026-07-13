import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { Badge } from "@/components/ui/badge";
import { hero } from "@/content/homepage";
import { siteConfig } from "@/lib/constants";

// No entrance animation here: this content is visible immediately on load
// (never "scrolled into view"), so gating it behind Framer Motion's
// whileInView would delay hydration-dependent paint of the LCP element
// (the subheadline) instead of letting the browser render it right away.
export function Hero() {
  return (
    <Section
      aria-labelledby="hero-heading"
      className="pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge variant="outline" className="mb-5">
            {hero.eyebrow}
          </Badge>
          <h1
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton
              size="lg"
              href={siteConfig.downloadApkUrl}
              external
              event="download_apk_hero"
            >
              {hero.primaryCtaLabel}
            </CTAButton>
            <CTAButton
              size="lg"
              variant="outline"
              href={hero.secondaryCta.href}
              event="hero_learn_more"
            >
              {hero.secondaryCta.label}
            </CTAButton>
          </div>
        </div>

        <HeroVisual />
      </div>
    </Section>
  );
}

function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative isolate mx-auto flex aspect-4/3 w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border border-border bg-card shadow-lifted"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 75% 15%, color-mix(in oklch, var(--primary), transparent 78%), transparent 60%)",
        }}
      />
      <div className="grid w-4/5 grid-cols-3 gap-3">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="aspect-square rounded-xl border border-border bg-background/70 shadow-soft"
            style={{ opacity: 0.35 + (index % 3) * 0.22 }}
          />
        ))}
      </div>
    </div>
  );
}
