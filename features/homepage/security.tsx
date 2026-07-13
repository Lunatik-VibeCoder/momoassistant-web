import { ShieldCheck } from "lucide-react";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { security } from "@/content/homepage";
import { staggerContainer } from "@/lib/motion";

export function Security() {
  return (
    <Section id="security" aria-labelledby="security-heading">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="mb-4 gap-1">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Security
        </Badge>
        <h2
          id="security-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Security built for regulated, high-volume operations
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Every layer of MoMo Assistant is designed around one rule:
          transaction PINs never leave the device.
        </p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {security.map((pillar) => (
          <MotionItem key={pillar.title}>
            <Card className="h-full">
              <CardHeader>
                <pillar.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-base">
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
