import { CheckCircle2 } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWhoContent } from "@/content/who";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Profiles() {
  const locale = (await getLocale()) as AppLocale;
  const { profiles, profilesHeading } = getWhoContent(locale);

  return (
    <Section aria-labelledby="profiles-heading">
      <h2 id="profiles-heading" className="sr-only">
        {profilesHeading}
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 lg:grid-cols-2"
      >
        {profiles.map((profile) => (
          <MotionItem key={profile.title}>
            <Card className="h-full">
              <CardHeader>
                <profile.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-base">
                  {profile.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  {profile.description}
                </p>
                {profile.points && (
                  <ul className="flex flex-col gap-2">
                    {profile.points.map((point) => (
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
