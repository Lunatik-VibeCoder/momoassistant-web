import type { ComponentProps } from "react";

import { NavLink } from "@/components/shared/nav-link";
import { Button } from "@/components/ui/button";

type ButtonOwnProps = Omit<ComponentProps<typeof Button>, "render" | "nativeButton">;

interface ButtonLinkProps extends ButtonOwnProps {
  href: string;
  /** Renders a plain `<a>` instead of a Next `<Link>`, for external or placeholder targets. */
  external?: boolean;
}

/**
 * A Button styled as a link. Base UI's Button assumes it renders a native
 * `<button>` (`nativeButton` defaults to true) and warns when handed a
 * non-button `render` target, so this centralizes `nativeButton={false}`
 * for every CTA that navigates rather than performs an in-page action.
 */
export function ButtonLink({ href, external, ...props }: ButtonLinkProps) {
  return (
    <Button
      nativeButton={false}
      render={external ? <a href={href} /> : <NavLink href={href} />}
      {...props}
    />
  );
}
