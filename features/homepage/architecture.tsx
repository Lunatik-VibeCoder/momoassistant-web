import { ArrowRight } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Badge } from "@/components/ui/badge";
import { getHomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

export async function Architecture() {
  const locale = (await getLocale()) as AppLocale;
  const { architecture } = getHomepageContent(locale);

  return (
    <Section aria-labelledby="architecture-heading" className="bg-muted/40">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="mb-4">
          {architecture.eyebrow}
        </Badge>
        <h2
          id="architecture-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {architecture.heading}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {architecture.description}
        </p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-14 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center"
      >
        {architecture.layers.map((layer, index) => (
          <div key={layer.title} className="flex flex-1 items-center gap-3">
            <MotionItem className="flex-1">
              <div className="h-full rounded-xl border border-border bg-card p-5 shadow-soft">
                <span className="text-xs font-medium text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-foreground">
                  {layer.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {layer.description}
                </p>
              </div>
            </MotionItem>
            {index < architecture.layers.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="hidden size-5 shrink-0 text-muted-foreground/60 lg:block"
              />
            )}
          </div>
        ))}
      </MotionSection>
    </Section>
  );
}
