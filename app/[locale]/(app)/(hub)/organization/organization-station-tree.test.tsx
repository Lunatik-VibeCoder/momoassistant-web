import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getOrganizationContent } from "@/content/organization";
import type { OrganizationDeviceSummary } from "@/lib/mcp-client";
import { OrganizationStationTree, type WorkspaceGroup } from "./organization-station-tree";

const content = getOrganizationContent("en").stationTree;

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
    ...overrides,
  };
}

const workspace = { id: "workspace-1", organizationId: "org-1", name: "Workspace Ghana" };
const station = { id: "station-1", name: "Station Accra" };

describe("OrganizationStationTree", () => {
  it("attaches a device under its station via device.stationId, never a re-derived match", () => {
    const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
    render(
      <OrganizationStationTree
        locale="en"
        content={content}
        workspaceGroups={groups}
        devices={[makeDevice({ stationId: "station-1" })]}
      />,
    );
    expect(screen.getByText("Workspace Ghana")).toBeInTheDocument();
    expect(screen.getByText("Station Accra")).toBeInTheDocument();
    expect(screen.getByText("Pixel 8")).toBeInTheDocument();
    expect(screen.queryByText(content.unassignedTitle)).not.toBeInTheDocument();
  });

  it("shows the empty-stations message for a workspace with zero stations, never a blank group", () => {
    const groups: WorkspaceGroup[] = [{ workspace, stations: [] }];
    render(<OrganizationStationTree locale="en" content={content} workspaceGroups={groups} devices={[]} />);
    expect(screen.getByText(content.emptyStations("Workspace Ghana"))).toBeInTheDocument();
  });

  it("shows the empty-devices message for a station with zero devices attached", () => {
    const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
    render(<OrganizationStationTree locale="en" content={content} workspaceGroups={groups} devices={[]} />);
    expect(screen.getByText(content.emptyDevices)).toBeInTheDocument();
  });

  it("shows the empty-workspaces message when the organization has no workspaces at all", () => {
    render(<OrganizationStationTree locale="en" content={content} workspaceGroups={[]} devices={[]} />);
    expect(screen.getByText(content.emptyWorkspaces)).toBeInTheDocument();
  });

  it("surfaces a stationId=null device under 'unassigned', never fabricated into a workspace it was never assigned to", () => {
    const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
    render(
      <OrganizationStationTree
        locale="en"
        content={content}
        workspaceGroups={groups}
        devices={[makeDevice({ deviceId: "device-2", deviceName: "Redmi", stationId: null, stationName: null })]}
      />,
    );
    expect(screen.getByText(content.unassignedTitle)).toBeInTheDocument();
    expect(screen.getByText("Redmi")).toBeInTheDocument();
    // The station it was never assigned to still shows its own empty state.
    expect(screen.getByText(content.emptyDevices)).toBeInTheDocument();
  });

  it("renders the stale badge for isStale devices, the active badge otherwise", () => {
    const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
    render(
      <OrganizationStationTree
        locale="en"
        content={content}
        workspaceGroups={groups}
        devices={[makeDevice({ isStale: true })]}
      />,
    );
    expect(screen.getByText(content.device.stale)).toBeInTheDocument();
    expect(screen.queryByText(content.device.online)).not.toBeInTheDocument();
  });
});
