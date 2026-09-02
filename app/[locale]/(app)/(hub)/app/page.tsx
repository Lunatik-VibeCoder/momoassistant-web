import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/shared/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// WS-009 (Dashboard / Live Operations, CONTRACT-V1) -- the welcome Card
// stays (was WS-005's original minimal scope), Recent Transactions + Device
// Status are the first real operational data this page has ever shown.
// Deliberately "how is my operation now" only -- no history/charts/filters/
// export/alerts, see CONTRACT-V1 for the frozen out-of-scope list.
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

  return (
    <Section className="pt-20">
      <div className="mx-auto flex max-w-lg flex-col gap-4">
        <Card className="px-6">
          <CardHeader>
            <CardTitle className="text-xl">{content.welcomeTitle(profile.displayName)}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              {content.organizationLabel}:{" "}
              <span className="text-foreground">{organization.name}</span>
            </p>
            <ButtonLink href={`/${locale}/app/download`} external>
              {content.downloadCtaLabel}
            </ButtonLink>
            <form action={logoutWithLocale}>
              <Button type="submit" variant="outline">
                {content.logoutLabel}
              </Button>
            </form>
          </CardContent>
        </Card>

        <RecentTransactionsCard
          locale={locale}
          content={content.recentTransactions}
          transactions={transactionsResult.transactions}
          restricted={transactionsResult.restricted}
        />

        <DeviceStatusCard locale={locale} content={content.devices} devices={devices} />
      </div>
    </Section>
  );
}
