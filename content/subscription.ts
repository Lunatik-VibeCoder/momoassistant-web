import type { AppLocale } from "@/i18n/routing";

export interface SubscriptionContent {
  title: string;
  noSubscriptionTitle: string;
  noSubscriptionBody: string;
  fields: { status: string; currentPeriod: string; cancelAtPeriodEnd: string };
  yes: string;
  no: string;
}

export function getSubscriptionContent(locale: AppLocale): SubscriptionContent {
  if (locale === "fr") {
    return {
      title: "Abonnement",
      noSubscriptionTitle: "Aucun abonnement",
      noSubscriptionBody: "Votre organisation n'a pas encore d'abonnement.",
      fields: {
        status: "Statut",
        currentPeriod: "Période en cours",
        cancelAtPeriodEnd: "Annulation en fin de période",
      },
      yes: "Oui",
      no: "Non",
    };
  }
  return {
    title: "Subscription",
    noSubscriptionTitle: "No subscription",
    noSubscriptionBody: "Your organization doesn't have a subscription yet.",
    fields: {
      status: "Status",
      currentPeriod: "Current period",
      cancelAtPeriodEnd: "Cancels at period end",
    },
    yes: "Yes",
    no: "No",
  };
}
