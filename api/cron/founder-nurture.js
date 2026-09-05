/**
 * Denní nurture sekvence (D+2/D+5/D+9/D+14 po Purchase Date) — nahrazuje
 * dosud nedokončený Make.com "Scénář 3" (Founder — Nurture e-maily (denní)),
 * který visel na stejném rozbitém Gmail připojení jako Scénář 1. Spouští se
 * přes Vercel Cron (viz vercel.json), voláno GET s Authorization: Bearer CRON_SECRET
 * (Vercel to posílá samo, viz https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs).
 *
 * Používá existující Airtable pole "Email D2/D5/D9/D14 Sent At" (z dřívější přípravy
 * Make Scénáře 3, viz makecom-setup-guide.md sekce 3) — žádná nová pole se nezakládají.
 *
 * Otevřené odkazy (viz email-templates.js): Founder roomka = #founders (potvrzeno),
 * Product Bible zatím neexistuje (PRODUCT_BIBLE_URL env, fallback na /zakladatel).
 */
import { listConfirmedFoundersForNurture, updateFounderRecord } from "../_lib/airtable.js";
import { sendEmail, CUSTOMER_REPLY_TO } from "../_lib/resend-client.js";
import { nurtureD2Email, nurtureD5Email, nurtureD9Email, nurtureD14Email } from "../_lib/email-templates.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Pořadí je důležité — pokud cron nějaký den vynechá (výpadek), founder může
// mít najednou splněno víc prahů; pošleme všechny nedoručené v pořadí D2→D14,
// ne jen ten poslední, ať sekvence nezmizí celá.
const STAGES = [
  { days: 2, field: "Email D2 Sent At", buildEmail: nurtureD2Email },
  { days: 5, field: "Email D5 Sent At", buildEmail: nurtureD5Email },
  { days: 9, field: "Email D9 Sent At", buildEmail: nurtureD9Email },
  { days: 14, field: "Email D14 Sent At", buildEmail: nurtureD14Email },
];

function daysSince(isoDate) {
  if (!isoDate) return -1;
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / MS_PER_DAY);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  // Vercel Cron posílá tenhle header samo na produkci (CRON_SECRET se nastaví ve Vercelu) —
  // mimo Vercel Cron kontext (ruční test, jiný scheduler) se dá vynechat nastavením env.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const founders = await listConfirmedFoundersForNurture();
    let sentCount = 0;
    const errors = [];

    for (const record of founders) {
      const f = record.fields;
      const age = daysSince(f["Purchase Date"]);
      if (age < 0) continue;

      for (const stage of STAGES) {
        if (age < stage.days) break; // dál v poli jsou jen vyšší prahy, dřív skončit
        if (f[stage.field]) continue; // tenhle stage už dostal

        try {
          const { subject, html } = stage.buildEmail({ firstName: f["First Name"] || "" });
          await sendEmail({ to: f["Email"], replyTo: CUSTOMER_REPLY_TO, subject, html });
          await updateFounderRecord(record.id, { [stage.field]: new Date().toISOString() });
          sentCount += 1;
        } catch (err) {
          console.error(`[founder-nurture] Selhalo pro ${record.id} / ${stage.field}:`, err);
          errors.push({ recordId: record.id, stage: stage.field, message: String(err) });
        }
      }
    }

    return res.status(200).json({ checked: founders.length, sent: sentCount, errors });
  } catch (error) {
    console.error("[api/cron/founder-nurture] Chyba:", error);
    return res.status(500).json({ error: "nurture_run_failed" });
  }
}
