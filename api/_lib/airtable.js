/**
 * Tenký klient nad Airtable REST API (bez SDK závislosti — jen fetch).
 * Vyžaduje env: AIRTABLE_PAT, AIRTABLE_BASE_ID,
 * AIRTABLE_TABLE_FOUNDERS (default "FOUNDERS"), AIRTABLE_TABLE_ENTITLEMENTS (default "ENTITLEMENTS").
 *
 * Schéma polí viz docs/founder-membership/airtable-schema.md — tady se drží 1:1.
 */

import { getFounderCountBaseOffset } from "./founder-packages.js";

const AIRTABLE_API_BASE = "https://api.airtable.com/v0";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Chybí env proměnná ${name} — bez ní Airtable klient nemůže fungovat.`);
  }
  return value;
}

function tableUrl(tableName, path = "") {
  const baseId = requireEnv("AIRTABLE_BASE_ID");
  return `${AIRTABLE_API_BASE}/${baseId}/${encodeURIComponent(tableName)}${path}`;
}

async function airtableFetch(url, options = {}) {
  const pat = requireEnv("AIRTABLE_PAT");
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${pat}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Airtable API chyba ${res.status}: ${body}`);
  }

  return res.json();
}

const FOUNDERS_TABLE = () => process.env.AIRTABLE_TABLE_FOUNDERS || "FOUNDERS";
const ENTITLEMENTS_TABLE = () => process.env.AIRTABLE_TABLE_ENTITLEMENTS || "ENTITLEMENTS";

/** Najde Foundera podle e-mailu (case-insensitive). Vrací null, pokud neexistuje. */
export async function findFounderByEmail(email) {
  const formula = `LOWER({Email}) = LOWER("${email.replace(/"/g, '\\"')}")`;
  const url = tableUrl(FOUNDERS_TABLE(), `?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`);
  const data = await airtableFetch(url);
  return data.records?.[0] || null;
}

/** Najde Foundera podle Stripe Checkout Session ID — pro idempotenci webhooku. */
export async function findFounderByCheckoutSessionId(sessionId) {
  const formula = `{Stripe Checkout Session ID} = "${sessionId.replace(/"/g, '\\"')}"`;
  const url = tableUrl(FOUNDERS_TABLE(), `?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`);
  const data = await airtableFetch(url);
  return data.records?.[0] || null;
}

/** Počet potvrzených Founderů v daném balíčku — pro limit check před vytvořením checkoutu. */
export async function countConfirmedByPackage(packageName) {
  const formula = `AND({Package} = "${packageName.replace(/"/g, '\\"')}", {Payment Status} = "Potvrzeno")`;
  const url = tableUrl(FOUNDERS_TABLE(), `?filterByFormula=${encodeURIComponent(formula)}&fields[]=Email`);
  let total = 0;
  let offset;
  do {
    const pagedUrl = offset ? `${url}&offset=${offset}` : url;
    const data = await airtableFetch(pagedUrl);
    total += data.records.length;
    offset = data.offset;
  } while (offset);
  return total;
}

/**
 * Přidělí další volné Founder číslo. Airtable nemá nativní lock, takže při souběžných
 * platbách hrozí race condition — mitigace: krátký retry na conflict (viz TODO níže),
 * definitivní řešení případné kolize je součástí ručního fallback procesu
 * (zadani-landing-page.md sekce 5.5), ne blokující podmínka pro tuto fázi.
 *
 * Zohledňuje getFounderCountBaseOffset() (stejný zdroj jako veřejné počítadlo
 * v api/founder/counter.js) — dokud je Airtable prázdný/pod offsetem, další
 * číslo naváže rovnou za offset (offset 17 → další nákup = #0018), ne od 1.
 */
export async function getNextFounderNumber() {
  const formula = `{Founder Number} != ""`;
  const url = tableUrl(
    FOUNDERS_TABLE(),
    `?filterByFormula=${encodeURIComponent(formula)}&fields[]=Founder Number&sort[0][field]=Founder Number&sort[0][direction]=desc&maxRecords=1`
  );
  const data = await airtableFetch(url);
  const maxInAirtable = data.records?.[0]?.fields?.["Founder Number"] || 0;
  return Math.max(maxInAirtable, getFounderCountBaseOffset()) + 1;
}

/**
 * Všichni potvrzení Founderové s Purchase Date + nurture timestamp pole — pro
 * api/cron/founder-nurture.js. Používá "Email D2/D5/D9/D14 Sent At" — stejná
 * pole, co už v Airtable existují z dřívější přípravy Make Scénáře 3 (viz
 * makecom-setup-guide.md sekce 3), žádná nová pole se nezakládají.
 */
export async function listConfirmedFoundersForNurture() {
  const formula = `{Payment Status} = "Potvrzeno"`;
  const fields = [
    "First Name",
    "Email",
    "Purchase Date",
    "Email D2 Sent At",
    "Email D5 Sent At",
    "Email D9 Sent At",
    "Email D14 Sent At",
  ];
  const fieldsQuery = fields.map((f) => `fields[]=${encodeURIComponent(f)}`).join("&");
  const url = tableUrl(FOUNDERS_TABLE(), `?filterByFormula=${encodeURIComponent(formula)}&${fieldsQuery}`);

  const records = [];
  let offset;
  do {
    const pagedUrl = offset ? `${url}&offset=${offset}` : url;
    const data = await airtableFetch(pagedUrl);
    records.push(...data.records);
    offset = data.offset;
  } while (offset);
  return records;
}

export async function getFounderById(recordId) {
  const url = tableUrl(FOUNDERS_TABLE(), `/${recordId}`);
  return airtableFetch(url);
}

export async function createFounderRecord(fields) {
  const url = tableUrl(FOUNDERS_TABLE());
  const data = await airtableFetch(url, {
    method: "POST",
    body: JSON.stringify({ fields }),
  });
  return data;
}

export async function updateFounderRecord(recordId, fields) {
  const url = tableUrl(FOUNDERS_TABLE(), `/${recordId}`);
  return airtableFetch(url, {
    method: "PATCH",
    body: JSON.stringify({ fields }),
  });
}

export async function createEntitlements(founderRecordId, entitlements) {
  // Airtable dovolí max 10 záznamů na jeden batch create.
  const chunks = [];
  for (let i = 0; i < entitlements.length; i += 10) {
    chunks.push(entitlements.slice(i, i + 10));
  }

  const created = [];
  for (const chunk of chunks) {
    const url = tableUrl(ENTITLEMENTS_TABLE());
    const data = await airtableFetch(url, {
      method: "POST",
      body: JSON.stringify({
        records: chunk.map((e) => ({
          fields: {
            Founder: [founderRecordId],
            "Benefit Type": e.benefitType,
            Status: e.status || "ČEKÁ NA AKTIVACI",
            Owner: e.owner || "Systém (automatizace)",
          },
        })),
      }),
    });
    created.push(...data.records);
  }
  return created;
}

/**
 * Nároky, které Founder už má (podle Benefit Type) — pro dedupe při upgradu.
 *
 * Pozor: filterByFormula nejde spolehlivě použít nad linkovaným polem (Airtable ho
 * v formulích vyhodnocuje přes primary field cílové tabulky, ne přes record ID),
 * proto se místo filtrování jde přes `Entitlements` pole na samotném Founder záznamu
 * (obsahuje pole ID linkovaných ENTITLEMENTS záznamů) a ty se dotáhnou jednotlivě.
 */
export async function getExistingBenefitTypes(founderRecord) {
  const entitlementIds = founderRecord.fields?.Entitlements || [];
  if (entitlementIds.length === 0) return new Set();

  const benefitTypes = await Promise.all(
    entitlementIds.map(async (id) => {
      const url = tableUrl(ENTITLEMENTS_TABLE(), `/${id}`);
      const record = await airtableFetch(url);
      return record.fields["Benefit Type"];
    })
  );

  return new Set(benefitTypes);
}
