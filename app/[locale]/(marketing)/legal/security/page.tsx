import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalDocument } from "@/components/shared/legal-document";
import { getLegalContent } from "@/content/legal";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface SecurityStatementPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: SecurityStatementPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { security } = getLegalContent(locale);
  return createMetadata({
    locale,
    title: security.title,
    description: security.description,
    path: "/legal/security",
  });
}

export default async function SecurityStatementPage({
  params,
}: SecurityStatementPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { security } = getLegalContent(locale);

  return (
    <LegalDocument
      document={security}
      breadcrumbs={[{ label: security.title, href: "/legal/security" }]}
    />
  );
}
