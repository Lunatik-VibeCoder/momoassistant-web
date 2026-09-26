"use client";

import { Badge } from "@/components/ui/badge";
import type { ReplacementRequestsContent } from "@/content/replacement-requests";
import type { AppLocale } from "@/i18n/routing";
import type {
  MemberSummary,
  OrganizationDeviceSummary,
  ReplacementRequestListItem,
} from "@/lib/mcp-client";
import { hasPermission } from "@/lib/permissions";
import { formatDateTime } from "@/lib/utils";
import { ApproveButton } from "./approve-button";
import { RejectDialog } from "./reject-dialog";

// AUTH-SECURITY-2 Case B B1.8 -- approve/reject are only ever valid from
// PENDING_APPROVAL (approveReplacementRequest/rejectReplacementRequest,
// B1.3, locked, both return REPLACEMENT_REQUEST_NOT_ELIGIBLE otherwise) --
// same "never show a guaranteed-409 action" convention as PC-4's
// NOT_REVOCABLE set, inverted here since PENDING_APPROVAL is the single
// eligible state rather than the excluded ones.
const ACTIONABLE_STATUS = "PENDING_APPROVAL";

function statusBadgeVariant(
  status: ReplacementRequestListItem["status"],
): "secondary" | "outline" | "destructive" {
  if (status === "APPROVED" || status === "COMPLETED") return "secondary";
  if (status === "REJECTED" || status === "EXPIRED") return "destructive";
  return "outline";
}

// requesterId/oldDeviceId/newDeviceId are raw ids in the backend's own
// ReplacementRequestListItem (B1.6, locked) -- no server-side join, unlike
// RecoveryRequestSummary's embedded device/user objects (a different
// backend module). Resolved here from listMembers/listOrganizationDevices,
// both already-fetched data sources -- per the B1.8 GO's explicit "no new
// backend endpoint... if the two sources already exist in the BFF/client."
function memberLabel(
  members: MemberSummary[],
  userId: string,
  unknownMember: string,
): string {
  const member = members.find((m) => m.userId === userId);
  if (!member) return unknownMember;
  return member.user.email ? `${member.user.displayName} (${member.user.email})` : member.user.displayName;
}

function deviceLabel(
  devices: OrganizationDeviceSummary[],
  deviceId: string,
  unknownDevice: string,
): string {
  return devices.find((d) => d.deviceId === deviceId)?.deviceName ?? unknownDevice;
}

// Single responsive row layout, same pattern as PC-4's devices-list.tsx /
// PC-5's recovery-requests-list.tsx (not members/page.tsx's dual desktop/
// mobile render -- no documented overflow reason for it here either).
export function ReplacementRequestsList({
  locale,
  requests,
  members,
  devices,
  permissions,
  content,
}: {
  locale: AppLocale;
  requests: ReplacementRequestListItem[];
  members: MemberSummary[];
  devices: OrganizationDeviceSummary[];
  permissions: string[];
  content: ReplacementRequestsContent;
}) {
  const canRecover = hasPermission(permissions, "devices", "recover");

  if (requests.length === 0) {
    return <p className="text-sm text-muted-foreground">{content.empty}</p>;
  }

  return (
    <ul className="flex flex-col gap-2 rounded-xl ring-1 ring-foreground/10">
      {requests.map((req) => (
        <li
          key={req.requestId}
          className="flex flex-col gap-2 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {content.requesterLabel}: {memberLabel(members, req.requesterId, content.unknownMember)}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {content.oldDeviceLabel}: {deviceLabel(devices, req.oldDeviceId, content.unknownDevice)}
            </p>
            {req.newDeviceId && (
              <p className="truncate text-sm text-muted-foreground">
                {content.newDeviceLabel}: {deviceLabel(devices, req.newDeviceId, content.unknownDevice)}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {content.requestedAtLabel} {formatDateTime(locale, req.createdAt)}
            </p>
            {req.status === "REJECTED" && req.rejectionReason && (
              <p className="text-xs text-muted-foreground">
                {content.rejectionReasonLabel}: {req.rejectionReason}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
            <Badge variant={statusBadgeVariant(req.status)}>{content.status[req.status]}</Badge>
            {canRecover && req.status === ACTIONABLE_STATUS && (
              <>
                <ApproveButton requestId={req.requestId} content={content} />
                <RejectDialog requestId={req.requestId} content={content} />
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
