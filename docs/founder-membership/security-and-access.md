# Bezpečný přístup na děkovací stránku + rate limiting

Zdroj požadavku: `zadani-dekovaci-stranka.md` sekce 3 — stránka nesmí být dostupná přes uhodnutelné číslo objednávky.

## Princip

- `/founder/dekujeme` se nikdy nevolá s číslem objednávky v URL v čisté podobě.
- Webhook (`api/founder/stripe-webhook.js`) po zápisu do Airtable vygeneruje **podepsaný token** (JWT, HS256, tajný klíč `FOUNDER_TOKEN_SECRET` jen server-side):
  ```
  payload: { founderRecordId, orderNumber, exp }
  platnost: 30 dní od vydání (dost na to, aby Founder mohl e-mail otevřít i později, ale expiruje)
  ```
- URL tvar: `/founder/dekujeme?t=<jwt>`
- Stránka na serveru (nebo edge funkci) token ověří:
  - podpis validní → OK
  - `exp` nevypršel → OK
  - `founderRecordId` existuje v Airtable → OK
  - cokoliv z toho selže → **nikdy nezobrazit cizí/částečná data** — zobrazit obecný stav "Odkaz už není platný. Napiš nám na HraReality@gmail.com s číslem objednávky." (číslo objednávky si Founder najde v potvrzovacím e-mailu, ne z URL)
- Token se nikdy needituje na frontendu, neediťovatelná pole formuláře (e-mail, číslo objednávky) se předvyplní ze **serverem dekódovaného** obsahu tokenu, ne z toho, co pošle klient.

## Fallback bez tokenu (edge case ze zadání sekce 8)

Pokud token chybí/expiroval a Founder na stránku dorazí jinudy (např. přeposlaný odkaz bez parametru), formulář požádá o e-mail + číslo objednávky ručně a server je ověří proti Airtable shodou — **bez tokenu se ale nikdy neediťují needitovatelná pole ani nezobrazí rekapitulace nákupu předem** (žádné číslo objednávky se needitovatelně nezobrazí, dokud shoda neproběhne).

## Rate limiting na resend e-mailu (server-side, max 3×/hod)

Implementace bez nutnosti nové infrastruktury (Redis apod.) — používáme pole přímo na `FOUNDERS` záznamu (viz `airtable-schema.md`):

- `Email Resend Count` (number)
- `Email Resend Window Start` (datetime)

Logika v `api/founder/resend-email.js`:
1. Ověřit token (stejně jako výše).
2. Načíst záznam, zkontrolovat `Email Resend Window Start`:
   - pokud starší než 1 hodina → reset `Email Resend Count = 0`, `Email Resend Window Start = now`
3. Pokud `Email Resend Count >= 3` → `429 { error: "rate_limited", retryAfterMinutes: ... }`, frontend zobrazí zablokované tlačítko s vysvětlením (ne jen `disabled` bez důvodu — musí být server-enforced i při obejití frontendu, tzn. i opakovaný přímý request na endpoint musí dostat 429).
4. Jinak: `Email Resend Count += 1`, trigger Make.com webhook pro opětovné odeslání e-mailu, `200`.

## Co NENÍ v této fázi řešeno (a proč)

- Token revoke/blacklist před expirací — není v zadání požadováno, 30denní expirace je dostatečná; pokud klient bude chtít okamžitou revokaci (např. při podezření na únik odkazu), řešení je přidat `Token Revoked` checkbox na `FOUNDERS` a kontrolovat ho při ověření — snadno doplnitelné později, nepřidávám teď navíc mimo scope.
