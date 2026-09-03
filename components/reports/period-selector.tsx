import { NavLink } from "@/components/shared/nav-link";
import type { ReportsContent } from "@/content/reports";
import type { ReportPeriod } from "@/lib/mcp-client";
import { buildReportsHref, type ReportsSearchParams } from "@/lib/reports-query";
import { cn } from "@/lib/utils";

interface PeriodSelectorProps {
  content: ReportsContent["period"];
  currentPeriod: ReportPeriod;
  searchParams: ReportsSearchParams;
}

const PRESETS: { period: Extract<ReportPeriod, "TODAY" | "LAST_7_DAYS" | "LAST_30_DAYS">; labelKey: "today" | "last7Days" | "last30Days" }[] = [
  { period: "TODAY", labelKey: "today" },
  { period: "LAST_7_DAYS", labelKey: "last7Days" },
  { period: "LAST_30_DAYS", labelKey: "last30Days" },
];

// WS-013 Phase 3 -- TODAY/LAST_7_DAYS/LAST_30_DAYS are instant navigation
// (pure Links, cursor/filters preserved via buildReportsHref, cursor always
// reset on period change). No client JS: the period IS the URL.
export function PeriodSelector({ content, currentPeriod, searchParams }: PeriodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={content.today}>
      {PRESETS.map(({ period, labelKey }) => {
        const active = currentPeriod === period;
        return (
          <NavLink
            key={period}
            href={buildReportsHref(searchParams, { period })}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex h-8 items-center rounded-lg border px-3 text-sm font-medium transition-colors",
              active
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-input text-foreground hover:bg-muted",
            )}
          >
            {content[labelKey]}
          </NavLink>
        );
      })}
    </div>
  );
}
