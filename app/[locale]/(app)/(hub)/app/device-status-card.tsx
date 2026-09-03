import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardContent } from "@/content/dashboard";
import type { AppLocale } from "@/i18n/routing";
import type { CommunicationProfileSummary, OrganizationDeviceSummary } from "@/lib/mcp-client";
import { formatDateTime } from "@/lib/utils";

interface DeviceStatusCardProps {
  locale: AppLocale;
  content: DashboardContent["operationalHealth"];
  devices: OrganizationDeviceSummary[];
}

// WS-009 CONTRACT-V1 -- isStale comes straight from the backend (30-minute
// threshold computed there, see devices.service.ts's STALE_THRESHOLD_MS).
// This component never recomputes staleness client-side.
//
// POST-WS009-REMEDIATION-01C-G-WEB -- BALANCE_STALE_THRESHOLD_MS below is a
// SEPARATE concept from the device-level isStale above (that one tracks
// heartbeat age, this one tracks how old a SIM's own last verified balance
// reading is) that happens to share the same 30-minute magnitude, purely
// because it mirrors the same "2x the 15-minute sync cadence" reasoning
// documented on STALE_THRESHOLD_MS -- the backend response carries no
// balance-staleness flag of its own to reuse, so this is computed here, not
// invented as a new arbitrary number.
const BALANCE_STALE_THRESHOLD_MS = 30 * 60 * 1000;

function isBalanceStale(balanceVerifiedAt: string): boolean {
  return Date.now() - new Date(balanceVerifiedAt).getTime() > BALANCE_STALE_THRESHOLD_MS;
}

function SimRow({
  locale,
  content,
  profile,
}: {
  locale: AppLocale;
  content: DashboardContent["operationalHealth"]["sim"];
  profile: CommunicationProfileSummary;
}) {
  const label =
    profile.logicalSlot !== null
      ? content.label(profile.logicalSlot)
      : profile.operatorId;

  return (
    <li className="flex items-center justify-between gap-3 py-1.5">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-foreground">
          {label} · {profile.operatorId} · {profile.countryId}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {profile.verifiedBalance === null ? (
            content.noBalance
          ) : profile.balanceConfidence === "VERIFIED" ? (
            profile.balanceVerifiedAt !== null && isBalanceStale(profile.balanceVerifiedAt) ? (
              content.verifiedAtStale(formatDateTime(locale, profile.balanceVerifiedAt))
            ) : (
              content.verifiedAt(formatDateTime(locale, profile.balanceVerifiedAt))
            )
          ) : profile.balanceConfidence === "ESTIMATED" ? (
            content.estimated
          ) : (
            content.unknownConfidence
          )}
        </p>
      </div>
      {/* No currency shown -- CommunicationProfileSummary carries none,
          never guessed here (same discipline as RecentTransactionSummary's
          amount above). */}
      {profile.verifiedBalance !== null && (
        <span className="shrink-0 text-sm font-medium text-foreground">
          {profile.verifiedBalance}
        </span>
      )}
    </li>
  );
}

// WS-010-DASHBOARD-V2-IMPL-01 -- the audit explicitly rejected a bare
// device-count "KPI" as the headline: this summary line EXPLAINS the list
// below it, it never replaces it (device rows always render underneath,
// same as before). `attention` is device-level isStale only -- SIM balance
// staleness is already shown inline per-SIM ("(ancien)"/"(stale)") and is
// deliberately not double-counted into this line, to avoid conflating two
// different staleness concepts into one number.
export function DeviceStatusCard({ locale, content, devices }: DeviceStatusCardProps) {
  const activeCount = devices.filter((device) => !device.isStale).length;
  const attentionCount = devices.length - activeCount;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{content.title}</CardTitle>
        {devices.length > 0 && (
          <CardDescription>
            {content.summary(devices.length, activeCount)}
            {attentionCount > 0 && (
              <>
                {" · "}
                <span className="text-warning">{content.attention(attentionCount)}</span>
              </>
            )}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {devices.length === 0 ? (
          <p className="text-sm text-muted-foreground">{content.empty}</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {devices.map((device) => (
              <li key={device.deviceId} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
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
                </div>
                {device.communicationProfiles.length === 0 ? (
                  <p className="mt-2 text-xs text-muted-foreground">{content.sim.noProfiles}</p>
                ) : (
                  <ul className="mt-2 flex flex-col divide-y divide-border/60 border-t border-border/60">
                    {device.communicationProfiles.map((profile) => (
                      <SimRow key={profile.id} locale={locale} content={content.sim} profile={profile} />
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
