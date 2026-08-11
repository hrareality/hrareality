# Stripe produkty + checkout/upgrade logika

## 1. Produkty k ručnímu založení ve Stripe Dashboardu

Všechny jednorázová platba (`one_time`, ne subscription), měna **CZK**.

| # | Product name | Price (CZK) | Interní klíč (env/metadata) | Limit |
|---|---|---|---|---|
| 1 | Podporovatel Season 0 | 149 | `supporter` | neomezeně |
| 2 | První hráč Season 0 | 499 | `first_player` | neomezeně |
| 3 | Zakladatel Season 0 | 999 | `founder_tier` | 1 000 |
| 4 | Tvůrce Season 0 | 1 999 | `creator` | 500 |
| 5 | Strážce Season 0 | 4 999 | `guardian` | 100 |

> Poznámka k názvu: veřejný název balíčku 4 je **"Tvůrce Season 0"** (potvrzeno klientem) — interní klíč `creator` je zachován jen jako stabilní programový identifikátor, nikde se nezobrazuje.

Při zakládání každého Price ve Stripe nastav **metadata** `{ package_key: "<interní klíč>" }` — checkout endpoint pak nemusí mapovat cenu na balíček přes citlivé price ID natvrdo v kódu, čte to z metadat.

Po založení pošli mi zpět 5 **Price ID** (`price_...`) → doplním do `PACKAGE_PRICE_MAP` v kódu (viz níže).

## 2. Env proměnné (Vercel + `.env.local`, nikdy do repa)

```
STRIPE_SECRET_KEY=            # restricted key: Checkout Sessions write, Payment Intents read
STRIPE_WEBHOOK_SECRET=        # z Dashboard → Webhooks → signing secret
STRIPE_PRICE_SUPPORTER=price_...
STRIPE_PRICE_FIRST_PLAYER=price_...
STRIPE_PRICE_FOUNDER_TIER=price_...
STRIPE_PRICE_CREATOR=price_...
STRIPE_PRICE_GUARDIAN=price_...

AIRTABLE_PAT=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_FOUNDERS=FOUNDERS
AIRTABLE_TABLE_ENTITLEMENTS=ENTITLEMENTS

FOUNDER_TOKEN_SECRET=         # náhodný 32+ byte string, pro podpis JWT děkovací stránky
MAKE_WEBHOOK_URL_PAYMENT=     # scénář č.1 trigger
MAKE_WEBHOOK_URL_DISCORD_FORM=  # scénář č.2 trigger
```

## 3. Checkout endpoint — `api/founder/create-checkout-session.js`

Flow (Vercel serverless function, stejný vzor jako existující `api/contact.js`):

1. Přijme `{ packageKey, email, discordUsername? }` z landing page.
2. **Limit check** — dotaz do Airtable: COUNT `FOUNDERS` kde `Package = <název>` AND `Payment Status = Potvrzeno`. Pokud `packageKey` má limit a je vyčerpaný → `409 { error: "sold_out" }`, frontend zobrazí "Tato úroveň je vyprodaná".
3. **Upgrade check** — dotaz do Airtable podle `email` (případně `discordUsername` pokud vyplněno). Pokud existuje Founder s `Payment Status = Potvrzeno`:
   - pokud nová úroveň je **nižší nebo stejná** jako současná → zablokovat, vrátit srozumitelnou chybu ("Už máš vyšší nebo stejnou úroveň Founder Membershipu.")
   - pokud vyšší → pokračovat, ale checkout session dostane metadata `{ is_upgrade: true, previous_record_id, previous_package }`. **Cena je vždy plná cena nové úrovně** — žádný dopočet rozdílu.
4. Vytvoří Stripe Checkout Session:
   - `mode: "payment"`
   - `line_items: [{ price: <price_id z packageKey>, quantity: 1 }]`
   - `customer_email: email`
   - `metadata: { package_key, is_upgrade, previous_record_id }`
   - `success_url` → `${origin}/founder/dekujeme?session_id={CHECKOUT_SESSION_ID}` (dočasný parametr, **finální bezpečný token se vygeneruje až webhookem** — viz `security-and-access.md`; do doby zpracování webhooku děkovací stránka zobrazí "zpracováváme platbu" stav)
   - `cancel_url` → zpět na `/founder#balicky`
5. Vrátí `{ url: session.url }`, frontend redirect.

## 4. Webhook endpoint — `api/founder/stripe-webhook.js`

- Ověří podpis (`STRIPE_WEBHOOK_SECRET`) — **kritické**, jinak si kdokoliv může poslat falešný "zaplaceno" event.
- Naslouchá pouze `checkout.session.completed`.
- Idempotence: před zápisem zkontrolovat, jestli `Stripe Checkout Session ID` už v `FOUNDERS` neexistuje (Stripe webhooky se mohou doručit vícekrát) → pokud ano, no-op, vrátit 200.
- Zápis do `FOUNDERS`:
  - pokud `is_upgrade` → update existujícího záznamu (nový `Package`, `Price Paid`, `Is Upgrade=true`, `Upgraded From Package`, `Upgrade Date`), **Founder Number se nemění**
  - pokud nový → vytvořit záznam, přidělit `Founder Number` = `MAX(Founder Number) + 1` napříč potvrzenými záznamy (transakčně — Airtable nemá nativní lock, řešit přes krátký retry-on-conflict, viz poznámka o race condition v `airtable-schema.md`)
- Vytvořit/doplnit řádky v `ENTITLEMENTS` podle mapovací tabulky (jen nové nároky oproti předchozí úrovni při upgradu — dedupe podle `Benefit Type` pro daného Foundera)
- Vygeneruje bezpečný token pro děkovací stránku (JWT podepsaný `FOUNDER_TOKEN_SECRET`, payload `{ founderId, exp }`, platnost např. 30 dní) a **teprve pak** volá Make.com webhook (scénář č. 1) s payloadem obsahujícím i tento token (Make.com ho vloží do potvrzovacího e-mailu jako přímý odkaz na děkovací stránku — uživatel se tak na stránku dostane i z e-mailu, ne jen z `success_url` redirectu).
- Vrací 200 rychle (Stripe timeoutuje na ~10s) — těžké kroky (e-mail, Discord úkol) nechat na Make.com, webhook jen zapisuje data a předává dál.

## 5. Co zůstává otevřené / k potvrzení

- Přesné metody detekce limitu za souběžných objednávek (poslední kus) — doporučuji při vyprodání posledních ~5 kusů zobrazit varování na landing page ("zbývá X míst"), ne řešit hard-lock jen na serveru, aby UX nepůsobil rozbitě.
