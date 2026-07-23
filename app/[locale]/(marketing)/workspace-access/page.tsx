import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { getWorkspaceAccessContent } from "@/content/workspace-access";
import { Chain, Details } from "@/features/workspace-access-page";
import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

interface WorkspaceAccessPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: WorkspaceAccessPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { hero } = getWorkspaceAccessContent(locale);
  return createMetadata({
    locale,
    title: hero.title,
    description: hero.description,
    path: "/workspace-access",
  });
}

export default async function WorkspaceAccessPage({
  params,
}: WorkspaceAccessPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { hero } = getWorkspaceAccessContent(locale);
  const text = getSiteText(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: hero.eyebrow, href: "/workspace-access" }]}
      />
      <Chain />
      <Details />
      <CtaBand
        heading={isFr ? "Des questions sur votre accès ?" : "Questions about your access?"}
        description={
          isFr
            ? "Parlez à notre équipe, ou consultez les tarifs pour voir ce qui est inclus dans chaque offre."
            : "Talk to our team, or check pricing to see what's included in each plan."
        }
        primaryCta={{
          label: text.secondaryCtaLabel,
          href: "/contact",
          event: "workspace_access_cta_contact",
        }}
        secondaryCta={{
          label: isFr ? "Voir les tarifs" : "View pricing",
          href: "/pricing",
          event: "workspace_access_cta_pricing",
        }}
      />
    </>
  );
}
