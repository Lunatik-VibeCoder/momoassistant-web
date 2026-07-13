import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeaturesContent } from "@/content/features";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function FeatureGroups() {
  const locale = (await getLocale()) as AppLocale;
  const { featureGroups } = getFeaturesContent(locale);

  return (
    <>
      {featureGroups.map((group) => (
        <Section
          key={group.title}
          aria-labelledby={`${group.title.toLowerCase()}-heading`}
        >
          <div className="max-w-2xl">
            <h2
              id={`${group.title.toLowerCase()}-heading`}
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {group.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{group.description}</p>
          </div>

          <MotionSection
            variants={staggerContainer}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.items.map((item) => (
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
      ))}
    </>
  );
}
