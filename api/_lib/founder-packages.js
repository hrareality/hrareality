/**
 * Zrcadlí src/types/founder.ts (FOUNDER_PACKAGE_DEFINITIONS / PACKAGE_BENEFITS).
 * Držet ručně v souladu se změnami tam — API funkce (Vercel serverless) se
 * z výkonových/build důvodů nesdílí přímo s frontend TS moduly, viz
 * docs/founder-membership/stripe-and-checkout.md.
 */

export const FOUNDER_PACKAGE_DEFINITIONS = [
  { key: "supporter", name: "Podporovatel Season 0", priceCzk: 149, limit: null },
  { key: "first_player", name: "První hráč Season 0", priceCzk: 499, limit: null },
  { key: "founder_tier", name: "Zakladatel Season 0", priceCzk: 999, limit: 1000 },
  { key: "creator", name: "Tvůrce Season 0", priceCzk: 1999, limit: 500 },
  { key: "guardian", name: "Strážce Season 0", priceCzk: 4999, limit: 100 },
];

export function getPackageDefinition(packageKey) {
  const def = FOUNDER_PACKAGE_DEFINITIONS.find((p) => p.key === packageKey);
  if (!def) {
    throw new Error(`Neznámý packageKey: ${packageKey}`);
  }
  return def;
}

/** Pořadí definuje "vyšší/nižší" pro upgrade logiku. */
export function packageRank(packageKey) {
  return FOUNDER_PACKAGE_DEFINITIONS.findIndex((p) => p.key === packageKey);
}

export function packageNameToKey(packageName) {
  const def = FOUNDER_PACKAGE_DEFINITIONS.find((p) => p.name === packageName);
  return def?.key || null;
}

/**
 * Per-balíčkový offset pro limitované úrovně — kolik z 17 Founderů mimo Airtable
 * (viz FOUNDER_COUNT_BASE_OFFSET, api/founder/counter.js) patří do KTERÉHO balíčku.
 * Dokud klient nedodá rozpis (otazky-pro-tomase.md bod 5), všechny defaultují na 0 —
 * tzn. limity (Zakladatel 1000 / Tvůrce 500 / Strážce 100) se pořád počítají čistě
 * z Airtable, stejně jako dřív. Jakmile rozpis dorazí, vyplň odpovídající env
 * proměnné ve Vercelu (žádná změna kódu není potřeba).
 *
 * Součet těchto offsetů nemusí sedět na FOUNDER_COUNT_BASE_OFFSET (ten pokrývá i
 * neomezené balíčky Podporovatel/První hráč, kde na limitu nezáleží).
 */
const PACKAGE_OFFSET_ENV_MAP = {
  supporter: "FOUNDER_COUNT_OFFSET_SUPPORTER",
  first_player: "FOUNDER_COUNT_OFFSET_FIRST_PLAYER",
  founder_tier: "FOUNDER_COUNT_OFFSET_FOUNDER_TIER",
  creator: "FOUNDER_COUNT_OFFSET_CREATOR",
  guardian: "FOUNDER_COUNT_OFFSET_GUARDIAN",
};

export function getPackageCountOffset(packageKey) {
  const envName = PACKAGE_OFFSET_ENV_MAP[packageKey];
  return envName ? Number(process.env[envName] ?? 0) : 0;
}

/**
 * Celkový počet Founderů "mimo Airtable" (prodáno dřív/jinou cestou, potvrzeno
 * klientem — viz otazky-pro-tomase.md bod 5). Jediný zdroj pravdy sdílený mezi:
 *  - api/founder/counter.js — veřejně zobrazované číslo na webu (Hero + Sekce 10),
 *  - getNextFounderNumber() v _lib/airtable.js — Founder číslo přidělené dalšímu nákupu.
 * Drženo na jednom místě schválně, aby ty dvě čísla nikdy nerozjela (např. web ukazuje
 * "17 Founderů", ale další nákup by dostal #0001 místo #0018).
 */
export function getFounderCountBaseOffset() {
  return Number(process.env.FOUNDER_COUNT_BASE_OFFSET ?? 17);
}

/**
 * Nároky (Benefit Type) podle balíčku — jen ty, co jsou vlastní dané úrovni
 * (kumulace se řeší v aplikační logice, ne opakováním v tomto seznamu).
 * Viz docs/founder-membership/airtable-schema.md pro plné ihned/později mapování.
 */
export const PACKAGE_OWN_ENTITLEMENTS = {
  supporter: ["Founder Badge", "Kniha zakladatelů — zápis", "Discord role", "Poděkování (e-mail)"],
  first_player: ["Founder číslo", "Inner Circle přístup", "Přednostní vstup Season 1", "Founder Card (digitální)"],
  founder_tier: ["#founders kanál", "Premium 12 měsíců", "Founder certifikát", "Beta priorita"],
  creator: ["#founder-council přístup", "Hlasování", "Event vstupenky (2×)", "Founder Set artefaktů"],
  guardian: ["Zvýrazněný zápis v knize zakladatelů", "Zápis do komiksu", "VIP vstupenky (2×)", "Podepsaný Founder Set"],
};

/** Všechny nároky, které balíček nese včetně těch zděděných z nižších úrovní. */
export function getCumulativeEntitlements(packageKey) {
  const rank = packageRank(packageKey);
  const keys = FOUNDER_PACKAGE_DEFINITIONS.slice(0, rank + 1).map((p) => p.key);
  return keys.flatMap((k) => PACKAGE_OWN_ENTITLEMENTS[k]);
}

/**
 * Podmnožina PACKAGE_OWN_ENTITLEMENTS, která je aktivní hned (ne "později") —
 * musí zrcadlit `ihned` pole v PACKAGE_BENEFITS (src/types/founder.ts).
 * Používá se v potvrzovacím e-mailu (Founder Welcome), viz email-templates.md.
 */
export const PACKAGE_OWN_IHNED = {
  supporter: ["Founder Badge", "Kniha zakladatelů — zápis", "Discord role", "Poděkování (e-mail)"],
  first_player: ["Founder číslo", "Inner Circle přístup"],
  founder_tier: ["#founders kanál"],
  creator: ["#founder-council přístup"],
  guardian: ["Zvýrazněný zápis v knize zakladatelů", "Zápis do komiksu"],
};

/** Kumulativní "ihned" nároky napříč úrovněmi až po packageKey. */
export function getImmediateEntitlements(packageKey) {
  const rank = packageRank(packageKey);
  const keys = FOUNDER_PACKAGE_DEFINITIONS.slice(0, rank + 1).map((p) => p.key);
  return keys.flatMap((k) => PACKAGE_OWN_IHNED[k]);
}
