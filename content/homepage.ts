import {
  Activity,
  BarChart3,
  Building2,
  EyeOff,
  History,
  KeyRound,
  Layers,
  Network,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getSiteText } from "@/lib/constants";
import type {
  ArchitectureLayer,
  FaqItem,
  FeatureItem,
  HowItWorksStep,
  PricingTier,
  SecurityPillar,
  SocialProofLogo,
  Testimonial,
  TrustBadge,
  WhyPoint,
} from "@/types";

export interface HomepageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    secondaryCta: { label: string; href: string };
    trustBadges: TrustBadge[];
  };
  socialProof: { heading: string; logos: SocialProofLogo[] };
  features: {
    heading: string;
    description: string;
    items: FeatureItem[];
    ctaLabel: string;
    ctaHref: string;
  };
  architecture: {
    eyebrow: string;
    heading: string;
    description: string;
    layers: ArchitectureLayer[];
    ctaLabel: string;
    ctaHref: string;
  };
  security: { heading: string; description: string; items: SecurityPillar[] };
  howItWorks: { heading: string; description: string; items: HowItWorksStep[] };
  whyMomoAssistant: {
    heading: string;
    description: string;
    items: WhyPoint[];
    ctaLabel: string;
    ctaHref: string;
  };
  testimonials: { heading: string; items: Testimonial[] };
  pricingPreview: { heading: string; items: PricingTier[] };
  faqPreview: { heading: string; items: FaqItem[] };
  finalCta: {
    heading: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCta: { label: string; href: string };
  };
}

function build(locale: AppLocale): HomepageContent {
  const text = getSiteText(locale);

  if (locale === "fr") {
    return {
      hero: {
        eyebrow: "Le système d'exploitation des opérations Mobile Money pour entreprises",
        headline: "Automatisez Mobile Money. Gardez le contrôle.",
        subheadline:
          "MoMo Assistant est la plateforme qui pilote vos opérations Mobile Money : Organisations, Stations, appareils de confiance et Runtime, réunis pour exécuter des transactions USSD plus rapides et plus sûres, avec chaque action traçable.",
        primaryCtaLabel: text.primaryCtaLabel,
        secondaryCta: { label: text.secondaryCtaLabel, href: "/contact" },
        trustBadges: [
          { icon: ShieldCheck, label: "Sécurité de niveau bancaire" },
          { icon: Activity, label: "Surveillance en temps réel" },
          { icon: ScrollText, label: "Piste d'audit 24/7" },
          { icon: TrendingUp, label: "Conçu pour l'échelle" },
        ],
      },
      socialProof: {
        heading: "Utilisé par des opérateurs Mobile Money professionnels",
        logos: [
          { name: "Accra Digital Payments" },
          { name: "Kumasi Agent Network" },
          { name: "Tema FinServe" },
          { name: "Northern MoMo Hub" },
          { name: "Coastal Transact Group" },
        ],
      },
      features: {
        heading: "Tout ce dont une station Mobile Money a besoin",
        description:
          "Une seule application pour piloter des opérations multi-SIM, automatiser les flux USSD et conserver un registre fiable de chaque transaction.",
        items: [
          {
            icon: Layers,
            title: "Gestion multi-SIM",
            description:
              "Gérez plusieurs SIM et lignes Mobile Money depuis un seul appareil, en basculant entre elles sans interrompre un flux de travail.",
          },
          {
            icon: Zap,
            title: "Automatisation USSD",
            description:
              "Automatisez les séquences USSD répétitives avec un minutage précis, tout en laissant l'agent humain confirmer chaque étape.",
          },
          {
            icon: History,
            title: "Historique des transactions",
            description:
              "Chaque transaction est enregistrée et consultable, donnant aux agents et responsables de station un registre complet et fiable.",
          },
          {
            icon: KeyRound,
            title: "Coffre-fort PIN sécurisé",
            description:
              "Les codes PIN Mobile Money sont scellés dans l'Android KeyStore de l'appareil et ne sont jamais transmis ni stockés dans le cloud.",
          },
          {
            icon: Wallet,
            title: "Financial Runtime",
            description:
              "Vérifie le solde disponible avant chaque transaction — refuse une transaction impossible avant qu'elle ne coûte de l'argent.",
          },
          {
            icon: ShieldCheck,
            title: "Trust Platform",
            description:
              "Device Trust, SIM Trust et Station Trust, réunis dans une politique d'exécution unifiée qui décide ce qui peut s'automatiser.",
          },
        ],
        ctaLabel: "Voir toutes les fonctionnalités",
        ctaHref: "/features",
      },
      architecture: {
        eyebrow: "Architecture",
        heading: "Conçu pour les organisations, pas seulement les agents individuels",
        description:
          "MoMo Assistant est structuré autour du fonctionnement réel des entreprises Mobile Money professionnelles : une organisation composée de stations, chacune fonctionnant sur des appareils de confiance, exécutées via un moteur dédié.",
        layers: [
          {
            title: "Organisation",
            description:
              "L'entité commerciale de premier niveau — elle possède les stations, les politiques et l'historique d'audit sur chaque site.",
          },
          {
            title: "Station",
            description:
              "Un point d'opération physique avec ses propres agents, appareils et SIM, rattaché à l'organisation.",
          },
          {
            title: "Device Trust",
            description:
              "Chaque appareil est vérifié et approuvé avant de pouvoir exécuter des transactions pour une station.",
          },
          {
            title: "Runtime V2",
            description:
              "Le moteur d'exécution qui automatise le USSD de manière fiable, avec l'agent aux commandes à chaque étape.",
          },
        ],
        ctaLabel: "Comment ça marche",
        ctaHref: "/how-it-works",
      },
      security: {
        heading: "Une sécurité conçue pour des opérations réglementées et à fort volume",
        description:
          "Chaque couche de MoMo Assistant est conçue autour d'une seule règle : les PIN de transaction ne quittent jamais l'appareil.",
        items: [
          {
            icon: KeyRound,
            title: "Android KeyStore",
            description:
              "Les données sensibles sont générées et scellées dans le KeyStore matériel de l'appareil, jamais dans le stockage de l'application.",
          },
          {
            icon: Smartphone,
            title: "Device Trust",
            description:
              "Les appareils doivent être vérifiés et approuvés avant de pouvoir exécuter des transactions automatisées pour une station.",
          },
          {
            icon: Network,
            title: "SIM Trust",
            description:
              "Les SIM sont liées et vérifiées par appareil, empêchant qu'un échange de SIM non autorisé ne prenne le contrôle d'une ligne en silence.",
          },
          {
            icon: ShieldCheck,
            title: "Politiques du moteur d'exécution",
            description:
              "Des politiques définies par l'organisation déterminent ce que le moteur peut automatiser, et où une confirmation humaine est requise.",
          },
          {
            icon: ScrollText,
            title: "Journaux d'audit",
            description:
              "Chaque action liée à la sécurité est enregistrée, donnant aux organisations une piste d'audit complète et infalsifiable.",
          },
          {
            icon: EyeOff,
            title: "Le PIN ne quitte jamais l'appareil",
            description:
              "Les PIN de transaction Mobile Money ne sont jamais stockés dans le cloud — uniquement sur l'appareil, dans le coffre-fort adossé au KeyStore.",
          },
        ],
      },
      howItWorks: {
        heading: "Comment ça marche",
        description: "De l'intégration à l'audit en temps réel, en quatre étapes.",
        items: [
          {
            step: 1,
            title: "Configurez votre organisation",
            description:
              "Configurez votre organisation et définissez vos stations, agents et politiques de fonctionnement.",
          },
          {
            step: 2,
            title: "Enregistrez appareils et SIM",
            description:
              "Enregistrez des appareils et SIM de confiance, vérifiés par Device Trust et SIM Trust avant leur première utilisation.",
          },
          {
            step: 3,
            title: "Automatisez les flux USSD",
            description:
              "Runtime V2 exécute les séquences USSD courantes rapidement et de façon constante, l'agent confirmant chaque transaction.",
          },
          {
            step: 4,
            title: "Suivez et auditez en temps réel",
            description:
              "Suivez l'historique des transactions et les événements de sécurité de chaque station depuis une seule piste d'audit.",
          },
        ],
      },
      whyMomoAssistant: {
        heading: "Pourquoi MoMo Assistant",
        description:
          "Conçu dès le départ pour les opérateurs professionnels — et non adapté d'un portefeuille grand public.",
        items: [
          {
            icon: Building2,
            title: "Conçu pour les entreprises, pas les portefeuilles grand public",
            description:
              "MoMo Assistant est conçu pour les organisations traitant un volume élevé de transactions quotidiennes, pas pour un portefeuille mono-utilisateur.",
          },
          {
            icon: BarChart3,
            title: "La rapidité sans perdre le contrôle",
            description:
              "L'automatisation USSD supprime la saisie manuelle répétitive tout en laissant l'agent décisionnaire final sur chaque transaction.",
          },
          {
            icon: ServerCog,
            title: "Traçabilité par conception",
            description:
              "L'architecture Organisation/Station et les journaux d'audit permettent de retracer chaque action jusqu'à un appareil, un agent et un moment précis.",
          },
          {
            icon: Users,
            title: "Intégration entreprise",
            description:
              "Les stations et appareils sont provisionnés et approuvés de façon délibérée : ajouter des agents n'augmente pas le risque.",
          },
        ],
        ctaLabel: "Pourquoi MoMo Assistant",
        ctaHref: "/why",
      },
      testimonials: {
        heading: "Ce que disent les opérateurs",
        items: [
          {
            quote:
              "Témoignage provisoire : depuis que nous avons migré nos stations vers MoMo Assistant, la réconciliation de l'historique des transactions en fin de journée prend quelques minutes au lieu de plusieurs heures.",
            name: "Ama Owusu",
            role: "Responsable des opérations",
            initials: "AO",
          },
          {
            quote:
              "Témoignage provisoire : Device Trust nous a donné la confiance nécessaire pour laisser les agents utiliser leurs propres appareils sans perdre le contrôle des SIM.",
            name: "Kwabena Asante",
            role: "Responsable de station",
            initials: "KA",
          },
          {
            quote:
              "Témoignage provisoire : les journaux d'audit sont la première chose que nous vérifions dès qu'un doute apparaît — ils nous ont sauvés plus d'une fois.",
            name: "Efua Mensah",
            role: "Responsable conformité",
            initials: "EM",
          },
        ],
      },
      pricingPreview: {
        heading: "Des offres simples, conçues pour évoluer avec votre organisation",
        items: [
          {
            name: "Débutant",
            description: "Pour une station unique qui démarre avec l'automatisation.",
            price: "Gratuit",
            cta: { label: "Commencer", href: "/pricing" },
          },
          {
            name: "Professional",
            description: "Pour une agence qui dépasse la station unique.",
            price: "Contacter les ventes",
            cta: { label: "Voir les tarifs", href: "/pricing" },
          },
          {
            name: "Business",
            description: "Pour les organisations gérant plusieurs stations.",
            price: "Contacter les ventes",
            cta: { label: "Voir les tarifs", href: "/pricing" },
            highlighted: true,
          },
          {
            name: "Enterprise",
            description: "Politiques personnalisées, intégration et support à grande échelle.",
            price: "Contacter les ventes",
            cta: { label: "Nous contacter", href: "/contact" },
          },
        ],
      },
      faqPreview: {
        heading: "Questions fréquentes",
        items: [
          {
            question: "MoMo Assistant stocke-t-il mon code PIN Mobile Money dans le cloud ?",
            answer:
              "Non. Les PIN de transaction sont scellés dans l'Android KeyStore de votre appareil et ne sont jamais transmis ni stockés dans le cloud.",
          },
          {
            question: "Puis-je utiliser plusieurs SIM ou lignes Mobile Money ?",
            answer:
              "Oui. La gestion multi-SIM vous permet d'exploiter plusieurs lignes depuis un seul appareil et de basculer entre elles sans interrompre un flux de travail.",
          },
          {
            question: "Que se passe-t-il si je perds ou remplace un appareil ?",
            answer:
              "La restauration d'appareil vous permet de reconfigurer une station sur un nouvel appareil de confiance, en minimisant les interruptions.",
          },
          {
            question: "MoMo Assistant est-il conçu pour les particuliers ou les entreprises ?",
            answer:
              "MoMo Assistant est une application d'entreprise conçue pour les opérateurs Mobile Money professionnels traitant un volume élevé de transactions, pas une application de portefeuille grand public.",
          },
          {
            question: "Qui peut voir mon historique de transactions et d'audit ?",
            answer:
              "Les journaux d'audit et l'historique des transactions sont limités à votre organisation et vos stations, selon les rôles et politiques que vous configurez.",
          },
        ],
      },
      finalCta: {
        heading: "Automatisez Mobile Money. Gardez le contrôle.",
        description:
          "Téléchargez MoMo Assistant et offrez à vos opérateurs la rapidité de l'automatisation, avec la traçabilité qu'exigent les entreprises.",
        primaryCtaLabel: text.primaryCtaLabel,
        secondaryCta: { label: text.secondaryCtaLabel, href: "/contact" },
      },
    };
  }

  return {
    hero: {
      eyebrow: "The Operating System for Enterprise Mobile Money Operations",
      headline: "Automate Mobile Money. Stay in Control.",
      subheadline:
        "MoMo Assistant is the platform running your Mobile Money operations: Organizations, Stations, trusted devices, and Runtime, working together to execute faster, safer USSD transactions with every action auditable.",
      primaryCtaLabel: text.primaryCtaLabel,
      secondaryCta: { label: text.secondaryCtaLabel, href: "/contact" },
      trustBadges: [
        { icon: ShieldCheck, label: "Bank-grade Security" },
        { icon: Activity, label: "Real-time Monitoring" },
        { icon: ScrollText, label: "24/7 Audit Trail" },
        { icon: TrendingUp, label: "Built for Scale" },
      ],
    },
    socialProof: {
      heading: "Trusted by professional Mobile Money operators",
      logos: [
        { name: "Accra Digital Payments" },
        { name: "Kumasi Agent Network" },
        { name: "Tema FinServe" },
        { name: "Northern MoMo Hub" },
        { name: "Coastal Transact Group" },
      ],
    },
    features: {
      heading: "Everything a Mobile Money station needs",
      description:
        "One application to run multi-SIM operations, automate USSD workflows, and keep a reliable record of every transaction.",
      items: [
        {
          icon: Layers,
          title: "Multi-SIM Management",
          description:
            "Run multiple SIMs and mobile money lines from a single device, switching between them without breaking a workflow.",
        },
        {
          icon: Zap,
          title: "USSD Automation",
          description:
            "Automate repetitive USSD sequences with precision timing, while keeping the human agent in control of every confirmation.",
        },
        {
          icon: History,
          title: "Transaction History",
          description:
            "Every transaction is logged and searchable, giving agents and station managers a complete, reliable record.",
        },
        {
          icon: KeyRound,
          title: "Secure PIN Vault",
          description:
            "Mobile Money PINs are sealed in the Android KeyStore on-device and are never transmitted or stored in the cloud.",
        },
        {
          icon: Wallet,
          title: "Financial Runtime",
          description:
            "Checks available balance before every transaction — rejects an impossible transaction before it costs money.",
        },
        {
          icon: ShieldCheck,
          title: "Trust Platform",
          description:
            "Device Trust, SIM Trust, and Station Trust, unified into one runtime policy that decides what can be automated.",
        },
      ],
      ctaLabel: "See all features",
      ctaHref: "/features",
    },
    architecture: {
      eyebrow: "Architecture",
      heading: "Built for organizations, not just individual agents",
      description:
        "MoMo Assistant is structured around how professional Mobile Money businesses actually operate: an organization made up of stations, each running on trusted devices, executed through a dedicated runtime.",
      layers: [
        {
          title: "Organization",
          description:
            "The top-level business entity — owns stations, policies, and audit history across every location.",
        },
        {
          title: "Station",
          description:
            "A physical point of operation with its own agents, devices, and SIMs, reporting up to the organization.",
        },
        {
          title: "Device Trust",
          description:
            "Every device is verified and trusted before it can execute transactions on behalf of a station.",
        },
        {
          title: "Runtime V2",
          description:
            "The execution engine that carries out USSD automation reliably, with the agent in control at every step.",
        },
      ],
      ctaLabel: "How it works",
      ctaHref: "/how-it-works",
    },
    security: {
      heading: "Security built for regulated, high-volume operations",
      description:
        "Every layer of MoMo Assistant is designed around one rule: transaction PINs never leave the device.",
      items: [
        {
          icon: KeyRound,
          title: "Android KeyStore",
          description:
            "Sensitive material is generated and sealed inside the device's hardware-backed KeyStore, not in application storage.",
        },
        {
          icon: Smartphone,
          title: "Device Trust",
          description:
            "Devices must be verified and trusted before they can run automated transactions for a station.",
        },
        {
          icon: Network,
          title: "SIM Trust",
          description:
            "SIMs are bound and verified per device, preventing unauthorized SIM swaps from silently taking over a line.",
        },
        {
          icon: ShieldCheck,
          title: "Runtime Policies",
          description:
            "Organization-defined policies govern what the runtime is allowed to automate, and where a human must confirm.",
        },
        {
          icon: ScrollText,
          title: "Audit Logs",
          description:
            "Every security-relevant action is recorded, giving organizations a complete, tamper-evident audit trail.",
        },
        {
          icon: EyeOff,
          title: "PINs Never Leave the Device",
          description:
            "Mobile Money transaction PINs are never stored in the cloud — only on-device, inside the KeyStore-backed vault.",
        },
      ],
    },
    howItWorks: {
      heading: "How it works",
      description: "From onboarding to real-time auditing, in four steps.",
      items: [
        {
          step: 1,
          title: "Onboard your organization",
          description:
            "Set up your organization and define your stations, agents, and operating policies.",
        },
        {
          step: 2,
          title: "Register devices and SIMs",
          description:
            "Enroll trusted devices and SIMs, verified through Device Trust and SIM Trust before first use.",
        },
        {
          step: 3,
          title: "Automate USSD workflows",
          description:
            "Runtime V2 executes routine USSD sequences quickly and consistently, with the agent confirming each transaction.",
        },
        {
          step: 4,
          title: "Monitor and audit in real time",
          description:
            "Track transaction history and security events across every station from a single audit trail.",
        },
      ],
    },
    whyMomoAssistant: {
      heading: "Why MoMo Assistant",
      description:
        "Built from the ground up for professional operators — not adapted from a consumer wallet.",
      items: [
        {
          icon: Building2,
          title: "Built for businesses, not consumer wallets",
          description:
            "MoMo Assistant is designed around organizations processing large daily transaction volumes, not single-user wallets.",
        },
        {
          icon: BarChart3,
          title: "Speed without losing control",
          description:
            "USSD automation removes repetitive manual entry while keeping the agent as the final decision-maker on every transaction.",
        },
        {
          icon: ServerCog,
          title: "Auditability by design",
          description:
            "Organization/Station architecture and audit logs mean every action can be traced back to a device, agent, and time.",
        },
        {
          icon: Users,
          title: "Enterprise onboarding",
          description:
            "Stations and devices are provisioned and trusted deliberately, so scaling to more agents doesn't mean scaling risk.",
        },
      ],
      ctaLabel: "Why MoMo Assistant",
      ctaHref: "/why",
    },
    testimonials: {
      heading: "What operators are saying",
      items: [
        {
          quote:
            "Placeholder testimonial: since we moved our stations onto MoMo Assistant, reconciling transaction history at the end of the day takes minutes instead of hours.",
          name: "Ama Owusu",
          role: "Operations Lead",
          initials: "AO",
        },
        {
          quote:
            "Placeholder testimonial: Device Trust gave us the confidence to let agents use their own devices without losing control of the SIMs.",
          name: "Kwabena Asante",
          role: "Station Manager",
          initials: "KA",
        },
        {
          quote:
            "Placeholder testimonial: audit logs are the first thing we check now when something looks off — it's saved us more than once.",
          name: "Efua Mensah",
          role: "Compliance Officer",
          initials: "EM",
        },
      ],
    },
    pricingPreview: {
      heading: "Simple plans, built to scale with your organization",
      items: [
        {
          name: "Starter",
          description: "For a single station getting started with automation.",
          price: "Free",
          cta: { label: "Get Started", href: "/pricing" },
        },
        {
          name: "Professional",
          description: "For an agency that's outgrown a single station.",
          price: "Contact Sales",
          cta: { label: "View Pricing", href: "/pricing" },
        },
        {
          name: "Business",
          description: "For organizations running multiple stations.",
          price: "Contact Sales",
          cta: { label: "View Pricing", href: "/pricing" },
          highlighted: true,
        },
        {
          name: "Enterprise",
          description: "Custom policies, onboarding, and support at scale.",
          price: "Contact Sales",
          cta: { label: "Talk to Us", href: "/contact" },
        },
      ],
    },
    faqPreview: {
      heading: "Frequently asked questions",
      items: [
        {
          question: "Does MoMo Assistant store my Mobile Money PIN in the cloud?",
          answer:
            "No. Transaction PINs are sealed in the Android KeyStore on your device and are never transmitted or stored in the cloud.",
        },
        {
          question: "Can I run more than one SIM or Mobile Money line?",
          answer:
            "Yes. Multi-SIM management lets you operate several lines from a single device and switch between them without breaking a workflow.",
        },
        {
          question: "What happens if I lose or replace a device?",
          answer:
            "Device Restoration lets you re-provision a station's configuration onto a new trusted device, minimizing downtime.",
        },
        {
          question: "Is MoMo Assistant built for individual users or businesses?",
          answer:
            "MoMo Assistant is an enterprise application built for professional Mobile Money operators processing high transaction volumes, not a consumer wallet app.",
        },
        {
          question: "Who can see my transaction and audit history?",
          answer:
            "Audit logs and transaction history are scoped to your organization and stations, governed by the roles and policies you configure.",
        },
      ],
    },
    finalCta: {
      heading: "Automate Mobile Money. Stay in Control.",
      description:
        "Download MoMo Assistant and give your operators the speed of automation with the auditability enterprises require.",
      primaryCtaLabel: text.primaryCtaLabel,
      secondaryCta: { label: text.secondaryCtaLabel, href: "/contact" },
    },
  };
}

const CONTENT: Record<AppLocale, HomepageContent> = {
  en: build("en"),
  fr: build("fr"),
};

export function getHomepageContent(locale: AppLocale): HomepageContent {
  return CONTENT[locale];
}
