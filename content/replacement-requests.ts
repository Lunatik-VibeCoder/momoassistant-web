import type { AppLocale } from "@/i18n/routing";

// AUTH-SECURITY-2 Case B B1.8 -- Web admin triage/approval surface for
// ReplacementRequest (CB-1, CASE_B_CONTRACT_LOCK.md), distinct from
// PC-5's /recovery-requests (RecoveryRequest is a triage journal only,
// never an approval mechanism -- CB-0). Web only ever consumes the
// PERMISSION-based routes (list/approve/reject) -- the IDENTITY-based
// routes (create/verify-otp/resend-otp/complete-enrollment) are the
// candidate phone's own flow, already closed by Android B1.7.
export interface ReplacementRequestsContent {
  title: string;
  requesterLabel: string;
  oldDeviceLabel: string;
  newDeviceLabel: string;
  requestedAtLabel: string;
  unknownDevice: string;
  unknownMember: string;
  status: {
    PENDING_OTP: string;
    PENDING_APPROVAL: string;
    APPROVED: string;
    REJECTED: string;
    EXPIRED: string;
    COMPLETED: string;
  };
  approveButton: string;
  approveConfirm: string;
  approveSuccess: string;
  approveError: string;
  rejectButton: string;
  rejectSheetTitle: string;
  rejectWarning: string;
  rejectReasonLabel: string;
  rejectReasonHint: string;
  rejectSubmitLabel: string;
  rejectSuccess: string;
  rejectionReasonLabel: string;
  empty: string;
}

export function getReplacementRequestsContent(locale: AppLocale): ReplacementRequestsContent {
  if (locale === "fr") {
    return {
      title: "Remplacements d'appareil",
      requesterLabel: "Demandeur",
      oldDeviceLabel: "Ancien appareil",
      newDeviceLabel: "Nouvel appareil",
      requestedAtLabel: "Demandé le",
      unknownDevice: "Appareil inconnu",
      unknownMember: "Membre inconnu",
      status: {
        PENDING_OTP: "Vérification en cours",
        PENDING_APPROVAL: "En attente d'approbation",
        APPROVED: "Approuvé",
        REJECTED: "Refusé",
        EXPIRED: "Expiré",
        COMPLETED: "Terminé",
      },
      approveButton: "Approuver",
      approveConfirm:
        "Approuver ce remplacement d'appareil ? Le demandeur pourra activer un nouvel appareil.",
      approveSuccess: "Remplacement approuvé",
      approveError: "Impossible d'approuver cette demande",
      rejectButton: "Refuser",
      rejectSheetTitle: "Refuser le remplacement",
      rejectWarning:
        "Le demandeur devra soumettre une nouvelle demande s'il souhaite réessayer.",
      rejectReasonLabel: "Motif du refus",
      rejectReasonHint: "Entre 10 et 500 caractères.",
      rejectSubmitLabel: "Refuser la demande",
      rejectSuccess: "Demande refusée",
      rejectionReasonLabel: "Motif",
      empty: "Aucune demande de remplacement pour cette organisation.",
    };
  }
  return {
    title: "Device Replacements",
    requesterLabel: "Requester",
    oldDeviceLabel: "Old device",
    newDeviceLabel: "New device",
    requestedAtLabel: "Requested on",
    unknownDevice: "Unknown device",
    unknownMember: "Unknown member",
    status: {
      PENDING_OTP: "Verifying",
      PENDING_APPROVAL: "Awaiting approval",
      APPROVED: "Approved",
      REJECTED: "Rejected",
      EXPIRED: "Expired",
      COMPLETED: "Completed",
    },
    approveButton: "Approve",
    approveConfirm:
      "Approve this device replacement? The requester will be able to activate a new device.",
    approveSuccess: "Replacement approved",
    approveError: "Unable to approve this request",
    rejectButton: "Reject",
    rejectSheetTitle: "Reject replacement",
    rejectWarning: "The requester will need to submit a new request to try again.",
    rejectReasonLabel: "Rejection reason",
    rejectReasonHint: "Between 10 and 500 characters.",
    rejectSubmitLabel: "Reject request",
    rejectSuccess: "Request rejected",
    rejectionReasonLabel: "Reason",
    empty: "No replacement requests for this organization.",
  };
}
