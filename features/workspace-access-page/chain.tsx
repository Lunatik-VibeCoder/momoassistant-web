import { ArrowDown } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { getWorkspaceAccessContent } from "@/content/workspace-access";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";

// Illustrates the canonical chain from
// docs/adr-commercial-model-foundation.md's Reference Architecture
// Diagram — that document is the source of truth; this is a public
// rendering of it, not an independent version.
export async function Chain() {
  const locale = (await getLocale()) as AppLocale;
  const { chain, chainHeading, chainDescription } = getWorkspaceAccessContent(locale);

  return (
    <Section aria-labelledby="chain-heading" className="bg-muted/40">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="chain-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {chainHeading}
        </h2>
        <p className="mt-4 text-muted-foreground">{chainDescription}</p>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mx-auto mt-12 flex max-w-md flex-col items-stretch"
      >
        {chain.map((link, index) => (
          <div key={link.title} className="flex flex-col items-center">
            <MotionItem className="w-full">
              <div className="w-full rounded-xl border border-border bg-card p-5 text-center shadow-soft">
                <h3 className="text-sm font-semibold text-foreground">
                  {link.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {link.description}
                </p>
              </div>
            </MotionItem>
            {index < chain.length - 1 && (
              <ArrowDown
                aria-hidden="true"
                className="my-2 size-5 shrink-0 text-muted-foreground/60"
              />
            )}
          </div>
        ))}
      </MotionSection>
    </Section>
  );
}
