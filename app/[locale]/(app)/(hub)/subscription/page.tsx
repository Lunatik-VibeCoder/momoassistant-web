import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubscriptionContent } from "@/content/subscription";
import type { AppLocale } from "@/i18n/routing";
import { marketingPath } from "@/lib/constants";
import { getMe, getSubscription } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { formatDate } from "@/lib/utils";

interface SubscriptionPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: SubscriptionPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Subscription", path: "/subscription" }),
    robots: { index: false, follow: false },
  };
}

// WS-006 -- read-only. currentPeriodStart/End and cancelAtPeriodEnd are
// populated by CP-001.2's own reconciliation logic, not by any action this
// page offers.
export default async function SubscriptionPage({ params }: SubscriptionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  const subscription = await getSubscription(session.accessToken, organizationId);
  const content = getSubscriptionContent(locale);

  if (!subscription) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>{content.noSubscriptionTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{content.noSubscriptionBody}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {content.title}
          <Badge variant={subscription.status === "ACTIVE" || subscription.status === "TRIALING" ? "secondary" : "destructive"}>
            {subscription.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.currentPeriod}</dt>
            <dd className="text-sm">
              {formatDate(locale, subscription.currentPeriodStart)} –{" "}
              {formatDate(locale, subscription.currentPeriodEnd)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase">{content.fields.cancelAtPeriodEnd}</dt>
            <dd className="text-sm">{subscription.cancelAtPeriodEnd ? content.yes : content.no}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
