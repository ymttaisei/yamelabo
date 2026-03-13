// GA4 custom event helper
// Usage: gtag('tool_calculate', { tool_name: 'unemployment-insurance' })

type GtagEvent = {
  tool_calculate: { tool_name: string };
  daikou_tab_change: { tab: string };
  tenshoku_tab_change: { tab: string };
  affiliate_click: { service_name: string };
  cta_click: { cta_type: string; cta_location: string };
};

export function sendEvent<K extends keyof GtagEvent>(
  eventName: K,
  params: GtagEvent[K]
) {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      "event",
      eventName,
      params
    );
  }
}
