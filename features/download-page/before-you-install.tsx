import { CheckCircle2 } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDownloadContent } from "@/content/download";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function BeforeYouInstall() {
  const locale = (await getLocale()) as AppLocale;
  const { beforeYouInstall, beforeYouInstallHeading } = getDownloadContent(locale);

  return (
    <Section className="pt-0" aria-labelledby="before-you-install-heading">
      <h2
        id="before-you-install-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {beforeYouInstallHeading}
      </h2>
      <MotionSection variants={staggerContainer} className="mt-8 flex flex-col gap-5">
        {beforeYouInstall.map((item) => (
          <MotionItem key={item.title}>
            <Card>
              <CardHeader>
                <item.icon className="size-5 text-primary" aria-hidden="true" />
                <CardTitle className="mt-3 text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {item.points && (
                  <ul className="grid gap-2 sm:grid-cols-2">
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
