import { describe, expect, it } from "vitest";

import { presentTreasuryDirection, resolveTreasuryDirection } from "@/lib/treasury-direction";

// EXT-TX-UNIFICATION-002 -- this suite exists specifically to prove the port
// is a byte-for-byte match of Android's classifyTreasury()/
// resolveTreasuryDirection() (domain/model/TreasuryClassification.kt/
// TreasuryDirection.kt), pair by pair -- not just "produces something".

describe("resolveTreasuryDirection", () => {
  // Ported from classifyTreasury(): CASH_OUT, INCOMING_TRANSFER -> INCOME
  it("CASH_OUT -> MONEY_IN", () => {
    expect(resolveTreasuryDirection("CASH_OUT", null)).toBe("MONEY_IN");
  });
  it("INCOMING_TRANSFER -> MONEY_IN", () => {
    expect(resolveTreasuryDirection("INCOMING_TRANSFER", null)).toBe("MONEY_IN");
  });

  // Ported from classifyTreasury(): CASH_IN, AGENT_PAYMENT, MERCHANT_PAYMENT,
  // AIRTIME_TRANSFER, MONEY_TRANSFER -> EXPENSE
  it("CASH_IN -> MONEY_OUT", () => {
    expect(resolveTreasuryDirection("CASH_IN", null)).toBe("MONEY_OUT");
  });
  it("AGENT_PAYMENT -> MONEY_OUT", () => {
    expect(resolveTreasuryDirection("AGENT_PAYMENT", null)).toBe("MONEY_OUT");
  });
  it("MERCHANT_PAYMENT -> MONEY_OUT", () => {
    expect(resolveTreasuryDirection("MERCHANT_PAYMENT", null)).toBe("MONEY_OUT");
  });
  it("AIRTIME_TRANSFER -> MONEY_OUT", () => {
    expect(resolveTreasuryDirection("AIRTIME_TRANSFER", null)).toBe("MONEY_OUT");
  });
  it("MONEY_TRANSFER -> MONEY_OUT", () => {
    expect(resolveTreasuryDirection("MONEY_TRANSFER", null)).toBe("MONEY_OUT");
  });

  // Ported from classifyTreasury(): BALANCE_CHECK, COMMISSION_CHECK -> NEUTRAL
  it("BALANCE_CHECK -> null (neutral, never a direction)", () => {
    expect(resolveTreasuryDirection("BALANCE_CHECK", null)).toBeNull();
  });
  it("COMMISSION_CHECK -> null (neutral, never a direction)", () => {
    expect(resolveTreasuryDirection("COMMISSION_CHECK", null)).toBeNull();
  });

  // Ported from resolveTreasuryDirection() (Kotlin): EXTERNAL_TRANSACTION's
  // direction depends entirely on externalSubtype.
  describe("EXTERNAL_TRANSACTION", () => {
    it.each([
      ["AGENT_COMMISSION", "MONEY_IN"],
      ["CASH_OUT", "MONEY_IN"],
      ["MERCHANT_DEPOSIT", "MONEY_IN"],
      ["MERCHANT_INTERNAL_TRANSFER_IN", "MONEY_IN"],
      ["MERCHANT_SETTLEMENT_TO_AGENT", "MONEY_IN"],
      ["CASH_IN", "MONEY_OUT"],
      ["MERCHANT_PAYMENT", "MONEY_OUT"],
      ["AGENT_PAYMENT", "MONEY_OUT"],
      ["MERCHANT_INTERNAL_TRANSFER_OUT", "MONEY_OUT"],
    ] as const)("externalSubtype=%s -> %s", (subtype, expected) => {
      expect(resolveTreasuryDirection("EXTERNAL_TRANSACTION", subtype)).toBe(expected);
    });

    it("null subtype -> null, never guessed", () => {
      expect(resolveTreasuryDirection("EXTERNAL_TRANSACTION", null)).toBeNull();
    });

    it("an unrecognized/future subtype -> null, never guessed", () => {
      expect(resolveTreasuryDirection("EXTERNAL_TRANSACTION", "SOME_FUTURE_SUBTYPE")).toBeNull();
    });
  });

  it("an unrecognized/future transactionType -> null, never guessed", () => {
    expect(resolveTreasuryDirection("SOME_FUTURE_TYPE", null)).toBeNull();
  });
});

describe("presentTreasuryDirection", () => {
  it("MONEY_IN presents as ↓ / MONEY IN", () => {
    expect(presentTreasuryDirection("CASH_OUT", null)).toEqual({ icon: "↓", label: "MONEY IN" });
  });

  it("MONEY_OUT presents as ↑ / MONEY OUT", () => {
    expect(presentTreasuryDirection("CASH_IN", null)).toEqual({ icon: "↑", label: "MONEY OUT" });
  });

  it("neutral presents as null / null, never a guessed icon or label", () => {
    expect(presentTreasuryDirection("BALANCE_CHECK", null)).toEqual({ icon: null, label: null });
  });
});
