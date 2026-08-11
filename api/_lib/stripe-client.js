import Stripe from "stripe";

let stripeInstance;

/** Lazy singleton — nevytváří klienta (a tedy nevyžaduje env), dokud ho někdo skutečně nepoužije. */
export function getStripeClient() {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Chybí env proměnná STRIPE_SECRET_KEY.");
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2024-06-20",
    });
  }
  return stripeInstance;
}

/** Mapování interního package key na env proměnnou s příslušným Stripe Price ID. */
const PACKAGE_KEY_TO_PRICE_ENV = {
  supporter: "STRIPE_PRICE_SUPPORTER",
  first_player: "STRIPE_PRICE_FIRST_PLAYER",
  founder_tier: "STRIPE_PRICE_FOUNDER_TIER",
  creator: "STRIPE_PRICE_CREATOR",
  guardian: "STRIPE_PRICE_GUARDIAN",
};

export function getPriceIdForPackageKey(packageKey) {
  const envVar = PACKAGE_KEY_TO_PRICE_ENV[packageKey];
  if (!envVar) {
    throw new Error(`Neznámý packageKey: ${packageKey}`);
  }
  const priceId = process.env[envVar];
  if (!priceId) {
    throw new Error(`Chybí env proměnná ${envVar} — Stripe Price ID pro balíček "${packageKey}" ještě není nastavené.`);
  }
  return priceId;
}
