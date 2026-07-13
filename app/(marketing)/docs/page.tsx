import type { Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { docsHero } from "@/content/docs";
import { Categories } from "@/features/docs-page";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Docs",
  description: docsHero.description,
  path: "/docs",
});

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow={docsHero.eyebrow}
        title={docsHero.title}
        description={docsHero.description}
        breadcrumbs={[{ label: "Docs", href: "/docs" }]}
      />
      <Categories />
      <CtaBand
        heading="Can't find what you need?"
        description="The full documentation center is still being built. Reach out and we'll point you in the right direction."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_docs_cta",
        }}
        secondaryCta={{
          label: siteConfig.secondaryCtaLabel,
          href: "/contact",
          event: "docs_cta_request_demo",
        }}
      />
    </>
  );
}
