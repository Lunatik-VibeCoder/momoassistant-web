import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingPreview } from "@/content/homepage";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/motion";

export function PricingPreview() {
  return (
    <Section aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="pricing-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Simple plans, built to scale with your stations
        </h2>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 grid gap-5 lg:grid-cols-3"
      >
        {pricingPreview.map((tier) => (
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
              <CardContent>
                <p className="text-2xl font-semibold text-foreground">
                  {tier.price}
                </p>
              </CardContent>
              <CardFooter>
                <CTAButton
                  href={tier.cta.href}
                  variant={tier.highlighted ? "default" : "outline"}
                  className="w-full"
                  event="pricing_preview_cta"
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
