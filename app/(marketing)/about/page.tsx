import type { Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { aboutHero } from "@/content/about";
import { MissionVision, Story, Values } from "@/features/about-page";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: aboutHero.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.description}
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />
      <Story />
      <MissionVision />
      <Values />
      <CtaBand
        heading="See it for yourself"
        description="Download the beta, or get in touch if you'd like to talk through how MoMo Assistant fits your operation."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_about_cta",
        }}
        secondaryCta={{
          label: siteConfig.secondaryCtaLabel,
          href: "/contact",
          event: "about_cta_request_demo",
        }}
      />
    </>
  );
}
