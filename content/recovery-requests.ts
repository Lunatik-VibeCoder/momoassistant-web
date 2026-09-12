import type { AppLocale } from "@/i18n/routing";

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-5 -- Security Center,
// Recovery Requests triage. "Route to Case B" (internal status name,
// ROUTED_TO_CASE_B) is shown to admins as "route to replacement" -- the
// user-facing meaning (this device needs a new enrollment), not the
// internal sprint jargon.
export interface RecoveryRequestsContent {
  title: string;
  denialReasonLabel: string;
  requestedAtLabel: string;
  status: { DENIED_DEVICE_REVOKED: string; ROUTED_TO_CASE_B: string };
  routeButton: string;
  routeConfirm: string;
  routeSuccess: string;
  routeError: string;
  empty: string;
}

export function getRecoveryRequestsContent(locale: AppLocale): RecoveryRequestsContent {
  if (locale === "fr") {
    return {
      title: "Demandes de récupération",
      denialReasonLabel: "Motif du refus",
      requestedAtLabel: "Demandé le",
      status: {
        DENIED_DEVICE_REVOKED: "Refusé (appareil révoqué)",
        ROUTED_TO_CASE_B: "Orienté vers un remplacement",
      },
      routeButton: "Orienter vers un remplacement",
      routeConfirm:
        "Orienter cette demande vers un remplacement d'appareil ? Cette action ne réactive ni ne restaure l'appareil concerné.",
      routeSuccess: "Demande orientée vers un remplacement",
      routeError: "Impossible de traiter cette demande",
      empty: "Aucune demande de récupération pour cette organisation.",
    };
  }
  return {
    title: "Recovery Requests",
    denialReasonLabel: "Denial reason",
    requestedAtLabel: "Requested on",
    status: {
      DENIED_DEVICE_REVOKED: "Denied (device revoked)",
      ROUTED_TO_CASE_B: "Routed to replacement",
    },
    routeButton: "Route to replacement",
    routeConfirm:
      "Route this request to device replacement? This does not reactivate or restore the device.",
    routeSuccess: "Request routed to replacement",
    routeError: "Could not process this request",
    empty: "No recovery requests for this organization.",
  };
}
