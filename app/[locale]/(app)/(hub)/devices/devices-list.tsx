"use client";

import { Badge } from "@/components/ui/badge";
import type { DevicesContent } from "@/content/devices";
import type { AppLocale } from "@/i18n/routing";
import type { OrganizationDeviceSummary } from "@/lib/mcp-client";
import { hasPermission } from "@/lib/permissions";
import { formatDateTime } from "@/lib/utils";
import { RevokeDeviceDialog } from "./revoke-device-dialog";

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-4 -- REVOKED/SUSPENDED are
// not revocable again (backend: DevicesService.revoke throws ConflictException
// for either -- "already revoked" / "not in a revocable state"). Hiding the
// button for both, rather than showing it and surfacing the 409, matches
// this repo's existing convention (RemoveMemberButton hides for the caller's
// own row rather than showing a button that would always fail).
const NOT_REVOCABLE = new Set(["REVOKED", "SUSPENDED"]);

function certificationBadgeVariant(status: string | null): "secondary" | "outline" | "destructive" {
  if (status === "CERTIFIED") return "secondary";
  if (status === "REVOKED" || status === "SUSPENDED") return "destructive";
  return "outline";
}

function certificationLabel(content: DevicesContent, status: string | null): string {
  if (status === null) return content.certification.none;
  return content.certification[status as keyof DevicesContent["certification"]] ?? status;
}

// Single-layout list, one row per device at every breakpoint -- same
// pattern as organization-station-tree.tsx's DeviceRow (a flex row that
// wraps, not a separate desktop-table/mobile-card duplication). Deliberately
// not members/page.tsx's dual-render approach: that one exists for a
// documented 7-column overflow (WS-005R) this 4-column list doesn't have,
// and duplicating each row per breakpoint would put every action control
// in the DOM twice for no reason.
export function DevicesList({
  locale,
  devices,
  permissions,
  content,
}: {
  locale: AppLocale;
  devices: OrganizationDeviceSummary[];
  permissions: string[];
  content: DevicesContent;
}) {
  const canRevoke = hasPermission(permissions, "devices", "write");

  if (devices.length === 0) {
    return <p className="text-sm text-muted-foreground">{content.empty}</p>;
  }

  return (
    <ul className="flex flex-col gap-2 rounded-xl ring-1 ring-foreground/10">
      {devices.map((device) => (
        <li
          key={device.deviceId}
          className="flex flex-col gap-2 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{device.deviceName}</p>
            <p className="truncate text-sm text-muted-foreground">
              {device.stationName ?? content.noStation}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
            <span className="text-xs text-muted-foreground">
              {content.lastSeenLabel} {formatDateTime(locale, device.lastHeartbeatAt)}
            </span>
            <Badge variant={certificationBadgeVariant(device.certificationStatus)}>
              {certificationLabel(content, device.certificationStatus)}
            </Badge>
            {canRevoke && !NOT_REVOCABLE.has(device.certificationStatus ?? "") && (
              <RevokeDeviceDialog
                deviceId={device.deviceId}
                deviceName={device.deviceName}
                content={content}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
