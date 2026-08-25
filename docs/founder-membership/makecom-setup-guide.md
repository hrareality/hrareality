# Make.com — podrobný krok-za-krokem návod (Fáze C)

Tenhle dokument je pro toho, kdo bude fyzicky klikat v Make.com. Předpokládá nulovou předchozí znalost konkrétního scénáře, ale základní orientaci v Make.com UI (přihlášení, vytvoření scénáře).

Než začneš, měj otevřené vedle sebe:
- [makecom-blueprints.md](makecom-blueprints.md) — přesné payloady a mapování
- [email-templates.md](email-templates.md) — text potvrzovacího e-mailu
- Tenhle soubor s ID: Discord Server `1107912737985663047`, role a kanály (viz krok 0.3)

> **Stav (aktualizováno):**
> - **Scénář 1:** webhook + 2 prázdné Email moduly. Čeká na Gmail připojení + vyplnění textu.
> - **Scénář 2: STRUKTURÁLNĚ HOTOVO.** Celý řetězec Webhook → Search Guild Members → Airtable Update Record → Router (5 větví) → Set variable → Add a Role to a Guild Member → **Airtable Search + Update ENTITLEMENTS** existuje ve všech 5 větvích a je otestovaný naostro (reálná testovací platba prošla celým Airtable zápisem, Status se správně změnil na AKTIVNÍ). **Jediné, co zbývá, je Discord OAuth připojení** — pak jen v 5× "Add a Role" modulu doplnit Guild=Hra Reality, User ID={{2.User.ID}}, Role={{odpovídající role_id z té větve}}.
>
> **Oba jsou teď záměrně VYPNUTÉ (OFF)** — až vše dokončíš, nezapomeň je přepnout zpět na **ON**.
>
> **Pokud budeš dál upravovat scénáře ručně v UI, dej mi vědět, než se do nich zase pustím přes API** — jinak riskujeme, že si navzájem přepíšeme rozdělanou práci.

---

## Krok 0 — Příprava před prvním scénářem

### 0.1 Airtable připojení v Make.com

1. V Make.com klikni na svůj profil vlevo dole → **Connections** → **Add a connection**.
2. Vyhledej **Airtable**, zvol **Airtable (API Key / Personal Access Token)** (ne OAuth, pokud nechceš řešit permission scope dialog).
3. Vlož Personal Access Token — pokud nemáš vlastní, požádej Petra o token se scope `data.records:read`, `data.records:write` na base `Collection_season0` (`app8Syl2NIgNQkcQm`).
4. Ulož, pojmenuj např. "Founders Airtable".

### 0.2 Email připojení v Make.com

1. **Connections** → **Add a connection** → vyhledej **Email**.
2. Make.com vlastní Email modul potřebuje SMTP údaje nebo připojení Gmail účtu (podle toho, co skutečně používáte na odesílání — pokud si nejste jistí, použijte Gmail účet, ze kterého má chodit "Tomáš z Hry Reality").
3. Autorizuj/ulož připojení.

### 0.3 Discord bot v Make.com — **kritický krok, často se pokazí**

1. **Connections** → **Add a connection** → vyhledej **Discord**.
2. Make.com tě provede přidáním bota na váš server — při OAuth dialogu **zaškrtni tyhle oprávnění**:
   - `bot`
   - `applications.commands` (pokud nabízeno)
   - Bot permissions: **Manage Roles**, **View Channels**, **Send Messages**
3. Vyber server **Hra Reality** (ID `1107912737985663047`) při autorizaci.
4. **DŮLEŽITÉ — hierarchie rolí:** jdi do Discord → Nastavení serveru → Role. Najdi roli bota (vytvoří se automaticky, obvykle se jmenuje podle Make.com appky). **Přetáhni roli bota úplně nahoru**, nad všech 5 Founder rolí (Podporovatel/První hráč/Zakladatel/Tvůrce/Strážce). Discord bot může přiřazovat pouze role, které jsou **níž** než jeho vlastní role v hierarchii — pokud tohle přeskočíš, přiřazení role v kroku 2.5 bude tiše selhávat bez jasné chybové hlášky.

### 0.4 Kanálová oprávnění v Discordu (ne v Make.com!)

Nemusíš v Make.com nijak řešit "přidat uživatele do kanálu" — v Discordu funguje přístup ke kanálu přes **oprávnění role**, ne přes explicitní přidání osoby. Stačí jednou nastavit:

1. V Discordu klikni pravým na kanál **#founder-council** (`1535329744839639050`) → **Upravit kanál** → **Oprávnění**.
2. Přidej roli **Tvůrce Season 0** a **Strážce Season 0** → povol **Zobrazit kanál** + **Zobrazit historii zpráv**.
3. Stejně u kanálu **#founders** (`1500740879235678340`) přidej role **Zakladatel Season 0**, **Tvůrce Season 0**, **Strážce Season 0**.
4. Jakmile Make.com přiřadí Founderovi roli (krok 2.5 níže), přístup ke kanálům se odemkne automaticky — není potřeba žádný další krok.

---

## Scénář 1 — Nová platba → Founder onboarding

**Cíl:** po zaplacení pošle náš web webhook do Make.com → Make.com pošle potvrzovací e-mail a upozorní vás interně.

### 1.1 Založení scénáře

1. Make.com → **Scenarios** → **Create a new scenario**.
2. Pojmenuj: `Founder — Nová platba`.

### 1.2 Modul 1 — Webhook (trigger)

1. Klikni na velké **+** uprostřed plátna.
2. Vyhledej **Webhooks** → zvol **Custom webhook**.
3. Klikni **Add** → pojmenuj webhook `founder-payment` → **Save**.
4. Make.com ti ukáže URL webhooku (něco jako `https://hook.eu2.make.com/xxxxxxxxxxxx`) — **zkopíruj si ji**, půjde do env `MAKE_WEBHOOK_URL_PAYMENT`.
5. Modul teď čeká na data ("Listening for data..."). **Nezavírej okno.**

### 1.3 Vygenerování testovacích dat

1. Otevři terminál (nebo požádej Petra) a pošli testovací payload na URL z kroku 1.2.4:
   ```bash
   curl -X POST "TVOJE_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{
       "founderRecordId": "rec_test123",
       "founderNumber": 1,
       "email": "test@example.com",
       "firstName": "Petr",
       "package": "Tvůrce Season 0",
       "pricePaid": 1999,
       "purchaseDate": "2026-08-10T12:00:00.000Z",
       "benefitsIhned": ["Founder Badge", "Kniha zakladatelů — zápis", "Discord role", "Poděkování (e-mail)", "Founder číslo", "Inner Circle přístup", "#founders kanál", "#founder-council přístup"],
       "isUpgrade": false,
       "thankYouPageUrl": "https://hrareality.cz/founder/dekujeme?t=test-token",
       "orderNumber": "HR-TEST-0001"
     }'
   ```
2. V Make.com by se mělo objevit "Successfully determined" — data se uložila jako vzor struktury. Klikni **OK**.

### 1.4 Modul 2 — Router (větev nový nákup / upgrade) ✅ HOTOVO

**Tenhle krok je už přidaný přes API.** Skutečné pořadí modulů ve scénáři teď je:

```
Webhook → Email (interní upozornění, sdílené) → Router
                                                   ├─ "Nový nákup" (isUpgrade=false) → Email (potvrzovací)
                                                   └─ "Upgrade" (isUpgrade=true) → Email (potvrzovací upgrade)
```

Tři prázdné Email moduly čekají na obsah — dva potvrzovací (jeden pro nový nákup, jeden pro upgrade, oba stejný text z email-templates.md dokud nemáš jinou variantu pro upgrade) a jeden interní, hned za webhookem.

### 1.5 Email moduly — potvrzovací e-mail (Founder Welcome)

1. Otevři Email modul v **kterékoliv** z těch dvou větví Routeru (obě používají stejný obsah, dokud nemáš speciální text pro upgrade).
2. Vyber připojení z kroku 0.2.
3. **To:** klikni do pole, v pravém panelu se zobrazí data z webhooku → vyber `email`.
4. **Subject:** `Jsi součástí Season 0. Vítej mezi prvními hráči. ∞`
5. **Content type:** HTML (nebo Text, podle toho, jak chcete formátovat).
6. **Content:** vlož text z [email-templates.md](email-templates.md), sekce "Potvrzovací e-mail". Kdekoliv je v textu `[JMÉNO]`, `[NÁZEV BALÍČKU]` atd., **smaž ten placeholder a místo něj klikni do pole s daty vpravo** a vyber odpovídající proměnnou:
   - `[JMÉNO]` → `firstName`
   - `[NÁZEV BALÍČKU]` → `package`
   - `[CENA]` → `pricePaid` (přidej za proměnnou ručně text " Kč")
   - `[FOUNDER ČÍSLO]` → `founderNumber`
   - `[DATUM]` → `purchaseDate`
   - `[DYNAMICKÝ SEZNAM BENEFITŮ DANÉHO BALÍČKU]` → `benefitsIhned` (Make.com pole automaticky nabídne "iterovat" — zvol formátování jako seznam s odrážkami, nebo použij funkci `join(benefitsIhned; ", ")` v textovém poli)
   - `[ODKAZ NA DISCORD]` → napiš rovnou `https://discord.com/invite/Qe2Zxr4bWJ` (statická hodnota, nemapuje se)
   - `[ODKAZ NA PROPOJENÍ / FORMULÁŘ]` → `thankYouPageUrl`
7. **Send.**

### 1.6 Interní upozornění (Tomáš/Vítek)

**Prázdný modul pro tohle už je v scénáři přidaný — hned za webhookem, před Routerem** (jediný Email modul, co NENÍ uvnitř žádné větve).

1. Otevři ten Email modul (**Send an Email**, stejné připojení jako u ostatních).
2. **To:** `hrareality@gmail.com, kosatomas123@gmail.com` (potvrzeno v Landing Page Texty-6 — "přijde na email hrareality@gmail.com a kosatomas123@gmail.com potvrzení o objednávce"; pokud má jít i na Vítka, doplň jeho adresu do stejného pole, oddělené čárkou).
3. **Subject:** `Nový Founder #{{founderNumber}} — {{package}}` (klikni do pole a slož si to z textu + proměnných).
4. **Content:** krátce — balíček, cena, e-mail, isUpgrade ano/ne.
5. **Send.**

### 1.6b Google Sheets — ZRUŠENO (25. 8. 2026)

Klient se rozhodl Google Sheets integraci (jak tuhle jednodušší "Platby" variantu, tak i FOUNDER DATA HUB od Tomáše, viz [google-sheets-sync.md](google-sheets-sync.md)) úplně zrušit kvůli opakovaným problémům s Google OAuth připojením v Make.com. **Prázdné Google Sheets moduly ve scénáři smaž** (klikni na modul → Delete) — scénář 1 tak končí u kroku 1.6 (interní e-mail) a routeru s potvrzovacími e-maily.

### 1.7 (Volitelné, pokročilé) Discord role hned při nákupu

Většinou v tuhle chvíli **Discord ID ještě neznáme** (uživatel ho propojí až na děkovací stránce — to řeší Scénář 2). Tenhle krok přeskoč, pokud neděláte speciální případ (např. upgrade člověka, který už dřív Discord propojil — pak by `discordId` mohl už být v Airtable). Pokud chceš tohle řešit, potřebuješ:
1. **+** → **Airtable** → **Search Records** v tabulce FOUNDERS, najít podle `founderRecordId`, načíst pole `Discord ID`.
2. **Router** filtr: `Discord ID` **not empty**.
3. **+** → **Discord** → **Add Role to Guild Member**, viz krok 2.5 níže pro přesné mapování role podle balíčku.

### 1.8 Test a aktivace

1. Vpravo nahoře klikni **Run once**.
2. Pošli znovu testovací curl příkaz z kroku 1.3.
3. Zkontroluj, že e-mail skutečně dorazil (na testovací adresu).
4. Pokud OK, vlevo dole přepni scénář na **ON** (aktivní).
5. **Pošli Petrovi URL webhooku z kroku 1.2.4** → doplní ji do `MAKE_WEBHOOK_URL_PAYMENT`.

---

## Scénář 2 — Discord formulář → přiřazení role

**Cíl:** po vyplnění Discord nicku na děkovací stránce Make.com dohledá Discord účet, přiřadí správnou roli a zapíše to zpět do Airtable.

### 2.1 Založení scénáře

1. **Create a new scenario** → pojmenuj `Founder — Discord přiřazení role`.

### 2.2 Modul 1 — Webhook (trigger)

1. **+** → **Webhooks** → **Custom webhook** → pojmenuj `founder-discord-form` → **Save**.
2. Zkopíruj URL — půjde do `MAKE_WEBHOOK_URL_DISCORD_FORM`.
3. Testovací payload (stejně jako u scénáře 1, curl na tuhle URL):
   ```bash
   curl -X POST "TVOJE_WEBHOOK_URL_2" \
     -H "Content-Type: application/json" \
     -d '{
       "founderRecordId": "rec_test123",
       "discordUsername": "tomas_hrac",
       "discordId": null,
       "package": "Tvůrce Season 0",
       "founderWallChoice": "Přezdívka",
       "founderWallDisplayName": "TomHrac",
       "founderWallConsent": true
     }'
   ```

### 2.3 Modul 2 — Discord: najít uživatele podle username

1. **+** → **Discord** → v sekci **"Member"** vyber **"Search Guild Members"** (ověřeno — Make.com Discord konektor tuhle akci reálně nabízí, žádný fallback přes List+Filter není potřeba).
2. Guild: vyber **Hra Reality**.
3. Query/Search: klikni do pole, vyber `discordUsername` z webhook dat.
4. Výstupem modulu je Discord **User ID** — to je `Discord ID`, které potřebujeme dál.

### 2.4 Modul 3 — Airtable: zápis Discord ID a Founder Wall polí

**Pozor na pořadí:** Router (krok 2.5) je teď v scénáři hned za "Search Guild Members" — tenhle Airtable modul vlož **mezi ně** (klikni na malé **+** přímo na spojovací čáře mezi Search Guild Members a Routerem, ne za Router). Není to sice striktně nutné (Router filtruje podle `package` z webhooku, ne z Airtable), ale logicky dává smysl nejdřív zapsat, co víme, a pak přiřazovat roli.

1. **+** (na čáře mezi Search Guild Members a Routerem) → **Airtable** → **Update a Record**.
2. Base: `Collection_season0`, Table: `FOUNDERS`.
3. Record ID: klikni do pole → vyber `founderRecordId` z webhooku.
4. Vyplň pole:
   - `Discord Username` ← `discordUsername`
   - `Discord ID` ← výstup z kroku 2.3
   - `Founder Wall Display Choice` ← `founderWallChoice`
   - `Founder Wall Display Name` ← `founderWallDisplayName`
   - `Founder Wall Consent` ← `founderWallConsent`
   - `Discord Joined At` ← aktuální datum (funkce `now`)

### 2.5 Modul 4 — Router: mapování balíček → role

**Tohle už je předpřipravené** — Router s 5 větvemi (filtr podle `package`) je v scénáři už založený i s pomocným "Set variable" modulem v každé větvi, který má předvyplněné `role_id` pro daný balíček. Otevři scénář a uvidíš je (větve odpovídají tabulce níže). Zbývá jen do **každé** větve za ten "Set variable" modul přidat:

1. **+** (za Set variable modulem v dané větvi) → **Discord** → **Add a Role to a Guild Member**.
2. Guild: **Hra Reality**. User ID: výstup z kroku 2.3 (Search Guild Members). Role: klikni do pole a vyber `role_id` z výstupu předchozího Set variable modulu (ne opisovat ručně — je tam už správně pro danou větev).

| Větev — filtr `package =` | Role ID (už vyplněné v Set variable) |
|---|---|
| `Podporovatel Season 0` | `1535245343606706267` |
| `První hráč Season 0` | `1535245630136516618` |
| `Zakladatel Season 0` | `1535329009158594760` |
| `Tvůrce Season 0` | `1535245698612854824` |
| `Strážce Season 0` | `1535245724412026891` |

**Poznámka ke kumulaci:** pokud chcete, aby Founder s balíčkem Tvůrce/Strážce dostal *víc* než jednu roli (např. i nižší role cestou), přidej za "Add Role" v dané větvi další "Add Role to Guild Member" moduly pro role nižších úrovní. Podle aktuálního nastavení kanálů (krok 0.4) to ale není nutné — jedna role stačí, protože kanálová oprávnění jsou nastavená kumulativně (Tvůrce vidí #founders i #founder-council, i když má jen jednu roli "Tvůrce").

### 2.6 Modul 5 — Airtable: update ENTITLEMENTS ✅ HOTOVO

Tenhle krok je už v každé z 5 větví přidaný a otestovaný naostro (Search Records najde řádek podle `Founder` + `Benefit Type = "Discord role"`, Update nastaví `Status = AKTIVNÍ` a `Delivered Date` na dnešní datum). Nic tu není potřeba dělat.

### 2.7 Test a aktivace

1. **Run once**, pošli testovací curl z kroku 2.2.3.
2. Zkontroluj v Discordu, že testovací účet (použij vlastní testovací Discord username) dostal správnou roli.
3. Zkontroluj v Airtable, že se zapsalo `Discord ID`, `Discord Joined At`, a `ENTITLEMENTS` řádek má `AKTIVNÍ`.
4. Přepni scénář na **ON**.
5. **Pošli Petrovi URL webhooku z kroku 2.2.2** → doplní do `MAKE_WEBHOOK_URL_DISCORD_FORM`.

---

---

## Scénář 3 — Nurture e-maily D+2/D+5/D+9/D+14 (denní scheduled)

**Cíl:** jednou denně zkontrolovat, kdo má dnes "výročí" 2/5/9/14 dní od nákupu a ještě nedostal příslušný e-mail, a poslat mu ho.

**Proč ne Sleep/Delay modul:** kdybychom nechali scénář "viset" a čekat 2/5/9/14 dní přímo v běhu, spotřebovává to Make.com operace celou dobu a při výpadku Make.com se rozběhnutá čekání ztratí. Denní scan je spolehlivější a levnější — a navíc díky sledovacím polím v Airtable (`Email D2/D5/D9/D14 Sent At`) přežije i výpadek: scénář se příští den prostě zeptá znovu a nikomu nepošle nic dvakrát.

> ✅ **Scénář je založený a strukturálně hotový přes API** (`Founder — Nurture e-maily (denní)`), včetně otestování formule naostro (reálný testovací záznam s datem nákupu přesně "před 2 dny" byl formulí správně nalezen). Nemusíš nic z kroků 3.1–3.4 a 3.6 dělat — jen otevři scénář v Make.com a zkontroluj, že to sedí, a doplň obsah e-mailů (3.5).

**Skutečná struktura (bez Routeru — je to jednodušší a funkčně stejné):**

```
Search Records D2 → Email D2 → Update (Email D2 Sent At)
Search Records D5 → Email D5 → Update (Email D5 Sent At)
Search Records D9 → Email D9 → Update (Email D9 Sent At)
Search Records D14 → Email D14 → Update (Email D14 Sent At)
```

Čtyři nezávislé řetězce za sebou (ne větve Routeru) — každý den se spustí všechny 4, každý si najde jen ty Foundery, co mají zrovna dnes výročí a ještě nedostali e-mail. Trigger je **denní časovač** (9:00), ne webhook.

**Než doplníš obsah e-mailů:** potřebuješ 2 chybějící odkazy (Founder roomka, Product Bible) — viz otevřené otázky v [email-templates.md](email-templates.md).

### 3.5 Email moduly — doplnění obsahu

V každém ze 4 Email modulů (jeden na D2, D5, D9, D14):

1. Otevři Email modul v daném řetězci.
2. Vyber Gmail připojení (stejné jako u Scénáře 1).
3. **To:** vyber `Email` z výstupu předchozího Search Records modulu v tom samém řetězci.
4. **Subject/Content:** vlož odpovídající text z [email-templates.md](email-templates.md) (D2/D5/D9/D14 podle řetězce).
5. `[JMÉNO]` → vyber `First Name` z výstupu Search Records.
6. `[ODPOVĚDĚT VE FOUNDER ROOMCE →]` / `[OTEVŘÍT PRODUCT BIBLE →]` / `[VSTOUPIT DO FOUNDER ROOMKY →]` → doplň finální odkazy, jakmile dorazí.

**Update moduly (krok 3.6) jsou už hotové a otestované** — nastavují `Email D2/D5/D9/D14 Sent At` na aktuální čas, aby se zítra stejný Founder nenašel znovu.

### 3.7 Test a aktivace

1. Kvůli formuli `IS_SAME(..., TODAY())` je těžké otestovat naostro bez skutečného záznamu s Purchase Date přesně před 2/5/9/14 dny. Doporučený postup:
   - V Airtable dočasně uprav `Purchase Date` u jednoho testovacího záznamu na "dnes minus 2 dny".
   - **Run once** ve větvi D2 → zkontroluj, že se najde a e-mail dorazí.
   - Po testu vrať `Purchase Date` zpět (nebo smaž testovací záznam).
2. Přepni scénář na **ON** — poběží samo každý den, není potřeba žádná URL do env (na rozdíl od scénářů 1 a 2, tenhle nikdo netriggeruje zvenku).

---

## Až budou hotové

Pošli webhook URL **ze scénáře 1 a 2** zpět do chatu — doplním je do Vercel env proměnných (`MAKE_WEBHOOK_URL_PAYMENT`, `MAKE_WEBHOOK_URL_DISCORD_FORM`) a uděláme společně finální test naostro: skutečná testovací platba přes Stripe (test mode) → sleduj, jestli doběhne celý řetězec až po přiřazenou Discord roli.

**Scénář 3 žádnou URL nepotřebuje** — spouští se sám podle časovače (Schedule modul), nic ho netriggeruje z našeho webu. Stačí ho jen zapnout (ON) a nechat běžet. Jediné, co mi pošli, jsou 2 chybějící odkazy (Founder roomka, Product Bible) z [email-templates.md](email-templates.md), ať doplním finální texty místo placeholderů.

## Časté problémy (troubleshooting)

- **E-mail nedorazil:** zkontroluj Make.com "History" záložku scénáře — uvidíš, jestli modul Email vůbec proběhl a jakou chybu vrátil (často: špatně nastavené SMTP připojení).
- **Role se nepřiřadila, žádná chyba:** skoro jistě hierarchie rolí (krok 0.3.4) — role bota musí být nad rolí, kterou přiřazuje.
- **Webhook nedostává data vůbec:** ověř, že je scénář **ON** (ne jen "Run once" naposled) — needěje se nic, pokud je scénář vypnutý a Stripe/náš web pošle event mimo test.
- **Airtable modul nenajde záznam:** zkontroluj, že `founderRecordId` opravdu odpovídá formátu Airtable record ID (začíná `rec...`).
