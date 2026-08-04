import type { AppLocale } from "@/i18n/routing";

export interface LoginContent {
  hero: { eyebrow: string; title: string; description: string };
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
  registerPrompt: string;
  registerLinkLabel: string;
}

export function getLoginContent(locale: AppLocale): LoginContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Connexion",
        title: "Connectez-vous à MoMo Assistant",
        description: "Accédez à votre portail Organization.",
      },
      emailLabel: "Adresse email",
      passwordLabel: "Mot de passe",
      submitLabel: "Se connecter",
      registerPrompt: "Pas encore de compte ?",
      registerLinkLabel: "Créer un compte",
    };
  }
  return {
    hero: {
      eyebrow: "Sign in",
      title: "Sign in to MoMo Assistant",
      description: "Access your Organization portal.",
    },
    emailLabel: "Email address",
    passwordLabel: "Password",
    submitLabel: "Sign in",
    registerPrompt: "Don't have an account yet?",
    registerLinkLabel: "Create an account",
  };
}
