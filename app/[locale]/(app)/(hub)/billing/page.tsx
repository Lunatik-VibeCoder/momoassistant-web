import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBillingContent } from "@/content/billing";
import type { AppLocale } from "@/i18n/routing";
import { getMe, getOrganization, listInvoices } from "@/lib/mcp-client";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";
import { formatCurrency, formatDate } from "@/lib/utils";

interface BillingPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: BillingPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Billing", path: "/billing" }),
    robots: { index: false, follow: false },
  };
}

// WS-006 -- read-only invoice history, no "Pay Now" (HP-002 doesn't exist).
// Sorted newest-first: the backend's own default order (createdAt asc)
// isn't what a billing history view wants.
export default async function BillingPage({ params }: BillingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(`/${locale}/login`);
  }
  const profile = await getMe(session.accessToken);
  const organizationId = profile.organization!.id;

  const organization = await getOrganization(session.accessToken, organizationId);
  const invoices = await listInvoices(session.accessToken, organization.tenantId);
  const sortedInvoices = [...invoices].sort(
    (a, b) => new Date(b.issuedAt ?? b.createdAt).getTime() - new Date(a.issuedAt ?? a.createdAt).getTime(),
  );

  const content = getBillingContent(locale);

  if (sortedInvoices.length === 0) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>{content.emptyTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{content.emptyBody}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <h1 className="font-heading text-xl font-medium">{content.title}</h1>
      {sortedInvoices.map((invoice) => {
        const total = invoice.lineItems.reduce((sum, item) => sum + Number(item.amount), 0);
        return (
          <Card key={invoice.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{formatCurrency(locale, total, invoice.currency)}</span>
                <Badge variant={invoice.status === "PAID" ? "secondary" : "outline"}>
                  {invoice.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <dl className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground uppercase">{content.fields.issued}</dt>
                  <dd>{formatDate(locale, invoice.issuedAt)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase">{content.fields.due}</dt>
                  <dd>{formatDate(locale, invoice.dueAt)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase">{content.fields.paid}</dt>
                  <dd>{invoice.paidAt ? formatDate(locale, invoice.paidAt) : content.notPaid}</dd>
                </div>
              </dl>
              {invoice.lineItems.length > 0 && (
                <div className="border-t border-border pt-3">
                  <p className="mb-1 text-xs text-muted-foreground uppercase">{content.fields.lineItems}</p>
                  <ul className="flex flex-col gap-1 text-sm">
                    {invoice.lineItems.map((item) => (
                      <li key={item.id} className="flex items-center justify-between">
                        <span className="text-muted-foreground">{item.description}</span>
                        <span>{formatCurrency(locale, item.amount, invoice.currency)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
