import {
  Building2,
  Cloud,
  History,
  KeyRound,
  Layers,
  RefreshCw,
  ServerCog,
  Users,
  Zap,
} from "lucide-react";

import type { FeatureGroup } from "@/types";

export const featuresHero = {
  eyebrow: "Features",
  title: "Everything a Mobile Money station runs on",
  description:
    "Multi-SIM operations, automated USSD workflows, transaction records, and cloud sync — built around how professional agents and stations actually work day to day.",
};

export const featureGroups: FeatureGroup[] = [
  {
    title: "Automation",
    description:
      "Runtime V2 executes routine USSD sequences with precision timing, while the agent stays the final decision-maker on every transaction.",
    items: [
      {
        icon: Zap,
        title: "USSD Automation",
        description:
          "Automates repetitive USSD sequences with precision timing, removing manual re-entry without removing the agent from the loop — every transaction still requires confirmation.",
      },
      {
        icon: ServerCog,
        title: "Runtime V2 execution engine",
        description:
          "The engine behind every automated sequence: consistent timing, predictable behavior across devices, and policies an organization can define for what's allowed to run unattended.",
      },
    ],
  },
  {
    title: "Operations",
    description:
      "The day-to-day tools a station needs to run multiple lines, keep records straight, and recover quickly when a device changes hands.",
    items: [
      {
        icon: Layers,
        title: "Multi-SIM Management",
        description:
          "Run multiple SIMs and Mobile Money lines from a single device, switching between them without breaking a workflow mid-transaction.",
      },
      {
        icon: History,
        title: "Transaction History",
        description:
          "Every transaction is logged and searchable, giving agents and station managers a complete, reliable record without reconciling paper logs.",
      },
      {
        icon: Cloud,
        title: "Cloud Synchronization",
        description:
          "Station configuration and transaction metadata sync securely across devices — Mobile Money PINs are never included in that sync.",
      },
      {
        icon: RefreshCw,
        title: "Device Restoration",
        description:
          "Replace or reset a device and restore an agent's station configuration quickly, minimizing the downtime a lost or broken device would otherwise cause.",
      },
    ],
  },
  {
    title: "Organization",
    description:
      "Built for businesses running more than one agent, device, or location — not a single-user consumer wallet.",
    items: [
      {
        icon: Building2,
        title: "Organization / Station architecture",
        description:
          "Model your business the way it actually operates: an organization made up of stations, each with its own agents, devices, and SIMs, reporting up to one place.",
      },
      {
        icon: Users,
        title: "Enterprise onboarding",
        description:
          "Stations and devices are provisioned and trusted deliberately, so adding more agents doesn't mean losing track of who has access to what.",
      },
      {
        icon: KeyRound,
        title: "Secure PIN Vault",
        description:
          "Mobile Money PINs are sealed in the Android KeyStore on-device and never transmitted or stored in the cloud. Full detail on the security page.",
      },
    ],
  },
];
