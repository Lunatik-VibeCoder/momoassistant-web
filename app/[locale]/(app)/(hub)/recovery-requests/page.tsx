import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getRecoveryRequestsContent } from "@/content/recovery-requests";
import type { AppLocale } from "@/i18n/routing";
import { marketingPath } from "@/lib/constants";
import { getMe, listRecoveryRequests } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { RecoveryRequestsList } from "./recovery-requests-list";

interface RecoveryRequestsPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: RecoveryRequestsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Recovery Requests", path: "/recovery-requests" }),
    robots: { index: false, follow: false },
  };
}

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-5 -- Security Center,
// Recovery Requests triage. Separate page from PC-4's /devices (locked
// decision: two clear responsibilities -- /devices manages device trust
// state, /recovery-requests triages the workflow fallout of a denied
// Recovery). Reuses GET .../recovery-requests + PATCH
// .../route-to-case-b (both new, PC-5) and the same devices:read/write
// permission model as PC-4 -- no new permission introduced. Case B itself
// (device replacement/re-enrollment) is not implemented here or anywhere
// yet -- routing only marks the triage decision.
export default async function RecoveryRequestsPage({ params }: RecoveryRequestsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }
  // The (hub) layout already guarantees an Organization exists.
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  const requests = await listRecoveryRequests(session.accessToken, organizationId);
  const content = getRecoveryRequestsContent(locale);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-medium">{content.title}</h1>
      <RecoveryRequestsList
        locale={locale}
        requests={requests}
        permissions={profile.permissions}
        content={content}
      />
    </div>
  );
}
