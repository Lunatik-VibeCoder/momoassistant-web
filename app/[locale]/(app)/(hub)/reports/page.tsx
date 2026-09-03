import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { ButtonLink } from "@/components/shared/button-link";
import { Section } from "@/components/layout/section";
import { CustomRangeForm } from "@/components/reports/custom-range-form";
import { FiltersForm } from "@/components/reports/filters-form";
import { FinancialSection } from "@/components/reports/financial-section";
import { PaginationControls } from "@/components/reports/pagination-controls";
import { PeriodSelector } from "@/components/reports/period-selector";
import { SummarySection } from "@/components/reports/summary-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionsTable } from "@/components/reports/transactions-table";
import { TrendChart } from "@/components/reports/trend-chart";
import { getReportsContent } from "@/content/reports";
import type { AppLocale } from "@/i18n/routing";
import { marketingPath } from "@/lib/constants";
import {
  getMe,
  getTransactionsSummary,
  getTransactionsTrends,
  listTransactions,
  McpError,
} from "@/lib/mcp-client";
import { buildReportsExportHref, parseReportsSearchParams, toApiQueryParams } from "@/lib/reports-query";
import { createMetadata } from "@/lib/seo";
import { requireSession } from "@/lib/session";

interface ReportsPageProps {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export async function generateMetadata({ params }: ReportsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createMetadata({ locale, title: "Reports", path: "/reports" }),
    robots: { index: false, follow: false },
  };
}

// WS-013 (Report Hub) -- "what happened over a period", distinct from the
// Dashboard's "what's the situation now" (WS-009/WS-010's own frozen
// scope, never merged with this page). Every section here maps 1:1 to a
// WS-012 endpoint (WS-011 CONTRACT.md); nothing on this page is computed
// from raw transaction rows -- summary/trends aggregates come straight
// from their own endpoints, never derived from the `transactions` list.
//
// Fully URL-driven, zero client components (see PRE-FLIGHT): period,
// filters, and pagination are all query params; every control here is
// either a <Link>/<NavLink> or a native GET <form>, matching this
// codebase's existing all-server-components Hub architecture rather than
// introducing a new client-fetch pattern.
export default async function ReportsPage({ params, searchParams }: ReportsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireSession();
  if (!session) {
    redirect(marketingPath(locale, "/login"));
  }

  const rawSearchParams = await searchParams;
  const profile = await getMe(session.accessToken);
  const organization = profile.organization!;

  const content = getReportsContent(locale);
  const query = parseReportsSearchParams(rawSearchParams);
  const apiParams = toApiQueryParams(query);

  let data;
  try {
    const [summary, trends, transactions] = await Promise.all([
      getTransactionsSummary(session.accessToken, organization.id, apiParams),
      getTransactionsTrends(session.accessToken, organization.id, apiParams),
      listTransactions(session.accessToken, organization.id, { ...apiParams, cursor: query.cursor }),
    ]);
    data = { summary, trends, transactions };
  } catch (error) {
    // transactions:read isn't granted to every role (same WS-009-RBAC-
    // DECISION boundary the Dashboard already respects) -- all 4 WS-012
    // endpoints share this exact permission, so a 403 on any one of them
    // means the whole page has nothing to show. Any other failure still
    // propagates to Next's default error boundary, same as every other
    // Hub page (none of them have a dedicated error.tsx -- not inventing
    // one here either).
    if (error instanceof McpError && error.kind === "forbidden") {
      return (
        <Section className="pt-20">
          <div className="mx-auto max-w-5xl">
            <h1 className="font-heading text-xl font-medium text-foreground">{content.title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">{content.table.restricted}</p>
          </div>
        </Section>
      );
    }
    throw error;
  }

  return (
    <Section className="pt-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div>
          <h1 className="font-heading text-xl font-medium text-foreground">{content.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{content.subtitle}</p>
        </div>

        <div className="flex flex-col gap-3">
          <PeriodSelector content={content.period} currentPeriod={query.period} searchParams={rawSearchParams} />
          <CustomRangeForm locale={locale} content={content.period} query={query} />
        </div>

        <SummarySection content={content.summary} summary={data.summary} />

        <FinancialSection locale={locale} content={content.financial} byCurrency={data.summary.byCurrency} />

        <TrendChart locale={locale} content={content.trend} trends={data.trends} />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-base">{content.table.title}</CardTitle>
            <ButtonLink href={`/${locale}${buildReportsExportHref(rawSearchParams)}`} external variant="outline" size="sm">
              {content.exportCsv.button}
            </ButtonLink>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FiltersForm locale={locale} content={content.filters} query={query} />
            <TransactionsTable locale={locale} content={content.table} transactions={data.transactions.items} />
            <PaginationControls
              content={content.table}
              searchParams={rawSearchParams}
              nextCursor={data.transactions.nextCursor}
            />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
