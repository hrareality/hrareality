/**
 * Bezpečný Serverless API endpoint pro zpracování kontaktů z formuláře Hry Reality.
 * Slouží jako proxy vrstva pro ochranu privátních klíčů před budoucím napojením na Discord a Make.com.
 */
export default async function handler(req, res) {
  // Povolit pouze POST požadavky
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  try {
    const { name, email, message } = req.body || {};

    // 1. Striktní validace vstupů
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Jméno nebo název firmy je povinné pole." });
    }

    if (!email || typeof email !== "string" || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: "Zadejte platnou e-mailovou adresu." });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Zpráva je povinné pole." });
    }

    // 2. Sanitizace základních XSS pokusů v polích
    const cleanName = name.replace(/<\/?[^>]+(>|$)/g, "").trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.replace(/<\/?[^>]+(>|$)/g, "").trim();

    // 3. Zde v další fázi napojíme:
    // - Odeslání zprávy na Discord Webhook (bezpečně přes process.env.DISCORD_WEBHOOK_URL)
    // - Odeslání leadu na Make.com (bezpečně přes process.env.MAKE_WEBHOOK_URL)
    
    // Logování leadu na straně serveru (bez úniku dat na klientovi)
    console.log(`[API contact] Nový lead přijat: ${cleanName} <${cleanEmail}>`);

    return res.status(200).json({ 
      success: true, 
      message: "Formulář úspěšně zpracován." 
    });
  } catch (error) {
    console.error("[API contact] Chyba serveru:", error);
    return res.status(500).json({ error: "Při zpracování na serveru došlo k chybě." });
  }
}
