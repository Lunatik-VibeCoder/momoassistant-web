import { CheckCircle2, CircleDashed, Clock } from "lucide-react";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Badge } from "@/components/ui/badge";
import { roadmap } from "@/content/changelog";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { RoadmapMilestone } from "@/types";

const STATUS_CONFIG: Record<
  RoadmapMilestone["status"],
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  shipped: {
    label: "Shipped",
    icon: CheckCircle2,
    className: "bg-success/15 text-success",
  },
  "in-progress": {
    label: "In progress",
    icon: Clock,
    className: "bg-warning/15 text-warning",
  },
  planned: {
    label: "Planned",
    icon: CircleDashed,
    className: "text-muted-foreground",
  },
};

export function Roadmap() {
  return (
    <Section aria-labelledby="roadmap-heading">
      <h2 id="roadmap-heading" className="sr-only">
        Roadmap
      </h2>
      <MotionSection
        variants={staggerContainer}
        className="mx-auto flex max-w-2xl flex-col"
      >
        {roadmap.map((milestone, index) => {
          const status = STATUS_CONFIG[milestone.status];
          return (
            <MotionItem key={milestone.version} className="relative flex gap-5">
              <div className="flex flex-col items-center">
                <status.icon
                  className={cn("size-5 shrink-0", status.className)}
                  aria-hidden="true"
                />
                {index < roadmap.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>
              <div className="pb-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-medium text-foreground">
                    {milestone.version}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {milestone.label}
                  </h3>
                  <Badge variant="outline" className={cn("gap-1", status.className)}>
                    {status.label}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
            </MotionItem>
          );
        })}
      </MotionSection>
    </Section>
  );
}
