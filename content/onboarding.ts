import type { AppLocale } from "@/i18n/routing";

export interface OnboardingContent {
  hero: { eyebrow: string; title: string; description: string };
  tenantNameLabel: string;
  organizationNameLabel: string;
  agentNameLabel: string;
  submitLabel: string;
}

export function getOnboardingContent(locale: AppLocale): OnboardingContent {
  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Organisation",
        title: "Créez votre Organization",
        description:
          "Votre Organization regroupe vos stations, agents et licences MoMo Assistant.",
      },
      tenantNameLabel: "Nom de l'entreprise",
      organizationNameLabel: "Nom de l'Organization",
      agentNameLabel: "Votre nom (optionnel)",
      submitLabel: "Créer mon Organization",
    };
  }
  return {
    hero: {
      eyebrow: "Organization",
      title: "Create your Organization",
      description:
        "Your Organization groups your stations, agents, and MoMo Assistant licenses.",
    },
    tenantNameLabel: "Company name",
    organizationNameLabel: "Organization name",
    agentNameLabel: "Your name (optional)",
    submitLabel: "Create my Organization",
  };
}
