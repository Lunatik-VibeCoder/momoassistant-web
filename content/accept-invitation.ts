import type { AppLocale } from "@/i18n/routing";

export interface AcceptInvitationContent {
  eyebrow: string;
  title(organizationName: string, roleName: string): string;
  description: string;
  passwordLabel: string;
  displayNameLabel: string;
  submitLabel: string;
  invalidTitle: string;
  invalidDescription: string;
  // INVITATION-ACCEPT-ACCOUNT-STATE-001 -- LOGIN_REQUIRED (already-ACTIVE
  // account). alreadyActiveDescription is a function like title() -- MUST
  // be resolved to a plain string server-side (page.tsx) before ever being
  // passed into the Client Component form; RSC cannot serialize a function
  // across that boundary (see accept-invitation-form.tsx's own kdoc).
  alreadyActiveTitle: string;
  alreadyActiveDescription(organizationName: string): string;
  alreadyActiveHint: string;
  loginCta: string;
}

export function getAcceptInvitationContent(locale: AppLocale): AcceptInvitationContent {
  if (locale === "fr") {
    return {
      eyebrow: "Invitation",
      title: (organizationName, roleName) => `Rejoignez ${organizationName} en tant que ${roleName}`,
      description: "Définissez votre mot de passe pour activer votre accès.",
      passwordLabel: "Mot de passe",
      displayNameLabel: "Nom",
      submitLabel: "Accepter l'invitation",
      invalidTitle: "Invitation invalide",
      invalidDescription:
        "Ce lien d'invitation n'est plus valide. Il a peut-être déjà été utilisé, révoqué, ou a expiré. Demandez à votre administrateur de vous envoyer une nouvelle invitation.",
      alreadyActiveTitle: "Vous avez déjà un compte MoMo Assistant",
      alreadyActiveDescription: (organizationName) =>
        `Votre compte existe déjà. Votre accès à ${organizationName} a été ajouté avec succès.`,
      alreadyActiveHint: "Connectez-vous avec votre mot de passe existant pour continuer.",
      loginCta: "Se connecter",
    };
  }
  return {
    eyebrow: "Invitation",
    title: (organizationName, roleName) => `Join ${organizationName} as ${roleName}`,
    description: "Set your password to activate your access.",
    passwordLabel: "Password",
    displayNameLabel: "Name",
    submitLabel: "Accept Invitation",
    invalidTitle: "Invalid invitation",
    invalidDescription:
      "This invitation link is no longer valid. It may have already been used, revoked, or expired. Ask your administrator to send you a new invitation.",
    alreadyActiveTitle: "You already have a MoMo Assistant account",
    alreadyActiveDescription: (organizationName) =>
      `Your account already exists. Your access to ${organizationName} has been added successfully.`,
    alreadyActiveHint: "Sign in with your existing password to continue.",
    loginCta: "Sign in",
  };
}
