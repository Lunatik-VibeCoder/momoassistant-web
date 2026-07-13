import type { ReactNode } from "react";

import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  children?: ReactNode;
}

/**
 * The header every interior page (Features, Security, Pricing, etc.) opens
 * with — distinct from the homepage's two-column Hero, which additionally
 * carries the illustrative visual panel. No entrance animation: like the
 * homepage Hero, this content is visible immediately on load, so gating it
 * behind Framer Motion would delay paint of the page's LCP element for no
 * benefit (see the homepage Hero for the measured cost of getting this
 * wrong).
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: PageHeroProps) {
  return (
    <Section
      aria-labelledby="page-hero-heading"
      className="pt-20 pb-12 sm:pt-24 sm:pb-16"
    >
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="max-w-3xl">
        {eyebrow && (
          <Badge variant="outline" className="mb-5">
            {eyebrow}
          </Badge>
        )}
        <h1
          id="page-hero-heading"
          className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl"
        >
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
            {description}
          </p>
        )}
        {children}
      </div>
    </Section>
  );
}
