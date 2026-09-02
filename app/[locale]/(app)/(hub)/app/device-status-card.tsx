import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardContent } from "@/content/dashboard";
import type { AppLocale } from "@/i18n/routing";
import type { OrganizationDeviceSummary } from "@/lib/mcp-client";
import { formatDateTime } from "@/lib/utils";

interface DeviceStatusCardProps {
  locale: AppLocale;
  content: DashboardContent["devices"];
  devices: OrganizationDeviceSummary[];
}

// WS-009 CONTRACT-V1 -- isStale comes straight from the backend (30-minute
// threshold computed there, see devices.service.ts's STALE_THRESHOLD_MS).
// This component never recomputes staleness client-side.
export function DeviceStatusCard({ locale, content, devices }: DeviceStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {devices.length === 0 ? (
          <p className="text-sm text-muted-foreground">{content.empty}</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {devices.map((device) => (
              <li
                key={device.deviceId}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{device.deviceName}</p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {device.stationName ?? content.stationUnknown}
                    {device.lastHeartbeatAt ? (
                      <> · {content.lastHeartbeat(formatDateTime(locale, device.lastHeartbeatAt))}</>
                    ) : (
                      <> · {content.neverSeen}</>
                    )}
                  </p>
                </div>
                <Badge variant={device.isStale ? "destructive" : "secondary"} className="shrink-0">
                  {device.isStale ? content.stale : content.online}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
