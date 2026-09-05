import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DeviceStatusCard } from "./device-status-card";
import { getDashboardContent } from "@/content/dashboard";
import type { CommunicationProfileSummary, OrganizationDeviceSummary } from "@/lib/mcp-client";

const content = getDashboardContent("en").operationalHealth;

function makeProfile(overrides: Partial<CommunicationProfileSummary> = {}): CommunicationProfileSummary {
  return {
    id: "cp-1",
    type: "PHYSICAL_SIM",
    iccid: "12345",
    eid: null,
    operatorId: "MTN",
    countryId: "GH",
    logicalSlot: 0,
    physicalSlot: 0,
    verifiedBalance: null,
    balanceConfidence: null,
    balanceVerifiedAt: null,
    verifiedCommission: null,
    commissionConfidence: null,
    commissionVerifiedAt: null,
    merchantLineId: null,
    ...overrides,
  };
}

function makeDevice(
  profiles: CommunicationProfileSummary[],
  overrides: Partial<OrganizationDeviceSummary> = {},
): OrganizationDeviceSummary {
  return {
    deviceId: "dev-1",
    deviceName: "Pixel 8",
    stationId: null,
    stationName: "Accra Station",
    batteryLevel: 90,
    lastHeartbeatAt: "2026-09-05T10:00:00.000Z",
    isStale: false,
    communicationProfiles: profiles,
    ...overrides,
  };
}

describe("DeviceStatusCard", () => {
  it("renders the empty state when there are no devices", () => {
    render(<DeviceStatusCard locale="en" content={content} devices={[]} />);
    expect(screen.getByText(content.empty)).toBeInTheDocument();
  });

  // WEB-TX-PRESENTATION-004-A -- Commission Balance Snapshot, a second,
  // independent line under the existing Balance line -- never merged into
  // one string, never shown for a device with no reading yet.
  describe("commission snapshot (WEB-TX-PRESENTATION-004-A)", () => {
    it("shows 'commission unavailable' when no Commission Check has ever synced for this SIM", () => {
      render(<DeviceStatusCard locale="en" content={content} devices={[makeDevice([makeProfile()])]} />);
      expect(screen.getByText(content.sim.noCommission)).toBeInTheDocument();
    });

    it("shows the verified commission amount and a fresh verified-at label", () => {
      const recentIso = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      render(
        <DeviceStatusCard
          locale="en"
          content={content}
          devices={[
            makeDevice([
              makeProfile({
                verifiedCommission: "45.92",
                commissionConfidence: "VERIFIED",
                commissionVerifiedAt: recentIso,
              }),
            ]),
          ]}
        />,
      );
      expect(screen.getByText("45.92")).toBeInTheDocument();
      expect(
        screen.getByText((text) => text.startsWith("Commission verified at") && !text.includes("(stale)")),
      ).toBeInTheDocument();
    });

    it("shows the stale label when the last verified commission reading is older than 30 minutes", () => {
      const staleIso = new Date(Date.now() - 45 * 60 * 1000).toISOString();
      render(
        <DeviceStatusCard
          locale="en"
          content={content}
          devices={[
            makeDevice([
              makeProfile({
                verifiedCommission: "45.92",
                commissionConfidence: "VERIFIED",
                commissionVerifiedAt: staleIso,
              }),
            ]),
          ]}
        />,
      );
      expect(
        screen.getByText((text) => text.startsWith("Commission verified at") && text.includes("(stale)")),
      ).toBeInTheDocument();
    });

    it("shows the estimated-commission label when confidence is ESTIMATED", () => {
      render(
        <DeviceStatusCard
          locale="en"
          content={content}
          devices={[
            makeDevice([
              makeProfile({
                verifiedCommission: "10.00",
                commissionConfidence: "ESTIMATED",
                commissionVerifiedAt: "2026-09-05T10:00:00.000Z",
              }),
            ]),
          ]}
        />,
      );
      expect(screen.getByText(content.sim.commissionEstimated)).toBeInTheDocument();
    });

    it("shows the unverified-commission label when confidence is UNKNOWN", () => {
      render(
        <DeviceStatusCard
          locale="en"
          content={content}
          devices={[
            makeDevice([
              makeProfile({
                verifiedCommission: "10.00",
                commissionConfidence: "UNKNOWN",
                commissionVerifiedAt: "2026-09-05T10:00:00.000Z",
              }),
            ]),
          ]}
        />,
      );
      expect(screen.getByText(content.sim.commissionUnknownConfidence)).toBeInTheDocument();
    });

    it("renders both the balance and commission lines independently for the same SIM", () => {
      render(
        <DeviceStatusCard
          locale="en"
          content={content}
          devices={[
            makeDevice([
              makeProfile({
                verifiedBalance: "8415.79",
                balanceConfidence: "VERIFIED",
                balanceVerifiedAt: "2026-09-05T10:00:00.000Z",
                verifiedCommission: "45.92",
                commissionConfidence: "VERIFIED",
                commissionVerifiedAt: "2026-09-05T10:00:00.000Z",
              }),
            ]),
          ]}
        />,
      );
      expect(screen.getByText("8415.79")).toBeInTheDocument();
      expect(screen.getByText("45.92")).toBeInTheDocument();
    });
  });
});
