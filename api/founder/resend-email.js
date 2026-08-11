/**
 * Znovu odeslat potvrzovací e-mail — max 3× za hodinu, server-side (ne jen
 * disabled tlačítko na frontendu). Viz docs/founder-membership/security-and-access.md.
 */
import { verifyFounderToken } from "../_lib/founder-token.js";
import { getFounderById, updateFounderRecord } from "../_lib/airtable.js";

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

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL_PAYMENT;
    if (makeWebhookUrl) {
      fetch(makeWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "resend_email",
          founderRecordId: founder.id,
          email: f["Email"],
          package: f["Package"],
        }),
      }).catch((err) => console.error("[resend-email] Make.com trigger selhal:", err));
    } else {
      console.warn("[resend-email] MAKE_WEBHOOK_URL_PAYMENT není nastavené — e-mail se neodešle automaticky.");
    }

    return res.status(200).json({ success: true, remaining: MAX_PER_HOUR - (currentCount + 1) });
  } catch (error) {
    console.error("[api/founder/resend-email] Chyba:", error);
    return res.status(500).json({ error: "resend_failed" });
  }
}
