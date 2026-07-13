import type { ComponentProps } from "react";

import { Link } from "@/i18n/navigation";
import { isRouteImplemented } from "@/lib/routes";

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
}

/**
 * The locale-aware Link (see i18n/navigation.ts) that only prefetches
 * routes that actually exist (see lib/routes.ts) — every internal
 * nav/footer/CTA link should go through this instead of `next/link` or
 * `next-intl`'s `Link` directly.
 */
export function NavLink({ href, ...props }: NavLinkProps) {
  return <Link href={href} prefetch={isRouteImplemented(href)} {...props} />;
}
