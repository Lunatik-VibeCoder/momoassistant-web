import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ReportsContent } from "@/content/reports";
import type { AppLocale } from "@/i18n/routing";
import type { ParsedReportsQuery } from "@/lib/reports-query";

interface CustomRangeFormProps {
  locale: AppLocale;
  content: ReportsContent["period"];
  query: ParsedReportsQuery;
}

// WS-013 Phase 3 -- a native GET form, no client JS. startDate/endDate in
// the URL are plain calendar dates (yyyy-mm-dd) as picked in the browser --
// the [start,end) UTC-instant translation (lib/reports-query.ts's
// toApiQueryParams, including the +1-day exclusive-end adjustment) happens
// once, server-side, right before any WS-012 call. The URL itself stays
// human-readable rather than carrying a pre-computed instant.
export function CustomRangeForm({ locale, content, query }: CustomRangeFormProps) {
  return (
    <form
      method="GET"
      action={`/${locale}/reports`}
      className="flex flex-wrap items-end gap-3 rounded-lg border border-input p-3"
    >
      <input type="hidden" name="period" value="CUSTOM" />
      {query.status && <input type="hidden" name="status" value={query.status} />}
      {query.transactionType && (
        <input type="hidden" name="transactionType" value={query.transactionType} />
      )}
      {query.currency && <input type="hidden" name="currency" value={query.currency} />}

      <div className="flex flex-col gap-1">
        <Label htmlFor="reports-custom-from" className="text-xs text-muted-foreground">
          {content.customFrom}
        </Label>
        <Input
          id="reports-custom-from"
          type="date"
          name="startDate"
          defaultValue={query.period === "CUSTOM" ? query.startDate : undefined}
          className="w-40"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="reports-custom-to" className="text-xs text-muted-foreground">
          {content.customTo}
        </Label>
        <Input
          id="reports-custom-to"
          type="date"
          name="endDate"
          defaultValue={query.period === "CUSTOM" ? query.endDate : undefined}
          className="w-40"
        />
      </div>
      <Button type="submit" variant={query.period === "CUSTOM" ? "default" : "outline"} size="sm">
        {content.apply}
      </Button>
    </form>
  );
}
