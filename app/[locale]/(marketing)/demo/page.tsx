import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/shared/page-hero";
import { getDemoContent } from "@/content/demo";
import { DownloadSection, Faq, RequestDemoSection } from "@/features/demo-page";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface DemoPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getDemoContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/demo",
  });
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getDemoContent(locale);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/demo" }]}
      />
      <DownloadSection />
      <RequestDemoSection />
      <Faq />
    </>
  );
}
