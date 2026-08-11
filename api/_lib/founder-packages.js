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
