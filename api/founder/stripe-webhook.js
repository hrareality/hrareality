/**
 * Stripe webhook — jediné místo, kde vzniká potvrzený Founder záznam.
 * Viz docs/founder-membership/stripe-and-checkout.md a security-and-access.md.
 *
 * DŮLEŽITÉ: Vercel ve výchozím stavu tělo requestu parsuje jako JSON, ale Stripe
 * podpis (STRIPE_WEBHOOK_SECRET) se ověřuje nad RAW bodem — proto níže vypnuté
 * bodyParser a ruční čtení raw streamu.
 *
 * `config.api.bodyParser = false` je stejná konvence jako v Next.js, Vercel ji
 * respektuje i u standalone Node.js funkcí mimo Next — ale ověř to jako první
 * krok v QA fázi přes `vercel dev` / testovací platbu, než se na to spolehne
 * cokoliv dalšího (bez správně ověřeného podpisu je webhook otevřený falešným eventům).
 */
import { getStripeClient } from "../_lib/stripe-client.js";
import { getPackageDefinition, getCumulativeEntitlements, getImmediateEntitlements } from "../_lib/founder-packages.js";
import { signFounderToken } from "../_lib/founder-token.js";
import {
  findFounderByCheckoutSessionId,
  getFounderById,
  createFounderRecord,
  updateFounderRecord,
  createEntitlements,
  getExistingBenefitTypes,
  getNextFounderNumber,
} from "../_lib/airtable.js";
import { sendEmail } from "../_lib/resend-client.js";
import { welcomeEmail } from "../_lib/email-templates.js";
import { addFounderToSheets, updateFounderInSheets } from "../_lib/founder-sheets-sync.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function generateOrderNumber() {
  // Veřejné číslo objednávky — odlišné od Founder Number i od interního Airtable ID.
  return `HR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Metoda není povolena" });
  }

  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe-webhook] Chybí STRIPE_WEBHOOK_SECRET.");
    return res.status(500).json({ error: "Server není správně nakonfigurovaný." });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] Neplatný podpis:", err.message);
    return res.status(400).json({ error: `Webhook signature verification failed.` });
  }

  if (event.type !== "checkout.session.completed") {
    // Nasloucháme jen tomuto typu, vše ostatní potvrdíme a ignorujeme.
    return res.status(200).json({ received: true, ignored: event.type });
  }

  const session = event.data.object;

  try {
    // Idempotence — Stripe může stejný event doručit vícekrát.
    const alreadyProcessed = await findFounderByCheckoutSessionId(session.id);
    if (alreadyProcessed) {
      return res.status(200).json({ received: true, alreadyProcessed: true });
    }

    const packageKey = session.metadata?.package_key;
    const isUpgrade = session.metadata?.is_upgrade === "true";
    const previousRecordId = session.metadata?.previous_record_id || null;

    const packageDef = getPackageDefinition(packageKey);
    const email = session.customer_email || session.customer_details?.email;
    const customerName = session.customer_details?.name || "";
    // Primárně náš vlastní telefon z checkout formuláře (metadata.customer_phone) — validovaný
    // a povinný už v create-checkout-session.js, nezávislý na platební metodě. Stripeovo vlastní
    // customer_details.phone necháváme jen jako fallback pro jistotu (mělo by být prázdné,
    // protože phone_number_collection už tam záměrně nezapínáme, viz create-checkout-session.js).
    const phone = session.metadata?.customer_phone || session.customer_details?.phone || null;
    const [firstName, ...restName] = customerName.split(" ");

    let founderRecord;
    let existingBenefitTypes = new Set();

    if (isUpgrade && previousRecordId) {
      const previous = await getFounderById(previousRecordId);
      existingBenefitTypes = await getExistingBenefitTypes(previous);

      const updated = await updateFounderRecord(previousRecordId, {
        Package: packageDef.name,
        "Price Paid": packageDef.priceCzk,
        "Payment Status": "Potvrzeno",
        "Stripe Checkout Session ID": session.id,
        "Stripe Payment Intent ID": session.payment_intent || null,
        "Is Upgrade": true,
        "Upgraded From Package": previous.fields["Package"],
        "Upgrade Date": new Date().toISOString(),
        ...(phone ? { Phone: phone } : {}),
      });
      founderRecord = updated;
    } else {
      const founderNumber = await getNextFounderNumber();
      const orderNumber = generateOrderNumber();

      founderRecord = await createFounderRecord({
        "Founder Number": founderNumber,
        "First Name": firstName || "",
        "Last Name": restName.join(" ") || "",
        Email: email,
        Phone: phone || "",
        "Purchase Date": new Date().toISOString(),
        Package: packageDef.name,
        "Price Paid": packageDef.priceCzk,
        "Payment Status": "Potvrzeno",
        "Stripe Checkout Session ID": session.id,
        "Stripe Payment Intent ID": session.payment_intent || null,
        "Order Number": orderNumber,
        "Is Upgrade": false,
        "Founder Wall Consent": false,
      });
    }

    // Zápis nových nároků — jen ty, co Founder ještě nemá (dedupe při upgradu).
    const cumulativeBenefits = getCumulativeEntitlements(packageKey);
    const newBenefits = cumulativeBenefits.filter((b) => !existingBenefitTypes.has(b));
    if (newBenefits.length > 0) {
      await createEntitlements(
        founderRecord.id,
        newBenefits.map((benefitType) => ({ benefitType }))
      );
    }

    // Google Sheets zrcadlo (viz founder-sheets-sync.js) — přímo přes Service Account,
    // ne přes Make. Nesmí shodit zbytek webhooku, kdyby sync selhal (např. env
    // proměnné ještě nejsou nastavené) — proto vlastní try/catch, jen zalogováno.
    try {
      if (isUpgrade && previousRecordId) {
        await updateFounderInSheets(founderRecord.id, founderRecord.fields, {
          masterRow: founderRecord.fields["Sheet Master Row"],
          detailRow: founderRecord.fields["Sheet Detail Row"],
        });
      } else {
        const { masterRow, detailRow } = await addFounderToSheets(founderRecord.id, founderRecord.fields);
        if (masterRow || detailRow) {
          await updateFounderRecord(founderRecord.id, {
            ...(masterRow ? { "Sheet Master Row": masterRow } : {}),
            ...(detailRow ? { "Sheet Detail Row": detailRow } : {}),
          });
        }
      }
    } catch (err) {
      console.error("[stripe-webhook] Google Sheets sync selhal:", err);
    }

    // Bezpečný token pro děkovací stránku — viz security-and-access.md.
    const token = signFounderToken({
      founderRecordId: founderRecord.id,
      orderNumber: founderRecord.fields["Order Number"],
    });
    // URL přejmenováno z /founder na /zakladatel kvůli českému SEO (26. 8. 2026).
    const thankYouPageUrl = `${process.env.PUBLIC_SITE_URL || "https://hrareality.cz"}/zakladatel/dekujeme?t=${token}`;

    // Předání dál na Make.com scénář č. 1 (e-mail, interní notifikace, Discord úkol).
    // Webhook musí odpovědět Stripu rychle — tohle proto neblokujeme na výsledku.
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL_PAYMENT;
    if (makeWebhookUrl) {
      // benefitsIhned — pro potvrzovací e-mail (Founder Welcome), viz docs/founder-membership/email-templates.md.
      const benefitsIhned = getImmediateEntitlements(packageKey);
      fetch(makeWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          founderRecordId: founderRecord.id,
          founderNumber: founderRecord.fields["Founder Number"],
          email: founderRecord.fields["Email"],
          firstName: founderRecord.fields["First Name"],
          package: founderRecord.fields["Package"],
          pricePaid: founderRecord.fields["Price Paid"],
          purchaseDate: founderRecord.fields["Purchase Date"] || new Date().toISOString(),
          benefitsIhned,
          isUpgrade,
          thankYouPageUrl,
          orderNumber: founderRecord.fields["Order Number"],
        }),
      }).catch((err) => console.error("[stripe-webhook] Make.com trigger selhal:", err));
    } else {
      console.warn("[stripe-webhook] MAKE_WEBHOOK_URL_PAYMENT není nastavené — automatizace se nespustí, jen zápis do Airtable proběhl.");
    }

    // Přímo přes Resend, ne přes Make Gmail modul — viz resend-client.js proč.
    // Fire-and-forget stejně jako Make webhook výš, webhook nesmí čekat na odpověď Stripu.
    // POZOR: dokud běží i Make Gmail modul ve Scénáři 1, zákazník dostane e-mail 2×
    // — až Resend proběhne naostro, Gmail moduly ve scénáři je potřeba smazat/vypnout.
    //
    // ⚠️ ZNÁMÁ MEZERA: posíláme stejný Welcome text i při upgradu (isUpgrade === true).
    // Make Scénář 1 měl v routeru dvě samostatné větve ("1st Nový nákup" / "2nd Upgrade"),
    // každá se svým Gmail modulem — tzn. upgrade měl mít VLASTNÍ text, ne "Vítej v Season 0"
    // podruhé tomu, kdo už člen je. Klient ale žádný upgrade text nedodal (email-templates.md
    // pokrývá jen těch 5 emailů). Dokud nedodá, posíláme Welcome i na upgrade — lepší než
    // ticho, ale stojí za to na to Toma upozornit, než se upgrade balíček poprvé prodá.
    const benefitsIhnedForEmail = getImmediateEntitlements(packageKey);
    sendEmail({
      to: founderRecord.fields["Email"],
      ...welcomeEmail({
        firstName: founderRecord.fields["First Name"],
        packageName: founderRecord.fields["Package"],
        priceCzk: founderRecord.fields["Price Paid"],
        founderNumber: founderRecord.fields["Founder Number"],
        purchaseDate: founderRecord.fields["Purchase Date"] || new Date().toISOString(),
        benefitsIhned: benefitsIhnedForEmail,
        thankYouPageUrl,
      }),
    }).catch((err) => console.error("[stripe-webhook] Resend Welcome e-mail selhal:", err));

    // Interní upozornění pro Tomáše/Vítka záměrně NENÍ e-mail (rozhodnuto 28. 8. 2026) —
    // Google Sheets zápis pár řádků výš JE tou notifikací: Tomáš sleduje nové platby
    // přímo v FOUNDERS_MASTER, ne přes doručenou poštu. `internalNotificationEmail` /
    // `sendInternalNotification` zůstávají v _lib jako hotová, ale nepoužitá cesta,
    // kdyby se rozhodnutí časem otočilo.

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("[stripe-webhook] Chyba při zpracování platby:", error);
    // 500 → Stripe to zopakuje podle svého retry plánu; ruční fallback proces
    // (zadani-landing-page.md sekce 5.5) je záchranná síť, pokud by selhávalo opakovaně.
    return res.status(500).json({ error: "Zpracování platby selhalo." });
  }
}
