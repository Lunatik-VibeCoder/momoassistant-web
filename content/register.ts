import type { AppLocale } from "@/i18n/routing";

export interface RegisterContent {
  hero: { eyebrow: string; title: string; description: string };
  emailLabel: string;
  passwordLabel: string;
  displayNameLabel: string;
  submitLabel: string;
  loginPrompt: string;
  loginLinkLabel: string;
}

export function getRegisterContent(locale: AppLocale): RegisterContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Compte",
        title: "Créer votre compte MoMo Assistant",
        description: "Quelques informations suffisent pour commencer.",
      },
      emailLabel: "Adresse email",
      passwordLabel: "Mot de passe",
      displayNameLabel: "Nom (optionnel)",
      submitLabel: "Créer mon compte",
      loginPrompt: "Vous avez déjà un compte ?",
      loginLinkLabel: "Se connecter",
    };
  }
  return {
    hero: {
      eyebrow: "Account",
      title: "Create your MoMo Assistant account",
      description: "Just a few details to get started.",
    },
    emailLabel: "Email address",
    passwordLabel: "Password",
    displayNameLabel: "Name (optional)",
    submitLabel: "Create my account",
    loginPrompt: "Already have an account?",
    loginLinkLabel: "Sign in",
  };
}
