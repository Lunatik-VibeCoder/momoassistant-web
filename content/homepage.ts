import {
  BarChart3,
  Building2,
  Cloud,
  EyeOff,
  History,
  KeyRound,
  Layers,
  Network,
  RefreshCw,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";

import { PRIMARY_CTA_LABEL, SECONDARY_CTA_LABEL } from "@/lib/constants";
import type {
  ArchitectureLayer,
  FaqItem,
  FeatureItem,
  HowItWorksStep,
  PricingTier,
  SecurityPillar,
  SocialProofLogo,
  Testimonial,
  WhyPoint,
} from "@/types";

export const hero = {
  eyebrow: "Enterprise Mobile Money Automation",
  headline: "Automate Mobile Money. Stay in Control.",
  subheadline:
    "MoMo Assistant helps professional Mobile Money operators execute faster, safer and more reliable USSD transactions while keeping every action auditable.",
  // Primary CTA href intentionally omitted — sections render it via
  // siteConfig.downloadApkUrl so every download button shares one source of
  // truth that's trivial to wire to a real release asset later.
  primaryCtaLabel: PRIMARY_CTA_LABEL,
  secondaryCta: { label: SECONDARY_CTA_LABEL, href: "/contact" },
};

// Illustrative placeholders — swap for real customer names once available.
export const socialProof = {
  heading: "Trusted by professional Mobile Money operators",
  logos: [
    { name: "Accra Digital Payments" },
    { name: "Kumasi Agent Network" },
    { name: "Tema FinServe" },
    { name: "Northern MoMo Hub" },
    { name: "Coastal Transact Group" },
  ] satisfies SocialProofLogo[],
};

export const features: FeatureItem[] = [
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
    icon: Cloud,
    title: "Cloud Synchronization",
    description:
      "Station configuration and transaction metadata sync securely across devices, without ever syncing sensitive PINs.",
  },
  {
    icon: RefreshCw,
    title: "Device Restoration",
    description:
      "Replace or reset a device and restore an agent's station configuration quickly, minimizing operational downtime.",
  },
];

export const architecture = {
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
      title: "Device Trust Engine",
      description:
        "Every device is verified and trusted before it can execute transactions on behalf of a station.",
    },
    {
      title: "Runtime V2",
      description:
        "The execution engine that carries out USSD automation reliably, with the agent in control at every step.",
    },
  ] satisfies ArchitectureLayer[],
};

export const security: SecurityPillar[] = [
  {
    icon: KeyRound,
    title: "Android KeyStore",
    description:
      "Sensitive material is generated and sealed inside the device's hardware-backed KeyStore, not in application storage.",
  },
  {
    icon: Smartphone,
    title: "Device Trust Engine",
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
];

export const howItWorks: HowItWorksStep[] = [
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
      "Enroll trusted devices and SIMs, verified through the Device Trust Engine and SIM Trust before first use.",
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
];

export const whyMomoAssistant: WhyPoint[] = [
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
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Placeholder testimonial: since we moved our stations onto MoMo Assistant, reconciling transaction history at the end of the day takes minutes instead of hours.",
    name: "Ama Owusu",
    role: "Operations Lead",
    initials: "AO",
  },
  {
    quote:
      "Placeholder testimonial: the Device Trust Engine gave us the confidence to let agents use their own devices without losing control of the SIMs.",
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
];

export const pricingPreview: PricingTier[] = [
  {
    name: "Starter",
    description: "For a single station getting started with automation.",
    price: "Free",
    cta: { label: "Get Started", href: "/pricing" },
  },
  {
    name: "Business",
    description: "For organizations running multiple stations and devices.",
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
];

export const faqPreview: FaqItem[] = [
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
];

export const finalCta = {
  heading: "Automate Mobile Money. Stay in Control.",
  description:
    "Download MoMo Assistant and give your operators the speed of automation with the auditability enterprises require.",
  primaryCtaLabel: PRIMARY_CTA_LABEL,
  secondaryCta: { label: SECONDARY_CTA_LABEL, href: "/contact" },
};
