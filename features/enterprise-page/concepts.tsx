import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEnterpriseContent } from "@/content/enterprise";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Concepts() {
  const locale = (await getLocale()) as AppLocale;
  const { concepts, conceptsHeading } = getEnterpriseContent(locale);

  return (
    <Section aria-labelledby="concepts-heading">
      <h2 id="concepts-heading" className="sr-only">
        {conceptsHeading}
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {concepts.map((concept) => (
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
