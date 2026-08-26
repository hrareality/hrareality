# Make.com scénáře — návod k ručnímu sestavení

Nemám v tomto prostředí přímý nástroj na Make.com (žádný MCP konektor), takže tohle jsou **přesné kroky k naklikání v Make.com UI** (nebo zadání pro toho, kdo přístup má). Kód (webhook endpointy) už na tyhle scénáře čeká — payloady níže odpovídají tomu, co skutečně posílají.

> **Kompletní krok-za-krokem klikací návod (vč. Scénáře 3 — nurture e-maily D+2/D+5/D+9/D+14) je v [makecom-setup-guide.md](makecom-setup-guide.md).** Tenhle dokument (`makecom-blueprints.md`) zůstává jako stručná referenční verze payloadů pro scénáře 1 a 2 — scénář 3 běží na časovač (Schedule), ne na webhook, takže sem svým charakterem nezapadá stejně a je rozepsaný jen v setup guide.

---

## Scénář č. 1 — Nová platba → Founder onboarding

**Trigger:** Webhook (Custom webhook modul v Make.com) — URL vlož do env `MAKE_WEBHOOK_URL_PAYMENT`. Volá ho `api/founder/stripe-webhook.js` **po** úspěšném zápisu do Airtable (ne přímo Stripe → Make, aby Make dostal už hotová/konzistentní data včetně Founder čísla a tokenu).

**Payload, který přijde:**
```json
{
  "founderRecordId": "rec...",
  "founderNumber": 42,
  "email": "...",
  "firstName": "...",
  "package": "Tvůrce Season 0",
  "pricePaid": 1999,
  "purchaseDate": "2026-08-10T12:00:00.000Z",
  "benefitsIhned": ["Founder Badge", "Kniha zakladatelů — zápis", "..."],
  "isUpgrade": false,
  "thankYouPageUrl": "https://hrareality.cz/founder/dekujeme?t=<jwt>",
  "orderNumber": "..."
}
```

`benefitsIhned` je už kumulativní seznam přesně pro `[DYNAMICKÝ SEZNAM BENEFITŮ DANÉHO BALÍČKU]` z potvrzovacího e-mailu — viz [email-templates.md](email-templates.md), Make.com ho jen vypíše jako odrážky.

**Moduly v scénáři:**
1. Webhook (trigger)
2. Router — pokud `isUpgrade = true`, jiná e-mailová šablona (upgrade potvrzení) než při novém nákupu (Founder Welcome)
3. Email modul — **Make.com vlastní "Email" app** (ne externí služba) → šablona "Founder Welcome" s `thankYouPageUrl` a `package`
4. Slack/Discord/e-mail modul → interní upozornění pro Tomáše/Vítka (nový Founder #<founderNumber>, balíček, částka)
5. Vytvoření úkolu k přiřazení Discord role — **doporučeno**: pokud má Make.com Discord konektor s bot tokenem k serveru, přímo zde přiřadit roli podle `Discord ID` (pokud už je známé — u nového nákupu obvykle není, doplní se až ve scénáři č. 2). Pokud bot ještě není napojen, zatím jen úkol/notifikace pro Discord moderátora.
6. (Volitelně) zápis do "Kniha zakladatelů" view — needěláme nový modul, jen filtr nad `FOUNDERS`/`Founder Wall Consent = true`.

**Chybové stavy:** pokud e-mail modul selže, Make.com má vestavěné retry — nastavit 3 pokusy s odstupem, pak error notifikaci na Vítka (fallback proces ze `zadani-landing-page.md` sekce 5.5).

---

## Scénář č. 2 — Discord formulář na děkovací stránce → přiřazení role

**Trigger:** Webhook — URL vlož do env `MAKE_WEBHOOK_URL_DISCORD_FORM`. Volá ho `api/founder/submit-discord.js` po validaci formuláře.

**Payload:**
```json
{
  "founderRecordId": "rec...",
  "discordUsername": "tomas_hrac",
  "discordId": null,
  "package": "Tvůrce Season 0",
  "founderWallChoice": "Přezdívka",
  "founderWallDisplayName": "...",
  "founderWallConsent": true
}
```

> **Poznámka:** formulář na děkovací stránce sbírá Discord **username**, ne Discord **ID** (uživatel ID nezná). Role se ale musí přiřazovat podle ID. **Ověřeno přímo v Make.com** — Discord konektor tuhle akci reálně nabízí jako **"Search Guild Members"**, žádný ruční fallback není potřeba.

**Moduly:**
1. Webhook (trigger)
2. Airtable — update záznamu `FOUNDERS` (`Discord Username`, `Founder Wall *` pole, `Discord Joined At` pokud lze ověřit)
3. Discord modul — dohledání ID podle username (viz poznámka výše) → zápis `Discord ID` zpět do Airtable
4. Discord modul — přiřazení role podle `Package` (mapování 1:1, role name = package name) + pokud balíček ≥ Tvůrce Season 0 → přidat i do `#founder-council`, pokud ≥ Zakladatel → `#founders`
5. Airtable — update `ENTITLEMENTS`: nastavit `Discord role` na `AKTIVNÍ`, `Delivered Date = now`

~~6. Email modul — E-mail 3 ("odkaz na Founder kanál")~~ — **zrušeno, klient rozhodl nepřidávat zatím** (viz konverzace). Scénář končí krokem 5. Pokud se do budoucna přidá, stránka i Discord kanál na to nejsou závislé — je to čistě navazující komunikace.

---

## Discord ID (dodáno klientem — použij přesně tyto hodnoty v Make.com Discord modulech)

| Položka | ID |
|---|---|
| Server ID | `1107912737985663047` |
| Role — Podporovatel Season 0 | `1535245343606706267` |
| Role — První hráč Season 0 | `1535245630136516618` |
| Role — Zakladatel Season 0 | `1535329009158594760` |
| Role — Tvůrce Season 0 | `1535245698612854824` |
| Role — Strážce Season 0 | `1535245724412026891` |
| Kanál `#founder-council` | `1535329744839639050` |
| Kanál `#founders` | `1500740879235678340` |
| Invite link (Founder onboarding) | `https://discord.com/invite/Qe2Zxr4bWJ` |

> ⚠️ **Rozpor k ověření:** hlavní navigace webu ([src/components/Layout.tsx](../../src/components/Layout.tsx)) i patička odkazují na jiný Discord invite (`https://discord.gg/MGnNWkcqQf`) než ten, co jsi poslal pro Founder onboarding (`.../Qe2Zxr4bWJ`). Pokud jde o stejný server, sjednoť to prosím — pokud jde o záměrně different invite (např. jiný kanál/tracking), dej vědět, ať to nechám tak. Zatím jsem nesahal na Layout.tsx, je mimo scope týhle zakázky.

## Co ještě potřebuju vědět před sestavením obou scénářů

- Jaký Discord konektor je v Make.com k dispozici a jestli podporuje "najít uživatele podle username" — pokud ne, scénář 2 krok 3 bude mít ruční mezikrok.
- Přesné znění e-mailových šablon (Founder Welcome, E-mail 2/3, upgrade potvrzení) — klient má, čeká se na dodání textu.
