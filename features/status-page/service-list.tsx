import { CheckCircle2, CircleDashed, FlaskConical } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { MotionItem } from "@/components/shared/motion-item";
import { MotionSection } from "@/components/shared/motion-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusContent } from "@/content/status";
import type { AppLocale } from "@/i18n/routing";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { StatusService } from "@/types";

const STATUS_ICON: Record<StatusService["status"], typeof CheckCircle2> = {
  operational: CheckCircle2,
  beta: FlaskConical,
  planned: CircleDashed,
};

const STATUS_CLASS: Record<StatusService["status"], string> = {
  operational: "bg-success/15 text-success",
  beta: "bg-warning/15 text-warning",
  planned: "text-muted-foreground",
};

export async function ServiceList() {
  const locale = (await getLocale()) as AppLocale;
  const { services, statusLabels, overallStatusLabel, note } =
    getStatusContent(locale);

  return (
    <Section aria-labelledby="service-status-heading">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
        <h2
          id="service-status-heading"
          className="text-xl font-semibold text-foreground"
        >
          {overallStatusLabel}
        </h2>
      </div>

      <MotionSection
        variants={staggerContainer}
        className="mt-8 grid gap-4 sm:grid-cols-2"
      >
        {services.map((service) => {
          const Icon = STATUS_ICON[service.status];
          return (
            <MotionItem key={service.name}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <CardTitle className="text-base">{service.name}</CardTitle>
                  <Badge
                    variant="outline"
                    className={cn("shrink-0 gap-1", STATUS_CLASS[service.status])}
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {statusLabels[service.status]}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </MotionItem>
          );
        })}
      </MotionSection>

      <p className="mt-8 max-w-2xl text-sm text-muted-foreground">{note}</p>
    </Section>
  );
}
