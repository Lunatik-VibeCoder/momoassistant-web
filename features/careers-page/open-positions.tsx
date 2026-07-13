import { Inbox } from "lucide-react";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { siteConfig } from "@/lib/constants";

export function OpenPositions() {
  return (
    <Section aria-labelledby="open-positions-heading">
      <h2
        id="open-positions-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Open positions
      </h2>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center">
        <Inbox className="size-8 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="font-medium text-foreground">
            No open positions right now
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            We&apos;re not actively hiring, but if you think you&apos;d be a
            strong fit for where MoMo Assistant is headed, reach out anyway.
          </p>
        </div>
        <CTAButton
          variant="outline"
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Interested in working on MoMo Assistant")}`}
          external
          event="careers_reach_out"
        >
          Get in touch
        </CTAButton>
      </div>
    </Section>
  );
}
