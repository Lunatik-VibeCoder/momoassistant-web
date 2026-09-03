import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReportsContent } from "@/content/reports";
import type { AppLocale } from "@/i18n/routing";
import type { ReportCurrencyAggregate } from "@/lib/mcp-client";
import { formatCurrency } from "@/lib/utils";

interface FinancialSectionProps {
  locale: AppLocale;
  content: ReportsContent["financial"];
  byCurrency: ReportCurrencyAggregate[];
}

// WS-013 Phase 5 -- WS-011 CONTRACT.md §8.2: one block PER currency, never
// summed. No "Total Volume" field exists on ReportSummary and none is
// computed here -- the absence is the guardrail, not an oversight.
export function FinancialSection({ locale, content, byCurrency }: FinancialSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {byCurrency.length === 0 ? (
          <p className="text-sm text-muted-foreground">{content.empty}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {byCurrency.map((aggregate) => (
              <div key={aggregate.currency} className="rounded-lg border border-input p-4">
                <p className="font-heading text-sm font-semibold text-foreground">{aggregate.currency}</p>
                <dl className="mt-2 flex flex-col gap-1 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{content.volume}</dt>
                    <dd className="font-medium text-foreground">
                      {formatCurrency(locale, aggregate.volume, aggregate.currency)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{content.fees}</dt>
                    <dd className="font-medium text-foreground">
                      {formatCurrency(locale, aggregate.fees, aggregate.currency)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{content.commissions}</dt>
                    <dd className="font-medium text-foreground">
                      {formatCurrency(locale, aggregate.commissions, aggregate.currency)}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
