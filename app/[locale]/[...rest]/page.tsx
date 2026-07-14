import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

interface CatchAllPageProps {
  params: Promise<{ locale: AppLocale; rest: string[] }>;
}

// Any URL under /en/... or /fr/... that doesn't match a real page lands
// here. Without this catch-all, an unmatched path falls all the way back
// to the root app/not-found.tsx (no locale context) instead of the
// locale-aware app/[locale]/not-found.tsx — this route exists purely to
// give that nested boundary something to match.
export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
