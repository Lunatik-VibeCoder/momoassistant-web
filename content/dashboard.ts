import type { AppLocale } from "@/i18n/routing";

export interface DashboardContent {
  welcomeTitle: (displayName: string) => string;
  organizationLabel: string;
  downloadCtaLabel: string;
  logoutLabel: string;
}

export function getDashboardContent(locale: AppLocale): DashboardContent {
  if (locale === "fr") {
    return {
      welcomeTitle: (displayName) => `Bienvenue, ${displayName}`,
      organizationLabel: "Organization",
      downloadCtaLabel: "Télécharger la bêta",
      logoutLabel: "Se déconnecter",
    };
  }
  return {
    welcomeTitle: (displayName) => `Welcome, ${displayName}`,
    organizationLabel: "Organization",
    downloadCtaLabel: "Download the beta",
    logoutLabel: "Log out",
  };
}
