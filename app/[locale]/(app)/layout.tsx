import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { marketingPath } from "@/lib/constants";
import { requireSession } from "@/lib/session";

interface AppLayoutProps {
  children: ReactNode;
  // Plain string, not AppLocale -- Next's generated route type validator
  // expects Promise<{ locale: string }> for a layout shared across this
  // route-group pattern; only interpolated into a redirect path below,
  // never re-validated against the two real locales.
  params: Promise<{ locale: string }>;
}

// RFC-0011 SS1/SS2 -- every authenticated route in this group is gated
// here, once. requireSession() attempts a silent refresh before giving up
// (the browser never sees either step); a missing/unrecoverable session
// redirects to /login.
export default async function AppLayout({ children, params }: AppLayoutProps) {
  const { locale } = await params;
  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }
  return children;
}
