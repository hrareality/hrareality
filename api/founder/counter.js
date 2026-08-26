/**
 * Live counter — kolik potvrzených Founderů už je (sdílený zdroj pro Hero progress box
 * i Sekci 10, viz zadani-landing-page.md 5.2). Cachováno přes CDN (Vercel), ne per-request
 * dotaz do Airtable, aby to nezatěžovalo API při návštěvnosti.
 *
 * BASE OFFSET — ⚠️ přepisuje dřívější rozhodnutí (viz docs/founder-membership/otazky-pro-tomase.md
 * bod 5, „counter běží od nuly"). Klient nově potvrdil, že v okamžiku spuštění téhle stránky
 * už reálně existuje FOUNDER_COUNT_BASE_OFFSET Founderů mimo tento Airtable (prodáno dřív/jinou
 * cestou) — veřejně zobrazené číslo proto NENÍ jen COUNT z Airtable, ale
 * FOUNDER_COUNT_BASE_OFFSET + potvrzené záznamy v Airtable.
 *
 * Pozor: tenhle offset ovlivňuje jen CELKOVÉ zobrazované číslo (Hero + Sekce 10), NE
 * server-side limity jednotlivých balíčků v create-checkout-session.js (Zakladatel 1000 /
 * Tvůrce 500 / Strážce 100 se pořád počítají čistě z Airtable). Pokud je některý z těch
 * offsetových Founderů v limitovaném balíčku, limity je potřeba ručně snížit o odpovídající
 * počet — zatím neřešeno, viz otázka pro klienta.
 */
import { countConfirmedByPackage } from "../_lib/airtable.js";
import { FOUNDER_PACKAGE_DEFINITIONS, getFounderCountBaseOffset } from "../_lib/founder-packages.js";

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
    const total = getFounderCountBaseOffset() + counts.reduce((sum, c) => sum + c, 0);

    // CDN cache na 3 minuty, mezitím stale-while-revalidate — counter nemusí být real-time.
    res.setHeader("Cache-Control", "public, s-maxage=180, stale-while-revalidate=300");
    return res.status(200).json({
      count: total,
      cap: CAP,
      nextMilestone: nextMilestone(total),
    });
  } catch (error) {
    console.error("[api/founder/counter] Chyba:", error);
    // Fallback: i při výpadku Airtable radši ukázat aspoň potvrzený základ (offset) než 0.
    const baseOffset = getFounderCountBaseOffset();
    return res.status(200).json({
      count: baseOffset,
      cap: CAP,
      nextMilestone: nextMilestone(baseOffset),
      degraded: true,
    });
  }
}
