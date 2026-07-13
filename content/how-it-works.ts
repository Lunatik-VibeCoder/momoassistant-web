import { Building2, Cloud, CreditCard, ServerCog, Smartphone, Zap } from "lucide-react";

import type { DetailSection, HowItWorksStep } from "@/types";

export const howItWorksHero = {
  eyebrow: "How it works",
  title: "From organization to automated transaction",
  description:
    "How MoMo Assistant is structured, how a transaction actually moves through it, and what each piece — Organizations, Stations, SIMs, Runtime V2 — is responsible for.",
};

export const lifecycleSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Onboard your organization",
    description:
      "Create your organization and define your stations, agents, and the operating policies Runtime V2 will enforce.",
  },
  {
    step: 2,
    title: "Register devices and SIMs",
    description:
      "Enroll trusted devices and bind SIMs to them through the Device Trust Engine and SIM Trust before either can transact.",
  },
  {
    step: 3,
    title: "Automate USSD workflows",
    description:
      "Runtime V2 executes the USSD sequence — dialing, navigating menus, entering amounts — at consistent, predictable timing.",
  },
  {
    step: 4,
    title: "Agent confirms",
    description:
      "Before anything commits, the agent sees and confirms the transaction. Automation removes the retyping, not the decision.",
  },
  {
    step: 5,
    title: "Sync and audit",
    description:
      "Transaction metadata and station configuration sync to the cloud; the security-relevant event is written to the audit log. The PIN never makes either trip.",
  },
];

export const architectureConcepts: DetailSection[] = [
  {
    icon: Building2,
    title: "Organizations",
    description:
      "The top-level business entity. Owns every station beneath it, sets the policies Runtime V2 enforces, and is the single place audit history rolls up to.",
  },
  {
    icon: Smartphone,
    title: "Stations",
    description:
      "A physical point of operation — its own agents, its own devices, its own SIMs — reporting up to the organization it belongs to.",
  },
  {
    icon: CreditCard,
    title: "SIMs",
    description:
      "Each SIM is bound to the device it's enrolled on through SIM Trust, keeping multi-SIM stations' lines independently trusted rather than pooled.",
  },
  {
    icon: ServerCog,
    title: "Runtime V2",
    description:
      "The execution engine every automated USSD sequence runs through — the same engine regardless of station or SIM, so behavior stays consistent.",
  },
];

export const runtimeAndSync: DetailSection[] = [
  {
    icon: Zap,
    title: "USSD Runtime",
    description:
      "Runtime V2 dials and navigates USSD menus with consistent timing, so the same sequence behaves the same way on every run — no more, no less than what the organization's policy allows it to automate.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description:
      "Station configuration and transaction metadata sync across devices so a station's setup isn't tied to a single phone. Mobile Money PINs are excluded from sync entirely — they stay on the device that holds them.",
  },
];
