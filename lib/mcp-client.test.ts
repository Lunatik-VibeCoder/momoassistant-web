import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  exportTransactionsCsv,
  getTransactionsSummary,
  getTransactionsTrends,
  listTransactions,
  McpError,
} from "@/lib/mcp-client";

// WS-013 -- covers the 4 new Report Hub functions in lib/mcp-client.ts
// (WS-011 CONTRACT.md, WS-012 production-verified). global.fetch is
// mocked directly rather than hitting the network -- these tests verify
// the request this client BUILDS (URL/method/headers/query params) and
// how it translates a real MCP response/error shape, not live behavior
// (already production-verified separately, see WS-012 Phase 9).
function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("lib/mcp-client.ts -- WS-013 Report Hub functions", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("listTransactions", () => {
    it("calls GET /organizations/:id/transactions with the Bearer token", async () => {
      fetchMock.mockResolvedValue(jsonResponse(200, { items: [], nextCursor: null }));

      await listTransactions("token-123", "org-1", { period: "LAST_7_DAYS" });

      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe("https://mcp.test.invalid/organizations/org-1/transactions?period=LAST_7_DAYS");
      expect(init.method).toBe("GET");
      expect(init.headers.Authorization).toBe("Bearer token-123");
    });

    it("serializes period/status/transactionType/currency/cursor/limit as query params", async () => {
      fetchMock.mockResolvedValue(jsonResponse(200, { items: [], nextCursor: null }));

      await listTransactions("t", "org-1", {
        period: "CUSTOM",
        startDate: "2026-08-01T00:00:00.000Z",
        endDate: "2026-08-08T00:00:00.000Z",
        status: "SUCCESS",
        transactionType: "CASH_IN",
        currency: "GHS",
        cursor: "abc",
        limit: 10,
      });

      const [url] = fetchMock.mock.calls[0];
      const parsed = new URL(url as string);
      expect(parsed.searchParams.get("period")).toBe("CUSTOM");
      expect(parsed.searchParams.get("startDate")).toBe("2026-08-01T00:00:00.000Z");
      expect(parsed.searchParams.get("endDate")).toBe("2026-08-08T00:00:00.000Z");
      expect(parsed.searchParams.get("status")).toBe("SUCCESS");
      expect(parsed.searchParams.get("transactionType")).toBe("CASH_IN");
      expect(parsed.searchParams.get("currency")).toBe("GHS");
      expect(parsed.searchParams.get("cursor")).toBe("abc");
      expect(parsed.searchParams.get("limit")).toBe("10");
    });

    it("omits undefined params from the query string entirely", async () => {
      fetchMock.mockResolvedValue(jsonResponse(200, { items: [], nextCursor: null }));

      await listTransactions("t", "org-1", { period: "TODAY" });

      const [url] = fetchMock.mock.calls[0];
      expect(url).toBe("https://mcp.test.invalid/organizations/org-1/transactions?period=TODAY");
    });

    it("returns the parsed page shape", async () => {
      const page = {
        items: [{ transactionUid: "tx-1", status: "SUCCESS", transactionType: "CASH_IN", amount: "10.00", currency: "GHS", fee: "0.00", commission: "0.00", stationId: null, stationName: null, reference: "MA-1", createdAt: "2026-09-01T00:00:00.000Z" }],
        nextCursor: "next-token",
      };
      fetchMock.mockResolvedValue(jsonResponse(200, page));

      const result = await listTransactions("t", "org-1", {});
      expect(result).toEqual(page);
    });

    it("throws McpError(kind='unauthorized') on a 401", async () => {
      fetchMock.mockResolvedValue(jsonResponse(401, { message: "Missing bearer token" }));

      await expect(listTransactions("bad-token", "org-1", {})).rejects.toMatchObject({
        kind: "unauthorized",
        status: 401,
      });
    });

    it("throws McpError(kind='forbidden') on a 403", async () => {
      fetchMock.mockResolvedValue(jsonResponse(403, { message: "Forbidden" }));

      await expect(listTransactions("t", "org-1", {})).rejects.toBeInstanceOf(McpError);
      fetchMock.mockResolvedValue(jsonResponse(403, { message: "Forbidden" }));
      await expect(listTransactions("t", "org-1", {})).rejects.toMatchObject({ kind: "forbidden", status: 403 });
    });

    it("joins a class-validator array message into a single string", async () => {
      fetchMock.mockResolvedValue(
        jsonResponse(400, { message: ["startDate must be a valid ISO 8601 date string", "period must be a valid enum value"] }),
      );

      await expect(listTransactions("t", "org-1", {})).rejects.toMatchObject({
        kind: "validation",
        message: "startDate must be a valid ISO 8601 date string, period must be a valid enum value",
      });
    });
  });

  describe("getTransactionsSummary", () => {
    it("calls GET /organizations/:id/transactions/summary with query params, never cursor/limit (not part of the type)", async () => {
      fetchMock.mockResolvedValue(
        jsonResponse(200, {
          transactionCount: 0,
          byStatus: { SUCCESS: 0, FAILED: 0, PENDING: 0, CANCELLED: 0 },
          byCurrency: [],
          successRate: null,
        }),
      );

      await getTransactionsSummary("t", "org-1", { period: "LAST_30_DAYS", currency: "XOF" });

      const [url] = fetchMock.mock.calls[0];
      expect(url).toBe(
        "https://mcp.test.invalid/organizations/org-1/transactions/summary?period=LAST_30_DAYS&currency=XOF",
      );
    });

    it("returns byCurrency as separate entries, never a combined total field", async () => {
      const summary = {
        transactionCount: 10,
        byStatus: { SUCCESS: 10, FAILED: 0, PENDING: 0, CANCELLED: 0 },
        byCurrency: [
          { currency: "GHS", transactionCount: 4, volume: "2808.00", fees: "0.00", commissions: "0.00" },
          { currency: "XOF", transactionCount: 6, volume: "295575.00", fees: "0.00", commissions: "0.00" },
        ],
        successRate: 1,
      };
      fetchMock.mockResolvedValue(jsonResponse(200, summary));

      const result = await getTransactionsSummary("t", "org-1", {});
      expect(result.byCurrency).toHaveLength(2);
      expect(result).not.toHaveProperty("totalVolume");
    });

    it("throws McpError on a 403 (transactions:read not granted)", async () => {
      fetchMock.mockResolvedValue(jsonResponse(403, { message: "Forbidden" }));
      await expect(getTransactionsSummary("t", "org-1", {})).rejects.toMatchObject({ kind: "forbidden" });
    });

    it("passes successRate: null through untouched (never coerced to 0/NaN)", async () => {
      fetchMock.mockResolvedValue(
        jsonResponse(200, {
          transactionCount: 0,
          byStatus: { SUCCESS: 0, FAILED: 0, PENDING: 0, CANCELLED: 0 },
          byCurrency: [],
          successRate: null,
        }),
      );
      const result = await getTransactionsSummary("t", "org-1", {});
      expect(result.successRate).toBeNull();
    });
  });

  describe("getTransactionsTrends", () => {
    it("calls GET /organizations/:id/transactions/trends with query params", async () => {
      fetchMock.mockResolvedValue(jsonResponse(200, []));

      await getTransactionsTrends("t", "org-1", { period: "TODAY" });

      const [url] = fetchMock.mock.calls[0];
      expect(url).toBe("https://mcp.test.invalid/organizations/org-1/transactions/trends?period=TODAY");
    });

    it("returns the trend points array untouched, one entry per (period, currency)", async () => {
      const trends = [
        { period: "2026-09-01", currency: "GHS", transactionCount: 2, volume: "150.00" },
        { period: "2026-09-01", currency: "XOF", transactionCount: 1, volume: "9000.00" },
      ];
      fetchMock.mockResolvedValue(jsonResponse(200, trends));

      const result = await getTransactionsTrends("t", "org-1", {});
      expect(result).toEqual(trends);
    });

    it("throws McpError on a 401", async () => {
      fetchMock.mockResolvedValue(jsonResponse(401, { message: "Missing bearer token" }));
      await expect(getTransactionsTrends("bad", "org-1", {})).rejects.toMatchObject({ kind: "unauthorized" });
    });
  });

  describe("exportTransactionsCsv", () => {
    function csvResponse(body: string, filename = "transactions-org-1.csv"): Response {
      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    it("calls GET /organizations/:id/transactions/export with the Bearer token and query params", async () => {
      fetchMock.mockResolvedValue(csvResponse("transactionUid\r\n"));

      await exportTransactionsCsv("token-xyz", "org-1", { period: "LAST_7_DAYS", currency: "GHS" });

      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe(
        "https://mcp.test.invalid/organizations/org-1/transactions/export?period=LAST_7_DAYS&currency=GHS",
      );
      expect(init.headers.Authorization).toBe("Bearer token-xyz");
    });

    it("returns the raw CSV body, content type, and filename parsed from Content-Disposition", async () => {
      fetchMock.mockResolvedValue(csvResponse("transactionUid,status\r\ntx-1,SUCCESS\r\n", "transactions-org-42.csv"));

      const result = await exportTransactionsCsv("t", "org-42", {});
      expect(result.body).toBe("transactionUid,status\r\ntx-1,SUCCESS\r\n");
      expect(result.contentType).toBe("text/csv; charset=utf-8");
      expect(result.filename).toBe("transactions-org-42.csv");
    });

    it("falls back to a generated filename when Content-Disposition is missing", async () => {
      fetchMock.mockResolvedValue(
        new Response("transactionUid\r\n", { status: 200, headers: { "Content-Type": "text/csv" } }),
      );

      const result = await exportTransactionsCsv("t", "org-7", {});
      expect(result.filename).toBe("transactions-org-7.csv");
    });

    it("throws McpError(kind='forbidden') on a 403, same as the JSON endpoints", async () => {
      fetchMock.mockResolvedValue(jsonResponse(403, { message: "Forbidden" }));
      await expect(exportTransactionsCsv("t", "org-1", {})).rejects.toMatchObject({
        kind: "forbidden",
        status: 403,
      });
    });

    it("throws McpError on a 404 (organization not found / not a member)", async () => {
      fetchMock.mockResolvedValue(jsonResponse(404, { message: "Not Found" }));
      await expect(exportTransactionsCsv("t", "org-missing", {})).rejects.toMatchObject({ kind: "not_found" });
    });
  });
});
