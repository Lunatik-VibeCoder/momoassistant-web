import { IconPointGrid } from "@/components/shared/icon-point-grid";
import { values } from "@/content/about";

export function Values() {
  return (
    <IconPointGrid id="values-heading" heading="What we hold to" items={values} />
  );
}
