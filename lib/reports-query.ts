import type { ReportCurrency, ReportPeriod, ReportQueryParams, ReportTransactionStatus } from "@/lib/mcp-client";

// WS-013 (Report Hub) -- this whole page is URL-driven, no client-side data
// fetching anywhere (see PRE-FLIGHT: every other Hub page is a plain async
// server component, no SWR/React-Query precedent exists in this repo).
// Every function here is pure and testable without a server/DOM.

export const REPORT_PERIODS: readonly ReportPeriod[] = ["TODAY", "LAST_7_DAYS", "LAST_30_DAYS", "CUSTOM"];
export const REPORT_STATUSES: readonly ReportTransactionStatus[] = [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "CANCELLED",
];
export const REPORT_CURRENCIES: readonly ReportCurrency[] = ["GHS", "XOF"];

// WS-011 CONTRACT.md §6.2 -- LOCKED default period.
export const DEFAULT_REPORT_PERIOD: ReportPeriod = "LAST_7_DAYS";

export interface ReportsSearchParams {
  period?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  transactionType?: string;
  currency?: string;
  cursor?: string;
  before?: string;
}

export interface ParsedReportsQuery {
  period: ReportPeriod;
  startDate?: string;
  endDate?: string;
  status?: ReportTransactionStatus;
  transactionType?: string;
  currency?: ReportCurrency;
  cursor?: string;
}

function isReportPeriod(value: string | undefined): value is ReportPeriod {
  return !!value && (REPORT_PERIODS as readonly string[]).includes(value);
}

function isReportStatus(value: string | undefined): value is ReportTransactionStatus {
  return !!value && (REPORT_STATUSES as readonly string[]).includes(value);
}

function isReportCurrency(value: string | undefined): value is ReportCurrency {
  return !!value && (REPORT_CURRENCIES as readonly string[]).includes(value);
}

// WS-011 CONTRACT.md §6.2 -- CUSTOM requires startDate/endDate. Never
// invents a boundary the user didn't provide: a CUSTOM period missing
// either date falls back to the locked default period instead of sending
// the backend a request it would reject with 400. The backend remains the
// sole authority on what's a valid [start,end) range -- this function only
// decides whether to ask it.
export function parseReportsSearchParams(searchParams: ReportsSearchParams): ParsedReportsQuery {
  const requestedPeriod = isReportPeriod(searchParams.period) ? searchParams.period : DEFAULT_REPORT_PERIOD;
  const result: ParsedReportsQuery = { period: requestedPeriod };

  if (requestedPeriod === "CUSTOM") {
    if (searchParams.startDate && searchParams.endDate) {
      result.startDate = searchParams.startDate;
      result.endDate = searchParams.endDate;
    } else {
      result.period = DEFAULT_REPORT_PERIOD;
    }
  }

  if (isReportStatus(searchParams.status)) {
    result.status = searchParams.status;
  }
  const trimmedType = searchParams.transactionType?.trim();
  if (trimmedType) {
    result.transactionType = trimmedType;
  }
  if (isReportCurrency(searchParams.currency)) {
    result.currency = searchParams.currency;
  }
  if (searchParams.cursor) {
    result.cursor = searchParams.cursor;
  }

  return result;
}

// A calendar date from <input type="date"> (yyyy-mm-dd, no time/TZ) becomes
// a UTC midnight instant -- the one client-side date computation this
// sprint's guardrails allow: translating a browser-native calendar value
// into the ISO instant the backend's CUSTOM period already expects, never
// recomputing the business meaning of a period (WS-011 CONTRACT.md §6.1's
// [start,end) UTC rule stays entirely server-owned).
export function customDateToStartIso(dateOnly: string): string {
  return `${dateOnly}T00:00:00.000Z`;
}

// The "to" boundary is exclusive server-side (half-open [start,end)), so a
// user picking "Sep 3" to mean "through the end of Sep 3" needs the instant
// sent to the backend to be midnight of the FOLLOWING day -- otherwise the
// entire picked day would be excluded. Pure UTC date arithmetic, never
// touches local timezone.
export function customDateToEndIsoExclusive(dateOnly: string): string {
  const date = new Date(`${dateOnly}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString();
}

// The single point where a ParsedReportsQuery (URL-shaped, human-readable
// calendar dates for CUSTOM) becomes a ReportQueryParams (API-shaped, full
// UTC instants) -- called once per request, reused identically by the page
// and the CSV export route, so the two can never disagree about what a
// given URL actually requested.
export function toApiQueryParams(parsed: ParsedReportsQuery): ReportQueryParams {
  const api: ReportQueryParams = {
    period: parsed.period,
    status: parsed.status,
    transactionType: parsed.transactionType,
    currency: parsed.currency,
  };
  if (parsed.period === "CUSTOM" && parsed.startDate && parsed.endDate) {
    api.startDate = customDateToStartIso(parsed.startDate);
    api.endDate = customDateToEndIsoExclusive(parsed.endDate);
  }
  return api;
}

function omitEmpty(params: ReportsSearchParams): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      result[key] = value;
    }
  }
  return result;
}

// Builds the query string for a Report Hub navigation link. `overrides`
// replaces/removes keys on top of `current`; every key not explicitly part
// of `overrides` is preserved. `cursor`/`before` are dropped by default on
// every navigation EXCEPT when `overrides` itself sets them (pagination) --
// changing period/filters always resets pagination to page 1, matching
// every other paginated list's expected behavior.
export function buildReportsHref(
  current: ReportsSearchParams,
  overrides: Partial<ReportsSearchParams>,
): string {
  const merged: ReportsSearchParams = { ...current, ...overrides };
  if (!("cursor" in overrides)) {
    delete merged.cursor;
  }
  if (!("before" in overrides)) {
    delete merged.before;
  }

  const search = new URLSearchParams(omitEmpty(merged));
  const query = search.toString();
  return query ? `/reports?${query}` : "/reports";
}

// WS-011 CONTRACT.md §12.1 -- export always covers the full matching set
// for the current period/filters, never a single page: cursor/before are
// dropped unconditionally, not just "unless overridden" like
// buildReportsHref above.
export function buildReportsExportHref(current: ReportsSearchParams): string {
  const rest: ReportsSearchParams = {
    period: current.period,
    startDate: current.startDate,
    endDate: current.endDate,
    status: current.status,
    transactionType: current.transactionType,
    currency: current.currency,
  };
  const search = new URLSearchParams(omitEmpty(rest));
  const query = search.toString();
  return query ? `/reports/export?${query}` : "/reports/export";
}

// WS-011 CONTRACT.md §7.4 -- the backend only ever hands out a forward
// cursor (createdAt DESC, id DESC), never a reverse one. "Previous page" is
// reconstructed client-side as a stack of cursors this page has already
// visited (`before`, comma-joined -- cursor's own base64url alphabet never
// contains a comma, confirmed safe to join on) -- never a cursor this page
// invents itself, only ones the backend already issued via nextCursor.
//
// Page 1 has no cursor at all (the param is simply absent), which can't be
// pushed onto the stack as an empty string -- split(",") on a trailing/
// leading empty segment is exactly the kind of off-by-one that silently
// breaks "go back to page 1" from page 2. PAGE_ONE_MARKER stands in for
// that empty cursor so the stack only ever holds non-empty tokens.
const PAGE_ONE_MARKER = "~";

export function parseBeforeStack(before: string | undefined): string[] {
  return before ? before.split(",") : [];
}

export function pushCursorForNextPage(
  currentCursor: string | undefined,
  before: string | undefined,
  nextCursor: string,
): { cursor: string; before: string } {
  const stack = parseBeforeStack(before);
  stack.push(currentCursor ?? PAGE_ONE_MARKER);
  return { cursor: nextCursor, before: stack.join(",") };
}

// Returns null when there's no previous page to go back to (already on
// page 1) -- the caller hides the "Previous" control in that case. Returns
// cursor: "" for "go back to page 1" -- buildReportsHref's omitEmpty drops
// an empty-string override from the URL, which is exactly "no cursor param".
export function popCursorForPreviousPage(
  before: string | undefined,
): { cursor: string; before: string } | null {
  const stack = parseBeforeStack(before);
  if (stack.length === 0) {
    return null;
  }
  const token = stack.pop() as string;
  return { cursor: token === PAGE_ONE_MARKER ? "" : token, before: stack.join(",") };
}
