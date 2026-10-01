import type { AppLocale } from "@/i18n/routing";

export interface ResetPasswordContent {
  // hero.description is the static, PII-free fallback used for <meta>
  // description (generateMetadata) -- the real on-page description is
  // built per-request from codeSentTo(email) below, in the Server
  // Component (page.tsx) only.
  hero: { eyebrow: string; title: string; description: string };
  // Function -- resolved server-side in page.tsx only, same RSC
  // serialization constraint as content/accept-invitation.ts's own
  // title/alreadyActiveDescription (see AcceptInvitationForm's comment:
  // a plain function cannot cross the Server -> Client boundary). Never
  // pass this whole content object to reset-password-form.tsx.
  codeSentTo: (email: string) => string;
  codeLabel: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  submitLabel: string;
  mismatchError: string;
  // PASSWORD-RESET-WEB-2 decision 7 -- same dedicated friendly copy as
  // content/forgot-password.ts's own rateLimitedMessage (McpErrorKind
  // "rate_limited" is a possibility on this endpoint too -- it also
  // accepts an unauthenticated, guessable 6-digit code).
  rateLimitedMessage: string;
  missingEmail: { description: string; backLabel: string };
}

export function getResetPasswordContent(locale: AppLocale): ResetPasswordContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Réinitialisation",
        title: "Réinitialiser le mot de passe",
        description: "Entrez le code de vérification reçu par email pour choisir un nouveau mot de passe.",
      },
      codeSentTo: (email) => `Un code de vérification à 6 chiffres a été envoyé à ${email}.`,
      codeLabel: "Code à 6 chiffres",
      newPasswordLabel: "Nouveau mot de passe",
      confirmPasswordLabel: "Confirmer le mot de passe",
      submitLabel: "Réinitialiser le mot de passe",
      mismatchError: "Les mots de passe ne correspondent pas.",
      rateLimitedMessage: "Trop de tentatives. Veuillez patienter un instant avant de réessayer.",
      missingEmail: {
        description: "Aucune adresse email n'a été fournie pour cette demande de réinitialisation. Veuillez recommencer.",
        backLabel: "Mot de passe oublié",
      },
    };
  }
  return {
    hero: {
      eyebrow: "Reset password",
      title: "Reset your password",
      description: "Enter the verification code sent to your email to choose a new password.",
    },
    codeSentTo: (email) => `We sent a 6-digit code to ${email}.`,
    codeLabel: "6-digit code",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm password",
    submitLabel: "Reset password",
    mismatchError: "Passwords do not match.",
    rateLimitedMessage: "Too many reset requests. Please wait a little before trying again.",
    missingEmail: {
      description: "No email address was provided for this reset request. Please start again.",
      backLabel: "Forgot password",
    },
  };
}
