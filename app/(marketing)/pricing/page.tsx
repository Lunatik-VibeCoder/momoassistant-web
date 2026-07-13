import type { Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { pricingHero } from "@/content/pricing";
import { ComparisonTable, Enterprise, Faq, Plans } from "@/features/pricing-page";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description: pricingHero.description,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow={pricingHero.eyebrow}
        title={pricingHero.title}
        description={pricingHero.description}
        breadcrumbs={[{ label: "Pricing", href: "/pricing" }]}
      />
      <Plans />
      <ComparisonTable />
      <Enterprise />
      <Faq />
      <CtaBand
        heading="Ready to get started?"
        description="Download the free Starter plan today, or talk to sales about Business and Enterprise."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_pricing_cta",
        }}
        secondaryCta={{
          label: siteConfig.secondaryCtaLabel,
          href: "/contact",
          event: "pricing_cta_request_demo",
        }}
      />
    </>
  );
}
