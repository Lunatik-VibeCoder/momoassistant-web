import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface SectionProps extends Omit<ComponentPropsWithoutRef<"section">, "className"> {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({
  children,
  className,
  containerClassName,
  ...rest
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
