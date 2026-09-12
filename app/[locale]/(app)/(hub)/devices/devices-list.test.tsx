import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDevicesContent } from "@/content/devices";
import type { OrganizationDeviceSummary } from "@/lib/mcp-client";
import { DevicesList } from "./devices-list";

const content = getDevicesContent("en");

function makeDevice(overrides: Partial<OrganizationDeviceSummary> = {}): OrganizationDeviceSummary {
  return {
    deviceId: "device-1",
    deviceName: "Pixel 8",
    stationId: "station-1",
    stationName: "Station Accra",
    batteryLevel: null,
    lastHeartbeatAt: null,
    isStale: false,
    communicationProfiles: [],
    certificationStatus: null,
    ...overrides,
  };
}

describe("DevicesList", () => {
  it("shows the empty message when the organization has no devices at all", () => {
    render(<DevicesList locale="en" devices={[]} permissions={[]} content={content} />);
    expect(screen.getByText(content.empty)).toBeInTheDocument();
  });

  it("renders device name and station, falling back to noStation text when unassigned", () => {
    render(
      <DevicesList
        locale="en"
        devices={[makeDevice({ stationId: null, stationName: null })]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText("Pixel 8")).toBeInTheDocument();
    expect(screen.getByText(content.noStation)).toBeInTheDocument();
  });

  describe("certification status badge", () => {
    it.each([
      ["CERTIFIED", content.certification.CERTIFIED],
      ["PENDING", content.certification.PENDING],
      ["REVOKED", content.certification.REVOKED],
      ["SUSPENDED", content.certification.SUSPENDED],
    ] as const)("shows %s as %s", (status, label) => {
      render(
        <DevicesList
          locale="en"
          devices={[makeDevice({ certificationStatus: status })]}
          permissions={[]}
          content={content}
        />,
      );
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    it("shows the 'none' label for a null certificationStatus, never a fabricated status", () => {
      render(
        <DevicesList
          locale="en"
          devices={[makeDevice({ certificationStatus: null })]}
          permissions={[]}
          content={content}
        />,
      );
      expect(screen.getByText(content.certification.none)).toBeInTheDocument();
    });
  });

  // AUTH-SECURITY-2 Phase C Contract Lock v3, PC-4 -- same gating discipline
  // as organization-station-tree.test.tsx's "action gating by permissions".
  describe("Revoke action gating", () => {
    it("shows Revoke for a full-access role (devices:write) on a CERTIFIED device", () => {
      render(
        <DevicesList
          locale="en"
          devices={[makeDevice({ certificationStatus: "CERTIFIED" })]}
          permissions={["devices:write"]}
          content={content}
        />,
      );
      expect(screen.getByText(content.revokeButton)).toBeInTheDocument();
    });

    it("hides Revoke for an AGENT-shaped (devices:read only) permission set, never a disabled-but-visible button", () => {
      render(
        <DevicesList
          locale="en"
          devices={[makeDevice({ certificationStatus: "CERTIFIED" })]}
          permissions={["devices:read"]}
          content={content}
        />,
      );
      expect(screen.queryByText(content.revokeButton)).not.toBeInTheDocument();
      // The device itself remains visible -- only the write control is gone.
      expect(screen.getByText("Pixel 8")).toBeInTheDocument();
    });

    it("hides Revoke for an empty permission set", () => {
      render(
        <DevicesList
          locale="en"
          devices={[makeDevice({ certificationStatus: "CERTIFIED" })]}
          permissions={[]}
          content={content}
        />,
      );
      expect(screen.queryByText(content.revokeButton)).not.toBeInTheDocument();
    });

    // The core anti-footgun test: even an authorized admin must never see a
    // Revoke control that would just 409 (backend: "already revoked" /
    // "not in a revocable state") -- never a reactivation path, never a
    // button offered for a state it cannot act on.
    it.each(["REVOKED", "SUSPENDED"] as const)(
      "hides Revoke for a %s device even with devices:write",
      (status) => {
        render(
          <DevicesList
            locale="en"
            devices={[makeDevice({ certificationStatus: status })]}
            permissions={["devices:write"]}
            content={content}
          />,
        );
        expect(screen.queryByText(content.revokeButton)).not.toBeInTheDocument();
      },
    );

    it("shows Revoke for a device with no certification row yet (null), matching the backend's own non-restrictive default", () => {
      render(
        <DevicesList
          locale="en"
          devices={[makeDevice({ certificationStatus: null })]}
          permissions={["devices:write"]}
          content={content}
        />,
      );
      expect(screen.getByText(content.revokeButton)).toBeInTheDocument();
    });
  });
});
