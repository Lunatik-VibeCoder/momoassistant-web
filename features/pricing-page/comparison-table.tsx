import { Check, Minus } from "lucide-react";

import { Section } from "@/components/layout/section";
import { comparisonRows } from "@/content/pricing";

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-4 text-primary" aria-label="Included" />
    ) : (
      <Minus className="size-4 text-muted-foreground/50" aria-label="Not included" />
    );
  }
  return <span className="text-foreground">{value}</span>;
}

export function ComparisonTable() {
  return (
    <Section aria-labelledby="compare-heading">
      <div className="max-w-2xl">
        <h2
          id="compare-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Compare plans
        </h2>
      </div>

      <div className="mt-10 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left font-medium text-muted-foreground">
                Feature
              </th>
              <th className="p-4 text-left font-medium text-foreground">
                Starter
              </th>
              <th className="p-4 text-left font-medium text-foreground">
                Business
              </th>
              <th className="p-4 text-left font-medium text-foreground">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr
                key={row.feature}
                className="border-b border-border last:border-0"
              >
                <td className="p-4 text-muted-foreground">{row.feature}</td>
                <td className="p-4">
                  <Cell value={row.starter} />
                </td>
                <td className="p-4">
                  <Cell value={row.business} />
                </td>
                <td className="p-4">
                  <Cell value={row.enterprise} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
