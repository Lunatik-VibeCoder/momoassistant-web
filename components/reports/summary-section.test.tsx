import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SummarySection } from "@/components/reports/summary-section";
import { getReportsContent } from "@/content/reports";
import type { ReportSummary } from "@/lib/mcp-client";

const content = getReportsContent("en").summary;

function makeSummary(overrides: Partial<ReportSummary> = {}): ReportSummary {
  return {
    transactionCount: 10,
    byStatus: { SUCCESS: 7, FAILED: 2, PENDING: 1, CANCELLED: 0 },
    byCurrency: [],
    successRate: 0.7777777777777778,
    ...overrides,
  };
}

describe("SummarySection", () => {
  it("renders every byStatus bucket exactly as given, never recomputed", () => {
    render(<SummarySection content={content} summary={makeSummary()} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders successRate as a percentage rounded to 1 decimal, never re-derived from byStatus", () => {
    render(<SummarySection content={content} summary={makeSummary()} />);
    expect(screen.getByText("77.8%")).toBeInTheDocument();
  });

  it("renders the explicit 'unavailable' label when successRate is null, never 0% or NaN%", () => {
    render(<SummarySection content={content} summary={makeSummary({ successRate: null })} />);
    expect(screen.getByText(content.successRateUnavailable)).toBeInTheDocument();
    expect(screen.queryByText("0.0%")).not.toBeInTheDocument();
    expect(screen.queryByText("NaN%")).not.toBeInTheDocument();
  });

  it("renders a 0-value stat as 0, not as an empty/hidden field", () => {
    render(<SummarySection content={content} summary={makeSummary({ byStatus: { SUCCESS: 0, FAILED: 0, PENDING: 0, CANCELLED: 0 } })} />);
    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(4);
  });
});
