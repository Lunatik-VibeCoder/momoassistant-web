import { ArrowRight } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/shared/button-link";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Features() {
  const locale = (await getLocale()) as AppLocale;
  const { features } = getHomepageContent(locale);

  return (
    <Section id="features" aria-labelledby="features-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="features-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {features.heading}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {features.description}
        </p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.items.map((feature) => (
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

      <div className="mt-10 text-center">
        <ButtonLink href={features.ctaHref} variant="link">
          {features.ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </Section>
  );
}
