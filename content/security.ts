import {
  Cpu,
  EyeOff,
  KeyRound,
  Network,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import type { DetailSection } from "@/types";

export const securityHero = {
  eyebrow: "Security",
  title: "Security built around one rule",
  description:
    "Mobile Money transaction PINs never leave the device. Every other layer — device trust, SIM trust, runtime policy, audit logs — exists to protect that boundary.",
};

export const securityDomains: DetailSection[] = [
  {
    icon: Smartphone,
    title: "Device Trust",
    description:
      "A device has to be verified and trusted before it can run automated transactions for a station.",
    points: [
      "New devices are enrolled deliberately, not automatically",
      "Trust is scoped to a station — a device trusted for one station isn't trusted for another",
      "Replacing a device means re-establishing trust, not inheriting it",
    ],
  },
  {
    icon: Network,
    title: "SIM Trust",
    description:
      "SIMs are bound and verified per device, so an unauthorized SIM swap can't silently take over a line.",
    points: [
      "Each SIM is tied to the device it was enrolled on",
      "Swapping a SIM into an untrusted device breaks the binding rather than transacting silently",
      "Multi-SIM stations keep each line's trust independent of the others",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Runtime Security",
    description:
      "Runtime policies define what Runtime V2 is allowed to automate — and where a human has to confirm.",
    points: [
      "Organizations set the policy; the runtime enforces it, not the individual agent",
      "Every automated step still surfaces to the agent for confirmation before it commits",
      "Security-relevant runtime events are recorded to the audit log as they happen",
    ],
  },
  {
    icon: KeyRound,
    title: "PIN Security",
    description:
      "Mobile Money PINs are sealed in the Android KeyStore on-device — hardware-backed where the device supports it.",
    points: [
      "PINs are never transmitted off the device",
      "PINs are never included in cloud sync, backups, or transaction metadata",
      "The vault is scoped per device; restoring a station onto a new device means re-entering PINs there, not migrating them",
    ],
  },
  {
    icon: EyeOff,
    title: "Privacy",
    description:
      "Cloud sync exists for station configuration and transaction metadata — not for anything that could reconstruct a PIN.",
    points: [
      "Transaction history and audit logs are scoped to your organization, governed by the roles you configure",
      "No country or network is hardcoded — Mobile Money Assistant is configured per Network Profile, not built around one market's assumptions",
      "We don't sell or share transaction data — it exists to serve your station, not a third party",
    ],
  },
  {
    icon: Cpu,
    title: "Technology",
    description:
      "The Organization / Station architecture, Runtime V2, and the security model above are how the pieces fit together.",
    points: [
      "Android KeyStore for on-device key material",
      "Runtime V2 as the sole execution path for automated USSD sequences",
      "Organization → Station → Device Trust → Runtime V2 as the chain every automated transaction passes through",
    ],
  },
];
