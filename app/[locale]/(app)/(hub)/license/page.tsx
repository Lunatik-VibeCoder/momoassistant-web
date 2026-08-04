import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLicenseContent } from "@/content/license";
import type { AppLocale } from "@/i18n/routing";
import { getLicense, getMe } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { formatCurrency, formatDate } from "@/lib/utils";

interface LicensePageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: LicensePageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "License", path: "/license" }),
    robots: { index: false, follow: false },
  };
}

// WS-006 -- read-only (licenses:write stays SUPER_ADMIN-only, no upgrade
// button exists to wire up yet).
export default async function LicensePage({ params }: LicensePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(`/${locale}/login`);
  }
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  const license = await getLicense(session.accessToken, organizationId);
  const content = getLicenseContent(locale);

  if (!license) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>{content.noLicenseTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{content.noLicenseBody}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {license.plan.name}
          <Badge variant={license.status === "ACTIVE" || license.status === "TRIAL" ? "secondary" : "destructive"}>
            {license.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.price}</dt>
            <dd className="text-sm">
              {formatCurrency(locale, license.plan.price, license.plan.currency)} /{" "}
              {license.plan.billingPeriod.toLowerCase()}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.seats}</dt>
            <dd className="text-sm">{license.seats ?? content.unlimitedSeats}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.issued}</dt>
            <dd className="text-sm">{formatDate(locale, license.issuedAt)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.expires}</dt>
            <dd className="text-sm">
              {license.expiresAt ? formatDate(locale, license.expiresAt) : content.noExpiry}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
