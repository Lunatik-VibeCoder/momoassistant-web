import type { AppLocale } from "@/i18n/routing";

export interface SettingsContent {
  title: string;
  // SETTINGS-NAV-1 -- Settings is now the grouped hub for the pages that
  // used to sit flat in the primary nav (Health/License/Subscription/
  // Billing) -- see content/hub-nav.ts's own comment. `system`/`plan` are
  // navigation groups (link out to the existing, unchanged pages);
  // `preferencesTitle` labels the pre-existing Profile/Password section
  // below them, now framed as the 3rd group rather than the whole page.
  groups: {
    system: { title: string; health: string };
    plan: { title: string; license: string; subscription: string; billing: string };
    // AUTH-SECURITY-2 Phase C Contract Lock v3, PC-4 -- same grouped-hub
    // link-row pattern as system/plan above (SETTINGS-NAV-1), not a new
    // primary-nav item.
    // AUTH-SECURITY-2 Phase C Contract Lock v3, PC-5 -- second row in the
    // same Security group, distinct page from `devices` above (locked
    // decision: two clear responsibilities).
    // AUTH-SECURITY-2 Case B B1.8 -- third row, Web admin triage/approval
    // for ReplacementRequest, distinct from recoveryRequests above (CB-0:
    // RecoveryRequest is a triage journal only, never an approval
    // mechanism).
    security: {
      title: string;
      devices: string;
      recoveryRequests: string;
      replacementRequests: string;
    };
    preferencesTitle: string;
  };
  profile: {
    title: string;
    displayNameLabel: string;
    localeLabel: string;
    submitLabel: string;
    success: string;
  };
  password: {
    title: string;
    currentPasswordLabel: string;
    newPasswordLabel: string;
    submitLabel: string;
    success: string;
  };
}

export function getSettingsContent(locale: AppLocale): SettingsContent {
  if (locale === "fr") {
    return {
      title: "Paramètres",
      groups: {
        system: { title: "Système", health: "État de santé" },
        plan: {
          title: "Plan & accès",
          license: "Licence",
          subscription: "Abonnement",
          billing: "Facturation",
        },
        security: {
          title: "Sécurité",
          devices: "Appareils de confiance",
          recoveryRequests: "Demandes de récupération",
          replacementRequests: "Remplacements d'appareil",
        },
        preferencesTitle: "Préférences",
      },
      profile: {
        title: "Profil",
        displayNameLabel: "Nom affiché",
        localeLabel: "Langue",
        submitLabel: "Enregistrer",
        success: "Profil mis à jour",
      },
      password: {
        title: "Mot de passe",
        currentPasswordLabel: "Mot de passe actuel",
        newPasswordLabel: "Nouveau mot de passe",
        submitLabel: "Changer le mot de passe",
        success: "Mot de passe changé",
      },
    };
  }
  return {
    title: "Settings",
    groups: {
      system: { title: "System", health: "Health" },
      plan: {
        title: "Plan & access",
        license: "License",
        subscription: "Subscription",
        billing: "Billing",
      },
      security: {
        title: "Security",
        devices: "Trusted Devices",
        recoveryRequests: "Recovery Requests",
        replacementRequests: "Device Replacements",
      },
      preferencesTitle: "Preferences",
    },
    profile: {
      title: "Profile",
      displayNameLabel: "Display name",
      localeLabel: "Locale",
      submitLabel: "Save",
      success: "Profile updated",
    },
    password: {
      title: "Password",
      currentPasswordLabel: "Current password",
      newPasswordLabel: "New password",
      submitLabel: "Change password",
      success: "Password changed",
    },
  };
}
