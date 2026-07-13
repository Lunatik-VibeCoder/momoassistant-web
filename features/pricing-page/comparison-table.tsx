import { Check, Minus } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Section } from "@/components/layout/section";
import { getPricingContent } from "@/content/pricing";
import type { AppLocale } from "@/i18n/routing";

function Cell({
  value,
  includedLabel,
  notIncludedLabel,
}: {
  value: string | boolean;
  includedLabel: string;
  notIncludedLabel: string;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-4 text-primary" aria-label={includedLabel} />
    ) : (
      <Minus
        className="size-4 text-muted-foreground/50"
        aria-label={notIncludedLabel}
      />
    );
  }
  return <span className="text-foreground">{value}</span>;
}

export async function ComparisonTable() {
  const locale = (await getLocale()) as AppLocale;
  const { comparison } = getPricingContent(locale);

  return (
    <Section aria-labelledby="compare-heading">
      <div className="max-w-2xl">
        <h2
          id="compare-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {comparison.heading}
        </h2>
      </div>

      <div className="mt-10 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left font-medium text-muted-foreground">
                {comparison.tableHeaders.feature}
              </th>
              <th className="p-4 text-left font-medium text-foreground">
                {comparison.tableHeaders.starter}
              </th>
              <th className="p-4 text-left font-medium text-foreground">
                {comparison.tableHeaders.business}
              </th>
              <th className="p-4 text-left font-medium text-foreground">
                {comparison.tableHeaders.enterprise}
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr
                key={row.feature}
                className="border-b border-border last:border-0"
              >
                <td className="p-4 text-muted-foreground">{row.feature}</td>
                <td className="p-4">
                  <Cell
                    value={row.starter}
                    includedLabel={comparison.includedLabel}
                    notIncludedLabel={comparison.notIncludedLabel}
                  />
                </td>
                <td className="p-4">
                  <Cell
                    value={row.business}
                    includedLabel={comparison.includedLabel}
                    notIncludedLabel={comparison.notIncludedLabel}
                  />
                </td>
                <td className="p-4">
                  <Cell
                    value={row.enterprise}
                    includedLabel={comparison.includedLabel}
                    notIncludedLabel={comparison.notIncludedLabel}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
