import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { demoHero } from "@/content/demo";
import { DownloadSection, Faq, RequestDemoSection } from "@/features/demo-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Demo",
  description: demoHero.description,
  path: "/demo",
});

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow={demoHero.eyebrow}
        title={demoHero.title}
        description={demoHero.description}
        breadcrumbs={[{ label: "Demo", href: "/demo" }]}
      />
      <DownloadSection />
      <RequestDemoSection />
      <Faq />
    </>
  );
}
