import { CheckCircle2 } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWhyContent } from "@/content/why";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Comparisons() {
  const locale = (await getLocale()) as AppLocale;
  const { comparisons, comparisonsHeading } = getWhyContent(locale);

  return (
    <Section aria-labelledby="comparisons-heading">
      <h2 id="comparisons-heading" className="sr-only">
        {comparisonsHeading}
      </h2>
      <MotionSection variants={staggerContainer} className="flex flex-col gap-5">
        {comparisons.map((item) => (
          <MotionItem key={item.title}>
            <Card>
              <CardHeader>
                <item.icon className="size-5 text-primary" aria-hidden="true" />
                <CardTitle className="mt-3 text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {item.points && (
                  <ul className="grid gap-2 sm:grid-cols-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
