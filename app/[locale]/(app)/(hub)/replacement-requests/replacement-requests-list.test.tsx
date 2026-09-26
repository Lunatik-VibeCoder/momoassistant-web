import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getReplacementRequestsContent } from "@/content/replacement-requests";
import type {
  MemberSummary,
  OrganizationDeviceSummary,
  ReplacementRequestListItem,
} from "@/lib/mcp-client";
import { ReplacementRequestsList } from "./replacement-requests-list";

const content = getReplacementRequestsContent("en");

function makeRequest(
  overrides: Partial<ReplacementRequestListItem> = {},
): ReplacementRequestListItem {
  return {
    requestId: "req-1",
    requesterId: "user-1",
    oldDeviceId: "device-1",
    newDeviceId: null,
    status: "PENDING_APPROVAL",
    createdAt: "2026-09-12T10:00:00.000Z",
    expiresAt: "2026-09-14T10:00:00.000Z",
    otpVerifiedAt: "2026-09-12T10:01:00.000Z",
    approvedBy: null,
    approvedAt: null,
    rejectedBy: null,
    rejectedAt: null,
    rejectionReason: null,
    ...overrides,
  };
}

function makeMember(overrides: Partial<MemberSummary> = {}): MemberSummary {
  return {
    id: "member-1",
    userId: "user-1",
    organizationId: "org-1",
    workspaceId: null,
    status: "ACTIVE",
    invitedAt: "2026-09-01T00:00:00.000Z",
    joinedAt: "2026-09-01T00:00:00.000Z",
    role: { id: "role-1", code: "AGENT", name: "Agent" },
    user: { displayName: "Agent One", email: "agent@example.com" },
    ...overrides,
  };
}

function makeDevice(overrides: Partial<OrganizationDeviceSummary> = {}): OrganizationDeviceSummary {
  return {
    deviceId: "device-1",
    deviceName: "Pixel 8",
    stationId: null,
    stationName: null,
    batteryLevel: null,
    lastHeartbeatAt: null,
    isStale: false,
    communicationProfiles: [],
    certificationStatus: "REVOKED",
    ...overrides,
  };
}

describe("ReplacementRequestsList", () => {
  it("shows the empty message when the organization has no replacement requests", () => {
    render(
      <ReplacementRequestsList
        locale="en"
        requests={[]}
        members={[]}
        devices={[]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText(content.empty)).toBeInTheDocument();
  });

  it("resolves requesterId/oldDeviceId to member/device display names", () => {
    render(
      <ReplacementRequestsList
        locale="en"
        requests={[makeRequest()]}
        members={[makeMember()]}
        devices={[makeDevice()]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText(/Agent One/)).toBeInTheDocument();
    expect(screen.getByText(/Pixel 8/)).toBeInTheDocument();
  });

  it("falls back to the unknown labels when the member/device lists don't contain a match", () => {
    render(
      <ReplacementRequestsList
        locale="en"
        requests={[makeRequest()]}
        members={[]}
        devices={[]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText(new RegExp(content.unknownMember))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(content.unknownDevice))).toBeInTheDocument();
  });

  it("shows the new device row only when newDeviceId is present (COMPLETED)", () => {
    render(
      <ReplacementRequestsList
        locale="en"
        requests={[
          makeRequest({ status: "COMPLETED", newDeviceId: "device-2" }),
        ]}
        members={[makeMember()]}
        devices={[makeDevice(), makeDevice({ deviceId: "device-2", deviceName: "Pixel 9" })]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText(/Pixel 9/)).toBeInTheDocument();
  });

  it("shows the rejection reason only for REJECTED requests", () => {
    render(
      <ReplacementRequestsList
        locale="en"
        requests={[
          makeRequest({ status: "REJECTED", rejectionReason: "Requester left the organization" }),
        ]}
        members={[makeMember()]}
        devices={[makeDevice()]}
        permissions={[]}
        content={content}
      />,
    );
    expect(screen.getByText(/Requester left the organization/)).toBeInTheDocument();
  });

  it("renders every status label correctly", () => {
    const statuses: ReplacementRequestListItem["status"][] = [
      "PENDING_OTP",
      "PENDING_APPROVAL",
      "APPROVED",
      "REJECTED",
      "EXPIRED",
      "COMPLETED",
    ];
    for (const status of statuses) {
      const { unmount } = render(
        <ReplacementRequestsList
          locale="en"
          requests={[makeRequest({ status })]}
          members={[makeMember()]}
          devices={[makeDevice()]}
          permissions={[]}
          content={content}
        />,
      );
      expect(screen.getByText(content.status[status])).toBeInTheDocument();
      unmount();
    }
  });

  describe("Approve/Reject action gating", () => {
    it("shows Approve and Reject for devices:recover on a PENDING_APPROVAL request", () => {
      render(
        <ReplacementRequestsList
          locale="en"
          requests={[makeRequest({ status: "PENDING_APPROVAL" })]}
          members={[makeMember()]}
          devices={[makeDevice()]}
          permissions={["devices:recover"]}
          content={content}
        />,
      );
      expect(screen.getByText(content.approveButton)).toBeInTheDocument();
      expect(screen.getByText(content.rejectButton)).toBeInTheDocument();
    });

    it("hides both actions for a devices:write-only permission set (recover is a distinct permission, CB-2)", () => {
      render(
        <ReplacementRequestsList
          locale="en"
          requests={[makeRequest({ status: "PENDING_APPROVAL" })]}
          members={[makeMember()]}
          devices={[makeDevice()]}
          permissions={["devices:write"]}
          content={content}
        />,
      );
      expect(screen.queryByText(content.approveButton)).not.toBeInTheDocument();
      expect(screen.queryByText(content.rejectButton)).not.toBeInTheDocument();
    });

    it("hides both actions for an empty permission set", () => {
      render(
        <ReplacementRequestsList
          locale="en"
          requests={[makeRequest({ status: "PENDING_APPROVAL" })]}
          members={[makeMember()]}
          devices={[makeDevice()]}
          permissions={[]}
          content={content}
        />,
      );
      expect(screen.queryByText(content.approveButton)).not.toBeInTheDocument();
      expect(screen.queryByText(content.rejectButton)).not.toBeInTheDocument();
    });

    // The core anti-footgun test: only PENDING_APPROVAL is a valid target
    // for approve/reject (backend returns REPLACEMENT_REQUEST_NOT_ELIGIBLE
    // for every other status) -- never show a guaranteed-409 action, even
    // for an authorized admin.
    it.each<ReplacementRequestListItem["status"]>([
      "PENDING_OTP",
      "APPROVED",
      "REJECTED",
      "EXPIRED",
      "COMPLETED",
    ])("hides Approve/Reject for a %s request even with devices:recover", (status) => {
      render(
        <ReplacementRequestsList
          locale="en"
          requests={[makeRequest({ status })]}
          members={[makeMember()]}
          devices={[makeDevice()]}
          permissions={["devices:recover"]}
          content={content}
        />,
      );
      expect(screen.queryByText(content.approveButton)).not.toBeInTheDocument();
      expect(screen.queryByText(content.rejectButton)).not.toBeInTheDocument();
    });
  });
});
