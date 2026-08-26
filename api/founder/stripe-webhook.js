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
    const phone = session.customer_details?.phone || null;
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

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("[stripe-webhook] Chyba při zpracování platby:", error);
    // 500 → Stripe to zopakuje podle svého retry plánu; ruční fallback proces
    // (zadani-landing-page.md sekce 5.5) je záchranná síť, pokud by selhávalo opakovaně.
    return res.status(500).json({ error: "Zpracování platby selhalo." });
  }
}
