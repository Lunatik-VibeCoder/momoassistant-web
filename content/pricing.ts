import type { AppLocale } from "@/i18n/routing";
import { getSiteText, siteConfig } from "@/lib/constants";
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
      business: string;
      enterprise: string;
    };
    includedLabel: string;
    notIncludedLabel: string;
    rows: ComparisonRow[];
  };
  enterprise: { heading: string; description: string; ctaLabel: string };
  faq: { heading: string; items: FaqItem[] };
}

function build(locale: AppLocale): PricingContent {
  const text = getSiteText(locale);

  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Tarifs",
        title: "Des offres qui évoluent avec vos stations",
        description:
          "Commencez avec une station unique gratuitement. Passez à Business dès que vous en gérez plusieurs, et parlez-nous directement dès que vous avez besoin de politiques et d'une intégration sur mesure.",
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
            href: siteConfig.downloadApkUrl,
            external: true,
          },
          features: [
            "1 station, jusqu'à 2 appareils",
            "Gestion multi-SIM",
            "Automatisation USSD avec Runtime V2",
            "Historique des transactions",
            "Coffre-fort PIN sécurisé",
          ],
        },
        {
          name: "Business",
          description: "Pour les organisations gérant plusieurs stations et appareils.",
          price: "Contacter les ventes",
          cta: { label: "Parler aux ventes", href: "/contact" },
          highlighted: true,
          features: [
            "Tout ce qui est inclus dans Débutant",
            "Stations et appareils illimités",
            "Architecture Organisation / Station",
            "Synchronisation cloud entre appareils",
            "Restauration d'appareil",
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
          business: "Business",
          enterprise: "Enterprise",
        },
        includedLabel: "Inclus",
        notIncludedLabel: "Non inclus",
        rows: [
          { feature: "Stations", starter: "1", business: "Illimité", enterprise: "Illimité" },
          { feature: "Gestion multi-SIM", starter: true, business: true, enterprise: true },
          { feature: "Automatisation USSD (Runtime V2)", starter: true, business: true, enterprise: true },
          { feature: "Historique des transactions", starter: true, business: true, enterprise: true },
          { feature: "Coffre-fort PIN sécurisé", starter: true, business: true, enterprise: true },
          { feature: "Synchronisation cloud", starter: false, business: true, enterprise: true },
          { feature: "Restauration d'appareil", starter: false, business: true, enterprise: true },
          { feature: "Architecture Organisation / Station", starter: false, business: true, enterprise: true },
          { feature: "Politiques du moteur d'exécution personnalisées", starter: false, business: false, enterprise: true },
          { feature: "Intégration dédiée", starter: false, business: false, enterprise: true },
          { feature: "Support prioritaire", starter: false, business: false, enterprise: true },
        ],
      },
      enterprise: {
        heading: "Vous gérez plus qu'une poignée de stations ?",
        description:
          "Enterprise ajoute des politiques du moteur d'exécution personnalisées, une intégration dédiée et un support prioritaire en plus de tout ce qui est inclus dans Business — adapté à la façon dont votre organisation fonctionne réellement.",
        ctaLabel: "Parler aux ventes",
      },
      faq: {
        heading: "Questions sur les tarifs",
        items: [
          {
            question: "Existe-t-il une offre gratuite ?",
            answer:
              "Oui — Débutant est gratuit pour une station unique fonctionnant sur jusqu'à deux appareils, avec la même automatisation USSD et le même modèle de sécurité que toutes les autres offres.",
          },
          {
            question: "Comment les tarifs sont-ils structurés au-delà de Débutant ?",
            answer:
              "Les tarifs Business et Enterprise dépendent du nombre de stations, d'appareils et des besoins de support de votre organisation, donc nous les définissons directement avec vous plutôt que de publier un tarif unique.",
          },
          {
            question: "Puis-je passer de Débutant à Business plus tard ?",
            answer:
              "Oui. La configuration et l'historique de votre station sont conservés — monter en gamme ne signifie pas repartir de zéro.",
          },
          {
            question: "Qu'est-ce qui différencie Enterprise ?",
            answer:
              "Enterprise ajoute des politiques du moteur d'exécution personnalisées, une intégration dédiée et un support prioritaire en plus de tout ce qui est inclus dans Business — conçu pour les organisations ayant leurs propres exigences de conformité ou d'exploitation.",
          },
          {
            question: "Proposez-vous des remises pour les engagements annuels ?",
            answer:
              "Parlez à notre équipe commerciale — les conditions annuelles sont discutées dans le cadre de votre échange Business ou Enterprise.",
          },
        ],
      },
    };
  }

  return {
    hero: {
      eyebrow: "Pricing",
      title: "Plans that scale with your stations",
      description:
        "Start with a single station for free. Move to Business when you're running more than one, and talk to us directly once you need custom policies and onboarding.",
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
          href: siteConfig.downloadApkUrl,
          external: true,
        },
        features: [
          "1 station, up to 2 devices",
          "Multi-SIM management",
          "USSD automation with Runtime V2",
          "Transaction history",
          "Secure PIN Vault",
        ],
      },
      {
        name: "Business",
        description: "For organizations running multiple stations and devices.",
        price: "Contact Sales",
        cta: { label: "Talk to Sales", href: "/contact" },
        highlighted: true,
        features: [
          "Everything in Starter",
          "Unlimited stations and devices",
          "Organization / Station architecture",
          "Cloud synchronization across devices",
          "Device restoration",
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
        business: "Business",
        enterprise: "Enterprise",
      },
      includedLabel: "Included",
      notIncludedLabel: "Not included",
      rows: [
        { feature: "Stations", starter: "1", business: "Unlimited", enterprise: "Unlimited" },
        { feature: "Multi-SIM management", starter: true, business: true, enterprise: true },
        { feature: "USSD automation (Runtime V2)", starter: true, business: true, enterprise: true },
        { feature: "Transaction history", starter: true, business: true, enterprise: true },
        { feature: "Secure PIN Vault", starter: true, business: true, enterprise: true },
        { feature: "Cloud synchronization", starter: false, business: true, enterprise: true },
        { feature: "Device restoration", starter: false, business: true, enterprise: true },
        { feature: "Organization / Station architecture", starter: false, business: true, enterprise: true },
        { feature: "Custom runtime policies", starter: false, business: false, enterprise: true },
        { feature: "Dedicated onboarding", starter: false, business: false, enterprise: true },
        { feature: "Priority support", starter: false, business: false, enterprise: true },
      ],
    },
    enterprise: {
      heading: "Running more than a handful of stations?",
      description:
        "Enterprise adds custom runtime policies, dedicated onboarding, and priority support on top of everything in Business — scoped to how your organization actually operates.",
      ctaLabel: "Talk to Sales",
    },
    faq: {
      heading: "Pricing questions",
      items: [
        {
          question: "Is there a free plan?",
          answer:
            "Yes — Starter is free for a single station running on up to two devices, with the same USSD automation and security model as every other plan.",
        },
        {
          question: "How is pricing structured beyond Starter?",
          answer:
            "Business and Enterprise pricing depends on the number of stations, devices, and support needs your organization has, so we work it out directly rather than publishing a one-size number.",
        },
        {
          question: "Can I move from Starter to Business later?",
          answer:
            "Yes. Your station's configuration and history carry over — moving up a plan doesn't mean starting over.",
        },
        {
          question: "What's different about Enterprise?",
          answer:
            "Enterprise adds custom runtime policies, dedicated onboarding, and priority support on top of everything in Business — built for organizations with their own compliance or operating requirements.",
        },
        {
          question: "Do you offer discounts for annual commitments?",
          answer:
            "Talk to our sales team — annual terms are discussed as part of your Business or Enterprise conversation.",
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
