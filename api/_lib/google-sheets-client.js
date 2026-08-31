/**
 * Tenký klient nad Google Sheets API v4 přes Service Account (JWT-bearer flow) —
 * žádná OAuth souhlasová obrazovka, žádné Make.com. Nahrazuje dřív zrušený pokus
 * o Google Sheets sync přes Make (viz docs/founder-membership/google-sheets-sync.md —
 * zrušeno 25. 8. 2026 kvůli opakovanému "failed to extend permission" u OAuth
 * connection — přesně ten samý typ problému, co teď řešíme u Gmailu).
 *
 * Service Account nepotřebuje interaktivní souhlas: založí se v Google Cloud Console,
 * cílový Sheet se s ním "nasdílí" jako s běžným uživatelem (Editor), autentizace pak
 * jede čistě přes podepsaný JWT — nemá co "vypršet" reauth/scope problémem jako Make.
 *
 * Vyžaduje env: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 * (z JSON klíče service accountu — řádky jako '\n', ne skutečná zalomení), GOOGLE_SHEET_ID.
 * Dokud nejsou nastavené, appendRow/updateRow jen zalogují warning a nic nezapíšou
 * (stejný degradační vzor jako u ostatních _lib klientů).
 */
import jwt from "jsonwebtoken";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

// Token cache je per-instance (serverless) — v nejhorším případě se prostě znovu
// vyžádá, nic to nerozbije, jen ušetří volání navíc v rámci warm instance.
let cachedToken = null;

function isConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_SHEET_ID
  );
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 30) {
    return cachedToken.value;
  }

  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n");
  const assertion = jwt.sign(
    {
      iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    },
    privateKey,
    { algorithm: "RS256" }
  );

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google OAuth token chyba ${res.status}: ${body}`);
  }

  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: now + data.expires_in };
  return cachedToken.value;
}

async function sheetsFetch(path, options = {}) {
  const token = await getAccessToken();
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const res = await fetch(`${SHEETS_API_BASE}/${sheetId}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google Sheets API chyba ${res.status}: ${body}`);
  }

  return res.json();
}

/**
 * Přidá řádek na konec listu `sheetName`. Vrací číslo přidaného řádku (parsováno
 * z `updates.updatedRange`) — ukládá se zpátky do Airtable (Sheet Master Row /
 * Sheet Detail Row), ať pozdější update ví přesně kam zapsat bez hledání
 * (Search/lookup modul se u Make nepodařilo dohledat, viz google-sheets-sync.md).
 */
export async function appendRow(sheetName, rowValues) {
  if (!isConfigured()) {
    console.warn("[google-sheets-client] Google Sheets env proměnné nejsou nastavené — sync se přeskakuje.");
    return { skipped: true, rowNumber: null };
  }

  const data = await sheetsFetch(
    `/values/${encodeURIComponent(sheetName)}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({ values: [rowValues] }),
    }
  );

  const range = data.updates?.updatedRange || ""; // např. "FOUNDERS_MASTER!A5:M5"
  const match = range.match(/!(?:[A-Z]+)(\d+)/);
  return { rowNumber: match ? Number(match[1]) : null };
}

/** Přepíše konkrétní řádek (1-indexed, z Sheet Master Row / Sheet Detail Row). */
export async function updateRow(sheetName, rowNumber, rowValues) {
  if (!isConfigured()) {
    console.warn("[google-sheets-client] Google Sheets env proměnné nejsou nastavené — sync se přeskakuje.");
    return { skipped: true };
  }

  const range = `${sheetName}!A${rowNumber}`;
  return sheetsFetch(`/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({ values: [rowValues] }),
  });
}
