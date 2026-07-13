import { IconPointGrid } from "@/components/shared/icon-point-grid";
import { culture } from "@/content/careers";

export function Culture() {
  return (
    <IconPointGrid id="culture-heading" heading="How we work" items={culture} />
  );
}
