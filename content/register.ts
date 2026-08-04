import type { AppLocale } from "@/i18n/routing";

export interface RegisterContent {
  hero: { eyebrow: string; title: string; description: string };
  emailLabel: string;
  passwordLabel: string;
  displayNameLabel: string;
  submitLabel: string;
  loginPrompt: string;
  loginLinkLabel: string;
  successTitle: string;
  successDescription: string;
  continueToVerifyLabel: string;
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
      successTitle: "Vérifiez votre boîte mail",
      successDescription:
        "Nous avons envoyé un code à 6 chiffres à votre adresse email. Saisissez-le sur la page suivante pour activer votre compte.",
      continueToVerifyLabel: "Saisir mon code",
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
    successTitle: "Check your inbox",
    successDescription:
      "We sent a 6-digit code to your email address. Enter it on the next page to activate your account.",
    continueToVerifyLabel: "Enter my code",
  };
}
