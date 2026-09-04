/**
 * Znovu odeslat potvrzovací e-mail — max 3× za hodinu, server-side (ne jen
 * disabled tlačítko na frontendu). Viz docs/founder-membership/security-and-access.md.
 */
import { verifyFounderToken, signFounderToken } from "../_lib/founder-token.js";
import { getFounderById, updateFounderRecord } from "../_lib/airtable.js";
import { getImmediateEntitlements, packageNameToKey } from "../_lib/founder-packages.js";
import { sendEmail, CUSTOMER_REPLY_TO } from "../_lib/resend-client.js";
import { welcomeEmail } from "../_lib/email-templates.js";

const MAX_PER_HOUR = 3;
const WINDOW_MS = 60 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  const { token } = req.body || {};
  const payload = verifyFounderToken(token);
  if (!payload) {
    return res.status(401).json({ error: "invalid_or_expired_token" });
  }

  try {
    const founder = await getFounderById(payload.founderRecordId);
    const f = founder.fields;

    const now = Date.now();
    const windowStart = f["Email Resend Window Start"] ? new Date(f["Email Resend Window Start"]).getTime() : 0;
    const windowExpired = now - windowStart > WINDOW_MS;

    const currentCount = windowExpired ? 0 : f["Email Resend Count"] || 0;

    if (currentCount >= MAX_PER_HOUR) {
      const retryAfterMs = WINDOW_MS - (now - windowStart);
      return res.status(429).json({
        error: "rate_limited",
        retryAfterMinutes: Math.ceil(retryAfterMs / 60000),
        message: "Dosáhl jsi limitu 3 odeslání za hodinu. Zkus to prosím později.",
      });
    }

    await updateFounderRecord(founder.id, {
      "Email Resend Count": currentCount + 1,
      "Email Resend Window Start": windowExpired ? new Date(now).toISOString() : f["Email Resend Window Start"] || new Date(now).toISOString(),
    });

    // Přímo přes Resend (viz api/_lib/resend-client.js) — dřív šlo přes Make webhook,
    // to teď duplicitně dělá i api/founder/stripe-webhook.js pro Welcome e-mail.
    const packageKey = packageNameToKey(f["Package"]);
    // Pojmenováno odlišně od `token` výš (ten identifikuje tenhle request/Foundera) —
    // tohle je nový token vložený do odkazu v e-mailu, jiný účel, snadno by se pletlo.
    const thankYouToken = signFounderToken({ founderRecordId: founder.id, orderNumber: f["Order Number"] });
    const thankYouPageUrl = `${process.env.PUBLIC_SITE_URL || "https://hrareality.cz"}/zakladatel/dekujeme?t=${thankYouToken}`;

    sendEmail({
      to: f["Email"],
      replyTo: CUSTOMER_REPLY_TO,
      ...welcomeEmail({
        firstName: f["First Name"],
        packageName: f["Package"],
        priceCzk: f["Price Paid"],
        founderNumber: f["Founder Number"],
        purchaseDate: f["Purchase Date"] || new Date().toISOString(),
        benefitsIhned: packageKey ? getImmediateEntitlements(packageKey) : [],
        thankYouPageUrl,
      }),
    }).catch((err) => console.error("[resend-email] Resend odeslání selhalo:", err));

    return res.status(200).json({ success: true, remaining: MAX_PER_HOUR - (currentCount + 1) });
  } catch (error) {
    console.error("[api/founder/resend-email] Chyba:", error);
    return res.status(500).json({ error: "resend_failed" });
  }
}
