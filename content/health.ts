import type { AppLocale } from "@/i18n/routing";

export interface HealthContent {
  title: string;
  overallTitle: string;
  overall: { healthy: string; needsAttention: string; warning: string };
  cards: { license: string; subscription: string; members: string };
  noLicense: string;
  noSubscription: string;
}

export function getHealthContent(locale: AppLocale): HealthContent {
  if (locale === "fr") {
    return {
      title: "État de santé",
      overallTitle: "État général",
      overall: { healthy: "En bonne santé", needsAttention: "À surveiller", warning: "Avertissement" },
      cards: { license: "Licence", subscription: "Abonnement", members: "Membres" },
      noLicense: "Aucune",
      noSubscription: "Aucun",
    };
  }
  return {
    title: "Organization Health",
    overallTitle: "Overall Health",
    overall: { healthy: "Healthy", needsAttention: "Needs attention", warning: "Warning" },
    cards: { license: "License", subscription: "Subscription", members: "Members" },
    noLicense: "None",
    noSubscription: "None",
  };
}
