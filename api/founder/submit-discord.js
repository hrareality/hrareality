/**
 * Discord formulář na děkovací stránce — viz zadani-dekovaci-stranka.md sekce 4.5, 6 (scénář 2).
 * Vždy UPDATE existujícího Founder záznamu (podle tokenu), nikdy nový záznam —
 * takže opakované odeslání formuláře nikdy nevytvoří duplicitu (QA edge case).
 */
import { verifyFounderToken } from "../_lib/founder-token.js";
import { getFounderById, updateFounderRecord } from "../_lib/airtable.js";

const WALL_CHOICES = ["Celé jméno", "Značka", "Přezdívka", "Iniciály", "Anonymně"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  const { token, discordUsername, founderWallChoice, founderWallDisplayName, founderWallConsent } = req.body || {};

  const payload = verifyFounderToken(token);
  if (!payload) {
    return res.status(401).json({ error: "invalid_or_expired_token" });
  }

  const cleanUsername = typeof discordUsername === "string" ? discordUsername.trim() : "";
  if (!cleanUsername) {
    return res.status(400).json({ error: "missing_discord_username", message: "Discord uživatelské jméno je povinné." });
  }

  if (founderWallChoice && !WALL_CHOICES.includes(founderWallChoice)) {
    return res.status(400).json({ error: "invalid_wall_choice" });
  }

  try {
    const founder = await getFounderById(payload.founderRecordId);

    const fields = {
      "Discord Username": cleanUsername,
    };
    // Volitelná pole Knihy zakladatelů — zapsat jen pokud uživatel skutečně něco vybral,
    // souhlas se zobrazením se nikdy nepředzaškrtává (viz zadání 4.5).
    if (founderWallChoice) fields["Founder Wall Display Choice"] = founderWallChoice;
    if (founderWallDisplayName) fields["Founder Wall Display Name"] = founderWallDisplayName;
    if (typeof founderWallConsent === "boolean") fields["Founder Wall Consent"] = founderWallConsent;

    const updated = await updateFounderRecord(founder.id, fields);

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL_DISCORD_FORM;
    if (makeWebhookUrl) {
      fetch(makeWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          founderRecordId: founder.id,
          discordUsername: cleanUsername,
          discordId: null,
          package: updated.fields["Package"],
          founderWallChoice: founderWallChoice || null,
          founderWallDisplayName: founderWallDisplayName || null,
          founderWallConsent: !!founderWallConsent,
        }),
      }).catch((err) => console.error("[submit-discord] Make.com trigger selhal:", err));
    } else {
      console.warn("[submit-discord] MAKE_WEBHOOK_URL_DISCORD_FORM není nastavené — role se nepřiřadí automaticky.");
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[api/founder/submit-discord] Chyba:", error);
    return res.status(500).json({ error: "save_failed" });
  }
}
