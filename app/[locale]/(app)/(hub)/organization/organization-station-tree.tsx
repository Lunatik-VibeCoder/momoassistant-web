import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrganizationContent } from "@/content/organization";
import type { AppLocale } from "@/i18n/routing";
import type { OrganizationDeviceSummary, StationSummary, WorkspaceSummary } from "@/lib/mcp-client";
import { formatDateTime } from "@/lib/utils";

export interface WorkspaceGroup {
  workspace: WorkspaceSummary;
  stations: StationSummary[];
}

interface OrganizationStationTreeProps {
  locale: AppLocale;
  content: OrganizationContent["stationTree"];
  workspaceGroups: WorkspaceGroup[];
  devices: OrganizationDeviceSummary[];
}

// STATION-TREE-PHASE-A -- read-only. device.stationId is the only signal
// used to attach a device under a station (mirrors DeviceStatusCard's own
// discipline: never recompute/guess what the backend already states). A
// device with stationId === null cannot be attributed to any workspace
// either (Device has no workspaceId of its own, only an optional Station
// link -- see momoassistant-platform schema.prisma), so it's surfaced once
// at the bottom instead of being silently dropped or fabricated into a
// workspace it was never assigned to.
function DeviceRow({
  locale,
  content,
  device,
}: {
  locale: AppLocale;
  content: OrganizationContent["stationTree"]["device"];
  device: OrganizationDeviceSummary;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-1.5">
      <p className="truncate text-xs font-medium text-foreground">{device.deviceName}</p>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {device.lastHeartbeatAt
            ? content.lastHeartbeat(formatDateTime(locale, device.lastHeartbeatAt))
            : content.neverSeen}
        </span>
        <Badge variant={device.isStale ? "destructive" : "secondary"}>
          {device.isStale ? content.stale : content.online}
        </Badge>
      </div>
    </li>
  );
}

export function OrganizationStationTree({
  locale,
  content,
  workspaceGroups,
  devices,
}: OrganizationStationTreeProps) {
  const unassigned = devices.filter((device) => device.stationId === null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {workspaceGroups.length === 0 ? (
          <p className="text-sm text-muted-foreground">{content.emptyWorkspaces}</p>
        ) : (
          workspaceGroups.map(({ workspace, stations }) => (
            <div key={workspace.id} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">{workspace.name}</h3>
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
                                content={content.device}
                                device={device}
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
                <DeviceRow key={device.deviceId} locale={locale} content={content.device} device={device} />
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
