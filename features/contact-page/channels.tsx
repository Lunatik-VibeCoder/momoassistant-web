import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactContent } from "@/content/contact";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Channels() {
  const locale = (await getLocale()) as AppLocale;
  const { channels, channelsSrHeading } = getContactContent(locale);

  return (
    <Section aria-labelledby="channels-heading">
      <h2 id="channels-heading" className="sr-only">
        {channelsSrHeading}
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-3"
      >
        {channels.map((channel) => (
          <MotionItem key={channel.title}>
            <Card className="h-full">
              <CardHeader>
                <channel.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="mt-3 text-base">
                  {channel.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {channel.description}
                </p>
              </CardContent>
              <CardFooter>
                <CTAButton
                  href={channel.href}
                  external={channel.external}
                  variant="outline"
                  className="w-full"
                  event="contact_channel_click"
                  eventPayload={{ channel: channel.title }}
                >
                  {channel.actionLabel}
                </CTAButton>
              </CardFooter>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
