/**
 * 10 analytických eventů pro děkovací stránku, viz zadani-dekovaci-stranka.md sekce 7.
 * Používá stejnou GA4/gtag infrastrukturu jako zbytek webu (src/lib/tracking.ts) —
 * žádný nový analytický nástroj. Pokud uživatel neudělil cookie souhlas, gtag
 * neexistuje a volání je no-op (nikdy nepadá).
 *
 * KRITICKÉ: nikdy neposílat Discord nick ani jiné osobní údaje jako parametr.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type FounderThankYouEvent =
  | "thank_you_page_view"
  | "discord_join_click"
  | "discord_username_start"
  | "discord_username_submit"
  | "discord_username_error"
  | "founder_wall_preference_submit"
  | "email_resend_click"
  | "support_click"
  | "order_detail_open"
  | "onboarding_complete";

export interface FounderEventContext {
  package?: string;
  paymentStatus?: string;
  device?: "mobile" | "desktop";
  source?: string;
  onboardingStep?: string;
}

function getDevice(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

export function trackFounderEvent(event: FounderThankYouEvent, context: FounderEventContext = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", event, {
    package: context.package,
    payment_status: context.paymentStatus,
    device: context.device || getDevice(),
    source: context.source || "founder_thank_you",
    onboarding_step: context.onboardingStep,
  });
}
