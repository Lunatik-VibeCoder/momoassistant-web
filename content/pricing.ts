import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import type { ComparisonRow, FaqItem, PricingTier } from "@/types";

export interface PricingContent {
  hero: { eyebrow: string; title: string; description: string };
  plansSrHeading: string;
  popularLabel: string;
  tiers: PricingTier[];
  comparison: {
    heading: string;
    tableHeaders: {
      feature: string;
      starter: string;
      professional: string;
      business: string;
      enterprise: string;
    };
    includedLabel: string;
    notIncludedLabel: string;
    comingSoonLabel: string;
    rows: ComparisonRow[];
  };
  enterprise: { heading: string; description: string; ctaLabel: string };
  faq: { heading: string; items: FaqItem[] };
}

// Packaging, Entitlements, and Limits below come directly from
// docs/com-001-saas-packaging-entitlements.md (Proposed) — nothing here
// is a new commercial decision. Values marked "Coming soon" / "À venir"
// are COM-001's own open items (exact SIM Seat/storage/retention
// numbers for Professional/Business/Enterprise), not invented here.
function build(locale: AppLocale): PricingContent {
  const text = getSiteText(locale);

  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Tarifs",
        title: "Des offres qui évoluent avec votre organisation",
        description:
          "Commencez avec une station unique gratuitement. Passez à Professional ou Business dès que votre organisation grandit, et parlez-nous directement pour Enterprise, avec politiques et intégration sur mesure.",
      },
      plansSrHeading: "Offres",
      popularLabel: "Populaire",
      tiers: [
        {
          name: "Débutant",
          description: "Pour une station unique qui démarre avec l'automatisation.",
          price: "Gratuit",
          cta: {
            label: text.primaryCtaLabel,
            href: "/download",
          },
          features: [
            "1 station, jusqu'à 2 appareils",
            "Automatisation USSD (Runtime V2)",
            "Gestion multi-SIM",
            "SMS Intelligence",
            "Device Trust & SIM Trust",
            "Financial Runtime",
            "Historique des transactions",
            "Coffre-fort PIN sécurisé",
          ],
        },
        {
          name: "Professional",
          description: "Pour une agence qui dépasse la station unique.",
          price: "Contacter les ventes",
          cta: { label: "Parler aux ventes", href: "/contact" },
          features: [
            "Tout ce qui est inclus dans Débutant",
            "Jusqu'à 3 stations, 6 appareils",
            "Sauvegarde chiffrée & restauration",
            "Privacy Mode",
            "Synchronisation cloud entre appareils",
            "Multi-Agent par appareil",
          ],
        },
        {
          name: "Business",
          description: "Pour les organisations gérant plusieurs stations.",
          price: "Contacter les ventes",
          cta: { label: "Parler aux ventes", href: "/contact" },
          highlighted: true,
          features: [
            "Tout ce qui est inclus dans Professional",
            "Stations et appareils illimités",
            "Station Trust & gestion des stations",
            "Unified Runtime Policy",
            "Journaux d'audit sur toutes les stations",
          ],
        },
        {
          name: "Enterprise",
          description: "Politiques personnalisées, intégration et support à grande échelle.",
          price: "Contacter les ventes",
          cta: { label: "Nous contacter", href: "/contact" },
          features: [
            "Tout ce qui est inclus dans Business",
            "Rôles & permissions (RBAC)",
            "Politiques du moteur d'exécution personnalisées",
            "Intégration entreprise dédiée",
            "Support prioritaire",
          ],
        },
      ],
      comparison: {
        heading: "Comparer les offres",
        tableHeaders: {
          feature: "Fonctionnalité",
          starter: "Débutant",
          professional: "Professional",
          business: "Business",
          enterprise: "Enterprise",
        },
        includedLabel: "Inclus",
        notIncludedLabel: "Non inclus",
        comingSoonLabel: "À venir",
        rows: [
          { feature: "Stations", starter: "1", professional: "3", business: "Illimité", enterprise: "Illimité" },
          { feature: "Appareils", starter: "2", professional: "6", business: "Illimité", enterprise: "Illimité" },
          { feature: "SIM Seats", starter: "2", professional: "8", business: "À venir", enterprise: "À venir" },
          { feature: "Automatisation USSD (Runtime V2)", starter: true, professional: true, business: true, enterprise: true },
          { feature: "Gestion multi-SIM", starter: true, professional: true, business: true, enterprise: true },
          { feature: "SMS Intelligence", starter: true, professional: true, business: true, enterprise: true },
          { feature: "Device Trust & SIM Trust", starter: true, professional: true, business: true, enterprise: true },
          { feature: "Financial Runtime", starter: true, professional: true, business: true, enterprise: true },
          { feature: "Historique des transactions", starter: true, professional: true, business: true, enterprise: true },
          { feature: "Coffre-fort PIN sécurisé", starter: true, professional: true, business: true, enterprise: true },
          { feature: "Sauvegarde chiffrée & restauration", starter: false, professional: true, business: true, enterprise: true },
          { feature: "Privacy Mode", starter: false, professional: true, business: true, enterprise: true },
          { feature: "Synchronisation cloud", starter: false, professional: true, business: true, enterprise: true },
          { feature: "Multi-Agent par appareil", starter: false, professional: true, business: true, enterprise: true },
          { feature: "Station Trust & gestion des stations", starter: false, professional: false, business: true, enterprise: true },
          { feature: "Unified Runtime Policy", starter: false, professional: false, business: true, enterprise: true },
          { feature: "Journaux d'audit multi-stations", starter: false, professional: false, business: true, enterprise: true },
          { feature: "Rôles & permissions (RBAC)", starter: false, professional: false, business: false, enterprise: true },
          { feature: "Politiques du moteur d'exécution personnalisées", starter: false, professional: false, business: false, enterprise: true },
          { feature: "Intégration dédiée", starter: false, professional: false, business: false, enterprise: true },
          { feature: "Support prioritaire", starter: false, professional: false, business: false, enterprise: true },
        ],
      },
      enterprise: {
        heading: "Vous gérez plus qu'une poignée de stations ?",
        description:
          "Enterprise ajoute les rôles et permissions, des politiques du moteur d'exécution personnalisées, une intégration dédiée et un support prioritaire en plus de tout ce qui est inclus dans Business — adapté à la façon dont votre organisation fonctionne réellement.",
        ctaLabel: "Parler aux ventes",
      },
      faq: {
        heading: "Questions sur les tarifs",
        items: [
          {
            question: "Existe-t-il une offre gratuite ?",
            answer:
              "Oui — Débutant est gratuit pour une station unique fonctionnant sur jusqu'à deux appareils, avec la même automatisation et le même modèle de sécurité que toutes les autres offres.",
          },
          {
            question: "Comment fonctionne l'accès aux offres payantes ?",
            answer:
              "Votre organisation détient un abonnement (Subscription), matérialisé par une licence technique qui active les entitlements de votre offre — les capacités, limites et modules listés ci-dessus.",
          },
          {
            question: "Comment les tarifs sont-ils structurés au-delà de Débutant ?",
            answer:
              "Les tarifs Professional, Business et Enterprise dépendent du nombre de stations, d'appareils et des besoins de support de votre organisation, donc nous les définissons directement avec vous plutôt que de publier un tarif unique.",
          },
          {
            question: "Puis-je monter en gamme plus tard ?",
            answer:
              "Oui. La configuration, les stations et l'historique de votre organisation sont conservés — monter en gamme ne signifie jamais repartir de zéro.",
          },
          {
            question: "Qu'est-ce qui différencie Enterprise ?",
            answer:
              "Enterprise ajoute les rôles et permissions, des politiques du moteur d'exécution personnalisées, une intégration dédiée et un support prioritaire en plus de tout ce qui est inclus dans Business — conçu pour les organisations ayant leurs propres exigences de conformité ou d'exploitation.",
          },
        ],
      },
    };
  }

  return {
    hero: {
      eyebrow: "Pricing",
      title: "Plans that scale with your organization",
      description:
        "Start with a single station for free. Move to Professional or Business as your organization grows, and talk to us directly for Enterprise, with custom policies and onboarding.",
    },
    plansSrHeading: "Plans",
    popularLabel: "Popular",
    tiers: [
      {
        name: "Starter",
        description: "For a single station getting started with automation.",
        price: "Free",
        cta: {
          label: text.primaryCtaLabel,
          href: "/download",
        },
        features: [
          "1 station, up to 2 devices",
          "USSD Automation (Runtime V2)",
          "Multi-SIM management",
          "SMS Intelligence",
          "Device Trust & SIM Trust",
          "Financial Runtime",
          "Transaction history",
          "Secure PIN Vault",
        ],
      },
      {
        name: "Professional",
        description: "For an agency that's outgrown a single station.",
        price: "Contact Sales",
        cta: { label: "Talk to Sales", href: "/contact" },
        features: [
          "Everything in Starter",
          "Up to 3 stations, 6 devices",
          "Encrypted Backup & Restore",
          "Privacy Mode",
          "Cloud synchronization across devices",
          "Multi-Agent per device",
        ],
      },
      {
        name: "Business",
        description: "For organizations running multiple stations.",
        price: "Contact Sales",
        cta: { label: "Talk to Sales", href: "/contact" },
        highlighted: true,
        features: [
          "Everything in Professional",
          "Unlimited stations and devices",
          "Station Trust & Station Management",
          "Unified Runtime Policy",
          "Audit logs across every station",
        ],
      },
      {
        name: "Enterprise",
        description: "Custom policies, onboarding, and support at scale.",
        price: "Contact Sales",
        cta: { label: "Talk to Us", href: "/contact" },
        features: [
          "Everything in Business",
          "Roles & permissions (RBAC)",
          "Custom runtime policies",
          "Dedicated enterprise onboarding",
          "Priority support",
        ],
      },
    ],
    comparison: {
      heading: "Compare plans",
      tableHeaders: {
        feature: "Feature",
        starter: "Starter",
        professional: "Professional",
        business: "Business",
        enterprise: "Enterprise",
      },
      includedLabel: "Included",
      notIncludedLabel: "Not included",
      comingSoonLabel: "Coming soon",
      rows: [
        { feature: "Stations", starter: "1", professional: "3", business: "Unlimited", enterprise: "Unlimited" },
        { feature: "Devices", starter: "2", professional: "6", business: "Unlimited", enterprise: "Unlimited" },
        { feature: "SIM Seats", starter: "2", professional: "8", business: "Coming soon", enterprise: "Coming soon" },
        { feature: "USSD Automation (Runtime V2)", starter: true, professional: true, business: true, enterprise: true },
        { feature: "Multi-SIM management", starter: true, professional: true, business: true, enterprise: true },
        { feature: "SMS Intelligence", starter: true, professional: true, business: true, enterprise: true },
        { feature: "Device Trust & SIM Trust", starter: true, professional: true, business: true, enterprise: true },
        { feature: "Financial Runtime", starter: true, professional: true, business: true, enterprise: true },
        { feature: "Transaction history", starter: true, professional: true, business: true, enterprise: true },
        { feature: "Secure PIN Vault", starter: true, professional: true, business: true, enterprise: true },
        { feature: "Encrypted Backup & Restore", starter: false, professional: true, business: true, enterprise: true },
        { feature: "Privacy Mode", starter: false, professional: true, business: true, enterprise: true },
        { feature: "Cloud synchronization", starter: false, professional: true, business: true, enterprise: true },
        { feature: "Multi-Agent per device", starter: false, professional: true, business: true, enterprise: true },
        { feature: "Station Trust & Station Management", starter: false, professional: false, business: true, enterprise: true },
        { feature: "Unified Runtime Policy", starter: false, professional: false, business: true, enterprise: true },
        { feature: "Multi-station audit logs", starter: false, professional: false, business: true, enterprise: true },
        { feature: "Roles & permissions (RBAC)", starter: false, professional: false, business: false, enterprise: true },
        { feature: "Custom runtime policies", starter: false, professional: false, business: false, enterprise: true },
        { feature: "Dedicated onboarding", starter: false, professional: false, business: false, enterprise: true },
        { feature: "Priority support", starter: false, professional: false, business: false, enterprise: true },
      ],
    },
    enterprise: {
      heading: "Running more than a handful of stations?",
      description:
        "Enterprise adds roles & permissions, custom runtime policies, dedicated onboarding, and priority support on top of everything in Business — scoped to how your organization actually operates.",
      ctaLabel: "Talk to Sales",
    },
    faq: {
      heading: "Pricing questions",
      items: [
        {
          question: "Is there a free plan?",
          answer:
            "Yes — Starter is free for a single station running on up to two devices, with the same automation and security model as every other plan.",
        },
        {
          question: "How does access to a paid plan actually work?",
          answer:
            "Your organization holds a Subscription, materialized by a technical license that activates your plan's entitlements — the capabilities, limits, and modules listed above.",
        },
        {
          question: "How is pricing structured beyond Starter?",
          answer:
            "Professional, Business, and Enterprise pricing depends on the number of stations, devices, and support needs your organization has, so we work it out directly rather than publishing a one-size number.",
        },
        {
          question: "Can I move up a plan later?",
          answer:
            "Yes. Your organization's configuration, stations, and history carry over — moving up a plan never means starting over.",
        },
        {
          question: "What's different about Enterprise?",
          answer:
            "Enterprise adds roles & permissions, custom runtime policies, dedicated onboarding, and priority support on top of everything in Business — built for organizations with their own compliance or operating requirements.",
        },
      ],
    },
  };
}

const CONTENT: Record<AppLocale, PricingContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getPricingContent(locale: AppLocale): PricingContent {
  return CONTENT[locale];
}
