import { NavLink } from "@/components/shared/nav-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ReportsContent } from "@/content/reports";
import type { AppLocale } from "@/i18n/routing";
import { REPORT_CURRENCIES, REPORT_STATUSES, type ParsedReportsQuery } from "@/lib/reports-query";

interface FiltersFormProps {
  locale: AppLocale;
  content: ReportsContent["filters"];
  query: ParsedReportsQuery;
}

const SELECT_CLASSNAME =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

// WS-013 Phase 7 -- WS-011 CONTRACT.md §7.3: only status/transactionType/
// currency are wired here. `status`/`currency` are real closed enums
// (backend @IsIn) so they're real <select> dropdowns; `transactionType` has
// NO enum constraint on the backend (plain @IsString, no @IsIn) -- rendered
// as free text rather than inventing a closed list of guessed values.
// Station filtering is a real backend capability (stationId) but is
// deliberately NOT built in this V1: populating a station picker needs a
// separate workspace->station listing with its own permission boundary,
// out of scope for this sprint per its own "don't overbuild" guardrail --
// flagged explicitly in the WS-013 completion report, not silently dropped.
// A native GET form, no client JS: submitting IS the navigation.
export function FiltersForm({ locale, content, query }: FiltersFormProps) {
  return (
    <form
      method="GET"
      action={`/${locale}/reports`}
      className="flex flex-wrap items-end gap-3 rounded-lg border border-input p-3"
      aria-label={content.title}
    >
      <input type="hidden" name="period" value={query.period} />
      {query.period === "CUSTOM" && query.startDate && (
        <input type="hidden" name="startDate" value={query.startDate} />
      )}
      {query.period === "CUSTOM" && query.endDate && (
        <input type="hidden" name="endDate" value={query.endDate} />
      )}

      <div className="flex flex-col gap-1">
        <Label htmlFor="reports-filter-status" className="text-xs text-muted-foreground">
          {content.status}
        </Label>
        <select
          id="reports-filter-status"
          name="status"
          defaultValue={query.status ?? ""}
          className={SELECT_CLASSNAME}
        >
          <option value="">{content.allStatuses}</option>
          {REPORT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="reports-filter-type" className="text-xs text-muted-foreground">
          {content.transactionType}
        </Label>
        <Input
          id="reports-filter-type"
          type="text"
          name="transactionType"
          defaultValue={query.transactionType ?? ""}
          placeholder={content.transactionTypePlaceholder}
          className="w-40"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="reports-filter-currency" className="text-xs text-muted-foreground">
          {content.currency}
        </Label>
        <select
          id="reports-filter-currency"
          name="currency"
          defaultValue={query.currency ?? ""}
          className={SELECT_CLASSNAME}
        >
          <option value="">{content.allCurrencies}</option>
          {REPORT_CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" size="sm">
        {content.apply}
      </Button>
      <NavLink
        href={`/reports?period=${query.period}${
          query.period === "CUSTOM" && query.startDate && query.endDate
            ? `&startDate=${query.startDate}&endDate=${query.endDate}`
            : ""
        }`}
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        {content.clear}
      </NavLink>
    </form>
  );
}
