import type { AppLocale } from "@/i18n/routing";

export interface LoginContent {
  hero: { eyebrow: string; title: string; description: string };
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
  registerPrompt: string;
  registerLinkLabel: string;
  // PASSWORD-RESET-WEB-2 decision 8 -- static link, deliberately never
  // carries forward whatever email the agent already typed into this form.
  forgotPasswordLabel: string;
  // PASSWORD-RESET-WEB-2 decision 4 -- rendered as a server-rendered Alert
  // above the form when ?reset=success is present, never a toast.
  resetSuccessMessage: string;
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
      forgotPasswordLabel: "Mot de passe oublié ?",
      resetSuccessMessage: "Votre mot de passe a été réinitialisé. Vous pouvez maintenant vous connecter.",
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
    forgotPasswordLabel: "Forgot your password?",
    resetSuccessMessage: "Your password has been reset. You can now sign in.",
  };
}
