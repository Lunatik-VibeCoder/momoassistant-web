import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TrendChart } from "@/components/reports/trend-chart";
import { getReportsContent } from "@/content/reports";
import type { ReportTrendPoint } from "@/lib/mcp-client";

const content = getReportsContent("en").trend;

describe("TrendChart", () => {
  it("renders the empty state when there are no trend points", () => {
    render(<TrendChart locale="en" content={content} trends={[]} />);
    expect(screen.getByText(content.empty)).toBeInTheDocument();
  });

  it("renders one chart section per currency, never a merged one", () => {
    const trends: ReportTrendPoint[] = [
      { period: "2026-09-01", currency: "GHS", transactionCount: 2, volume: "150.00" },
      { period: "2026-09-01", currency: "XOF", transactionCount: 1, volume: "9000.00" },
    ];
    render(<TrendChart locale="en" content={content} trends={trends} />);
    expect(screen.getByText("GHS")).toBeInTheDocument();
    expect(screen.getByText("XOF")).toBeInTheDocument();
    // Each currency's series is its own labeled chart region (role="img").
    expect(screen.getByRole("img", { name: /GHS/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /XOF/ })).toBeInTheDocument();
  });

  it("scales a currency's bars against its OWN max volume only, never another currency's", () => {
    // GHS has 2 points (100, 50); XOF has 1 point (9000). If XOF's volume
    // leaked into GHS's scale, GHS's tallest bar would collapse to ~1%.
    const trends: ReportTrendPoint[] = [
      { period: "2026-09-01", currency: "GHS", transactionCount: 1, volume: "100.00" },
      { period: "2026-09-02", currency: "GHS", transactionCount: 1, volume: "50.00" },
      { period: "2026-09-01", currency: "XOF", transactionCount: 1, volume: "9000.00" },
    ];
    render(<TrendChart locale="en" content={content} trends={trends} />);
    const ghsChart = screen.getByRole("img", { name: /GHS/ });
    const tallestGhsBar = ghsChart.querySelector("div");
    expect(tallestGhsBar).toHaveStyle({ height: "100%" });
  });

  it("renders bars in chronological order (period sorted ascending)", () => {
    const trends: ReportTrendPoint[] = [
      { period: "2026-09-03", currency: "GHS", transactionCount: 1, volume: "10.00" },
      { period: "2026-09-01", currency: "GHS", transactionCount: 1, volume: "20.00" },
      { period: "2026-09-02", currency: "GHS", transactionCount: 1, volume: "30.00" },
    ];
    render(<TrendChart locale="en" content={content} trends={trends} />);
    // The axis labels shown are first/last of the sorted series.
    expect(screen.getByText("2026-09-01")).toBeInTheDocument();
    expect(screen.getByText("2026-09-03")).toBeInTheDocument();
  });
});
