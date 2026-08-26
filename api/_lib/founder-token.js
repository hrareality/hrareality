/**
 * Podepsaný token pro bezpečný přístup na /founder/dekujeme bez uhodnutelného
 * čísla objednávky v URL. Viz docs/founder-membership/security-and-access.md.
 *
 * Vyžaduje env FOUNDER_TOKEN_SECRET (náhodný string, min. 32 znaků).
 */
import jwt from "jsonwebtoken";

const TOKEN_TTL = "30d";

function getSecret() {
  const secret = process.env.FOUNDER_TOKEN_SECRET;
  if (!secret) {
    throw new Error("Chybí env proměnná FOUNDER_TOKEN_SECRET.");
  }
  return secret;
}

/** Vytvoří token vázaný na konkrétní Founder záznam. */
export function signFounderToken({ founderRecordId, orderNumber }) {
  return jwt.sign({ founderRecordId, orderNumber }, getSecret(), {
    expiresIn: TOKEN_TTL,
  });
}

/**
 * Ověří token. Vrací dekódovaný payload, nebo null pokud je token neplatný/expirovaný.
 * Volající NIKDY nesmí zobrazit data, pokud tahle funkce vrátí null.
 */
export function verifyFounderToken(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    return null;
  }
}
