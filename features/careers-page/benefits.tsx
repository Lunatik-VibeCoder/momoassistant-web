import { IconPointGrid } from "@/components/shared/icon-point-grid";
import { benefits } from "@/content/careers";

export function Benefits() {
  return (
    <IconPointGrid
      id="benefits-heading"
      heading="What working here looks like"
      items={benefits}
      className="bg-muted/40"
    />
  );
}
