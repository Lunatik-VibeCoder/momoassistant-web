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
    counterpartyName: null,
    counterpartyPhone: null,
    externalSubtype: null,
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

  // EXT-TX-UNIFICATION-001 -- counterpartyName/counterpartyPhone, each
  // independently nullable, never a "null"/"N/A" placeholder.
  describe("counterparty identity (EXT-TX-UNIFICATION-001)", () => {
    it("renders name and phone together when both are known", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ counterpartyName: "David Koku Togbe", counterpartyPhone: "+22890123456" }),
          ]}
        />,
      );
      expect(
        screen.getAllByText((text) => text.includes("David Koku Togbe") && text.includes("+22890123456"))
          .length,
      ).toBeGreaterThan(0);
    });

    it("renders name only when phone is unknown", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[makeTransaction({ counterpartyName: "Angela Donkor", counterpartyPhone: null })]}
        />,
      );
      expect(screen.getAllByText("Angela Donkor").length).toBeGreaterThan(0);
    });

    it("renders phone only when name is unknown", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[makeTransaction({ counterpartyName: null, counterpartyPhone: "+233241234567" })]}
        />,
      );
      expect(screen.getAllByText("+233241234567").length).toBeGreaterThan(0);
    });

    it("renders neither placeholder text nor a stray separator when both are unknown", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[makeTransaction({ counterpartyName: null, counterpartyPhone: null })]}
        />,
      );
      expect(screen.queryByText(/null/i)).not.toBeInTheDocument();
      expect(screen.queryByText("N/A")).not.toBeInTheDocument();
      expect(screen.queryByText("·")).not.toBeInTheDocument();
    });
  });

  // EXT-TX-UNIFICATION-002 -- ported Android TreasuryDirection semantics,
  // never inferred from amount sign/name/timestamp. transactionType must
  // remain visible alongside the direction, never replaced by it.
  describe("treasury direction (EXT-TX-UNIFICATION-002)", () => {
    it("renders MONEY OUT for CASH_IN, matching Android's TreasuryDirection", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[makeTransaction({ transactionType: "CASH_IN" })]}
        />,
      );
      expect(
        screen.getAllByText((text) => text.includes("MONEY OUT") && text.includes("CASH_IN")).length,
      ).toBeGreaterThan(0);
    });

    it("renders MONEY IN for CASH_OUT, matching Android's TreasuryDirection", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[makeTransaction({ transactionType: "CASH_OUT" })]}
        />,
      );
      expect(
        screen.getAllByText((text) => text.includes("MONEY IN") && text.includes("CASH_OUT")).length,
      ).toBeGreaterThan(0);
    });

    it("renders MONEY OUT for EXTERNAL_TRANSACTION + CASH_IN, transactionType still visible", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ transactionType: "EXTERNAL_TRANSACTION", externalSubtype: "CASH_IN" }),
          ]}
        />,
      );
      expect(
        screen.getAllByText(
          (text) => text.includes("MONEY OUT") && text.includes("EXTERNAL_TRANSACTION"),
        ).length,
      ).toBeGreaterThan(0);
    });

    it("renders MONEY IN for EXTERNAL_TRANSACTION + CASH_OUT", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ transactionType: "EXTERNAL_TRANSACTION", externalSubtype: "CASH_OUT" }),
          ]}
        />,
      );
      expect(
        screen.getAllByText(
          (text) => text.includes("MONEY IN") && text.includes("EXTERNAL_TRANSACTION"),
        ).length,
      ).toBeGreaterThan(0);
    });

    it("renders no direction for EXTERNAL_TRANSACTION with a null subtype -- never guessed", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ transactionType: "EXTERNAL_TRANSACTION", externalSubtype: null }),
          ]}
        />,
      );
      expect(screen.queryByText((text) => text.includes("MONEY IN"))).not.toBeInTheDocument();
      expect(screen.queryByText((text) => text.includes("MONEY OUT"))).not.toBeInTheDocument();
      expect(screen.getAllByText("EXTERNAL_TRANSACTION").length).toBeGreaterThan(0);
    });

    it("renders no direction for a genuinely neutral type (BALANCE_CHECK)", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[makeTransaction({ transactionType: "BALANCE_CHECK" })]}
        />,
      );
      expect(screen.queryByText((text) => text.includes("MONEY IN"))).not.toBeInTheDocument();
      expect(screen.queryByText((text) => text.includes("MONEY OUT"))).not.toBeInTheDocument();
    });
  });

  // WEB-TX-PRESENTATION-003-A -- the sign is derived from the exact same
  // resolveTreasuryDirection() as the direction label above, never a second
  // system and never inferred from the amount string itself.
  describe("signed amounts (WEB-TX-PRESENTATION-003-A)", () => {
    it("prefixes a MONEY_OUT amount with '-' (CASH_IN)", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[makeTransaction({ transactionType: "CASH_IN", amount: "2.00", currency: "XOF" })]}
        />,
      );
      expect(
        screen.getAllByText((text) => text.includes("-2.00") && text.includes("XOF")).length,
      ).toBeGreaterThan(0);
    });

    it("prefixes a MONEY_IN amount with '+' (CASH_OUT)", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[makeTransaction({ transactionType: "CASH_OUT", amount: "221.00", currency: "GHS" })]}
        />,
      );
      expect(
        screen.getAllByText((text) => text.includes("+221.00") && text.includes("GHS")).length,
      ).toBeGreaterThan(0);
    });

    it("prefixes a MONEY_OUT amount with '-' for EXTERNAL_TRANSACTION + CASH_IN subtype", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[
            makeTransaction({
              transactionType: "EXTERNAL_TRANSACTION",
              externalSubtype: "CASH_IN",
              amount: "10225.00",
              currency: "XOF",
            }),
          ]}
        />,
      );
      expect(
        screen.getAllByText((text) => text.includes("-10225.00") && text.includes("XOF")).length,
      ).toBeGreaterThan(0);
    });

    it("prefixes a MONEY_IN amount with '+' for EXTERNAL_TRANSACTION + CASH_OUT subtype", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[
            makeTransaction({
              transactionType: "EXTERNAL_TRANSACTION",
              externalSubtype: "CASH_OUT",
              amount: "450.00",
              currency: "GHS",
            }),
          ]}
        />,
      );
      expect(
        screen.getAllByText((text) => text.includes("+450.00") && text.includes("GHS")).length,
      ).toBeGreaterThan(0);
    });

    it("never signs a neutral amount (COMMISSION_CHECK)", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ transactionType: "COMMISSION_CHECK", amount: "0.00", currency: "XOF" }),
          ]}
        />,
      );
      expect(screen.queryByText((text) => text.includes("+0.00"))).not.toBeInTheDocument();
      expect(screen.queryByText((text) => text.includes("-0.00"))).not.toBeInTheDocument();
      expect(screen.getAllByText((text) => text.includes("0.00") && text.includes("XOF")).length).toBeGreaterThan(
        0,
      );
    });

    it("never signs a neutral amount for an EXTERNAL_TRANSACTION with no recognized subtype", () => {
      render(
        <TransactionsTable
          locale="en"
          content={content}
          transactions={[
            makeTransaction({
              transactionType: "EXTERNAL_TRANSACTION",
              externalSubtype: null,
              amount: "50.00",
              currency: "GHS",
            }),
          ]}
        />,
      );
      expect(screen.queryByText((text) => text.includes("+50.00"))).not.toBeInTheDocument();
      expect(screen.queryByText((text) => text.includes("-50.00"))).not.toBeInTheDocument();
    });
  });
});
