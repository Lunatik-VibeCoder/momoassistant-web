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
  };
}
