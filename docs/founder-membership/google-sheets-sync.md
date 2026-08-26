# Google Sheets sync — FOUNDER DATA HUB (od Tomáše) — ZRUŠENO

> **Stav: klient se rozhodl Google Sheets integraci zcela zrušit (25. 8. 2026).** Důvod: opakované problémy s Google OAuth připojením v Make.com ("failed to extend permission" při rozšiřování scope existujícího spojení) a časová náročnost bez jistoty rychlého vyřešení. **Airtable zůstává jediný zdroj pravdy** i pro tým — nikdo nebude muset nic ručně přepisovat do Sheetu.
>
> **Praktický dopad:** oba prázdné `Google Sheets → Add a Row` moduly ve Scénáři 1 (na konci obou větví routeru) je potřeba **smazat** (klikni na modul → pravým tlačítkem nebo ikona koše → Delete), ať scénář nezůstává s nedokončenými/nevalidními moduly. Pole `Sheet Master Row` / `Sheet Detail Row` v Airtable `FOUNDERS` mohou zůstat beze změny (nevyužitá, nevadí) nebo se dají smazat — není to nutné.
>
> Zbytek dokumentu níže je ponechaný jen jako historický záznam navrženého řešení, kdyby se k tomu klient v budoucnu vrátil jako samostatná zakázka.

---

## Původní zadání (nerealizováno)

> **Účel:** zrcadlit vybraná data z Airtable do Google Sheetu, ať tým nemusí chodit do Airtable. **Airtable zůstává jediný zdroj pravdy** — tohle je jen pohled navíc, žádná automatizace nečte zpátky ze Sheetu do Airtable.
>
> **Potvrzený rozsah (klient, viz konverzace):** automaticky plnit jen `FOUNDERS_MASTER` / `FOUNDERS_DETAIL` a `ENTITLEMENTS`. Zbylé listy (`EVENTS`, `PHYSICAL_SETS`, `SUPPORT`, `AUDIT_LOG`, `ORDERS_RAW`, `PACKAGES`) netrackujeme automaticky — buď zůstanou prázdné, nebo je tým plní ručně. Rozšíření na tyhle listy by byla samostatná zakázka nad rámec 30 000 Kč.

Sheet: `https://docs.google.com/spreadsheets/d/1YB3fXdF8tn4Sq4JH9IdVAFUvDmXf6K1b0cmHpLJL2nk/`

## Co je hotové

Ověřil jsem přes Make.com API (bezpečně, na zahozeném testovacím scénáři) skutečné názvy modulů Google Sheets appky:

- ✅ `google-sheets:ActionAddRow` — existuje
- ✅ `google-sheets:ActionUpdateRow` — existuje
- ❌ Search/list varianta (potřebná pro "najít řádek podle founder_id, jinak založit nový") — nepodařilo se bezpečně uhodnout po ~10 pokusech, zastavil jsem se, ať neplýtvám časem

## Architektura BEZ Search modulu (řešení, co jsem zvolil)

Interní API název pro "Search Rows" se nepodařilo zjistit (vyzkoušeno accessible ~12 variant + oficiální dokumentace Make.com potvrdila, že akce existuje, ale ne její technický slug — API introspekce Make.com tenhle detail nevystavuje veřejně). Místo dalšího hádání jsem zvolil řešení, které Search vůbec nepotřebuje:

**Princip:** Google Sheets "Add a Row" modul při úspěchu vrací **číslo nově přidaného řádku**. To číslo si hned uložíme zpátky do Airtable — a při jakékoliv další úpravě (upgrade, Discord role) už víme přesně, který řádek v Sheetu updatovat, bez nutnosti cokoliv hledat.

1. Přidal jsem 2 nová pole do Airtable `FOUNDERS`: **`Sheet Master Row`**, **`Sheet Detail Row`** (čísla).
2. Do **Scénáře 1** jsem přidal (do obou větví Routeru, za e-mailový modul) **2 prázdné `Google Sheets → Add a Row`** moduly (`ActionAddRow`, potvrzený název) — jeden pro `FOUNDERS_MASTER`, jeden pro `FOUNDERS_DETAIL`.

## Co zbývá (až bude Google připojení)

1. **Google OAuth připojení v Make.com** — stejný typ blokace jako u Gmailu (klidně stejný Google účet).
2. **Nakonfigurovat oba `Add a Row` moduly** (Spreadsheet ID viz odkaz nahoře, list `FOUNDERS_MASTER` / `FOUNDERS_DETAIL`, sloupce podle mapování níže).
3. **Zjistit název výstupního pole s číslem řádku** — po vyplnění a uložení modulu klikni do dalšího pole (nebo přidej dočasně Airtable Update modul za něj) a podívej se do panelu dat, jak se jmenuje výstup s číslem řádku (obvykle „Row number“). Napiš mi ho — přidám krok, co ho zapíše do `Sheet Master Row` / `Sheet Detail Row` v Airtable.
4. **Ve Scénáři 2** (Discord role) přidat na začátek (hned za webhook) `Airtable → Get record` na `founderRecordId`, načíst `Sheet Master Row`/`Sheet Detail Row`, a použít je přímo v `Google Sheets → Update a Row` modulech (bez Search).

## Plán mapování polí (Airtable → Sheet)

### FOUNDERS_MASTER / FOUNDERS_DETAIL ← Airtable `FOUNDERS`

| Sheet sloupec | Zdroj (Airtable pole) | Poznámka |
|---|---|---|
| `founder_id` | Airtable record ID (`rec...`) | stabilní klíč, přesně jak žádá sheet ("nikdy ne e-mail/Discord nickname") |
| `full_name` | `First Name` + `Last Name` | spojit |
| `email` | `Email` | |
| `public_name` | `Founder Wall Display Name` | |
| `season0_joined_at` | `Purchase Date` | |
| `current_package_code` | `Package` | interní klíč (supporter/first_player/...) z `PACKAGE_KEY_TO_NAME` |
| `total_paid` | `Price Paid` | |
| `payment_status` | `Payment Status` | mapovat na anglické kódy sheetu (PAID/PENDING/REFUNDED...) |
| `discord_connected` | `Discord ID` not empty | TRUE/FALSE |
| `founder_status` | `Active Founder` | |
| `discord_user_id`, `discord_username` | `Discord ID`, `Discord Username` | (FOUNDERS_DETAIL) |
| `discord_role_assigned`, `discord_role_assigned_at` | `Discord Joined At` not empty | (FOUNDERS_DETAIL) |
| `founder_name_consent` | `Founder Wall Consent` | |
| `created_at` / `updated_at` | Airtable `createdTime` / aktuální čas zápisu | |

Pole, která Airtable vůbec nemá (`company_name`, `billing_name` odlišné od e-mailu, `utm_*`, `referral_code`, `landing_variant`, `player_id`) zůstanou v Sheetu prázdná — nesbíráme to nikde v checkoutu.

### ENTITLEMENTS ← Airtable `ENTITLEMENTS`

| Sheet sloupec | Zdroj (Airtable pole) |
|---|---|
| `entitlement_id` | Airtable record ID |
| `founder_id` | `Founder` (linked record ID) |
| `entitlement_name` | `Benefit Type` |
| `entitlement_status` | `Status` — mapovat ČEKÁ NA AKTIVACI→PENDING, AKTIVNÍ→ACTIVE, DORUČENO→FULFILLED, VYUŽITO→USED, ZRUŠENO/REFUND→REVOKED |
| `granted_at` / `activated_at` | podle stavu |
| `owner` | `Owner` |

## Kdy se zapisuje

Nejpřirozenější místo je přímo v už existujících Make.com scénářích, hned vedle Airtable zápisu:

- **Scénář 1** (nová platba): za Airtable zápisem přidat `Google Sheets → Add/Update Row` do `FOUNDERS_MASTER` + `FOUNDERS_DETAIL`
- **Scénář 2** (Discord role): za Airtable update přidat `Google Sheets → Update Row` (doplnit Discord pole)

Bez potvrzené Search/lookup akce zatím nejde spolehlivě rozlišit "založit nový řádek" vs. "aktualizovat existující" — to je ten chybějící kousek z bodu výše.
