import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RecentTransactionsCard } from "./recent-transactions-card";
import { getDashboardContent } from "@/content/dashboard";
import type { RecentTransactionSummary } from "@/lib/mcp-client";

const content = getDashboardContent("en").recentTransactions;

function makeTransaction(overrides: Partial<RecentTransactionSummary> = {}): RecentTransactionSummary {
  return {
    transactionUid: "tx-1",
    stationId: null,
    stationName: "Accra Station",
    status: "SUCCESS",
    transactionType: "CASH_IN",
    amount: "100.00",
    createdAt: "2026-09-03T10:00:00.000Z",
    counterpartyName: null,
    counterpartyPhone: null,
    externalSubtype: null,
    checkResult: null,
    ...overrides,
  };
}

describe("RecentTransactionsCard", () => {
  it("renders the empty state when there are no transactions", () => {
    render(<RecentTransactionsCard locale="en" content={content} transactions={[]} />);
    expect(screen.getByText(content.empty)).toBeInTheDocument();
  });

  it("renders the restricted message instead of a raw empty list for a role without transactions:read", () => {
    render(<RecentTransactionsCard locale="en" content={content} transactions={[]} restricted />);
    expect(screen.getByText(content.restricted)).toBeInTheDocument();
  });

  // EXT-TX-UNIFICATION-001 -- counterpartyName/counterpartyPhone, each
  // independently nullable, never a "null"/"N/A" placeholder. This is the
  // exact widget from the reported bug (external SMS-detected transfers
  // absent from Web) -- these prove the counterparty identity now renders.
  describe("counterparty identity (EXT-TX-UNIFICATION-001)", () => {
    it("renders name and phone together when both are known", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ counterpartyName: "David Koku Togbe", counterpartyPhone: "+22890123456" }),
          ]}
        />,
      );
      expect(screen.getByText("David Koku Togbe · +22890123456")).toBeInTheDocument();
    });

    it("renders name only when phone is unknown", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[makeTransaction({ counterpartyName: "Angela Donkor", counterpartyPhone: null })]}
        />,
      );
      expect(screen.getByText("Angela Donkor")).toBeInTheDocument();
    });

    it("renders phone only when name is unknown", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[makeTransaction({ counterpartyName: null, counterpartyPhone: "+233241234567" })]}
        />,
      );
      expect(screen.getByText("+233241234567")).toBeInTheDocument();
    });

    it("renders no placeholder text when neither is known (e.g. a commission credit)", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[makeTransaction({ counterpartyName: null, counterpartyPhone: null })]}
        />,
      );
      expect(screen.queryByText(/null/i)).not.toBeInTheDocument();
      expect(screen.queryByText("N/A")).not.toBeInTheDocument();
    });
  });

  // EXT-TX-UNIFICATION-002 -- ported Android TreasuryDirection semantics,
  // never inferred from amount sign/name/timestamp.
  describe("treasury direction (EXT-TX-UNIFICATION-002)", () => {
    it("renders MONEY OUT for CASH_IN, matching Android's TreasuryDirection", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[makeTransaction({ transactionType: "CASH_IN" })]}
        />,
      );
      expect(screen.getByText((text) => text.includes("MONEY OUT"))).toBeInTheDocument();
    });

    it("renders MONEY IN for CASH_OUT, matching Android's TreasuryDirection", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[makeTransaction({ transactionType: "CASH_OUT" })]}
        />,
      );
      expect(screen.getByText((text) => text.includes("MONEY IN"))).toBeInTheDocument();
    });

    it("renders MONEY OUT for EXTERNAL_TRANSACTION + CASH_IN", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ transactionType: "EXTERNAL_TRANSACTION", externalSubtype: "CASH_IN" }),
          ]}
        />,
      );
      expect(screen.getByText((text) => text.includes("MONEY OUT"))).toBeInTheDocument();
      // transactionType must remain visible -- direction is additive, not a replacement.
      expect(screen.getByText((text) => text.includes("EXTERNAL_TRANSACTION"))).toBeInTheDocument();
    });

    it("renders MONEY IN for EXTERNAL_TRANSACTION + CASH_OUT", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ transactionType: "EXTERNAL_TRANSACTION", externalSubtype: "CASH_OUT" }),
          ]}
        />,
      );
      expect(screen.getByText((text) => text.includes("MONEY IN"))).toBeInTheDocument();
    });

    it("renders no direction for EXTERNAL_TRANSACTION with a null subtype -- never guessed", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[
            makeTransaction({ transactionType: "EXTERNAL_TRANSACTION", externalSubtype: null }),
          ]}
        />,
      );
      expect(screen.queryByText((text) => text.includes("MONEY IN"))).not.toBeInTheDocument();
      expect(screen.queryByText((text) => text.includes("MONEY OUT"))).not.toBeInTheDocument();
    });

    it("renders no direction for a genuinely neutral type (BALANCE_CHECK)", () => {
      render(
        <RecentTransactionsCard
          locale="en"
          content={content}
          transactions={[makeTransaction({ transactionType: "BALANCE_CHECK" })]}
        />,
      );
      expect(screen.queryByText((text) => text.includes("MONEY IN"))).not.toBeInTheDocument();
      expect(screen.queryByText((text) => text.includes("MONEY OUT"))).not.toBeInTheDocument();
    });
  });

  it("falls back to the station-unknown label when stationName is null", () => {
    render(
      <RecentTransactionsCard
        locale="en"
        content={content}
        transactions={[makeTransaction({ stationName: null })]}
      />,
    );
    expect(screen.getByText((text) => text.includes(content.stationUnknown))).toBeInTheDocument();
  });
});
