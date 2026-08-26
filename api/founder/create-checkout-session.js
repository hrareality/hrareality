/**
 * Vytvoří Stripe Checkout Session pro zvolený Founder balíček.
 * Viz docs/founder-membership/stripe-and-checkout.md.
 *
 * POST body: { packageKey: "supporter"|"first_player"|"founder_tier"|"creator"|"guardian", email: string }
 */
import { getStripeClient, getPriceIdForPackageKey } from "../_lib/stripe-client.js";
import { findFounderByEmail, countConfirmedByPackage } from "../_lib/airtable.js";
import { getPackageDefinition, packageRank, packageNameToKey, getPackageCountOffset } from "../_lib/founder-packages.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  try {
    const { packageKey, email } = req.body || {};

    if (!packageKey || typeof packageKey !== "string") {
      return res.status(400).json({ error: "Chybí platný balíček." });
    }
    if (!email || typeof email !== "string" || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: "Zadejte platnou e-mailovou adresu." });
    }

    let packageDef;
    try {
      packageDef = getPackageDefinition(packageKey);
    } catch {
      return res.status(400).json({ error: "Neznámý balíček." });
    }

    // 1. Limit check (viz airtable-schema.md — limity mimo "neomezeně")
    // + offset za Foundery mimo Airtable v tomhle balíčku (0, dokud klient nedodá
    //   rozpis — viz otazky-pro-tomase.md bod 5 a getPackageCountOffset()).
    if (packageDef.limit !== null) {
      const confirmedCount = await countConfirmedByPackage(packageDef.name);
      const offsetCount = getPackageCountOffset(packageKey);
      if (confirmedCount + offsetCount >= packageDef.limit) {
        return res.status(409).json({ error: "sold_out", message: "Tato úroveň je bohužel vyprodaná." });
      }
    }

    // 2. Upgrade check — plná cena, žádné sčítání entitlementů, nikdy downgrade/stejná úroveň
    const cleanEmail = email.trim().toLowerCase();
    const existingFounder = await findFounderByEmail(cleanEmail);

    let isUpgrade = false;
    let previousRecordId = null;

    if (existingFounder && existingFounder.fields["Payment Status"] === "Potvrzeno") {
      const existingPackageKey = packageNameToKey(existingFounder.fields["Package"]);
      if (existingPackageKey && packageRank(packageKey) <= packageRank(existingPackageKey)) {
        return res.status(409).json({
          error: "already_founder_equal_or_higher",
          message: "U tohoto e-mailu už evidujeme stejnou nebo vyšší Founder úroveň.",
        });
      }
      isUpgrade = true;
      previousRecordId = existingFounder.id;
    }

    // 3. Stripe Checkout Session
    const stripe = getStripeClient();
    const priceId = getPriceIdForPackageKey(packageKey);
    const origin = req.headers.origin || "https://hrareality.cz";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: cleanEmail,
      // Klient chce telefonní číslo povinně u každé objednávky (viz konverzace).
      // Stripe Checkout tohle pole při zapnutí vyžaduje k dokončení platby.
      phone_number_collection: { enabled: true },
      // Stripe má na nových/live účtech Managed Payments (Stripe jako merchant of record)
      // ZAPNUTÉ VÝCHOZÍ, i bez explicitního zapnutí v Dashboardu — bez tax_code na produktech
      // by to jinak tvrdě shodilo VŠECHNY live checkouty chybou "Product tax code is missing"
      // (ověřeno naživo 26. 8. 2026). Nechceme Managed Payments — je to jiná architektura
      // (Stripe/Link jako merchant of record, jiný statement descriptor, jiný refund flow),
      // se kterou náš webhook a Airtable zápis nepočítá. Explicitní opt-out přímo v kódu,
      // ne spoléhání na Dashboard nastavení, co se dá kdykoliv omylem přepnout zpátky.
      managed_payments: { enabled: false },
      metadata: {
        package_key: packageKey,
        is_upgrade: String(isUpgrade),
        previous_record_id: previousRecordId || "",
      },
      // Bezpečný token pro /zakladatel/dekujeme se generuje až webhookem po potvrzené platbě
      // (viz security-and-access.md) — do té doby stránka zobrazuje "zpracováváme platbu".
      // URL přejmenováno z /founder na /zakladatel kvůli českému SEO (26. 8. 2026).
      success_url: `${origin}/zakladatel/dekujeme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/zakladatel#balicky`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("[api/founder/create-checkout-session] Chyba:", error);
    return res.status(500).json({ error: "Při vytváření platby došlo k chybě." });
  }
}
