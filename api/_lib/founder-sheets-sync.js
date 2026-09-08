/**
 * Mapování Airtable FOUNDERS → Google Sheet (FOUNDERS_MASTER / FOUNDERS_DETAIL).
 *
 * ✅ OPRAVENO (8. 9. 2026) — původní verze počítala jen s 13/5 sloupci podle
 * plánu v google-sheets-sync.md, ale skutečný Sheet má 18/26 sloupců v úplně
 * jiném pořadí. Kód psal pozičně (index 0, 1, 2...), takže od sloupce J (MASTER)
 * / B (DETAIL) zapisoval špatná data do špatných polí — booleans a timestampy
 * končily v `mvp1_status`, `founder_status`, `fulfillment_status`, `first_name`
 * atd. Ověřeno živým čtením hlaviček přes Sheets API, ne odhadem.
 *
 * Řešení: HEADERS níže je doslovná kopie skutečného řádku 1 v obou listech.
 * `buildRow()` sestaví řádek jmenovitě (klíč → hodnota) a teprve pak ho seradí
 * podle HEADERS — pozice v poli se tak nikdy neurčuje ručním počítáním sloupců.
 * Spousta sloupců nemá v Airtable žádný odpovídající zdroj dat (billing, MVP1
 * stav, Discord role tracking, UTM…) — necháno prázdné, ne odhadnuté, dokud se
 * nepotvrdí, co tam má reálně chodit.
 *
 * Bez Search modulu (Make se nepodařilo najít jeho API název, viz
 * google-sheets-sync.md): appendRow() vrátí číslo nově přidaného řádku, uložíme
 * ho do Airtable (Sheet Master Row / Sheet Detail Row) a příští update jde
 * přímo na ten řádek přes updateRow(), bez hledání.
 */
import { appendRow, updateRow } from "./google-sheets-client.js";
import { packageNameToKey } from "./founder-packages.js";

const MASTER_SHEET = "FOUNDERS_MASTER";
const DETAIL_SHEET = "FOUNDERS_DETAIL";

// Doslovné pořadí sloupců — ověřeno živým čtením řádku 1 obou listů (8. 9. 2026).
const MASTER_HEADERS = [
  "founder_id", "full_name", "email", "public_name", "season0_joined_at",
  "current_package_code", "total_paid", "payment_status", "discord_connected",
  "mvp1_status", "premium_entitlement", "fulfillment_status", "founder_status",
  "player_id", "open_support_issue", "risk_flag", "created_at", "updated_at",
];

const DETAIL_HEADERS = [
  "founder_id", "player_id", "founder_status", "season0_joined_at", "first_name",
  "last_name", "email", "company_name", "company_id", "billing_name",
  "billing_email", "public_name", "public_quote", "publish_book_consent",
  "publish_wall_consent", "publish_credits_consent", "discord_user_id",
  "discord_username", "discord_connected", "discord_connected_at",
  "discord_role_assigned", "discord_role_assigned_at", "discord_error",
  "marketing_consent", "founder_name_consent", "utm_source",
];

/** Sestaví řádek podle jmen sloupců, ne podle pozice — chybějící klíč = "". */
function buildRow(headers, values) {
  return headers.map((key) => {
    const v = values[key];
    if (v === undefined || v === null) return "";
    if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
    return v;
  });
}

function paymentStatusCode(status) {
  const map = { Potvrzeno: "PAID" };
  return map[status] || status || "";
}

function masterRowValues(recordId, f) {
  const now = new Date().toISOString();
  return buildRow(MASTER_HEADERS, {
    founder_id: recordId,
    full_name: `${f["First Name"] || ""} ${f["Last Name"] || ""}`.trim(),
    email: f["Email"] || "",
    public_name: f["Founder Wall Display Name"] || "",
    season0_joined_at: f["Purchase Date"] || "",
    current_package_code: packageNameToKey(f["Package"]) || "",
    total_paid: f["Price Paid"] || "",
    payment_status: paymentStatusCode(f["Payment Status"]),
    discord_connected: Boolean(f["Discord ID"]),
    // mvp1_status, premium_entitlement, fulfillment_status, founder_status,
    // player_id, open_support_issue, risk_flag: žádný odpovídající Airtable
    // zdroj zatím neexistuje — necháno prázdné, dokud se nepotvrdí význam.
    created_at: now, // jen orientační (přepíše se při update), Airtable createdTime je zdroj pravdy
    updated_at: now,
  });
}

function detailRowValues(recordId, f) {
  const consent = Boolean(f["Founder Wall Consent"]);
  return buildRow(DETAIL_HEADERS, {
    founder_id: recordId,
    // player_id, founder_status: žádný odpovídající Airtable zdroj zatím.
    season0_joined_at: f["Purchase Date"] || "",
    first_name: f["First Name"] || "",
    last_name: f["Last Name"] || "",
    email: f["Email"] || "",
    // company_name/id, billing_name/email, public_quote: žádný Airtable zdroj zatím.
    public_name: f["Founder Wall Display Name"] || "",
    // Kniha zakladatelů / Founder Wall / credits sdílí v Airtable jediný souhlas
    // (Founder Wall Consent) — nejde rozlišit na 3 samostatné souhlasy dle Sheetu.
    publish_book_consent: consent,
    publish_wall_consent: consent,
    publish_credits_consent: consent,
    discord_user_id: f["Discord ID"] || "",
    discord_username: f["Discord Username"] || "",
    discord_connected: Boolean(f["Discord ID"]),
    discord_connected_at: f["Discord Joined At"] || "",
    // discord_role_assigned(_at)/discord_error: Airtable netrackuje přiřazení role
    // samostatně (to dělá Make.com Scénář 2 přímo v Discordu) — prázdné.
    // marketing_consent, utm_source: žádný Airtable zdroj zatím.
    founder_name_consent: consent,
  });
}

/** Volat hned po createFounderRecord() (nový Founder). Vrací čísla řádků k uložení
 * do Sheet Master Row / Sheet Detail Row v Airtable — nebo null, pokud Sheets sync
 * není nakonfigurovaný (viz google-sheets-client.js isConfigured()). */
export async function addFounderToSheets(recordId, fields) {
  const [master, detail] = await Promise.all([
    appendRow(MASTER_SHEET, masterRowValues(recordId, fields)),
    appendRow(DETAIL_SHEET, detailRowValues(recordId, fields)),
  ]);
  return {
    masterRow: master.rowNumber ?? null,
    detailRow: detail.rowNumber ?? null,
  };
}

/** Volat po updateFounderRecord() (Discord propojení, upgrade apod.) — potřebuje
 * Sheet Master Row / Sheet Detail Row uložené dřív přes addFounderToSheets(). */
export async function updateFounderInSheets(recordId, fields, { masterRow, detailRow }) {
  await Promise.all([
    masterRow ? updateRow(MASTER_SHEET, masterRow, masterRowValues(recordId, fields)) : null,
    detailRow ? updateRow(DETAIL_SHEET, detailRow, detailRowValues(recordId, fields)) : null,
  ]);
}
