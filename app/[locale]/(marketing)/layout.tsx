import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/shared/skip-link";
import type { AppLocale } from "@/i18n/routing";

interface MarketingLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// WS-006 cleanup -- Header/Footer moved here (and to (auth)'s own layout)
// from the true root layout, which previously wrapped every route group
// including (app)/(hub), stacking a marketing nav+footer around the
// authenticated Customer Hub's own sidebar shell. Pixel-identical to what
// the root layout rendered before for every marketing page -- relocated,
// not redesigned.
export default async function MarketingLayout({ children, params }: MarketingLayoutProps) {
  const { locale } = await params;
  return (
    <>
      <SkipLink />
      <Header locale={locale as AppLocale} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer locale={locale as AppLocale} />
    </>
  );
}
