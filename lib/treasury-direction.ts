// EXT-TX-UNIFICATION-002 -- ported verbatim from the Android app's own
// domain/model/TreasuryClassification.kt (classifyTreasury) and
// domain/model/TreasuryDirection.kt (resolveTreasuryDirection). This is the
// AGENT'S OWN TREASURY (cash + e-float combined) perspective -- explicitly
// NOT the counterparty's Mobile Money wallet perspective
// (domain/model/sms/ParsedSms.kt's Direction/deriveDirection(), never used
// here by locked decision). The two axes disagree for several types (a Cash
// In moves money INTO the client's wallet but OUT of the agent's own
// treasury) -- this file exists specifically to keep Web consistent with
// Android's existing UI (TransactionRow/DashboardViewModel), which has
// always used TreasuryDirection, never the wallet one.
//
// Never edit this mapping without re-reading the two Kotlin files above --
// this is a port, not an independent design. A future ExternalSubtype value
// added on the Android side must be added here too, in the same INCOME/
// EXPENSE bucket Android puts it in.

export type TreasuryDirection = "MONEY_IN" | "MONEY_OUT" | null;

/**
 * Ported from Android's `classifyTreasury(transactionType, externalSubtype)`.
 * `externalSubtype` is only ever consulted for `EXTERNAL_TRANSACTION`, exactly
 * as on Android -- never inferred from amount sign, counterparty name,
 * timestamp, or status. Returns `null` for anything genuinely neutral or
 * unrecognized (a not-yet-ported TransactionType/ExternalSubtype, or a
 * missing subtype on an EXTERNAL_TRANSACTION row) -- never a guessed default.
 */
export function resolveTreasuryDirection(
  transactionType: string,
  externalSubtype: string | null,
): TreasuryDirection {
  switch (transactionType) {
    // Android: TreasuryClassification.kt -- CASH_OUT, INCOMING_TRANSFER -> INCOME
    case "CASH_OUT":
    case "INCOMING_TRANSFER":
      return "MONEY_IN";

    // Android: CASH_IN, AGENT_PAYMENT, MERCHANT_PAYMENT, AIRTIME_TRANSFER,
    // MONEY_TRANSFER -> EXPENSE
    case "CASH_IN":
    case "AGENT_PAYMENT":
    case "MERCHANT_PAYMENT":
    case "AIRTIME_TRANSFER":
    case "MONEY_TRANSFER":
      return "MONEY_OUT";

    // Android: BALANCE_CHECK, COMMISSION_CHECK -> NEUTRAL (never a
    // direction -- these never move money)
    case "BALANCE_CHECK":
    case "COMMISSION_CHECK":
      return null;

    // Android: TreasuryDirection.kt -- resolveTreasuryDirection(externalSubtype)
    case "EXTERNAL_TRANSACTION":
      switch (externalSubtype) {
        case "AGENT_COMMISSION":
        case "CASH_OUT":
        case "MERCHANT_DEPOSIT":
        case "MERCHANT_INTERNAL_TRANSFER_IN":
        case "MERCHANT_SETTLEMENT_TO_AGENT":
          return "MONEY_IN";
        case "CASH_IN":
        case "MERCHANT_PAYMENT":
        case "AGENT_PAYMENT":
        case "MERCHANT_INTERNAL_TRANSFER_OUT":
          return "MONEY_OUT";
        default:
          // null, or a future ExternalSubtype not yet ported here -- never
          // guessed (ADR-014's "never reconstruct an unobserved fact",
          // applied identically on the Web side).
          return null;
      }

    default:
      // A future TransactionType not yet ported here -- never guessed.
      return null;
  }
}

export interface TreasuryDirectionPresentation {
  icon: "↓" | "↑" | null;
  label: "MONEY IN" | "MONEY OUT" | null;
}

/** Presentation layer on top of {@link resolveTreasuryDirection} -- icon/label only, never a color (components own their own color tokens). */
export function presentTreasuryDirection(
  transactionType: string,
  externalSubtype: string | null,
): TreasuryDirectionPresentation {
  const direction = resolveTreasuryDirection(transactionType, externalSubtype);
  if (direction === "MONEY_IN") return { icon: "↓", label: "MONEY IN" };
  if (direction === "MONEY_OUT") return { icon: "↑", label: "MONEY OUT" };
  return { icon: null, label: null };
}
