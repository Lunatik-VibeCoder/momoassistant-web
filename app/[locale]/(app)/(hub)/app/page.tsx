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
import { getMe } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { logoutAction } from "./actions";

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

// Deliberately minimal (see WS-005's original scope note) -- a landing
// point proving the full chain works end to end. WS-006 built the rest of
// the Customer Hub around this page rather than into it.
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

  return (
    <Section className="pt-20">
      <Card className="mx-auto max-w-lg px-6">
        <CardHeader>
          <CardTitle className="text-xl">{content.welcomeTitle(profile.displayName)}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {content.organizationLabel}: <span className="text-foreground">{organization.name}</span>
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
    </Section>
  );
}
