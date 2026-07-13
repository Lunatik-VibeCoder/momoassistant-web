import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { runtimeAndSync } from "@/content/how-it-works";
import { staggerContainer } from "@/lib/motion";

export function RuntimeSync() {
  return (
    <Section aria-labelledby="runtime-sync-heading">
      <h2 id="runtime-sync-heading" className="sr-only">
        Runtime and sync
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2"
      >
        {runtimeAndSync.map((item) => (
          <MotionItem key={item.title}>
            <Card className="h-full">
              <CardHeader>
                <item.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-base">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
