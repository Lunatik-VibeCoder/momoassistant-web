import type { Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { changelogHero } from "@/content/changelog";
import { Roadmap } from "@/features/changelog-page";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Changelog",
  description: changelogHero.description,
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow={changelogHero.eyebrow}
        title={changelogHero.title}
        description={changelogHero.description}
        breadcrumbs={[{ label: "Changelog", href: "/changelog" }]}
      />
      <Roadmap />
      <CtaBand
        heading="Want early access to what's next?"
        description="Download the beta today, or get in touch to talk about your timeline."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_changelog_cta",
        }}
        secondaryCta={{
          label: siteConfig.secondaryCtaLabel,
          href: "/contact",
          event: "changelog_cta_request_demo",
        }}
      />
    </>
  );
}
