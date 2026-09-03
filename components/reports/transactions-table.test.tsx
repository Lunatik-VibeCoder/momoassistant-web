import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TransactionsTable } from "@/components/reports/transactions-table";
import { getReportsContent } from "@/content/reports";
import type { ReportTransaction } from "@/lib/mcp-client";

const content = getReportsContent("en").table;

function makeTransaction(overrides: Partial<ReportTransaction> = {}): ReportTransaction {
  return {
    transactionUid: "tx-1",
    status: "SUCCESS",
    transactionType: "CASH_IN",
    amount: "100.00",
    currency: "GHS",
    fee: "0.00",
    commission: "0.00",
    stationId: null,
    stationName: "Accra Station",
    reference: "MA-260903-AAAAAA",
    createdAt: "2026-09-03T10:00:00.000Z",
    ...overrides,
  };
}

describe("TransactionsTable", () => {
  it("renders the empty state when there are no transactions (never a raw empty table)", () => {
    render(<TransactionsTable locale="en" content={content} transactions={[]} />);
    expect(screen.getByText(content.empty)).toBeInTheDocument();
  });

  it("renders a transaction's amount together with its currency (never a bare number)", () => {
    render(<TransactionsTable locale="en" content={content} transactions={[makeTransaction()]} />);
    // Rendered twice: once in the lg: table, once in the mobile card list --
    // both come from the same data, getAllByText confirms both exist.
    expect(screen.getAllByText((text) => text.includes("100.00") && text.includes("GHS")).length).toBeGreaterThan(0);
  });

  it("renders an explicit '—' when currency is null, never a guessed currency", () => {
    render(
      <TransactionsTable
        locale="en"
        content={content}
        transactions={[makeTransaction({ currency: null, amount: "50.00" })]}
      />,
    );
    expect(screen.getAllByText((text) => text.includes("50.00") && text.includes("—")).length).toBeGreaterThan(0);
  });

  it("shows BALANCE_CHECK/COMMISSION_CHECK rows -- the list endpoint keeps them visible (WS-011 CONTRACT.md §7), unlike summary/trends", () => {
    render(
      <TransactionsTable
        locale="en"
        content={content}
        transactions={[
          makeTransaction({ transactionUid: "tx-bc", transactionType: "BALANCE_CHECK" }),
          makeTransaction({ transactionUid: "tx-cc", transactionType: "COMMISSION_CHECK" }),
        ]}
      />,
    );
    expect(screen.getAllByText("BALANCE_CHECK").length).toBeGreaterThan(0);
    expect(screen.getAllByText("COMMISSION_CHECK").length).toBeGreaterThan(0);
  });

  it("falls back to the station-unavailable label when stationName is null", () => {
    render(
      <TransactionsTable locale="en" content={content} transactions={[makeTransaction({ stationName: null })]} />,
    );
    expect(screen.getAllByText(content.stationUnavailable).length).toBeGreaterThan(0);
  });

  it("renders each transaction's own reference and status", () => {
    render(
      <TransactionsTable
        locale="en"
        content={content}
        transactions={[makeTransaction({ status: "FAILED", reference: "MA-999" })]}
      />,
    );
    expect(screen.getAllByText("FAILED").length).toBeGreaterThan(0);
    expect(screen.getAllByText("MA-999").length).toBeGreaterThan(0);
  });
});
