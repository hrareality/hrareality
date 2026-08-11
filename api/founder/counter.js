/**
 * Live counter — kolik potvrzených Founderů už je (sdílený zdroj pro Hero progress box
 * i Sekci 10, viz zadani-landing-page.md 5.2). Cachováno přes CDN (Vercel), ne per-request
 * dotaz do Airtable, aby to nezatěžovalo API při návštěvnosti.
 */
import { countConfirmedByPackage } from "../_lib/airtable.js";
import { FOUNDER_PACKAGE_DEFINITIONS } from "../_lib/founder-packages.js";

// Milníky pro "Další milník: X Founderů" — nejsou v zadání číselně upřesněné,
// zvoleno jako rozumné kulaté hodnoty mezi validačním cílem (200) a stropem (1000).
const MILESTONES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const CAP = 1000;

function nextMilestone(count) {
  return MILESTONES.find((m) => m > count) ?? CAP;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  try {
    const counts = await Promise.all(
      FOUNDER_PACKAGE_DEFINITIONS.map((p) => countConfirmedByPackage(p.name))
    );
    const total = counts.reduce((sum, c) => sum + c, 0);

    // CDN cache na 3 minuty, mezitím stale-while-revalidate — counter nemusí být real-time.
    res.setHeader("Cache-Control", "public, s-maxage=180, stale-while-revalidate=300");
    return res.status(200).json({
      count: total,
      cap: CAP,
      nextMilestone: nextMilestone(total),
    });
  } catch (error) {
    console.error("[api/founder/counter] Chyba:", error);
    // Fallback: radši ukázat 0 než rozbít stránku, pokud Airtable zrovna nejede.
    return res.status(200).json({ count: 0, cap: CAP, nextMilestone: MILESTONES[0], degraded: true });
  }
}
