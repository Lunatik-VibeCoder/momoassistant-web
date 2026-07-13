import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  withWordmark?: boolean;
  className?: string;
}

// Icon mark is the untouched official asset (brand/logo-usage.md.txt: never
// stretch/rotate/recolor/crop/change proportions) at its brand-minimum size;
// only the adjacent wordmark is set in HTML type so it stays crisp and
// screen-reader-friendly at header scale.
export function Logo({ withWordmark = true, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/logos/icon-mark.png"
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="shrink-0 rounded-lg"
        priority
      />
      {withWordmark && (
        <span className="text-sm font-semibold tracking-tight">
          <span className="text-primary">MoMo</span>{" "}
          <span className="text-foreground">Assistant</span>
        </span>
      )}
    </span>
  );
}
