import { CheckCircle2 } from "lucide-react";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingTiers } from "@/content/pricing";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Plans() {
  return (
    <Section aria-labelledby="plans-heading">
      <h2 id="plans-heading" className="sr-only">
        Plans
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 lg:grid-cols-3"
      >
        {pricingTiers.map((tier) => (
          <MotionItem key={tier.name}>
            <Card
              className={cn(
                "h-full",
                tier.highlighted && "ring-2 ring-primary shadow-glow"
              )}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                {tier.highlighted && (
                  <CardAction>
                    <Badge>Popular</Badge>
                  </CardAction>
                )}
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <p className="text-2xl font-semibold text-foreground">
                  {tier.price}
                </p>
                {tier.features && (
                  <ul className="flex flex-col gap-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
              <CardFooter>
                <CTAButton
                  href={tier.cta.href}
                  external={tier.cta.external}
                  variant={tier.highlighted ? "default" : "outline"}
                  className="w-full"
                  event="pricing_page_tier_cta"
                  eventPayload={{ tier: tier.name }}
                >
                  {tier.cta.label}
                </CTAButton>
              </CardFooter>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
