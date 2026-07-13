import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { architectureConcepts } from "@/content/how-it-works";
import { staggerContainer } from "@/lib/motion";

export function ArchitectureConcepts() {
  return (
    <Section aria-labelledby="architecture-heading" className="bg-muted/40">
      <div className="max-w-2xl">
        <h2
          id="architecture-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Architecture
        </h2>
        <p className="mt-3 text-muted-foreground">
          Four concepts, one hierarchy: Organizations own Stations, Stations
          own SIMs and devices, and every automated action runs through
          Runtime V2.
        </p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {architectureConcepts.map((concept) => (
          <MotionItem key={concept.title}>
            <Card className="h-full">
              <CardHeader>
                <concept.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-base">
                  {concept.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {concept.description}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
