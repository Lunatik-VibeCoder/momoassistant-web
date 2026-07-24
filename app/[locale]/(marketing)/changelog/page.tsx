import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getChangelogContent } from "@/content/changelog";
import { Roadmap } from "@/features/changelog-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface ChangelogPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: ChangelogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getChangelogContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/changelog",
  });
}

export default async function ChangelogPage({ params }: ChangelogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getChangelogContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/changelog" }]}
      />
      <Roadmap />
      <CtaBand
        heading={isFr ? "Envie d'un accès anticipé à la suite ?" : "Want early access to what's next?"}
        description={
          isFr
            ? "Téléchargez la bêta dès aujourd'hui, ou contactez-nous pour discuter de votre calendrier."
            : "Download the beta today, or get in touch to talk about your timeline."
        }
        primaryCta={{
          label: text.primaryCtaLabel,
          href: "/download",
          event: "download_apk_changelog_cta",
        }}
        secondaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "changelog_cta_request_demo",
        }}
      />
    </>
  );
}
