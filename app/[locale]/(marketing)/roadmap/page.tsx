import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { Roadmap } from "@/features/changelog-page";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface RoadmapPageProps {
  params: Promise<{ locale: AppLocale }>;
}

const COPY = {
  en: {
    eyebrow: "Roadmap",
    title: "Where MoMo Assistant is headed",
    description:
      "Beta, Release Candidate, General Availability — the same milestones from the Changelog, as a dedicated page instead of scattered \"Coming soon\" tags across the site.",
  },
  fr: {
    eyebrow: "Roadmap",
    title: "Où va MoMo Assistant",
    description:
      "Bêta, Release Candidate, disponibilité générale — les mêmes jalons que le Changelog, réunis sur une page dédiée plutôt que dispersés en mentions « À venir » sur le site.",
  },
} as const;

export async function generateMetadata({
  params,
}: RoadmapPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale];
  return createMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    path: "/roadmap",
  });
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        breadcrumbs={[{ label: copy.eyebrow, href: "/roadmap" }]}
      />
      <Roadmap />
    </>
  );
}
