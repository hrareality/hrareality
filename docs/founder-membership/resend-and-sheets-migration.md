# Migrace e-mailů na Resend + Google Sheets sync přes Service Account (28. 8. 2026)

> **Stav: kód hotový a nasazený, čeká na založení účtů/klíčů (Tom).** Dokud
> chybí env proměnné níže, nové cesty se bezpečně přeskakují (jen warning do
> logu) — nic nespadne, checkout/platba/Airtable zápis fungují beze změny.

## Proč

Gmail modul v Make.com opakovaně padal na `[403] insufficient authentication scopes`
(viz historie v `google-sheets-sync.md` a řešení v chatu 26.–28. 8. 2026) — Make
scénář se navíc při každém selhání sám vypínal. Google Sheets sync byl kvůli
identickému typu OAuth problému už jednou 25. 8. 2026 zcela zrušený.

Řešení: přesunout obojí (transakční e-maily i Sheets zápis) **mimo Make**, přímo
z `api/founder/*.js`, s auth mechanismy, které nemají co "vypršet":
- **E-maily → Resend** (jen API klíč, žádný OAuth).
- **Google Sheets → Service Account** (JWT podepsaný privátním klíčem, žádná
  interaktivní souhlasová obrazovka, žádné scope re-authorization).

Make.com zůstává jen pro to, co skutečně potřebuje (Discord role assignment,
Scénář 2) — to s Gmailem nesouviselo.

## Co je nové v kódu

| Soubor | Účel |
|---|---|
| `api/_lib/resend-client.js` | Tenký fetch klient nad Resend API |
| `api/_lib/email-html.js` | Sdílené HTML komponenty pro šablony (obal, tlačítko, nadpis) |
| `api/_lib/email-templates.js` | Všech 5 e-mailů 1:1 podle `email-templates.md` + interní notifikace |
| `api/_lib/google-sheets-client.js` | Tenký fetch klient nad Sheets API v4, Service Account JWT auth |
| `api/_lib/founder-sheets-sync.js` | Mapování Airtable → Sheet sloupce (podle `google-sheets-sync.md`) |
| `api/cron/founder-nurture.js` | Denní cron pro D+2/D+5/D+9/D+14 (nahrazuje nedokončený Make "Scénář 3") |
| `vercel.json` | Přidán `crons` blok — denně 8:00 UTC |

Upraveno: `stripe-webhook.js` (Welcome e-mail + interní notifikace + Sheets Add Row),
`resend-email.js` (znovu-odeslání teď jde přímo přes Resend), `submit-discord.js`
(Sheets Update Row po propojení Discordu), `airtable.js` (`listConfirmedFoundersForNurture`).

## Co ještě chybí, než to půjde naostro

### 1. Resend účet
- Založit na resend.com, ověřit doménu `hrareality.cz` (pár DNS TXT/CNAME záznamů)
- Env: `RESEND_API_KEY`, `RESEND_FROM` (např. `"Tomáš z Hry Reality <tomas@hrareality.cz>"`)

### 2. Google Service Account (pro Sheets sync)
1. Google Cloud Console → nový projekt (nebo existující) → **IAM & Admin → Service Accounts → Create**
2. Vytvořit klíč (JSON) pro ten service account
3. Otevřít cílový Sheet (`https://docs.google.com/spreadsheets/d/1YB3fXdF8tn4Sq4JH9IdVAFUvDmXf6K1b0cmHpLJL2nk/`) → **Share** → nasdílet e-mailu service accountu (z JSON, pole `client_email`) jako **Editor**
4. Env: `GOOGLE_SERVICE_ACCOUNT_EMAIL` (z JSON `client_email`), `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (z JSON `private_key`, řádky jako `\n`), `GOOGLE_SHEET_ID` (`1YB3fXdF8tn4Sq4JH9IdVAFUvDmXf6K1b0cmHpLJL2nk`)
5. **Než se pustí naostro:** ověřit pořadí sloupců v `founder-sheets-sync.js` proti skutečným hlavičkám v listech `FOUNDERS_MASTER` / `FOUNDERS_DETAIL` — mapování vychází z plánu v `google-sheets-sync.md`, ne z potvrzeného číslování sloupců

### 3. Airtable — 4 nová pole v `FOUNDERS` (checkbox)
`Nurture D2 Sent`, `Nurture D5 Sent`, `Nurture D9 Sent`, `Nurture D14 Sent` —
bez nich `api/cron/founder-nurture.js` failne na `UNKNOWN_FIELD_NAME` (ověřeno
testem 28. 8. 2026, cron vrátí 500, nic neposílá, ale taky nefunguje).

(`Sheet Master Row` / `Sheet Detail Row` už podle `google-sheets-sync.md` v
Airtable existují z dřívějška — pokud byla mezitím smazaná, je potřeba znovu založit.)

### 4. Obsah
- **Product Bible** (D+5 e-mail) zatím neexistuje → env `PRODUCT_BIBLE_URL`, dokud
  není nastavené, odkaz vede na `/zakladatel` místo 404
- **Founder roomka** = `#founders` kanál (potvrzeno 28. 8. 2026) — odkaz se skládá
  automaticky z `DISCORD_SERVER_ID` + `DISCORD_CHANNEL_FOUNDERS` (oba už v env)

### 5. Vercel
- `CRON_SECRET` env (Vercel Cron ho posílá automaticky, jen musí být nastavený,
  jinak endpoint běží bez ověření — funguje, ale radši nastavit)

### 6. Úklid v Make (až Resend běží naostro)
Gmail moduly ve Scénáři 1 ("Founder — Nová platba") **je potřeba smazat/vypnout**
— jinak zákazník dostane Welcome e-mail 2× (jednou z Make, jednou z Resend), jakmile
se Gmail OAuth nakonec opraví.

## Interní notifikace — přes Sheet, ne e-mail (rozhodnuto 28. 8. 2026)

Tomáš/Vítek sledují nové platby přímo v `FOUNDERS_MASTER` Google Sheetu (viz sekce
Google Sheets sync výš) — žádný samostatný interní e-mail se neposílá. `sendInternalNotification`
/ `internalNotificationEmail` v `_lib` zůstávají hotové a otestované, jen nevolané
ze `stripe-webhook.js`, kdyby se rozhodnutí časem otočilo zpátky na e-mail.

## Známá mezera — text pro upgrade

`stripe-webhook.js` teď posílá stejný Welcome e-mail i při upgradu balíčku
(`isUpgrade === true`). Původní Make Scénář 1 měl v routeru dvě větve ("Nový nákup" /
"Upgrade"), každou s vlastním Gmail modulem — upgrade tedy měl mít vlastní text, který
ale klient nikdy nedodal (`email-templates.md` pokrývá jen Welcome + D+2/D+5/D+9/D+14).
Dokud text nedodá, jde ven Welcome i na upgrade (lepší než žádný e-mail, ale ne ideální —
zmínit Tomovi, než se poprvé prodá upgrade balíček).
