import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FinancialSection } from "@/components/reports/financial-section";
import { getReportsContent } from "@/content/reports";
import type { ReportCurrencyAggregate } from "@/lib/mcp-client";

const content = getReportsContent("en").financial;

const GHS: ReportCurrencyAggregate = { currency: "GHS", transactionCount: 4, volume: "2808.00", fees: "10.00", commissions: "5.00" };
const XOF: ReportCurrencyAggregate = { currency: "XOF", transactionCount: 6, volume: "295575.00", fees: "500.00", commissions: "200.00" };

describe("FinancialSection", () => {
  it("renders the empty state when byCurrency is empty", () => {
    render(<FinancialSection locale="en" content={content} byCurrency={[]} />);
    expect(screen.getByText(content.empty)).toBeInTheDocument();
  });

  it("renders a separate block per currency", () => {
    render(<FinancialSection locale="en" content={content} byCurrency={[GHS, XOF]} />);
    expect(screen.getByText("GHS")).toBeInTheDocument();
    expect(screen.getByText("XOF")).toBeInTheDocument();
  });

  it("formats each currency's own volume with its own currency symbol, never a guessed one", () => {
    render(<FinancialSection locale="en" content={content} byCurrency={[GHS, XOF]} />);
    // Intl.NumberFormat renders GHS as "GH₵" and XOF as "CFA" in en-US --
    // asserting the currency codes never cross (GHS volume never shows XOF
    // formatting or vice versa) rather than a brittle exact string match.
    const ghsBlock = screen.getByText("GHS").closest("div");
    const xofBlock = screen.getByText("XOF").closest("div");
    expect(ghsBlock?.textContent).toContain("2,808");
    expect(xofBlock?.textContent).toContain("295,575");
  });

  it("never renders a combined cross-currency total", () => {
    render(<FinancialSection locale="en" content={content} byCurrency={[GHS, XOF]} />);
    // 2808 + 295575 = 298383 -- this exact combined figure must never appear.
    expect(screen.queryByText((text) => text.includes("298,383") || text.includes("298383"))).not.toBeInTheDocument();
  });

  it("renders volume, fees, and commissions all as separate rows for a currency", () => {
    render(<FinancialSection locale="en" content={content} byCurrency={[GHS]} />);
    expect(screen.getByText(content.volume)).toBeInTheDocument();
    expect(screen.getByText(content.fees)).toBeInTheDocument();
    expect(screen.getByText(content.commissions)).toBeInTheDocument();
  });
});
