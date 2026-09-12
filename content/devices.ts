import type { AppLocale } from "@/i18n/routing";

// AUTH-SECURITY-2 Phase C Contract Lock v3, PC-4 -- Trusted Devices +
// Revoke Device. `certification.*` labels the raw DeviceCertification
// status strings verbatim (CERTIFIED/PENDING/REVOKED/SUSPENDED, plus
// `none` for the null case) -- no invented "Trusted"/"Untrusted" wording
// that doesn't match the backend's own vocabulary.
export interface DevicesContent {
  title: string;
  lastSeenLabel: string;
  noStation: string;
  certification: {
    CERTIFIED: string;
    PENDING: string;
    REVOKED: string;
    SUSPENDED: string;
    none: string;
  };
  revokeButton: string;
  revokeSheetTitle: string;
  revokeWarning: string;
  revokeReasonLabel: string;
  revokeReasonHint: string;
  revokeSubmitLabel: string;
  revokeSuccess: string;
  revokeError: string;
  empty: string;
}

export function getDevicesContent(locale: AppLocale): DevicesContent {
  if (locale === "fr") {
    return {
      title: "Appareils de confiance",
      lastSeenLabel: "Dernière activité",
      noStation: "Aucune",
      certification: {
        CERTIFIED: "Certifié",
        PENDING: "En attente",
        REVOKED: "Révoqué",
        SUSPENDED: "Suspendu",
        none: "Non certifié",
      },
      revokeButton: "Révoquer",
      revokeSheetTitle: "Révoquer cet appareil",
      revokeWarning:
        "Cette action retire immédiatement la confiance accordée à cet appareil. Il ne pourra plus se reconnecter tant qu'aucun nouvel enrôlement n'aura été effectué.",
      revokeReasonLabel: "Motif (obligatoire)",
      revokeReasonHint: "Au moins 10 caractères",
      revokeSubmitLabel: "Confirmer la révocation",
      revokeSuccess: "Appareil révoqué",
      revokeError: "Impossible de révoquer cet appareil",
      empty: "Aucun appareil enregistré pour cette organisation.",
    };
  }
  return {
    title: "Trusted Devices",
    lastSeenLabel: "Last Seen",
    noStation: "None",
    certification: {
      CERTIFIED: "Certified",
      PENDING: "Pending",
      REVOKED: "Revoked",
      SUSPENDED: "Suspended",
      none: "Not certified",
    },
    revokeButton: "Revoke",
    revokeSheetTitle: "Revoke this device",
    revokeWarning:
      "This immediately withdraws trust from this device. It will not be able to reconnect until a new enrollment is performed.",
    revokeReasonLabel: "Reason (required)",
    revokeReasonHint: "At least 10 characters",
    revokeSubmitLabel: "Confirm revocation",
    revokeSuccess: "Device revoked",
    revokeError: "Could not revoke this device",
    empty: "No devices registered for this organization.",
  };
}
