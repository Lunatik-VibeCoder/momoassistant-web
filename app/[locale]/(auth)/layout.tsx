import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/shared/skip-link";
import type { AppLocale } from "@/i18n/routing";

interface AuthLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// WS-006 cleanup -- see (marketing)/layout.tsx's note. Same relocation,
// pixel-identical to what login/register/verify-email rendered before.
export default async function AuthLayout({ children, params }: AuthLayoutProps) {
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
