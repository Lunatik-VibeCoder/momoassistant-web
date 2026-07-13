// Analytics facade: no provider is wired in yet. Every tracked interaction
// in the app calls one of these functions instead of a vendor SDK directly,
// so plugging in Vercel Analytics, PostHog, Umami, or Plausible later is a
// one-file change here rather than a sweep through every component.

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

function emit(event: string, payload?: AnalyticsPayload) {
  if (process.env.NODE_ENV !== "production") return;
  // Intentionally empty until a provider is connected.
  void event;
  void payload;
}

export function track(event: string, payload?: AnalyticsPayload) {
  emit(event, payload);
}

export function trackCTA(label: string, payload?: AnalyticsPayload) {
  emit("cta_click", { label, ...payload });
}

export function trackDownload(payload?: AnalyticsPayload) {
  emit("download_click", payload);
}

export function trackScroll(section: string) {
  emit("section_view", { section });
}

export function trackOutboundLink(href: string) {
  emit("outbound_click", { href });
}
