import type { AppLocale } from "@/i18n/routing";

export interface ForgotPasswordContent {
  hero: { eyebrow: string; title: string; description: string };
  emailLabel: string;
  submitLabel: string;
  backToLoginLabel: string;
  // PASSWORD-RESET-WEB-2 decision 7 -- a dedicated, friendly, non-technical
  // message for HTTP 429 (McpErrorKind "rate_limited"). Never the raw
  // backend throttler text, in either language.
  rateLimitedMessage: string;
}

export function getForgotPasswordContent(locale: AppLocale): ForgotPasswordContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Mot de passe oublié",
        title: "Mot de passe oublié ?",
        description: "Entrez votre adresse email, nous vous enverrons un code pour réinitialiser votre mot de passe.",
      },
      emailLabel: "Adresse email",
      submitLabel: "Envoyer le code",
      backToLoginLabel: "Retour à la connexion",
      rateLimitedMessage: "Trop de demandes de réinitialisation. Veuillez patienter un instant avant de réessayer.",
    };
  }
  return {
    hero: {
      eyebrow: "Forgot password",
      title: "Forgot your password?",
      description: "Enter your email address and we'll send you a code to reset your password.",
    },
    emailLabel: "Email address",
    submitLabel: "Send code",
    backToLoginLabel: "Back to login",
    rateLimitedMessage: "Too many reset requests. Please wait a little before trying again.",
  };
}
