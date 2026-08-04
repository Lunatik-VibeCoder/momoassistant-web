import type { AppLocale } from "@/i18n/routing";

export interface VerifyEmailContent {
  hero: { eyebrow: string; title: string; description: string };
  codeLabel: string;
  submitLabel: string;
}

export function getVerifyEmailContent(locale: AppLocale): VerifyEmailContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Vérification",
        title: "Entrez votre code de vérification",
        description: "Le code à 6 chiffres envoyé à votre adresse email.",
      },
      codeLabel: "Code à 6 chiffres",
      submitLabel: "Vérifier",
    };
  }
  return {
    hero: {
      eyebrow: "Verification",
      title: "Enter your verification code",
      description: "The 6-digit code sent to your email address.",
    },
    codeLabel: "6-digit code",
    submitLabel: "Verify",
  };
}
