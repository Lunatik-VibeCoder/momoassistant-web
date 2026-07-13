import type { Metadata } from "next";

import {
  Architecture,
  Cta,
  FaqPreview,
  Features,
  Hero,
  HowItWorks,
  PricingPreview,
  Security,
  SocialProof,
  Testimonials,
  WhyMomoAssistant,
} from "@/features/homepage";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <Architecture />
      <Security />
      <HowItWorks />
      <WhyMomoAssistant />
      <Testimonials />
      <PricingPreview />
      <FaqPreview />
      <Cta />
    </>
  );
}
