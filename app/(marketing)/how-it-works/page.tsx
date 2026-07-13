import type { Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { howItWorksHero } from "@/content/how-it-works";
import {
  ArchitectureConcepts,
  Lifecycle,
  RuntimeSync,
} from "@/features/how-it-works-page";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "How It Works",
  description: howItWorksHero.description,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow={howItWorksHero.eyebrow}
        title={howItWorksHero.title}
        description={howItWorksHero.description}
        breadcrumbs={[{ label: "How It Works", href: "/how-it-works" }]}
      />
      <Lifecycle />
      <ArchitectureConcepts />
      <RuntimeSync />
      <CtaBand
        heading="Ready to see the runtime in action?"
        description="Download the beta and run your first automated sequence, or request a walkthrough with your team."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_how_it_works_cta",
        }}
        secondaryCta={{
          label: siteConfig.secondaryCtaLabel,
          href: "/contact",
          event: "how_it_works_cta_request_demo",
        }}
      />
    </>
  );
}
