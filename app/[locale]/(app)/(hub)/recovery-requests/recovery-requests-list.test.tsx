import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getRecoveryRequestsContent } from "@/content/recovery-requests";
import type { RecoveryRequestSummary } from "@/lib/mcp-client";
import { RecoveryRequestsList } from "./recovery-requests-list";

const content = getRecoveryRequestsContent("en");

function makeRequest(overrides: Partial<RecoveryRequestSummary> = {}): RecoveryRequestSummary {
  return {
    id: "req-1",
    organizationId: "org-1",
    status: "DENIED_DEVICE_REVOKED",
    deviceCertificationStatusAtDenial: "REVOKED",
    createdAt: "2026-09-12T10:00:00.000Z",
    routedAt: null,
    device: { id: "device-1", deviceName: "Pixel 8" },
    user: { id: "agent-1", displayName: "Agent One", email: "agent@example.com" },
    ...overrides,
  };
}

describe("RecoveryRequestsList", () => {
  it("shows the empty message when the organization has no recovery requests", () => {
    render(
      <RecoveryRequestsList locale="en" requests={[]} permissions={[]} content={content} />,
    );
    expect(screen.getByText(content.empty)).toBeInTheDocument();
  });

  it("renders device name and requester", () => {
    render(
      <RecoveryRequestsList
        locale="en"
        requests={[makeRequest()]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText("Pixel 8")).toBeInTheDocument();
    expect(screen.getByText(/Agent One/)).toBeInTheDocument();
  });

  it("shows the DENIED_DEVICE_REVOKED status label", () => {
    render(
      <RecoveryRequestsList
        locale="en"
        requests={[makeRequest({ status: "DENIED_DEVICE_REVOKED" })]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText(content.status.DENIED_DEVICE_REVOKED)).toBeInTheDocument();
  });

  it("shows the ROUTED_TO_CASE_B status label", () => {
    render(
      <RecoveryRequestsList
        locale="en"
        requests={[makeRequest({ status: "ROUTED_TO_CASE_B", routedAt: "2026-09-12T11:00:00.000Z" })]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText(content.status.ROUTED_TO_CASE_B)).toBeInTheDocument();
  });

  describe("Route action gating", () => {
    it("shows the Route button for a full-access role (devices:write) on a pending request", () => {
      render(
        <RecoveryRequestsList
          locale="en"
          requests={[makeRequest({ status: "DENIED_DEVICE_REVOKED" })]}
          permissions={["devices:write"]}
          content={content}
        />,
      );
      expect(screen.getByText(content.routeButton)).toBeInTheDocument();
    });

    it("hides the Route button for a devices:read-only permission set, never a disabled-but-visible button", () => {
      render(
        <RecoveryRequestsList
          locale="en"
          requests={[makeRequest({ status: "DENIED_DEVICE_REVOKED" })]}
          permissions={["devices:read"]}
          content={content}
        />,
      );
      expect(screen.queryByText(content.routeButton)).not.toBeInTheDocument();
      expect(screen.getByText("Pixel 8")).toBeInTheDocument();
    });

    it("hides the Route button for an empty permission set", () => {
      render(
        <RecoveryRequestsList
          locale="en"
          requests={[makeRequest({ status: "DENIED_DEVICE_REVOKED" })]}
          permissions={[]}
          content={content}
        />,
      );
      expect(screen.queryByText(content.routeButton)).not.toBeInTheDocument();
    });

    // The core anti-footgun test: a request already routed must never show
    // the action again, even for an authorized admin -- there is no
    // "re-route" concept, and the backend itself rejects it (409).
    it("hides the Route button for an already-ROUTED_TO_CASE_B request even with devices:write", () => {
      render(
        <RecoveryRequestsList
          locale="en"
          requests={[makeRequest({ status: "ROUTED_TO_CASE_B", routedAt: "2026-09-12T11:00:00.000Z" })]}
          permissions={["devices:write"]}
          content={content}
        />,
      );
      expect(screen.queryByText(content.routeButton)).not.toBeInTheDocument();
    });
  });
});
