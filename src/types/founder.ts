/**
 * Typy pro Founder Membership Season 0.
 * Zrcadlí Airtable schéma 1:1 — viz docs/founder-membership/airtable-schema.md.
 * Používá je jak /founder (landing page + checkout), tak /founder/dekujeme.
 */

export const FOUNDER_PACKAGES = [
  "Podporovatel Season 0",
  "První hráč Season 0",
  "Zakladatel Season 0",
  "Tvůrce Season 0",
  "Strážce Season 0",
] as const;

export type FounderPackage = (typeof FOUNDER_PACKAGES)[number];

/** Interní stabilní klíč balíčku — používá se v env proměnných a Stripe metadatech, nikdy na frontendu. */
export type PackageKey =
  | "supporter"
  | "first_player"
  | "founder_tier"
  | "creator"
  | "guardian";

export const PACKAGE_KEY_TO_NAME: Record<PackageKey, FounderPackage> = {
  supporter: "Podporovatel Season 0",
  first_player: "První hráč Season 0",
  founder_tier: "Zakladatel Season 0",
  creator: "Tvůrce Season 0",
  guardian: "Strážce Season 0",
};

export interface FounderPackageDefinition {
  key: PackageKey;
  name: FounderPackage;
  priceCzk: number;
  /** null = neomezeně */
  limit: number | null;
}

export const FOUNDER_PACKAGE_DEFINITIONS: FounderPackageDefinition[] = [
  { key: "supporter", name: "Podporovatel Season 0", priceCzk: 149, limit: null },
  { key: "first_player", name: "První hráč Season 0", priceCzk: 499, limit: null },
  { key: "founder_tier", name: "Zakladatel Season 0", priceCzk: 999, limit: 1000 },
  { key: "creator", name: "Tvůrce Season 0", priceCzk: 1999, limit: 500 },
  { key: "guardian", name: "Strážce Season 0", priceCzk: 4999, limit: 100 },
];

export type PaymentStatus = "Čeká na potvrzení" | "Potvrzeno" | "Selhalo" | "Vráceno";

export type FounderWallChoice =
  | "Celé jméno"
  | "Značka"
  | "Přezdívka"
  | "Iniciály"
  | "Anonymně";

/** Zrcadlí tabulku FOUNDERS. */
export interface FounderRecord {
  id: string; // Airtable record ID — nikdy neposílat na frontend, jen server-side
  founderNumber: number | null; // null dokud platba není potvrzená
  firstName: string;
  lastName: string;
  email: string;
  discordUsername: string | null;
  discordId: string | null;
  purchaseDate: string | null; // ISO
  package: FounderPackage;
  pricePaid: number;
  paymentStatus: PaymentStatus;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId: string | null;
  orderNumber: string;
  invoiceUrl: string | null;
  isUpgrade: boolean;
  upgradedFromPackage: FounderPackage | null;
  upgradeDate: string | null;
  discordJoinedAt: string | null;
  enrolledInMvp1: boolean;
  activeFounder: boolean;
  founderWallChoice: FounderWallChoice | null;
  founderWallDisplayName: string | null;
  founderWallConsent: boolean;
  emailResendCount: number;
  emailResendWindowStart: string | null;
}

export type EntitlementStatus =
  | "ČEKÁ NA AKTIVACI"
  | "AKTIVNÍ"
  | "DORUČENO"
  | "VYUŽITO"
  | "ZRUŠENO / REFUND";

export type EntitlementOwner = "Vítek" | "Tomáš" | "Kesamot" | "Discord moderátor" | "Systém (automatizace)";

export type BenefitType =
  | "Founder Badge"
  | "Kniha zakladatelů — zápis"
  | "Discord role"
  | "Poděkování (e-mail)"
  | "Founder číslo"
  | "Inner Circle přístup"
  | "Přednostní vstup Season 1"
  | "Founder Card (digitální)"
  | "#founders kanál"
  | "Premium 12 měsíců"
  | "Founder certifikát"
  | "Beta priorita"
  | "#founder-council přístup"
  | "Hlasování"
  | "Event vstupenky (2×)"
  | "Founder Set artefaktů"
  | "Zvýrazněný zápis v knize zakladatelů"
  | "Zápis do komiksu"
  | "VIP vstupenky (2×)"
  | "Podepsaný Founder Set";

export interface EntitlementRecord {
  id: string;
  founderId: string;
  benefitType: BenefitType;
  status: EntitlementStatus;
  owner: EntitlementOwner;
  dueDate: string | null;
  deliveredDate: string | null;
  deliveryProof: string | null;
  premiumActivationDeadline: string | null; // jen pro "Premium 12 měsíců"
}

/** Kdy je nárok "Ihned" vs "Později" — použito na landing page (sekce 8) i děkovací stránce (sekce 4.6). */
export type BenefitTiming = "ihned" | "později";

export interface PackageBenefitMapping {
  package: FounderPackage;
  ihned: BenefitType[];
  pozdeji: BenefitType[];
}

/** Kumulativní mapování — vyšší balíček obsahuje i nároky nižších úrovní (viz airtable-schema.md). */
export const PACKAGE_BENEFITS: PackageBenefitMapping[] = [
  {
    package: "Podporovatel Season 0",
    ihned: ["Founder Badge", "Kniha zakladatelů — zápis", "Discord role", "Poděkování (e-mail)"],
    pozdeji: [],
  },
  {
    package: "První hráč Season 0",
    ihned: ["Founder Badge", "Kniha zakladatelů — zápis", "Discord role", "Poděkování (e-mail)", "Founder číslo", "Inner Circle přístup"],
    pozdeji: ["Přednostní vstup Season 1", "Founder Card (digitální)"],
  },
  {
    package: "Zakladatel Season 0",
    ihned: ["Founder Badge", "Kniha zakladatelů — zápis", "Discord role", "Poděkování (e-mail)", "Founder číslo", "Inner Circle přístup", "#founders kanál"],
    pozdeji: ["Přednostní vstup Season 1", "Founder Card (digitální)", "Premium 12 měsíců", "Founder certifikát", "Beta priorita"],
  },
  {
    package: "Tvůrce Season 0",
    ihned: ["Founder Badge", "Kniha zakladatelů — zápis", "Discord role", "Poděkování (e-mail)", "Founder číslo", "Inner Circle přístup", "#founders kanál", "#founder-council přístup"],
    pozdeji: ["Přednostní vstup Season 1", "Founder Card (digitální)", "Premium 12 měsíců", "Founder certifikát", "Beta priorita", "Hlasování", "Event vstupenky (2×)", "Founder Set artefaktů"],
  },
  {
    package: "Strážce Season 0",
    ihned: ["Founder Badge", "Kniha zakladatelů — zápis", "Discord role", "Poděkování (e-mail)", "Founder číslo", "Inner Circle přístup", "#founders kanál", "#founder-council přístup", "Zvýrazněný zápis v knize zakladatelů", "Zápis do komiksu"],
    pozdeji: ["Přednostní vstup Season 1", "Founder Card (digitální)", "Premium 12 měsíců", "Founder certifikát", "Beta priorita", "Hlasování", "Event vstupenky (2×)", "Founder Set artefaktů", "VIP vstupenky (2×)", "Podepsaný Founder Set"],
  },
];

export function getBenefitsForPackage(pkg: FounderPackage): PackageBenefitMapping {
  const found = PACKAGE_BENEFITS.find((p) => p.package === pkg);
  if (!found) {
    throw new Error(`Neznámý Founder balíček: ${pkg}`);
  }
  return found;
}
