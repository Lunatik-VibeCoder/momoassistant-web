import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalDocument } from "@/components/shared/legal-document";
import { getLegalContent } from "@/content/legal";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface TermsPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { terms } = getLegalContent(locale);
  return createMetadata({
    locale,
    title: terms.title,
    description: terms.description,
    path: "/legal/terms",
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { terms } = getLegalContent(locale);

  return (
    <LegalDocument
      document={terms}
      breadcrumbs={[{ label: terms.title, href: "/legal/terms" }]}
    />
  );
}
