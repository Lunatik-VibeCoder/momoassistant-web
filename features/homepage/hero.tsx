import { CheckCircle2, ShieldCheck } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { Badge } from "@/components/ui/badge";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";

// No entrance animation here: this content is visible immediately on load
// (never "scrolled into view"), so gating it behind Framer Motion's
// whileInView would delay hydration-dependent paint of the LCP element
// (the subheadline) instead of letting the browser render it right away.
// The mockup's ambient motion (below) is plain CSS, not Framer Motion, so
// it doesn't have that problem — it can start animating on first paint.
export async function Hero() {
  const locale = (await getLocale()) as AppLocale;
  const { hero } = getHomepageContent(locale);

  return (
    <Section
      aria-labelledby="hero-heading"
      className="overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32"
    >
      <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="min-w-0">
          {/* h-auto/whitespace-normal override Badge's single-line-pill
              defaults — this eyebrow is long in both locales (and even
              longer in French) and needs to wrap on narrow viewports
              instead of forcing the whole page wider. */}
          <Badge
            variant="outline"
            className="mb-5 h-auto max-w-full py-1 text-balance whitespace-normal"
          >
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
            <CTAButton size="lg" href="/download" event="download_apk_hero">
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
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {hero.trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <badge.icon
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </Section>
  );
}

const CHART_BARS = [40, 60, 48, 72, 58, 84, 100];

function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="hero-mockup relative isolate mx-auto w-full min-w-0 max-w-md lg:max-w-none"
      style={{ perspective: "1600px" }}
    >
      {/* soft ambient glow, no flashy gradient */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 75% 15%, color-mix(in oklch, var(--primary), transparent 78%), transparent 60%)",
        }}
      />

      {/* faint station network — Accra as the hub, radiating to the field */}
      <svg
        className="absolute -inset-6 -z-10 opacity-55 animate-hero-drift"
        viewBox="0 0 500 460"
        fill="none"
      >
        <path
          d="M70 90 Q 180 50 260 130"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <path
          d="M260 130 Q 340 80 430 70"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <path
          d="M260 130 Q 260 220 210 300"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <path
          d="M210 300 Q 260 350 340 370"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <path
          d="M210 300 Q 140 340 60 380"
          stroke="var(--border)"
          strokeWidth="1"
        />

        <circle cx="260" cy="130" r="3" fill="var(--primary)" />
        <text x="270" y="126" className="fill-muted-foreground text-[0.625rem]">
          Accra
        </text>

        <circle
          cx="430"
          cy="70"
          r="2.5"
          fill="var(--muted-foreground)"
          className="animate-hero-node-pulse"
          style={{ animationDelay: "0.4s" }}
        />
        <text x="410" y="58" className="fill-muted-foreground text-[0.625rem]">
          Kumasi
        </text>

        <circle
          cx="210"
          cy="300"
          r="2.5"
          fill="var(--muted-foreground)"
          className="animate-hero-node-pulse"
          style={{ animationDelay: "1.1s" }}
        />
        <text x="150" y="296" className="fill-muted-foreground text-[0.625rem]">
          Takoradi
        </text>

        <circle
          cx="340"
          cy="370"
          r="2.5"
          fill="var(--muted-foreground)"
          className="animate-hero-node-pulse"
          style={{ animationDelay: "1.8s" }}
        />
        <text x="350" y="390" className="fill-muted-foreground text-[0.625rem]">
          Tema
        </text>

        <circle
          cx="60"
          cy="380"
          r="2.5"
          fill="var(--muted-foreground)"
          className="animate-hero-node-pulse"
          style={{ animationDelay: "2.4s" }}
        />
        <text x="20" y="400" className="fill-muted-foreground text-[0.625rem]">
          Tamale
        </text>
      </svg>

      {/*
        Phone/chip offsets below are percentages of *this* box, not the
        (much wider, on desktop) grid column — so it's capped at max-w-lg
        to match the dashboard card itself. Sizing them against the wider
        outer column instead of the card would put them adrift from its
        corner on wide viewports (only looked right at one narrow width).
      */}
      <div className="relative mx-auto max-w-lg">
        {/* dashboard */}
        <div
          className="rounded-3xl border border-border bg-card p-4 shadow-lifted animate-hero-breathe"
          style={{ transform: "rotateY(-8deg) rotateX(3deg)", transformStyle: "preserve-3d" }}
        >
          <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <span className="size-4 rounded-[5px] bg-primary" />
              Accra Digital Payments
            </span>
            <span className="flex items-center gap-1.5 text-[0.625rem] font-semibold tracking-wide text-success">
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              LIVE
            </span>
          </div>

          <div className="mb-2.5 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border bg-accent px-2.5 py-2">
              <div className="mb-1 text-[0.5625rem] tracking-wide text-muted-foreground uppercase">
                Active Stations
              </div>
              <div className="text-base font-bold tabular-nums text-foreground">
                42
              </div>
            </div>
            <div className="rounded-xl border border-border bg-accent px-2.5 py-2">
              <div className="mb-1 text-[0.5625rem] tracking-wide text-muted-foreground uppercase">
                Success Rate
              </div>
              <div className="text-base font-bold tabular-nums text-success">
                98.7%
              </div>
            </div>
            <div className="rounded-xl border border-border bg-accent px-2.5 py-2">
              <div className="mb-1 text-[0.5625rem] tracking-wide text-muted-foreground uppercase">
                Volume (24h)
              </div>
              <div className="text-base font-bold tabular-nums text-foreground">
                ₵128.4k
              </div>
            </div>
          </div>

          <div className="mb-2.5 rounded-xl border border-border bg-accent px-3 py-2.5">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[0.6875rem] text-muted-foreground">
                Transaction Volume
              </span>
              <span className="text-xs font-bold text-foreground">7-day</span>
            </div>
            <div className="flex h-12 items-end gap-1.5 pr-10">
              {CHART_BARS.map((height, index) => {
                const isPeak = index === CHART_BARS.length - 1;
                return (
                  <div
                    key={index}
                    className="flex-1 origin-bottom rounded-t-sm"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isPeak
                        ? "var(--primary)"
                        : "color-mix(in oklch, var(--primary), transparent 35%)",
                      animation: isPeak
                        ? "hero-grow-bar 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) backwards, hero-glow-bar 2.8s ease-in-out 1.1s infinite"
                        : "hero-grow-bar 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) backwards",
                      animationDelay: isPeak ? undefined : `${index * 90}ms`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-accent px-3 py-1">
            <StationRow name="Kumasi — Station 04" meta="212 tx" status="ok" />
            <StationRow name="Tema — Station 11" meta="188 tx" status="ok" />
            <StationRow
              name="Takoradi — Station 02"
              meta="syncing"
              status="warn"
            />
          </div>
        </div>

        {/* phone — lower-right, light overlap, Apple-product-page style */}
        <div
          className="absolute top-[92%] left-[83%] w-40 rounded-2xl border border-border bg-accent p-3 pb-4 shadow-lifted animate-hero-float sm:w-44"
          style={{
            transform: "rotateY(-8deg) rotateX(2deg) translateZ(40px)",
          }}
        >
          <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-border" />
          <div className="mb-4 flex items-center gap-1.5 text-[0.5625rem] font-semibold text-muted-foreground">
            <span className="size-3.5 rounded-[4px] bg-primary" />
            MoMo Assistant
          </div>
          <div className="mx-auto mb-2.5 flex size-11 items-center justify-center rounded-full bg-success/12">
            <CheckCircle2 className="size-5 text-success" />
          </div>
          <p className="mb-0.5 text-center text-[0.6875rem] font-semibold text-foreground">
            Transaction Complete
          </p>
          <p className="mb-3.5 text-center text-[0.5625rem] text-muted-foreground">
            Sent via USSD
          </p>
          <p className="mb-3.5 text-center text-[1.1875rem] font-bold tabular-nums text-foreground">
            GHS 1,250.00
          </p>
          <div className="flex justify-between border-t border-border pt-1 text-[0.5625rem]">
            <span className="text-muted-foreground">Reference</span>
            <span className="tabular-nums text-foreground">TGA-88231</span>
          </div>
          <div className="flex justify-between border-t border-border pt-1 text-[0.5625rem]">
            <span className="text-muted-foreground">Time</span>
            <span className="tabular-nums text-foreground">10:42 AM</span>
          </div>
        </div>

        {/* floating status chips */}
        <div
          className="absolute -top-[7%] -left-[9%] flex items-center gap-2 rounded-xl border border-border bg-accent px-3 py-2 text-[0.6875rem] font-medium shadow-soft animate-hero-float"
          style={{ animationDuration: "5.6s" }}
        >
          <ShieldCheck className="size-3.5 text-success" />
          <span>
            <span className="block text-[0.5625rem] text-muted-foreground">
              License
            </span>
            Active
          </span>
        </div>
        <div
          className="absolute -top-[7%] -right-[9%] hidden items-center gap-2 rounded-xl border border-border bg-accent px-3 py-2 text-[0.6875rem] font-medium shadow-soft animate-hero-float sm:flex"
          style={{ animationDuration: "4.4s", animationDelay: "0.6s" }}
        >
          <span className="size-1.5 rounded-full bg-success" />
          <span>
            <span className="block text-[0.5625rem] text-muted-foreground">
              Station Network
            </span>
            All Online
          </span>
        </div>
      </div>
    </div>
  );
}

function StationRow({
  name,
  meta,
  status,
}: {
  name: string;
  meta: string;
  status: "ok" | "warn";
}) {
  return (
    <div className="flex items-center justify-between border-t border-border py-1.5 text-[0.71875rem] first:border-t-0">
      <span className="flex items-center gap-1.5 text-foreground">
        <span
          className={`size-1.5 rounded-full ${status === "ok" ? "bg-success" : "bg-warning"}`}
        />
        {name}
      </span>
      <span className="tabular-nums text-muted-foreground">{meta}</span>
    </div>
  );
}
