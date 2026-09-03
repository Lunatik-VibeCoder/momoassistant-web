import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReportsContent } from "@/content/reports";
import type { AppLocale } from "@/i18n/routing";
import type { ReportTrendPoint } from "@/lib/mcp-client";
import { formatCurrency } from "@/lib/utils";

interface TrendChartProps {
  locale: AppLocale;
  content: ReportsContent["trend"];
  trends: ReportTrendPoint[];
}

const CHART_HEIGHT = 96;

// WS-013 Phase 6 -- WS-011 CONTRACT.md §9: the backend already provides
// daily UTC buckets, one row per (period, currency). This component does
// exactly 2 things to that data, both purely presentational: (1) groups the
// flat array by currency for separate rendering (2) picks each currency's
// OWN max volume to scale its OWN bars to 0-100% height. Neither is a
// business computation -- no bucket is created, merged, or summed that the
// backend didn't already return; a currency's bars are never scaled
// against another currency's numbers. No chart library: plain SVG-free CSS
// bars, matching the "verify existing primitives first" guardrail (§9).
export function TrendChart({ locale, content, trends }: TrendChartProps) {
  if (trends.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{content.empty}</p>
        </CardContent>
      </Card>
    );
  }

  const byCurrency = new Map<string, ReportTrendPoint[]>();
  for (const point of trends) {
    const existing = byCurrency.get(point.currency);
    if (existing) {
      existing.push(point);
    } else {
      byCurrency.set(point.currency, [point]);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {[...byCurrency.entries()].map(([currency, points]) => {
          // period is "yyyy-mm-dd" -- lexicographic sort IS chronological
          // sort for this format, no date parsing needed.
          const sorted = [...points].sort((a, b) => a.period.localeCompare(b.period));
          const maxVolume = Math.max(...sorted.map((point) => Number(point.volume)));
          return (
            <div key={currency}>
              <p className="mb-2 font-heading text-sm font-semibold text-foreground">{currency}</p>
              <div
                className="flex items-end gap-1"
                style={{ height: CHART_HEIGHT }}
                role="img"
                aria-label={`${content.title} — ${currency}`}
              >
                {sorted.map((point) => {
                  const volume = Number(point.volume);
                  const heightPct = maxVolume > 0 ? Math.max((volume / maxVolume) * 100, 2) : 2;
                  return (
                    <div
                      key={point.period}
                      className="min-w-2 flex-1 rounded-t-sm bg-primary/70"
                      style={{ height: `${heightPct}%` }}
                      title={`${point.period} · ${point.transactionCount} · ${formatCurrency(locale, point.volume, currency)}`}
                    />
                  );
                })}
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{sorted[0]?.period}</span>
                {sorted.length > 1 && <span>{sorted[sorted.length - 1]?.period}</span>}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
