import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalDocument } from "@/components/shared/legal-document";
import { getLegalContent } from "@/content/legal";
import type { AppLocale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";

interface CookiesPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: CookiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { cookies } = getLegalContent(locale);
  return createMetadata({
    locale,
    title: cookies.title,
    description: cookies.description,
    path: "/legal/cookies",
  });
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { cookies } = getLegalContent(locale);

  return (
    <LegalDocument
      document={cookies}
      breadcrumbs={[{ label: cookies.title, href: "/legal/cookies" }]}
    />
  );
}
