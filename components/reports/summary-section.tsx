import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReportsContent } from "@/content/reports";
import type { ReportSummary } from "@/lib/mcp-client";
import { cn } from "@/lib/utils";

interface SummarySectionProps {
  content: ReportsContent["summary"];
  summary: ReportSummary;
}

interface StatProps {
  label: string;
  value: number;
  destructive?: boolean;
}

function Stat({ label, value, destructive }: StatProps) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "font-heading text-2xl font-medium text-foreground",
          destructive && value > 0 && "text-destructive",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

// WS-013 Phase 4 -- every number here is read directly off ReportSummary,
// never recomputed (WS-011 CONTRACT.md §8: the backend is the sole source
// of truth for transactionCount/byStatus/successRate). BALANCE_CHECK/
// COMMISSION_CHECK are already excluded server-side before this component
// ever sees the response -- nothing to filter here.
export function SummarySection({ content, summary }: SummarySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
          <Stat label={content.transactionCount} value={summary.transactionCount} />
          <Stat label={content.success} value={summary.byStatus.SUCCESS} />
          <Stat label={content.failed} value={summary.byStatus.FAILED} destructive />
          <Stat label={content.pending} value={summary.byStatus.PENDING} />
          <Stat label={content.cancelled} value={summary.byStatus.CANCELLED} />
        </dl>
        <p className="mt-4 text-sm text-muted-foreground">
          {content.successRate}:{" "}
          <span className="font-medium text-foreground">
            {summary.successRate === null
              ? content.successRateUnavailable
              : `${(summary.successRate * 100).toFixed(1)}%`}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
