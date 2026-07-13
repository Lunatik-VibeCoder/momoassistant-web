import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Testimonials() {
  const locale = (await getLocale()) as AppLocale;
  const { testimonials } = getHomepageContent(locale);

  return (
    <Section aria-labelledby="testimonials-heading" className="bg-muted/40">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="testimonials-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {testimonials.heading}
        </h2>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 grid gap-5 lg:grid-cols-3"
      >
        {testimonials.items.map((testimonial) => (
          <MotionItem key={testimonial.name}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4">
                <p className="flex-1 text-sm text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
