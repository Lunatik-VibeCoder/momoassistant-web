import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalDocument } from "@/components/shared/legal-document";
import { getLegalContent } from "@/content/legal";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface PrivacyPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { privacy } = getLegalContent(locale);
  return createMetadata({
    locale,
    title: privacy.title,
    description: privacy.description,
    path: "/legal/privacy",
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { privacy } = getLegalContent(locale);

  return (
    <LegalDocument
      document={privacy}
      breadcrumbs={[{ label: privacy.title, href: "/legal/privacy" }]}
    />
  );
}
