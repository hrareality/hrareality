/**
 * Mapování Airtable FOUNDERS → Google Sheet (FOUNDERS_MASTER / FOUNDERS_DETAIL),
 * podle plánu v docs/founder-membership/google-sheets-sync.md. Sloupcové pořadí
 * níže odpovídá pořadí v tom dokumentu.
 *
 * ⚠️ PŘED prvním ostrým použitím ověř pořadí/sadu sloupců proti skutečným
 * hlavičkám sheetu (GOOGLE_SHEET_ID) — dokument dává jmenné mapování, ne
 * potvrzené číslo sloupce, takže tohle je nejlepší odhad, ne jistota.
 *
 * Bez Search modulu (Make se nepodařilo najít jeho API název, viz stejný .md):
 * appendRow() vrátí číslo nově přidaného řádku, uložíme ho do Airtable (Sheet
 * Master Row / Sheet Detail Row) a příští update jde přímo na ten řádek přes
 * updateRow(), bez hledání.
 */
import { appendRow, updateRow } from "./google-sheets-client.js";
import { packageNameToKey } from "./founder-packages.js";

const MASTER_SHEET = "FOUNDERS_MASTER";
const DETAIL_SHEET = "FOUNDERS_DETAIL";

function paymentStatusCode(status) {
  const map = { Potvrzeno: "PAID" };
  return map[status] || status || "";
}

function masterRowValues(recordId, f) {
  const now = new Date().toISOString();
  return [
    recordId,
    `${f["First Name"] || ""} ${f["Last Name"] || ""}`.trim(),
    f["Email"] || "",
    f["Founder Wall Display Name"] || "",
    f["Purchase Date"] || "",
    packageNameToKey(f["Package"]) || "",
    f["Price Paid"] || "",
    paymentStatusCode(f["Payment Status"]),
    Boolean(f["Discord ID"]),
    f["Active Founder"] || "",
    Boolean(f["Founder Wall Consent"]),
    now, // created_at — jen orientační (přepíše se při každém update), Airtable createdTime je zdroj pravdy
    now, // updated_at
  ];
}

function detailRowValues(recordId, f) {
  return [
    recordId,
    f["Discord ID"] || "",
    f["Discord Username"] || "",
    Boolean(f["Discord Joined At"]),
    f["Discord Joined At"] || "",
  ];
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
