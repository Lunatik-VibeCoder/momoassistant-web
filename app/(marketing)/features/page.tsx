import type { Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { featuresHero } from "@/content/features";
import { FeatureGroups } from "@/features/features-page";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Features",
  description: featuresHero.description,
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow={featuresHero.eyebrow}
        title={featuresHero.title}
        description={featuresHero.description}
        breadcrumbs={[{ label: "Features", href: "/features" }]}
      />
      <FeatureGroups />
      <CtaBand
        heading="See it running on your stations"
        description="Download the beta and try USSD automation on your own devices, or request a demo with your team."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_features_cta",
        }}
        secondaryCta={{
          label: siteConfig.secondaryCtaLabel,
          href: "/contact",
          event: "features_cta_request_demo",
        }}
      />
    </>
  );
}
