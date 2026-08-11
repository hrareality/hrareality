/**
 * Přemostění mezi Stripe `success_url` (?session_id=...) a bezpečným tokenem
 * (?t=...), který vzniká asynchronně ve stripe-webhook.js. Frontend na tenhle
 * endpoint krátce pollne, dokud webhook nedoběhne — viz ThankYou.tsx.
 *
 * Stripe Checkout Session ID je vysoce entropické, Stripem generované ID
 * (ne sekvenční/uhodnutelné číslo objednávky) — jeho krátkodobý výskyt v URL
 * neporušuje pravidlo z zadani-dekovaci-stranka.md sekce 3, to platí pro
 * finální trvalý odkaz, kterým je právě až podepsaný token.
 */
import { signFounderToken } from "../_lib/founder-token.js";
import { findFounderByCheckoutSessionId } from "../_lib/airtable.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  const sessionId = req.query.session_id;
  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({ error: "missing_session_id" });
  }

  try {
    const record = await findFounderByCheckoutSessionId(sessionId);
    if (!record) {
      // Webhook ještě nedoběhl (nebo selhal) — frontend na tohle poll-uje.
      return res.status(202).json({ processing: true });
    }

    const token = signFounderToken({
      founderRecordId: record.id,
      orderNumber: record.fields["Order Number"],
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("[api/founder/resolve-session] Chyba:", error);
    return res.status(202).json({ processing: true });
  }
}
