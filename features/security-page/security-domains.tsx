import { CheckCircle2 } from "lucide-react";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { securityDomains } from "@/content/security";
import { staggerContainer } from "@/lib/motion";

export function SecurityDomains() {
  return (
    <Section aria-labelledby="security-domains-heading">
      <h2 id="security-domains-heading" className="sr-only">
        Security domains
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 lg:grid-cols-2"
      >
        {securityDomains.map((domain) => (
          <MotionItem key={domain.title}>
            <Card className="h-full">
              <CardHeader>
                <domain.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-base">
                  {domain.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  {domain.description}
                </p>
                {domain.points && (
                  <ul className="flex flex-col gap-2">
                    {domain.points.map((point) => (
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
