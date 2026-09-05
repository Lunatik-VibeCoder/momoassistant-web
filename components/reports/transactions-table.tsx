import { Badge } from "@/components/ui/badge";
import type { ReportsContent } from "@/content/reports";
import type { AppLocale } from "@/i18n/routing";
import type { ReportTransaction } from "@/lib/mcp-client";
import { presentTreasuryDirection } from "@/lib/treasury-direction";
import { formatDateTime } from "@/lib/utils";

interface TransactionsTableProps {
  locale: AppLocale;
  content: ReportsContent["table"];
  transactions: ReportTransaction[];
}

// WS-013 Phase 7 -- same status-color convention as the Dashboard's
// RecentTransactionsCard (app/[locale]/(app)/(hub)/app/recent-transactions-card.tsx),
// reused verbatim rather than re-derived, per the "same product" guardrail
// (§16). BALANCE_CHECK/COMMISSION_CHECK are deliberately NOT filtered out
// here (WS-011 CONTRACT.md §7: the list endpoint keeps them visible --
// only /summary and /trends exclude them, and this table renders exactly
// what /transactions returns).
const STATUS_BADGE_VARIANT: Record<string, "secondary" | "destructive" | "outline"> = {
  SUCCESS: "secondary",
  FAILED: "destructive",
  PENDING: "outline",
  CANCELLED: "outline",
};

// A transaction's amount is never rendered without its currency (§10/§18):
// when currency is null (a genuine possible value on ReportTransaction --
// e.g. a not-yet-backfilled edge case), an explicit "—" is shown instead of
// guessing GHS/XOF or silently formatting a bare number.
function AmountCell({ amount, currency }: { amount: string; currency: string | null }) {
  return (
    <span className="font-medium text-foreground">
      {amount} {currency ?? "—"}
    </span>
  );
}

// EXT-TX-UNIFICATION-001 -- counterpartyName/counterpartyPhone are each
// independently nullable and never invented from one another (e.g. a
// commission credit has no counterparty at all). Renders whichever of the
// two is present, joined when both are; renders nothing (never a
// "null"/"N/A" placeholder) when neither is known. No new column/header --
// shown as a secondary line under the station cell, same footprint as the
// existing reference line below it.
function counterpartyLabel(transaction: ReportTransaction): string | null {
  const parts = [transaction.counterpartyName, transaction.counterpartyPhone].filter(
    (part): part is string => Boolean(part),
  );
  return parts.length > 0 ? parts.join(" · ") : null;
}

// EXT-TX-UNIFICATION-002 -- ported from Android's own classifyTreasury()/
// resolveTreasuryDirection() (lib/treasury-direction.ts), never inferred
// from amount sign/name/timestamp here. `null` for a genuinely neutral
// transaction (Balance/Commission Check) or an EXTERNAL_TRANSACTION with no
// recognized subtype -- renders nothing, never a guessed direction.
// transactionType always stays visible -- direction is additive.
function TransactionTypeCell({ transaction }: { transaction: ReportTransaction }) {
  const direction = presentTreasuryDirection(transaction.transactionType, transaction.externalSubtype);
  return (
    <span className={direction.label === "MONEY OUT" ? "text-destructive" : undefined}>
      {direction.label ? `${direction.icon} ${direction.label} · ` : null}
      {transaction.transactionType}
    </span>
  );
}

export function TransactionsTable({ locale, content, transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return <p className="text-sm text-muted-foreground">{content.empty}</p>;
  }

  return (
    <>
      {/* Same lg breakpoint split as members/page.tsx -- a table this wide
          (6 columns) has no good "smaller" version below lg, one card per
          transaction instead of shrinking columns. */}
      <div className="hidden overflow-x-auto rounded-xl ring-1 ring-foreground/10 lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">{content.columns.date}</th>
              <th className="px-4 py-3 font-medium">{content.columns.type}</th>
              <th className="px-4 py-3 font-medium">{content.columns.status}</th>
              <th className="px-4 py-3 font-medium">{content.columns.amount}</th>
              <th className="px-4 py-3 font-medium">{content.columns.station}</th>
              <th className="px-4 py-3 font-medium">{content.columns.reference}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr key={transaction.transactionUid}>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDateTime(locale, transaction.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  <TransactionTypeCell transaction={transaction} />
                </td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_BADGE_VARIANT[transaction.status] ?? "outline"}>
                    {transaction.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <AmountCell amount={transaction.amount} currency={transaction.currency} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {transaction.stationName ?? content.stationUnavailable}
                  {counterpartyLabel(transaction) ? (
                    <p className="mt-0.5 text-xs">{counterpartyLabel(transaction)}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{transaction.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 lg:hidden">
        {transactions.map((transaction) => (
          <li
            key={transaction.transactionUid}
            className="rounded-xl border border-border bg-card p-4 ring-1 ring-foreground/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <Badge variant={STATUS_BADGE_VARIANT[transaction.status] ?? "outline"}>
                    {transaction.status}
                  </Badge>
                  <span className="truncate text-sm font-medium text-foreground">
                    <TransactionTypeCell transaction={transaction} />
                  </span>
                </div>
                {counterpartyLabel(transaction) ? (
                  <p className="mt-1 truncate text-sm text-foreground">{counterpartyLabel(transaction)}</p>
                ) : null}
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {transaction.stationName ?? content.stationUnavailable} ·{" "}
                  {formatDateTime(locale, transaction.createdAt)}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">{transaction.reference}</p>
              </div>
              <span className="shrink-0">
                <AmountCell amount={transaction.amount} currency={transaction.currency} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
