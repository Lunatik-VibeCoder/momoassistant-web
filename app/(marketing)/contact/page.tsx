import type { Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { contactHero } from "@/content/contact";
import { Channels } from "@/features/contact-page";
import { siteConfig } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: contactHero.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        description={contactHero.description}
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <Channels />
      <CtaBand
        heading="Not ready to talk yet?"
        description="Download the beta and try it on your own stations first."
        primaryCta={{
          label: siteConfig.primaryCtaLabel,
          href: siteConfig.downloadApkUrl,
          external: true,
          event: "download_apk_contact_cta",
        }}
        secondaryCta={{
          label: "View Pricing",
          href: "/pricing",
          event: "contact_cta_view_pricing",
        }}
      />
    </>
  );
}
