"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrganizationContent, type OrganizationContent } from "@/content/organization";
import type { AppLocale } from "@/i18n/routing";
import type { OrganizationDeviceSummary, StationSummary, WorkspaceSummary } from "@/lib/mcp-client";
import { hasPermission } from "@/lib/permissions";
import { formatDateTime } from "@/lib/utils";
import { assignDeviceStationAction, unassignDeviceAction } from "./actions";
import { CreateStationSheet } from "./create-station-sheet";
import { CreateWorkspaceSheet } from "./create-workspace-sheet";

export interface WorkspaceGroup {
  workspace: WorkspaceSummary;
  stations: StationSummary[];
}

interface OrganizationStationTreeProps {
  locale: AppLocale;
  organizationId: string;
  workspaceGroups: WorkspaceGroup[];
  devices: OrganizationDeviceSummary[];
  // WEB-RBAC-GATING-1 -- McpUserProfile.permissions, verbatim from the
  // backend (RolesService.getPermissionsForRole). Gates the 3 write
  // controls this tree renders; the backend's own 403 remains the real
  // enforcement (RequirePermission on each endpoint) -- this is UX only.
  permissions: string[];
}

interface StationOption {
  stationId: string;
  label: string;
}

// STATION-TREE-PHASE-B -- moves (or, for a currently-unassigned device,
// assigns) a Device to any Station in the organization, never scoped to the
// device's current workspace only -- the locked Phase B contract's
// cross-organization check is the only boundary, a move across workspaces
// within the same organization is allowed. No confirmation here (only
// unassign requires one, per contract) -- selecting the Station the device
// already holds is a harmless idempotent no-op server-side.
function DeviceStationSelect({
  deviceId,
  currentStationId,
  options,
  content,
}: {
  deviceId: string;
  currentStationId: string | null;
  options: StationOption[];
  content: OrganizationContent["stationTree"];
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const stationId = event.target.value;
    if (!stationId || stationId === currentStationId) {
      return;
    }
    startTransition(async () => {
      try {
        await assignDeviceStationAction(deviceId, stationId);
        toast.success(content.moveSuccess);
      } catch {
        toast.error(content.moveError);
      }
    });
  }

  return (
    <select
      value={currentStationId ?? ""}
      onChange={handleChange}
      disabled={isPending}
      className="h-8 max-w-[10rem] rounded-lg border border-input bg-transparent px-2 text-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
    >
      <option value="" disabled>
        {content.movePlaceholder}
      </option>
      {options.map((option) => (
        <option key={option.stationId} value={option.stationId}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// STATION-TREE-PHASE-B -- confirm+useTransition, field-for-field the same
// shape as members/remove-member-button.tsx's RemoveMemberButton (the
// locked contract's "explicit confirmation obligatoire" requirement).
function UnassignDeviceButton({
  deviceId,
  content,
}: {
  deviceId: string;
  content: OrganizationContent["stationTree"];
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(content.unassignConfirm)) {
      return;
    }
    startTransition(async () => {
      try {
        await unassignDeviceAction(deviceId);
        toast.success(content.unassignSuccess);
      } catch {
        toast.error(content.unassignError);
      }
    });
  }

  return (
    <Button variant="outline" size="sm" disabled={isPending} onClick={handleClick}>
      {content.unassignButton}
    </Button>
  );
}

function DeviceRow({
  locale,
  content,
  device,
  stationOptions,
  canManageDevices,
}: {
  locale: AppLocale;
  content: OrganizationContent["stationTree"];
  device: OrganizationDeviceSummary;
  stationOptions: StationOption[];
  canManageDevices: boolean;
}) {
  return (
    <li className="flex flex-col gap-2 py-2">
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-xs font-medium text-foreground">{device.deviceName}</p>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {device.lastHeartbeatAt
              ? content.device.lastHeartbeat(formatDateTime(locale, device.lastHeartbeatAt))
              : content.device.neverSeen}
          </span>
          <Badge variant={device.isStale ? "destructive" : "secondary"}>
            {device.isStale ? content.device.stale : content.device.online}
          </Badge>
        </div>
      </div>
      {/* WEB-RBAC-GATING-1 -- a viewer without devices:write (AGENT) sees
          nothing here, not a disabled control: the device's current
          station is already conveyed by its position in the tree
          (grouped under that station's own <li>, or under "unassigned"),
          so hiding this row entirely loses no information. */}
      {canManageDevices && (
        <div className="flex items-center justify-end gap-2">
          <DeviceStationSelect
            deviceId={device.deviceId}
            currentStationId={device.stationId}
            options={stationOptions}
            content={content}
          />
          {device.stationId !== null && <UnassignDeviceButton deviceId={device.deviceId} content={content} />}
        </div>
      )}
    </li>
  );
}

export function OrganizationStationTree({
  locale,
  organizationId,
  workspaceGroups,
  devices,
  permissions,
}: OrganizationStationTreeProps) {
  // HOTFIX-ORG-500 -- content/organization.ts has no server-only
  // dependency (pure/deterministic, no I/O), so it's safe to resolve here
  // from `locale` (a plain string) instead of receiving the content object
  // as a prop from the Server Component. stationTree carries function
  // fields (emptyStations, device.lastHeartbeat) that cannot cross the
  // Server->Client boundary -- resolving locally means no function-valued
  // prop is ever serialized.
  const content = getOrganizationContent(locale).stationTree;
  const unassigned = devices.filter((device) => device.stationId === null);

  // WEB-RBAC-GATING-1 -- computed once, matches the locked Phase B matrix
  // exactly (SUPER_ADMIN/TENANT_ADMIN/ORG_ADMIN: all 3; STATION_MANAGER:
  // stations+devices, not workspaces; AGENT: none) without hardcoding that
  // matrix here -- it falls out of whatever `permissions` the backend
  // actually sent for this viewer's real role.
  const canManageWorkspaces = hasPermission(permissions, "workspaces", "write");
  const canManageStations = hasPermission(permissions, "stations", "write");
  const canManageDevices = hasPermission(permissions, "devices", "write");

  // Flattened across every Workspace -- the move control lets a device go
  // to any Station in the organization, not just ones in its current
  // Workspace (see DeviceStationSelect's own comment).
  const allStationOptions: StationOption[] = workspaceGroups.flatMap(({ workspace, stations }) =>
    stations.map((station) => ({
      stationId: station.id,
      label: `${workspace.name} — ${station.name}`,
    })),
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-base">{content.title}</CardTitle>
        {canManageWorkspaces && <CreateWorkspaceSheet organizationId={organizationId} content={content} />}
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {workspaceGroups.length === 0 ? (
          <p className="text-sm text-muted-foreground">{content.emptyWorkspaces}</p>
        ) : (
          workspaceGroups.map(({ workspace, stations }) => (
            <div key={workspace.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">{workspace.name}</h3>
                {canManageStations && <CreateStationSheet workspaceId={workspace.id} content={content} />}
              </div>
              {stations.length === 0 ? (
                <p className="text-xs text-muted-foreground">{content.emptyStations(workspace.name)}</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {stations.map((station) => {
                    const stationDevices = devices.filter((device) => device.stationId === station.id);
                    return (
                      <li key={station.id} className="rounded-md border border-border p-3">
                        <p className="text-sm font-medium text-foreground">{station.name}</p>
                        {stationDevices.length === 0 ? (
                          <p className="mt-1 text-xs text-muted-foreground">{content.emptyDevices}</p>
                        ) : (
                          <ul className="mt-2 flex flex-col divide-y divide-border/60 border-t border-border/60">
                            {stationDevices.map((device) => (
                              <DeviceRow
                                key={device.deviceId}
                                locale={locale}
                                content={content}
                                device={device}
                                stationOptions={allStationOptions}
                                canManageDevices={canManageDevices}
                              />
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))
        )}
        {unassigned.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">{content.unassignedTitle}</h3>
            <ul className="flex flex-col divide-y divide-border/60 rounded-md border border-border/60 px-3">
              {unassigned.map((device) => (
                <DeviceRow
                  key={device.deviceId}
                  locale={locale}
                  content={content}
                  device={device}
                  stationOptions={allStationOptions}
                  canManageDevices={canManageDevices}
                />
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
