import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getOrganizationContent } from "@/content/organization";
import type { OrganizationDeviceSummary } from "@/lib/mcp-client";
import { OrganizationStationTree, type WorkspaceGroup } from "./organization-station-tree";

const content = getOrganizationContent("en").stationTree;
const organizationId = "org-1";

// WEB-RBAC-GATING-1 -- every pre-existing test above is unrelated to
// gating and asserts the previous, unrestricted behavior; a full-access
// fixture keeps them exercising exactly what they did before this prop
// existed. The dedicated gating tests below use restricted fixtures.
const ALL_WRITE_PERMISSIONS = ["workspaces:write", "stations:write", "devices:write"];

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
        organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
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
    render(
      <OrganizationStationTree
        locale="en"
        organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
        workspaceGroups={groups}
        devices={[]}
      />,
    );
    expect(screen.getByText(content.emptyStations("Workspace Ghana"))).toBeInTheDocument();
  });

  it("shows the empty-devices message for a station with zero devices attached", () => {
    const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
    render(
      <OrganizationStationTree
        locale="en"
        organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
        workspaceGroups={groups}
        devices={[]}
      />,
    );
    expect(screen.getByText(content.emptyDevices)).toBeInTheDocument();
  });

  it("shows the empty-workspaces message when the organization has no workspaces at all", () => {
    render(
      <OrganizationStationTree
        locale="en"
        organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
        workspaceGroups={[]}
        devices={[]}
      />,
    );
    expect(screen.getByText(content.emptyWorkspaces)).toBeInTheDocument();
  });

  it("surfaces a stationId=null device under 'unassigned', never fabricated into a workspace it was never assigned to", () => {
    const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
    render(
      <OrganizationStationTree
        locale="en"
        organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
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
        organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
        workspaceGroups={groups}
        devices={[makeDevice({ isStale: true })]}
      />,
    );
    expect(screen.getByText(content.device.stale)).toBeInTheDocument();
    expect(screen.queryByText(content.device.online)).not.toBeInTheDocument();
  });

  // STATION-TREE-PHASE-B
  describe("Phase B -- creation and reassignment controls", () => {
    it("renders a '+ Workspace' trigger at the tree root and a '+ Station' trigger per workspace", () => {
      const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
      render(
        <OrganizationStationTree
          locale="en"
          organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
          workspaceGroups={groups}
          devices={[]}
        />,
      );
      expect(screen.getByText(content.createWorkspaceButton)).toBeInTheDocument();
      expect(screen.getByText(content.createStationButton)).toBeInTheDocument();
    });

    it("renders a Station move <select> for every device, offering every Station across every Workspace (never scoped to the device's own workspace only)", () => {
      const otherWorkspace = { id: "workspace-2", organizationId: "org-1", name: "Workspace Benin" };
      const otherStation = { id: "station-2", name: "Station Cotonou" };
      const groups: WorkspaceGroup[] = [
        { workspace, stations: [station] },
        { workspace: otherWorkspace, stations: [otherStation] },
      ];
      render(
        <OrganizationStationTree
          locale="en"
          organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
          workspaceGroups={groups}
          devices={[makeDevice({ stationId: "station-1" })]}
        />,
      );

      const select = screen.getByDisplayValue("Workspace Ghana — Station Accra") as HTMLSelectElement;
      const optionLabels = Array.from(select.options).map((option) => option.textContent);
      expect(optionLabels).toContain("Workspace Ghana — Station Accra");
      expect(optionLabels).toContain("Workspace Benin — Station Cotonou");
    });

    it("shows the Unassign button for a device currently on a Station, never for an already-unassigned one", () => {
      const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
      render(
        <OrganizationStationTree
          locale="en"
          organizationId={organizationId}
        permissions={ALL_WRITE_PERMISSIONS}
          workspaceGroups={groups}
          devices={[
            makeDevice({ deviceId: "device-1", stationId: "station-1" }),
            makeDevice({ deviceId: "device-2", deviceName: "Redmi", stationId: null, stationName: null }),
          ]}
        />,
      );
      // Exactly one Unassign button -- the assigned device only.
      expect(screen.getAllByText(content.unassignButton)).toHaveLength(1);
    });
  });

  // WEB-RBAC-GATING-1
  describe("action gating by permissions", () => {
    const groups: WorkspaceGroup[] = [{ workspace, stations: [station] }];
    const assignedDevice = makeDevice({ stationId: "station-1" });
    const unassignedDevice = makeDevice({
      deviceId: "device-2",
      deviceName: "Redmi",
      stationId: null,
      stationName: null,
    });

    it("renders all 3 write controls for a full-access role (matches locked ORG_ADMIN/SUPER_ADMIN/TENANT_ADMIN matrix)", () => {
      render(
        <OrganizationStationTree
          locale="en"
          organizationId={organizationId}
          permissions={["workspaces:write", "stations:write", "devices:write"]}
          workspaceGroups={groups}
          devices={[assignedDevice]}
        />,
      );
      expect(screen.getByText(content.createWorkspaceButton)).toBeInTheDocument();
      expect(screen.getByText(content.createStationButton)).toBeInTheDocument();
      expect(screen.getByDisplayValue("Workspace Ghana — Station Accra")).toBeInTheDocument();
      expect(screen.getByText(content.unassignButton)).toBeInTheDocument();
    });

    it("hides Workspace creation but shows Station creation and device controls for a STATION_MANAGER-shaped permission set (matches the locked matrix: stations+devices, not workspaces)", () => {
      render(
        <OrganizationStationTree
          locale="en"
          organizationId={organizationId}
          permissions={["stations:write", "devices:write"]}
          workspaceGroups={groups}
          devices={[assignedDevice]}
        />,
      );
      expect(screen.queryByText(content.createWorkspaceButton)).not.toBeInTheDocument();
      expect(screen.getByText(content.createStationButton)).toBeInTheDocument();
      expect(screen.getByDisplayValue("Workspace Ghana — Station Accra")).toBeInTheDocument();
      expect(screen.getByText(content.unassignButton)).toBeInTheDocument();
    });

    it("hides all 3 write controls for an AGENT-shaped (no write) permission set, never a disabled-but-visible control", () => {
      render(
        <OrganizationStationTree
          locale="en"
          organizationId={organizationId}
          permissions={[]}
          workspaceGroups={groups}
          devices={[assignedDevice, unassignedDevice]}
        />,
      );
      expect(screen.queryByText(content.createWorkspaceButton)).not.toBeInTheDocument();
      expect(screen.queryByText(content.createStationButton)).not.toBeInTheDocument();
      expect(screen.queryByDisplayValue("Workspace Ghana — Station Accra")).not.toBeInTheDocument();
      expect(screen.queryByText(content.unassignButton)).not.toBeInTheDocument();
      // The device itself, and its current-station grouping, remain visible --
      // only the write controls are gone, never the underlying data.
      expect(screen.getByText("Pixel 8")).toBeInTheDocument();
      expect(screen.getByText("Redmi")).toBeInTheDocument();
    });

    it("an unrecognized/read-only permission set never accidentally grants a write control (no fallback-to-visible)", () => {
      render(
        <OrganizationStationTree
          locale="en"
          organizationId={organizationId}
          permissions={["workspaces:read", "stations:read", "devices:read"]}
          workspaceGroups={groups}
          devices={[assignedDevice]}
        />,
      );
      expect(screen.queryByText(content.createWorkspaceButton)).not.toBeInTheDocument();
      expect(screen.queryByText(content.createStationButton)).not.toBeInTheDocument();
      expect(screen.queryByDisplayValue("Workspace Ghana — Station Accra")).not.toBeInTheDocument();
    });
  });
});
