import {
  Award,
  Bot,
  Globe,
  Lock,
  ShieldCheck,
  WifiOff,
  Zap,
} from "lucide-react";

import type { WhyPoint } from "@/types";

export const aboutHero = {
  eyebrow: "About",
  title: "Why MoMo Assistant exists",
  description:
    "Built by DEUS FEREA for the professional Mobile Money agents who run their business through a USSD menu, one manual sequence at a time.",
};

export const story = {
  heading: "The problem we set out to fix",
  paragraphs: [
    "Professional Mobile Money agents don't run consumer wallets — they run a business through a USSD menu. Every transaction means dialing a code, navigating menus, and re-entering numbers by hand, dozens or hundreds of times a day, across however many SIMs and devices a station is running.",
    "That's slow, and it's easy to get wrong under volume. But the answer couldn't be \"remove the agent\" — Mobile Money is regulated, high-trust work, and the agent confirming each transaction is exactly what makes it trustworthy. The answer had to be automating the repetitive part while keeping the agent as the one who decides.",
    "MoMo Assistant is that answer: Runtime V2 executes the USSD sequence, Organization/Station architecture models how a real business is structured, and Device Trust, SIM Trust, and the PIN Vault exist so none of that automation comes at the cost of security or auditability.",
  ],
};

export const mission =
  "Empower Mobile Money agents with intelligent automation.";

export const vision =
  "Become Africa's most trusted productivity platform for Mobile Money professionals.";

export const values: WhyPoint[] = [
  {
    icon: Award,
    title: "Professional",
    description:
      "Built for agents running a business, not a consumer app with a business skin.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable",
    description:
      "Runtime V2 behaves the same way on every run — consistency is what makes automation trustworthy.",
  },
  {
    icon: Zap,
    title: "Fast",
    description:
      "Automation exists to remove repetitive manual entry, not to add another layer to work around.",
  },
  {
    icon: Lock,
    title: "Secure",
    description:
      "Device Trust, SIM Trust, and the PIN Vault exist so speed never comes at the cost of control.",
  },
  {
    icon: Bot,
    title: "Automation first",
    description:
      "Every workflow starts from the question: what can Runtime V2 safely automate here?",
  },
  {
    icon: Globe,
    title: "Multi-country",
    description:
      "No country or network is hardcoded — MoMo Assistant is configured per Network Profile from day one.",
  },
  {
    icon: WifiOff,
    title: "Offline first",
    description:
      "Agents work where connectivity is inconsistent — the app is built around that reality, not around always-on assumptions.",
  },
];
