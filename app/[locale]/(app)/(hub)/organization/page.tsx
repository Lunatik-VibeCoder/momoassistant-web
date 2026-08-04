import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrganizationContent } from "@/content/organization";
import type { AppLocale } from "@/i18n/routing";
import {
  getLicense,
  getMe,
  getOrganization,
  listMembers,
  listStations,
  listWorkspaces,
} from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { formatDate } from "@/lib/utils";

interface OrganizationPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: OrganizationPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Organization", path: "/organization" }),
    robots: { index: false, follow: false },
  };
}

// WS-006 -- a profile-card summary, not raw field dump: name/slug/code/
// status/created plus Plan (License enrichment), Members and Stations
// counts. No transfer-ownership/archive UI this pass (R6.0 capabilities,
// not asked for in this sprint).
export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(`/${locale}/login`);
  }
  // The (hub) layout already guarantees an Organization exists.
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  const [organization, license, allMembers, workspaces] = await Promise.all([
    getOrganization(session.accessToken, organizationId),
    getLicense(session.accessToken, organizationId),
    listMembers(session.accessToken, organizationId),
    listWorkspaces(session.accessToken, organizationId),
  ]);
  // REMOVED is a soft-delete (R5.1) -- the list endpoint returns every
  // status, so a removed member would otherwise still count here.
  const members = allMembers.filter((member) => member.status !== "REMOVED");

  // No org-level station list exists on the backend -- fanned out per
  // workspace here (small org sizes today, one page load, not a per-row
  // refresh cost).
  const stationLists = await Promise.all(
    workspaces.map((workspace) => listStations(session.accessToken, workspace.id)),
  );
  const stationCount = stationLists.reduce((total, stations) => total + stations.length, 0);

  const content = getOrganizationContent(locale);
  const isOwner = session.user.id === organization.ownerUserId;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {organization.name}
          {isOwner && <Badge variant="secondary">{content.ownerBadge}</Badge>}
          <Badge variant="outline">{organization.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.slug}</dt>
            <dd className="text-sm">{organization.slug}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.code}</dt>
            <dd className="text-sm">{organization.organizationCode}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.created}</dt>
            <dd className="text-sm">{formatDate(locale, organization.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.plan}</dt>
            <dd className="text-sm">{license?.plan.name ?? content.noLicense}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.members}</dt>
            <dd className="text-sm">{members.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.stations}</dt>
            <dd className="text-sm">{stationCount}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
