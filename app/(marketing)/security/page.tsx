import type { Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { securityHero } from "@/content/security";
import { SecurityDomains } from "@/features/security-page";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Security",
  description: securityHero.description,
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow={securityHero.eyebrow}
        title={securityHero.title}
        description={securityHero.description}
        breadcrumbs={[{ label: "Security", href: "/security" }]}
      />
      <SecurityDomains />
      <CtaBand
        heading="Questions about how we handle security?"
        description="Talk to us directly, or download the beta and see the trust model in action."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_security_cta",
        }}
        secondaryCta={{
          label: siteConfig.secondaryCtaLabel,
          href: "/contact",
          event: "security_cta_request_demo",
        }}
      />
    </>
  );
}
