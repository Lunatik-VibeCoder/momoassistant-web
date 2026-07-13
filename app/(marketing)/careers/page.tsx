import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { careersHero } from "@/content/careers";
import { Benefits, Culture, OpenPositions } from "@/features/careers-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Careers",
  description: careersHero.description,
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        description={careersHero.description}
        breadcrumbs={[{ label: "Careers", href: "/careers" }]}
      />
      <Culture />
      <Benefits />
      <OpenPositions />
    </>
  );
}
