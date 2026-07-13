import { siteConfig } from "@/lib/constants";
import type { ComparisonRow, FaqItem, PricingTier } from "@/types";

export const pricingHero = {
  eyebrow: "Pricing",
  title: "Plans that scale with your stations",
  description:
    "Start with a single station for free. Move to Business when you're running more than one, and talk to us directly once you need custom policies and onboarding.",
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "For a single station getting started with automation.",
    price: "Free",
    cta: {
      label: siteConfig.primaryCtaLabel,
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
];

export const comparisonRows: ComparisonRow[] = [
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
];

export const pricingFaq: FaqItem[] = [
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
];
