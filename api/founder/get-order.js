/**
 * Načte data objednávky pro /founder/dekujeme podle bezpečného tokenu.
 * Nikdy nepřijímá číslo objednávky přímo z URL — jen podepsaný token.
 * Viz docs/founder-membership/security-and-access.md.
 */
import { verifyFounderToken } from "../_lib/founder-token.js";
import { getFounderById } from "../_lib/airtable.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  const token = req.query.t;
  if (!token || typeof token !== "string") {
    return res.status(400).json({ error: "missing_token" });
  }

  const payload = verifyFounderToken(token);
  if (!payload) {
    // Nikdy nezobrazovat cizí/částečná data při neplatném/expirovaném tokenu.
    return res.status(401).json({ error: "invalid_or_expired_token" });
  }

  try {
    const record = await getFounderById(payload.founderRecordId);
    const f = record.fields;

    return res.status(200).json({
      firstName: f["First Name"] || "",
      package: f["Package"],
      pricePaid: f["Price Paid"],
      paymentStatus: f["Payment Status"],
      orderNumber: f["Order Number"],
      email: f["Email"],
      founderNumber: f["Founder Number"] ?? null,
      founderNumberDisplay: f["Founder Number Display"] || null,
      discordUsername: f["Discord Username"] || null,
      discordJoinedAt: f["Discord Joined At"] || null,
      isUpgrade: !!f["Is Upgrade"],
      founderWallChoice: f["Founder Wall Display Choice"] || null,
      founderWallDisplayName: f["Founder Wall Display Name"] || null,
      founderWallConsent: !!f["Founder Wall Consent"],
    });
  } catch (error) {
    console.error("[api/founder/get-order] Chyba:", error);
    // Airtable záznam chybí/nesynchronizovaný → stránka nesmí spadnout (QA edge case).
    return res.status(404).json({ error: "order_not_found" });
  }
}
