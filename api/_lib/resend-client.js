/**
 * Tenký klient nad Resend API (bez SDK závislosti — jen fetch, stejná konvence
 * jako api/_lib/airtable.js). Nahrazuje Gmail modul v Make.com pro transakční
 * e-maily (Founder Welcome, nurture sekvence D+2/D+5/D+9/D+14, interní notifikace) —
 * Gmail OAuth scope se v Make opakovaně rozbíjel a Google Sheets sync byl kvůli
 * stejnému typu problému už jednou zrušený (viz google-sheets-sync.md). Resend
 * potřebuje jen API klíč, žádnou OAuth souhlasovou obrazovku.
 *
 * Vyžaduje env: RESEND_API_KEY, RESEND_FROM (např. "Tomáš z Hry Reality <tomas@hrareality.cz>",
 * adresa musí být na ověřené doméně v Resend dashboardu).
 *
 * Dokud RESEND_API_KEY není nastavené, obě funkce níže jen zalogují warning a nic
 * neodešlou (stejný degradační vzor jako MAKE_WEBHOOK_URL_PAYMENT jinde v _lib) —
 * bezpečné nasadit dřív, než účet na Resend reálně vznikne.
 */

const RESEND_API_URL = "https://api.resend.com/emails";

/** Interní tým, kterému chodí kopie každé nové Founder platby — potvrzeno
 * v otazky-pro-tomase.md bod 7 (Tomáš + Vítek). Přepsatelné přes env, kdyby
 * se příjemci časem změnili. */
const DEFAULT_INTERNAL_NOTIFY_EMAILS = "hrareality@gmail.com,kosatomas123@gmail.com";

export async function sendEmail({ to, cc, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    console.warn("[resend-client] RESEND_API_KEY nebo RESEND_FROM není nastavené — e-mail se neodešle.");
    return { skipped: true };
  }

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      ...(cc ? { cc: Array.isArray(cc) ? cc : [cc] } : {}),
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend API chyba ${res.status}: ${body}`);
  }

  return res.json();
}

/** Kopie pro Tomáše/Vítka o nové Founder platbě — oddělené od zákaznického
 * e-mailu, ať jde snadno změnit příjemce/formát nezávisle na Welcome šabloně. */
export async function sendInternalNotification({ subject, html }) {
  const to = (process.env.INTERNAL_NOTIFY_EMAILS || DEFAULT_INTERNAL_NOTIFY_EMAILS)
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  if (to.length === 0) return { skipped: true };
  return sendEmail({ to, subject, html });
}
