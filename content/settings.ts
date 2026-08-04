import type { AppLocale } from "@/i18n/routing";

export interface SettingsContent {
  title: string;
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
