import type { AppLocale } from "@/i18n/routing";

export interface MembersContent {
  title: string;
  inviteButton: string;
  columns: { name: string; email: string; role: string; status: string; joined: string; lastActive: string; actions: string };
  lastActiveUnavailable: string;
  removeButton: string;
  removeConfirm: string;
  removeSuccess: string;
  removeError: string;
  inviteSheetTitle: string;
  inviteEmailLabel: string;
  inviteRoleLabel: string;
  inviteSubmitLabel: string;
  inviteSuccess: string;
  inviteError: string;
}

export function getMembersContent(locale: AppLocale): MembersContent {
  if (locale === "fr") {
    return {
      title: "Membres",
      inviteButton: "Inviter",
      columns: {
        name: "Nom",
        email: "E-mail",
        role: "Rôle",
        status: "Statut",
        joined: "Rejoint le",
        lastActive: "Dernière activité",
        actions: "Actions",
      },
      lastActiveUnavailable: "Indisponible",
      removeButton: "Retirer",
      removeConfirm: "Retirer ce membre de l'organisation ?",
      removeSuccess: "Membre retiré",
      removeError: "Impossible de retirer ce membre",
      inviteSheetTitle: "Inviter un membre",
      inviteEmailLabel: "E-mail",
      inviteRoleLabel: "Rôle",
      inviteSubmitLabel: "Envoyer l'invitation",
      inviteSuccess: "Invitation envoyée",
      inviteError: "Impossible d'envoyer l'invitation",
    };
  }
  return {
    title: "Members",
    inviteButton: "Invite",
    columns: {
      name: "Name",
      email: "Email",
      role: "Role",
      status: "Status",
      joined: "Joined",
      lastActive: "Last Active",
      actions: "Actions",
    },
    lastActiveUnavailable: "Unavailable",
    removeButton: "Remove",
    removeConfirm: "Remove this member from the organization?",
    removeSuccess: "Member removed",
    removeError: "Could not remove this member",
    inviteSheetTitle: "Invite a member",
    inviteEmailLabel: "Email",
    inviteRoleLabel: "Role",
    inviteSubmitLabel: "Send invitation",
    inviteSuccess: "Invitation sent",
    inviteError: "Could not send the invitation",
  };
}
