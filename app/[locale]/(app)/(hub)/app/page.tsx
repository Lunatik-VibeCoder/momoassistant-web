import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/shared/button-link";
import { Section } from "@/components/layout/section";
import { getDashboardContent } from "@/content/dashboard";
import type { AppLocale } from "@/i18n/routing";
import { marketingPath } from "@/lib/constants";
import { McpError, getMe, listOrganizationDevices, listRecentTransactions } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { logoutAction } from "./actions";
import { DeviceStatusCard } from "./device-status-card";
import { RecentTransactionsCard } from "./recent-transactions-card";

interface DashboardPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Dashboard", path: "/" }),
    robots: { index: false, follow: false },
  };
}

// WS-009 (Dashboard / Live Operations, CONTRACT-V1) -- deliberately "how is
// my operation now" only -- no history/charts/filters/export/alerts, see
// CONTRACT-V1 for the frozen out-of-scope list.
//
// WS-010-DASHBOARD-V2-IMPL-01 -- layout/UX restructure only, same two data
// calls as before, no new backend/dependency. The V2 Discovery audit found
// the page's core problem was information hierarchy, not missing data: the
// WS-005-era Welcome Card (greeting + Download + Logout) sat ABOVE
// Operational Health, so an account-utility card outranked "is my operation
// running" on a page meant to answer that in ~3 seconds. Welcome Card is
// gone; its content moved into a minimal header row. Operational Health
// (devices + SIMs + balances, DeviceStatusCard) is now section #1, Recent
// Activity (RecentTransactionsCard) is #2 -- 2 columns on desktop, stacked
// in that same order on mobile (the audit's own locked wireframe).
export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // The (app) layout already guarantees a session exists, and the (hub)
  // layout wrapping this page already guarantees an Organization exists
  // (WS-006, moved up from here so every Hub page gets it for free) --
  // re-fetching the session here is cheap (requireSession() only refreshes
  // near expiry) and this page still needs the access token to call MCP
  // directly.
  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }

  // RFC-0011 SS3 -- the session cookie is never a data source of truth;
  // Organization detail is read fresh from MCP on every load. `organization`
  // is guaranteed non-null by the (hub) layout's own guard.
  const profile = await getMe(session.accessToken);
  const organization = profile.organization!;

  const content = getDashboardContent(locale);
  const logoutWithLocale = logoutAction.bind(null, locale);

  const [devices, transactionsResult] = await Promise.all([
    listOrganizationDevices(session.accessToken, organization.id),
    // transactions:read isn't granted to AGENT (WS-009-RBAC-DECISION) --
    // that 403 is an expected role boundary, not a page-breaking error;
    // any other failure (network, 500, unexpected auth issue) still
    // propagates to Next's default error boundary, same as every other
    // Hub page today (none of them have a dedicated error.tsx).
    listRecentTransactions(session.accessToken, organization.id)
      .then((transactions) => ({ transactions, restricted: false as const }))
      .catch((error: unknown) => {
        if (error instanceof McpError && error.kind === "forbidden") {
          return { transactions: [], restricted: true as const };
        }
        throw error;
      }),
  ]);

  // Server-local hour -- same simple `Date` usage as formatDateTime
  // elsewhere in this repo, no new dependency for a 3-bucket greeting.
  const greetingHour = new Date().getHours();

  return (
    <Section className="pt-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl font-medium text-foreground">
              {content.greeting(greetingHour, profile.displayName)}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {content.organizationLabel}: <span className="text-foreground">{organization.name}</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ButtonLink href={`/${locale}/app/download`} external variant="outline" size="sm">
              {content.downloadCtaLabel}
            </ButtonLink>
            <form action={logoutWithLocale}>
              <Button type="submit" variant="ghost" size="sm">
                {content.logoutLabel}
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DeviceStatusCard locale={locale} content={content.operationalHealth} devices={devices} />

          <RecentTransactionsCard
            locale={locale}
            content={content.recentTransactions}
            transactions={transactionsResult.transactions}
            restricted={transactionsResult.restricted}
          />
        </div>
      </div>
    </Section>
  );
}
