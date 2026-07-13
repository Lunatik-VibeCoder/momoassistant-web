import { ShieldCheck } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Security() {
  const locale = (await getLocale()) as AppLocale;
  const { security } = getHomepageContent(locale);

  return (
    <Section id="security" aria-labelledby="security-heading">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="mb-4 gap-1">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          {locale === "fr" ? "Sécurité" : "Security"}
        </Badge>
        <h2
          id="security-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {security.heading}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {security.description}
        </p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {security.items.map((pillar) => (
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
