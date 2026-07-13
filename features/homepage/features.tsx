import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/content/homepage";
import { staggerContainer } from "@/lib/motion";

export function Features() {
  return (
    <Section id="features" aria-labelledby="features-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="features-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Everything a Mobile Money station needs
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          One application to run multi-SIM operations, automate USSD
          workflows, and keep a reliable record of every transaction.
        </p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <MotionItem key={feature.title}>
            <Card className="h-full">
              <CardHeader>
                <feature.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-base">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
