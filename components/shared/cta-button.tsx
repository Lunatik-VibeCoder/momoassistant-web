"use client";

import type { ComponentProps } from "react";

import { ButtonLink } from "@/components/shared/button-link";
import { track } from "@/lib/analytics";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

interface CTAButtonProps extends ComponentProps<typeof ButtonLink> {
  /** Analytics event name fired on click, e.g. "download_apk", "hero_learn_more". */
  event: string;
  eventPayload?: AnalyticsPayload;
}

/**
 * Every conversion action on the site (download, pricing, contact, etc.)
 * renders through here instead of `ButtonLink`/`Button` directly, so
 * tracking stays consistent and isn't something each page has to remember.
 */
export function CTAButton({ event, eventPayload, onClick, ...props }: CTAButtonProps) {
  return (
    <ButtonLink
      {...props}
      onClick={(nativeEvent) => {
        track(event, eventPayload);
        onClick?.(nativeEvent);
      }}
    />
  );
}
