import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getReplacementRequestsContent } from "@/content/replacement-requests";
import type { AppLocale } from "@/i18n/routing";
import { marketingPath } from "@/lib/constants";
import { getMe, listMembers, listOrganizationDevices, listReplacementRequests } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { ReplacementRequestsList } from "./replacement-requests-list";

interface ReplacementRequestsPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: ReplacementRequestsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Device Replacements", path: "/replacement-requests" }),
    robots: { index: false, follow: false },
  };
}

// AUTH-SECURITY-2 Case B B1.8 -- Web admin triage/approval for
// ReplacementRequest (CASE_B_CONTRACT_LOCK.md CB-1). Separate page from
// PC-5's /recovery-requests (CB-0: RecoveryRequest is a triage journal
// only, never an approval mechanism) and from PC-4's /devices (device
// trust state vs replacement-workflow approval, two clear
// responsibilities). Reuses GET .../replacement-requests +
// PATCH .../approve + PATCH .../reject (B1.6, locked) and the
// devices:recover permission (CB-2) -- no new permission introduced on
// this side, lib/permissions.ts's hasPermission is a generic string check.
// requesterId/oldDeviceId/newDeviceId are resolved to display names using
// listMembers/listOrganizationDevices, already-existing data sources (per
// the B1.8 GO: no new backend endpoint just to enrich this list). The
// IDENTITY-based routes (create/verify-otp/resend-otp/complete-enrollment)
// are the candidate phone's own flow -- Android B1.7, closed, not
// reproduced here.
export default async function ReplacementRequestsPage({
  params,
}: ReplacementRequestsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }
  // The (hub) layout already guarantees an Organization exists.
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  const [requestsPage, members, devices] = await Promise.all([
    listReplacementRequests(session.accessToken, organizationId),
    listMembers(session.accessToken, organizationId),
    listOrganizationDevices(session.accessToken, organizationId),
  ]);
  const content = getReplacementRequestsContent(locale);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-medium">{content.title}</h1>
      <ReplacementRequestsList
        locale={locale}
        requests={requestsPage.items}
        members={members}
        devices={devices}
        permissions={profile.permissions}
        content={content}
      />
    </div>
  );
}
