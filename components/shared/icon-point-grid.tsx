import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { staggerContainer } from "@/lib/motion";
import type { WhyPoint } from "@/types";

interface IconPointGridProps {
  id: string;
  heading: string;
  items: WhyPoint[];
  className?: string;
}

/**
 * A heading + grid of icon/title/description points — the pattern shared by
 * About's Values, Careers' Culture, and Careers' Benefits sections.
 */
export function IconPointGrid({ id, heading, items, className }: IconPointGridProps) {
  return (
    <Section aria-labelledby={id} className={className}>
      <div className="max-w-2xl">
        <h2
          id={id}
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {heading}
        </h2>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <MotionItem key={item.title} className="flex gap-4">
            <item.icon
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
