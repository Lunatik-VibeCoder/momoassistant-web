import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardContent } from "@/content/dashboard";
import type { AppLocale } from "@/i18n/routing";
import type { RecentTransactionSummary } from "@/lib/mcp-client";
import { presentTreasuryDirection } from "@/lib/treasury-direction";
import { cn, formatDateTime } from "@/lib/utils";

interface RecentTransactionsCardProps {
  locale: AppLocale;
  content: DashboardContent["recentTransactions"];
  transactions: RecentTransactionSummary[];
  // transactions:read isn't granted to AGENT (WS-009-RBAC-DECISION) -- an
  // expected 403, rendered distinctly from a genuinely empty list.
  restricted?: boolean;
}

// WS-009 CONTRACT-V1 -- newest first, max 20, no date filter/pagination UI
// (the backend already caps/orders this; this component just renders what
// it's given). No currency shown -- RecentTransactionSummary carries none,
// never guessed here.
const STATUS_BADGE_VARIANT: Record<string, "secondary" | "destructive" | "outline"> = {
  SUCCESS: "secondary",
  FAILED: "destructive",
  PENDING: "outline",
  CANCELLED: "outline",
};

// EXT-TX-UNIFICATION-001 -- counterpartyName/counterpartyPhone are each
// independently nullable and never invented from one another (e.g. a
// commission credit has no counterparty at all). Renders whichever of the
// two is present, joined when both are; renders nothing (never a
// "null"/"N/A" placeholder) when neither is known.
function counterpartyLabel(transaction: RecentTransactionSummary): string | null {
  const parts = [transaction.counterpartyName, transaction.counterpartyPhone].filter(
    (part): part is string => Boolean(part),
  );
  return parts.length > 0 ? parts.join(" · ") : null;
}

export function RecentTransactionsCard({
  locale,
  content,
  transactions,
  restricted,
}: RecentTransactionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {restricted ? (
          <p className="text-sm text-muted-foreground">{content.restricted}</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">{content.empty}</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {transactions.map((transaction) => {
              // WS-010-DASHBOARD-V2-IMPL-01 -- the audit's own guardrail:
              // reuse existing tokens only, no new color. bg-destructive/10
              // is the exact background the Badge component's own
              // "destructive" variant already uses (components/ui/badge.tsx)
              // -- applying it to the row too keeps a FAILED transaction
              // immediately scannable in a list, not just on the small badge.
              const failed = transaction.status === "FAILED";
              const counterparty = counterpartyLabel(transaction);
              // EXT-TX-UNIFICATION-002 -- ported from Android's own
              // classifyTreasury()/resolveTreasuryDirection(), never
              // inferred here from amount sign/name/timestamp. `null` for a
              // genuinely neutral transaction (Balance/Commission Check) or
              // an EXTERNAL_TRANSACTION with no recognized subtype -- never
              // a guessed direction.
              const direction = presentTreasuryDirection(
                transaction.transactionType,
                transaction.externalSubtype,
              );
              const isMoneyOut = direction.label === "MONEY OUT";
              return (
                <li
                  key={transaction.transactionUid}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-md px-2 py-3 first:pt-0 last:pb-0",
                    failed && "bg-destructive/10",
                  )}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant={STATUS_BADGE_VARIANT[transaction.status] ?? "outline"}>
                        {transaction.status}
                      </Badge>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isMoneyOut ? "text-destructive" : "text-foreground",
                        )}
                      >
                        {direction.icon ? `${direction.icon} ${direction.label} · ` : null}
                        {transaction.transactionType}
                      </span>
                    </div>
                    {counterparty ? (
                      <p className="mt-1 truncate text-sm text-foreground">{counterparty}</p>
                    ) : null}
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {transaction.stationName ?? content.stationUnknown} ·{" "}
                      {formatDateTime(locale, transaction.createdAt)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-sm font-medium",
                      failed || isMoneyOut ? "text-destructive" : "text-foreground",
                    )}
                  >
                    {transaction.amount}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
