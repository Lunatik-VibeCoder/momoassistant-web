import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getDevicesContent } from "@/content/devices";
import type { AppLocale } from "@/i18n/routing";
import { marketingPath } from "@/lib/constants";
import { getMe, listOrganizationDevices } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { DevicesList } from "./devices-list";

interface DevicesPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: DevicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Trusted Devices", path: "/devices" }),
    robots: { index: false, follow: false },
  };
}

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-4 -- Web Trusted Devices +
// Revoke Device. Reuses listOrganizationDevices (WS-009, already existed --
// no new list endpoint) and the existing devices:read/devices:write
// permission model (RolesService), no new permission semantics introduced.
// PC-5 (Recovery Requests) and any Security Audit Log UI are explicitly
// out of scope here -- this page shows only device trust status + revoke,
// nothing else.
export default async function DevicesPage({ params }: DevicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }
  // The (hub) layout already guarantees an Organization exists.
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  const devices = await listOrganizationDevices(session.accessToken, organizationId);
  const content = getDevicesContent(locale);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-medium">{content.title}</h1>
      <DevicesList
        locale={locale}
        devices={devices}
        permissions={profile.permissions}
        content={content}
      />
    </div>
  );
}
