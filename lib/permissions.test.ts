import { describe, expect, it } from "vitest";

import { hasPermission } from "@/lib/permissions";

describe("hasPermission", () => {
  it("returns true when the exact resource:action code is present", () => {
    expect(hasPermission(["stations:write", "devices:write"], "stations", "write")).toBe(true);
  });

  it("returns false when the code is absent", () => {
    expect(hasPermission(["stations:read"], "stations", "write")).toBe(false);
  });

  it("returns false for an empty permission list (never a default-allow)", () => {
    expect(hasPermission([], "stations", "write")).toBe(false);
  });

  it("does not match on resource alone without the exact action", () => {
    expect(hasPermission(["stations:read"], "stations", "delete")).toBe(false);
  });

  it("does not match a different resource with the same action", () => {
    expect(hasPermission(["workspaces:write"], "stations", "write")).toBe(false);
  });
});
