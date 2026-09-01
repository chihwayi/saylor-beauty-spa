"use client";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function trackWhatsAppClick(location: string, service?: string) {
  pushDataLayer({
    event: "whatsapp_click",
    location,
    service: service ?? "general",
  });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", `${location}_whatsapp_click`, { service });
    window.fbq("track", "Contact");
  }
}

export function trackGalleryImageView(index: number, alt: string) {
  pushDataLayer({ event: "gallery_image_view", index, alt });
}

export function trackSectionView(section: string) {
  pushDataLayer({ event: "section_view", section });
}

export function trackScrollDepth(percent: number) {
  pushDataLayer({ event: `scroll_${percent}_percent` });
}

/** Reads utm_source/medium/campaign from the current URL, if present. */
export function captureUtmParams(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  if (!source && !medium && !campaign) return null;

  const parts = [
    source && `src:${source}`,
    medium && `med:${medium}`,
    campaign && `camp:${campaign}`,
  ].filter(Boolean);

  pushDataLayer({
    event: "utm_capture",
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
  });

  return parts.join(" ");
}
