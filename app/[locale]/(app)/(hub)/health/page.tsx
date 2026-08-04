import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHealthContent } from "@/content/health";
import type { AppLocale } from "@/i18n/routing";
import { getLicense, getMe, getSubscription, listMembers } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";

interface HealthPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: HealthPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Organization Health", path: "/health" }),
    robots: { index: false, follow: false },
  };
}

type OverallHealth = "healthy" | "needs_attention" | "warning";

// WS-006 -- a client-side aggregation of existing reads only (License,
// Subscription, Member count), per WS-002's own review amendment. Device
// health is deliberately not here: the only device-listing route is
// per-station, there's no org-level aggregate to compose without a client
// fan-out this page doesn't need yet -- see the sprint's own plan notes.
function computeOverallHealth(licenseStatus: string | null, memberCount: number): OverallHealth {
  if (licenseStatus === "EXPIRED" || licenseStatus === "REVOKED") {
    return "warning";
  }
  if (memberCount === 0) {
    return "needs_attention";
  }
  return "healthy";
}

const OVERALL_BADGE_VARIANT: Record<OverallHealth, "secondary" | "outline" | "destructive"> = {
  healthy: "secondary",
  needs_attention: "outline",
  warning: "destructive",
};

export default async function HealthPage({ params }: HealthPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(`/${locale}/login`);
  }
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  const [license, subscription, allMembers] = await Promise.all([
    getLicense(session.accessToken, organizationId),
    getSubscription(session.accessToken, organizationId),
    listMembers(session.accessToken, organizationId),
  ]);
  // REMOVED is a soft-delete (R5.1) -- the list endpoint returns every
  // status, so a removed member would otherwise still count here.
  const members = allMembers.filter((member) => member.status !== "REMOVED");

  const content = getHealthContent(locale);
  const overall = computeOverallHealth(license?.status ?? null, members.length);
  const overallLabel = {
    healthy: content.overall.healthy,
    needs_attention: content.overall.needsAttention,
    warning: content.overall.warning,
  }[overall];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <h1 className="font-heading text-xl font-medium">{content.title}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            {content.overallTitle}
            <Badge variant={OVERALL_BADGE_VARIANT[overall]}>{overallLabel}</Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{content.cards.license}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{license?.status ?? content.noLicense}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{content.cards.subscription}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{subscription?.status ?? content.noSubscription}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{content.cards.members}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{members.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
