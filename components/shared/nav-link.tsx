import Link from "next/link";
import type { ComponentProps } from "react";

import { isRouteImplemented } from "@/lib/routes";

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
}

/**
 * A Next Link that only prefetches routes that actually exist (see
 * lib/routes.ts) — every internal nav/footer/CTA link should go through
 * this instead of `next/link` directly.
 */
export function NavLink({ href, ...props }: NavLinkProps) {
  return <Link href={href} prefetch={isRouteImplemented(href)} {...props} />;
}
