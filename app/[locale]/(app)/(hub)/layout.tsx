import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

import { HubSidebar } from "@/components/layout/hub-sidebar";
import { SkipLink } from "@/components/shared/skip-link";
import { getHubNavContent } from "@/content/hub-nav";
import type { AppLocale } from "@/i18n/routing";
import { getMe } from "@/lib/mcp-client";
import { requireSession } from "@/lib/session";

interface HubLayoutProps {
  children: ReactNode;
  // Plain string, not AppLocale -- same Next route-type-validator
  // constraint as the (app) layout above this one; cast below since this
  // layout (unlike that one) needs the narrowed type for content lookup.
  params: Promise<{ locale: string }>;
}

// WS-006 -- the shared Customer Hub shell. The (app) layout above this one
// already guarantees a session exists; this layer adds the one check every
// Hub page needs (an Organization must exist) plus the sidebar/mobile nav,
// so no individual page has to repeat either. Onboarding stays outside this
// group deliberately -- there is no Organization yet to show a Hub for.
export default async function HubLayout({ children, params }: HubLayoutProps) {
  const { locale } = await params;
  const session = await requireSession();
  if (!session) {
    redirect(`/${locale}/login`);
  }

  const profile = await getMe(session.accessToken);
  if (!profile.organization) {
    redirect(`/${locale}/onboarding`);
  }

  const nav = getHubNavContent(locale as AppLocale);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <SkipLink />
      <HubSidebar items={nav.items} organizationName={profile.organization.name} />
      <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
