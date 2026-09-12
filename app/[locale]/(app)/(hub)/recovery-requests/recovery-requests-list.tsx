"use client";

import { Badge } from "@/components/ui/badge";
import type { RecoveryRequestsContent } from "@/content/recovery-requests";
import type { AppLocale } from "@/i18n/routing";
import type { RecoveryRequestSummary } from "@/lib/mcp-client";
import { hasPermission } from "@/lib/permissions";
import { formatDateTime } from "@/lib/utils";
import { RouteToCaseBButton } from "./route-to-case-b-button";

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-5 -- single responsive row
// layout, same pattern as PC-4's devices-list.tsx (not members/page.tsx's
// dual desktop/mobile render -- no documented overflow reason for it here
// either, and it breaks Testing Library queries for interactive rows).
export function RecoveryRequestsList({
  locale,
  requests,
  permissions,
  content,
}: {
  locale: AppLocale;
  requests: RecoveryRequestSummary[];
  permissions: string[];
  content: RecoveryRequestsContent;
}) {
  const canRoute = hasPermission(permissions, "devices", "write");

  if (requests.length === 0) {
    return <p className="text-sm text-muted-foreground">{content.empty}</p>;
  }

  return (
    <ul className="flex flex-col gap-2 rounded-xl ring-1 ring-foreground/10">
      {requests.map((req) => (
        <li
          key={req.id}
          className="flex flex-col gap-2 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{req.device.deviceName}</p>
            <p className="truncate text-sm text-muted-foreground">
              {req.user.displayName}
              {req.user.email ? ` (${req.user.email})` : ""}
            </p>
            <p className="text-xs text-muted-foreground">
              {content.requestedAtLabel} {formatDateTime(locale, req.createdAt)}
              {req.deviceCertificationStatusAtDenial
                ? ` · ${content.denialReasonLabel}: ${req.deviceCertificationStatusAtDenial}`
                : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
            <Badge variant={req.status === "ROUTED_TO_CASE_B" ? "secondary" : "outline"}>
              {content.status[req.status as keyof RecoveryRequestsContent["status"]] ?? req.status}
            </Badge>
            {canRoute && req.status !== "ROUTED_TO_CASE_B" && (
              <RouteToCaseBButton requestId={req.id} content={content} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
