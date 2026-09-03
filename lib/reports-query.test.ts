import { describe, expect, it } from "vitest";

import {
  buildReportsExportHref,
  buildReportsHref,
  customDateToEndIsoExclusive,
  customDateToStartIso,
  parseBeforeStack,
  parseReportsSearchParams,
  popCursorForPreviousPage,
  pushCursorForNextPage,
  toApiQueryParams,
} from "@/lib/reports-query";

describe("parseReportsSearchParams", () => {
  it("defaults to LAST_7_DAYS when no period is given", () => {
    expect(parseReportsSearchParams({}).period).toBe("LAST_7_DAYS");
  });

  it("defaults to LAST_7_DAYS for an unrecognized period value (never invents a period)", () => {
    expect(parseReportsSearchParams({ period: "THIS_QUARTER" }).period).toBe("LAST_7_DAYS");
  });

  it.each(["TODAY", "LAST_7_DAYS", "LAST_30_DAYS"] as const)("accepts the real period %s", (period) => {
    expect(parseReportsSearchParams({ period }).period).toBe(period);
  });

  it("accepts CUSTOM with both startDate and endDate", () => {
    const result = parseReportsSearchParams({ period: "CUSTOM", startDate: "2026-08-01", endDate: "2026-08-31" });
    expect(result).toEqual({ period: "CUSTOM", startDate: "2026-08-01", endDate: "2026-08-31" });
  });

  it("falls back to the default period when CUSTOM is missing startDate (never invents a boundary)", () => {
    const result = parseReportsSearchParams({ period: "CUSTOM", endDate: "2026-08-31" });
    expect(result.period).toBe("LAST_7_DAYS");
    expect(result.startDate).toBeUndefined();
    expect(result.endDate).toBeUndefined();
  });

  it("falls back to the default period when CUSTOM is missing endDate", () => {
    const result = parseReportsSearchParams({ period: "CUSTOM", startDate: "2026-08-01" });
    expect(result.period).toBe("LAST_7_DAYS");
  });

  it("never carries startDate/endDate on a non-CUSTOM period, even if present in the URL", () => {
    const result = parseReportsSearchParams({ period: "TODAY", startDate: "2026-08-01", endDate: "2026-08-31" });
    expect(result.startDate).toBeUndefined();
    expect(result.endDate).toBeUndefined();
  });

  it.each(["PENDING", "SUCCESS", "FAILED", "CANCELLED"] as const)("accepts the real status %s", (status) => {
    expect(parseReportsSearchParams({ status }).status).toBe(status);
  });

  it("drops an unrecognized status (never invents one)", () => {
    expect(parseReportsSearchParams({ status: "REFUNDED" }).status).toBeUndefined();
  });

  it.each(["GHS", "XOF"] as const)("accepts the real currency %s", (currency) => {
    expect(parseReportsSearchParams({ currency }).currency).toBe(currency);
  });

  it("drops an unrecognized currency (never invents one, never mixes)", () => {
    expect(parseReportsSearchParams({ currency: "USD" }).currency).toBeUndefined();
  });

  it("passes transactionType through as free text (no @IsIn constraint on the real backend DTO)", () => {
    expect(parseReportsSearchParams({ transactionType: "CASH_IN" }).transactionType).toBe("CASH_IN");
  });

  it("trims and drops a blank transactionType", () => {
    expect(parseReportsSearchParams({ transactionType: "   " }).transactionType).toBeUndefined();
  });

  it("passes cursor through untouched (never generates one itself)", () => {
    expect(parseReportsSearchParams({ cursor: "abc123" }).cursor).toBe("abc123");
  });
});

describe("customDateToStartIso / customDateToEndIsoExclusive", () => {
  it("turns a calendar date into UTC midnight for the start boundary", () => {
    expect(customDateToStartIso("2026-08-01")).toBe("2026-08-01T00:00:00.000Z");
  });

  it("turns a calendar date into the FOLLOWING day's UTC midnight for the exclusive end boundary", () => {
    expect(customDateToEndIsoExclusive("2026-08-01")).toBe("2026-08-02T00:00:00.000Z");
  });

  it("rolls over a month boundary correctly", () => {
    expect(customDateToEndIsoExclusive("2026-08-31")).toBe("2026-09-01T00:00:00.000Z");
  });

  it("rolls over a year boundary correctly", () => {
    expect(customDateToEndIsoExclusive("2026-12-31")).toBe("2027-01-01T00:00:00.000Z");
  });
});

describe("toApiQueryParams", () => {
  it("applies the UTC instant translation only for CUSTOM", () => {
    const api = toApiQueryParams({ period: "CUSTOM", startDate: "2026-08-01", endDate: "2026-08-03" });
    expect(api).toEqual({
      period: "CUSTOM",
      status: undefined,
      transactionType: undefined,
      currency: undefined,
      startDate: "2026-08-01T00:00:00.000Z",
      endDate: "2026-08-04T00:00:00.000Z",
    });
  });

  it("never sends startDate/endDate for a preset period", () => {
    const api = toApiQueryParams({ period: "LAST_7_DAYS" });
    expect(api.startDate).toBeUndefined();
    expect(api.endDate).toBeUndefined();
  });

  it("passes status/transactionType/currency through unchanged", () => {
    const api = toApiQueryParams({
      period: "TODAY",
      status: "SUCCESS",
      transactionType: "CASH_IN",
      currency: "GHS",
    });
    expect(api.status).toBe("SUCCESS");
    expect(api.transactionType).toBe("CASH_IN");
    expect(api.currency).toBe("GHS");
  });
});

describe("buildReportsHref", () => {
  it("returns the bare path when there are no params", () => {
    expect(buildReportsHref({}, {})).toBe("/reports");
  });

  it("applies an override on top of current params", () => {
    expect(buildReportsHref({ period: "TODAY" }, { period: "LAST_30_DAYS" })).toBe(
      "/reports?period=LAST_30_DAYS",
    );
  });

  it("preserves unrelated current params", () => {
    const href = buildReportsHref({ period: "TODAY", currency: "GHS" }, { period: "LAST_30_DAYS" });
    expect(href).toContain("period=LAST_30_DAYS");
    expect(href).toContain("currency=GHS");
  });

  it("drops cursor by default when switching period/filters (resets to page 1)", () => {
    const href = buildReportsHref({ period: "TODAY", cursor: "xyz" }, { period: "LAST_30_DAYS" });
    expect(href).not.toContain("cursor=");
  });

  it("drops before by default alongside cursor", () => {
    const href = buildReportsHref({ period: "TODAY", cursor: "xyz", before: "abc" }, { status: "SUCCESS" });
    expect(href).not.toContain("cursor=");
    expect(href).not.toContain("before=");
  });

  it("keeps cursor when the override explicitly sets it (pagination)", () => {
    const href = buildReportsHref({ period: "TODAY" }, { cursor: "next-page-token" });
    expect(href).toContain("cursor=next-page-token");
    expect(href).toContain("period=TODAY");
  });

  it("omits empty-string overrides from the URL (used by 'back to page 1')", () => {
    const href = buildReportsHref({ period: "TODAY", cursor: "xyz", before: "abc" }, { cursor: "", before: "" });
    expect(href).toBe("/reports?period=TODAY");
  });
});

describe("buildReportsExportHref", () => {
  it("always drops cursor/before, even when present in current params", () => {
    const href = buildReportsExportHref({ period: "TODAY", cursor: "xyz", before: "abc", currency: "GHS" });
    expect(href).not.toContain("cursor=");
    expect(href).not.toContain("before=");
    expect(href).toContain("period=TODAY");
    expect(href).toContain("currency=GHS");
  });

  it("returns the bare export path when there are no filters", () => {
    expect(buildReportsExportHref({})).toBe("/reports/export");
  });
});

describe("cursor pagination stack (parseBeforeStack / pushCursorForNextPage / popCursorForPreviousPage)", () => {
  it("parses an empty stack from undefined", () => {
    expect(parseBeforeStack(undefined)).toEqual([]);
  });

  it("has no previous page from page 1 (empty before)", () => {
    expect(popCursorForPreviousPage(undefined)).toBeNull();
  });

  it("going from page 1 to page 2 pushes a page-1 marker, not the (nonexistent) page-1 cursor", () => {
    const { cursor, before } = pushCursorForNextPage(undefined, undefined, "page2-cursor");
    expect(cursor).toBe("page2-cursor");
    expect(parseBeforeStack(before)).toHaveLength(1);
  });

  it("going back from page 2 to page 1 yields an empty cursor (no cursor param) and an empty stack", () => {
    const page2 = pushCursorForNextPage(undefined, undefined, "page2-cursor");
    const previous = popCursorForPreviousPage(page2.before);
    expect(previous).toEqual({ cursor: "", before: "" });
  });

  it("round-trips through 3 pages forward then back to page 1 without losing a cursor", () => {
    const page2 = pushCursorForNextPage(undefined, undefined, "cursor-2");
    const page3 = pushCursorForNextPage(page2.cursor, page2.before, "cursor-3");
    const page4 = pushCursorForNextPage(page3.cursor, page3.before, "cursor-4");

    const backTo3 = popCursorForPreviousPage(page4.before);
    expect(backTo3?.cursor).toBe("cursor-3");

    const backTo2 = popCursorForPreviousPage(backTo3?.before);
    expect(backTo2?.cursor).toBe("cursor-2");

    const backTo1 = popCursorForPreviousPage(backTo2?.before);
    expect(backTo1).toEqual({ cursor: "", before: "" });

    expect(popCursorForPreviousPage(backTo1?.before)).toBeNull();
  });
});
