import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface IconListItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type FeatureItem = IconListItem;
export type SecurityPillar = IconListItem;

export interface ArchitectureLayer {
  title: string;
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface WhyPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface PricingTier {
  name: string;
  description: string;
  price: string;
  cadence?: string;
  cta: NavLink;
  highlighted?: boolean;
  features?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SocialProofLogo {
  name: string;
}

export interface FeatureGroup {
  title: string;
  description: string;
  items: FeatureItem[];
}

export interface DetailSection extends IconListItem {
  points?: string[];
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

export interface ContactChannel extends IconListItem {
  actionLabel: string;
  href: string;
  external?: boolean;
}
