import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkspaceAccessContent } from "@/content/workspace-access";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

// The last detail item (activation & renewal) is COM-001's own open item,
// not a resolved mechanic — flagged with a visible badge rather than
// presented identically to the three real, shipped behaviors above it.
const COMING_SOON_INDEX = 3;

export async function Details() {
  const locale = (await getLocale()) as AppLocale;
  const { details, detailsHeading, comingSoonLabel } = getWorkspaceAccessContent(locale);

  return (
    <Section aria-labelledby="details-heading">
      <div className="max-w-2xl">
        <h2
          id="details-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {detailsHeading}
        </h2>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-10 grid gap-5 sm:grid-cols-2"
      >
        {details.map((detail, index) => (
          <MotionItem key={detail.title}>
            <Card className="h-full">
              <CardHeader>
                <detail.icon className="size-5 text-primary" aria-hidden="true" />
                <CardTitle className="mt-3 text-base">{detail.title}</CardTitle>
                {index === COMING_SOON_INDEX && (
                  <CardAction>
                    <Badge variant="outline">{comingSoonLabel}</Badge>
                  </CardAction>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{detail.description}</p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
