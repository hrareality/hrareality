# E-mailové šablony — od klienta (verbatim, s poznámkami)

> **Potvrzený rozsah (aktualizováno):** 5 e-mailů celkem — potvrzovací (ihned) + D+2, D+5, D+9, D+14. Founder Signal (týdenní newsletter), referral tracking a systém "5 cest" (Tester/Scout/Builder/Creator/Patron) zůstávají **mimo scope**, řeší se jako případné budoucí rozšíření.

---

## 1. Potvrzovací e-mail (Founder Welcome, ihned po platbě)

Šablona pro **Make.com Scénář č. 1** — viz [makecom-blueprints.md](makecom-blueprints.md) a [makecom-setup-guide.md](makecom-setup-guide.md).

**Odesílatel:** Tomáš z Hry Reality
**Předmět:** Jsi součástí Season 0. Vítej mezi prvními hráči. ∞
**Preheader:** Tvoje podpora je potvrzena. Tady je vše, co potřebuješ vědět.

### Mapování proměnných → payload webhooku (`api/founder/stripe-webhook.js` → Make.com)

| Proměnná v šabloně | Zdroj | Poznámka |
|---|---|---|
| `[JMÉNO]` | `firstName` | |
| `[NÁZEV BALÍČKU]` | `package` | přesný název, 1:1 se Stripe/Airtable |
| `[CENA]` | `pricePaid` | formátovat jako "999 Kč" |
| `[FOUNDER ČÍSLO]` | `founderNumber` | pokud `null`, šablona má vlastní fallback text "Founder ID právě vytváříme" |
| `[DATUM]` | `purchaseDate` | posílá webhook (doplněno) |
| `[DYNAMICKÝ SEZNAM BENEFITŮ DANÉHO BALÍČKU]` | `benefitsIhned` | posílá webhook jako pole řetězců |
| `[ODKAZ NA DISCORD]` | statická hodnota `https://discord.com/invite/Qe2Zxr4bWJ` | |
| `[ODKAZ NA PROPOJENÍ / FORMULÁŘ]` | `thankYouPageUrl` | vede na `/founder/dekujeme?t=...` |

*(Plné znění viz konverzace / commit historie — nemění se, beze změn od minula.)*

---

## 2. E-mail D+2 — "Proč vlastně Hra Reality vzniká"

**Trigger:** 2 dny po `Purchase Date`, posílá **Scénář č. 3** (denní scheduled), viz [makecom-setup-guide.md](makecom-setup-guide.md).
**Subject:** Problém není, že nevíme, co dělat.
**Preheader:** Jedna myšlenka, kvůli které jsme začali stavět Hru Reality.

**Text:**
> Ahoj [JMÉNO],
> když už jsi vstoupil/a mezi Foundery Season 0, chci ti postupně ukázat trochu víc z toho, co vlastně stavíme.
> Ne marketingovou prezentaci.
> Spíš způsob, jak nad tím přemýšlíme uvnitř týmu.
>
> iWau Hra Reality vznikla z poměrně jednoduchého pozorování:
> Nikdy jsme neměli přístup k takovému množství informací jako dnes.
> Víme, jak lépe spát.
> Jak cvičit.
> Jak pracovat se soustředěním.
> Jak se učit.
> Jak budovat vztahy.
> Jak pracovat s penězi.
> Máme podcasty, kurzy, YouTube, knihy, AI.
> Přesto existuje obrovská mezera mezi:
> VÍM a UDĚLÁM.
> A právě tahle mezera nás zajímá.
>
> Nechceme vytvořit další místo na obsah. Obsahu už máme dost.
> Chceme zkusit vytvořit něco jiného. Hru, která používá digitální svět k tomu, aby člověka dostala zpátky do skutečného života.
>
> Aplikace řekne:
> Tady je mise.
>
> Člověk telefon odloží.
> Něco skutečně udělá.
> Vrátí se.
> Zaznamená svůj krok.
> Posune se.
>
> A postupně začne svůj skutečný život vnímat trochu víc jako prostor, ve kterém může aktivně hrát a tvořit ho podle libosti.
> To je základ iWau Hry Reality.
>
> Momentálně ještě nevíme, jestli všechny naše hypotézy budou fungovat.
> A bylo by nepoctivé tvrdit opak.
>
> Právě Season 1 (MVP1) nám má odpovědět na tu nejdůležitější:
> Dokážeme vytvořit systém, ke kterému se lidé vracejí ne proto, aby konzumovali další obsah, ale protože je dostává do skutečné akce?
>
> Pokud ano, máme něco velmi zajímavého.
> Pokud ne, budeme muset změnit způsob, jakým to děláme.
>
> A právě proto jsou pro nás první hráči tak důležití.
>
> Chci po tobě dnes jednu věc.
> Polož si jednoduchou otázku
> "Kde ve svém životě přesně víš, co bys měl/a dělat — ale stejně to neděláš?"
>
> Produktivita?
> Pohyb?
> Telefon?
> Peníze?
> Vztahy?
> Něco úplně jiného?
>
> Napiš nám odpověď do Founder roomky.
> [ODPOVĚDĚT VE FOUNDER ROOMCE →]
>
> Nejde o engagement pro engagement.
> Právě podobné odpovědi nám pomáhají rozhodovat, jaké problémy má iWau Hra Reality skutečně řešit.
> Tomáš
> Founder Hry Reality ∞

**Proměnné:** `[JMÉNO]` → `firstName`. **⚠️ `[ODPOVĚDĚT VE FOUNDER ROOMCE →]` potřebuje reálný odkaz — viz otevřená otázka na konci souboru.**

---

## 3. E-mail D+5 — "Pojď se podívat pod kapotu"

**Trigger:** 5 dní po `Purchase Date`.
**Subject:** Tohle právě stavíme za dveřmi Season 0.
**Preheader:** Ukážu ti, jak má první verze iWau Hry Reality skutečně fungovat.

**Text:**
> Ahoj [JMÉNO],
> minule jsem ti psal o problému mezi:
> „vím" → „udělám".
>
> Dnes ti chci ukázat, jak se ho snažíme řešit produktem.
> Season 1 (MVP1) nebude obrovská aplikace se stovkou funkcí.
>
> Naopak.
> Potřebujeme nejdřív zjistit, jestli funguje samotné srdce Hry Reality.
> SIGNAL → ACTION → PROOF → PROGRESS → NEXT ACTION
>
> Tohle je základ.
> Hráč dostane impuls.
> Vybere si skutečnou akci.
> Telefon na chvíli přestává být cílem.
> Jde něco udělat.
> Vrátí se s proofem.
> Hra jeho krok zaznamená.
> Dostane progres, XP, artefakt nebo další část cesty.
> A pokračuje.
>
> Kolem toho postupně vzniká celý svět.
> Denní mise
> Malé kroky, které lze skutečně udělat.
>
> Questy
> Větší výzvy a experimenty.
>
> Collections
> Artefakty připomínající skutečné momenty a historii hry.
>
> Aréna hráčů
> Místo, kde se účastníš turnajů, duelů, buduješ týmy atd.
> Vrstva pro skutečné hráče.
>
> Guardians
> Lidé s odborností v jednotlivých oblastech života.
>
> Portály
> Body, kde digitální iWau Hra Reality začne fyzicky vstupovat do skutečného světa.
>
> A postupně další vrstvy.
>
> Ale tady je důležitá věc. Spousta z toho může být špatně.
> Možná XP nikoho nebudou zajímat.
> Možná zjistíme, že některé questy jsou moc dlouhé.
> Možná bude Aréna zásadní. Možná nebude.
> Možná hráči budou chtít něco, co dnes vůbec nevidíme.
>
> Proto Season 1 (MVP1) nevzniká proto, abychom dokázali, že jsme měli pravdu.
> Vzniká proto, abychom zjistili, kde jsme se spletli.
> A opravili to.
>
> Proto ti dnes otevírám naši Product Bible.
>
> Je to dokument, podle kterého přemýšlíme o tom:
> jak se Hra Reality hraje,
> jak funguje progres,
> proč používáme questy,
> co jsou Collections,
> jak fungují Guardians,
> jak propojujeme digitální a skutečný svět,
> kam může produkt dlouhodobě růst.
>
> Nemusíš ji číst celou.
> Ale pokud chceš skutečně pochopit, co jsi pomohl/a vznikem svého Founder Membershipu stavět, začni tady.
> [OTEVŘÍT PRODUCT BIBLE →]
>
> A jestli při čtení narazíš na něco, u čeho si řekneš:
> „Tohle je blbost."
>
> řekni nám to.
> To je pro nás hodnotnější než dalších deset lidí, kteří napíšou, že je všechno super.
> Tomáš
> Founder Hry Reality ∞

**Proměnné:** `[JMÉNO]` → `firstName`. **⚠️ `[OTEVŘÍT PRODUCT BIBLE →]` potřebuje reálný odkaz (Notion/Google Doc?) — viz otevřená otázka.**

---

## 4. E-mail D+9 — "Potřebujeme, abys nám řekl, kde se mýlíme"

**Trigger:** 9 dní po `Purchase Date`.
**Subject:** Teď potřebujeme něco od tebe.
**Preheader:** Founder nemá být jen jméno vedle badge.

**Text:**
> Ahoj [JMÉNO],
> mohl bych ti každý týden posílat krásné screenshoty toho, co jsme postavili.
> Ale to by byla promarněná příležitost. Protože jedna z největších výhod Season 0 není kapitál. Jsou to lidé, kteří vidí produkt dřív než ostatní a mohou nám říct věci, které už my sami nevidíme.
>
> Founder nemá být fanoušek, který všechno pochválí. Právě naopak.
>
> Potřebujeme slyšet:
> Tohle nechápu.
> Tohle bych nepoužíval.
> Tady bych skončil.
> Tohle je zbytečné.
> Tohle mě překvapilo.
> Kvůli tomuhle bych se zítra vrátil.
>
> Protože když nám první stovky hráčů pomohou odhalit problémy před veřejným spuštěním, ušetří nám to měsíce špatného vývoje. Proto otevíráme Founder místnost na Discordu.
>
> Budeme tam postupně dávat:
> obrazovky MVP1,
> prototypy,
> questy,
> nové mechaniky,
> varianty funkcí,
> otázky,
> hlasování.
> Někdy budeme chtít hlas.
> Jindy komentář.
> A někdy jen:
> „Zkus to rozbít."
>
> První otázka je už uvnitř.
> Kdybys mohl/a z první verze iWau Hry Reality odstranit jednu věc a jednu naopak zachovat za každou cenu, co by to bylo?
>
> [VSTOUPIT DO FOUNDER ROOMKY →]
> Nemusíš nám věnovat hodiny.
> Někdy nám dvě minuty skutečně kritického feedbacku pomohou víc než dlouhý meeting uvnitř týmu. Season 0 není publikum před pódiem. Je to první testovací vrstva iWau Hry Reality.
>
> A přesně proto jsi uvnitř.
> Tomáš
> Founder Hry Reality ∞

**Proměnné:** `[JMÉNO]` → `firstName`. **⚠️ `[VSTOUPIT DO FOUNDER ROOMKY →]` — stejný odkaz jako u D+2, potřeba potvrdit.**

---

## 5. E-mail D+14 — "Pokud ti to dává smysl, pomoz nám otevřít další dveře"

**Trigger:** 14 dní po `Purchase Date`.
**Subject:** Koho bys vzal/a do Season 0 s sebou?
**Preheader:** Nechceme deset náhodných lidí. Hledáme ty správné.

> ⚠️ **Upraveno oproti dodanému originálu** — věta *"Pošli mu tohle přes svůj unikátní odkaz."* předpokládala referral tracking (unikátní odkaz na osobu), který **není součástí scope** (žádný takový mechanismus nestavíme). Nahrazeno obecným *"Pošli mu tohle:"* beze zmínky unikátního odkazu, aby e-mail neslíboval funkci, která neexistuje. Zbytek beze změny.

**Text:**
> Ahoj [JMÉNO],
> za poslední dva týdny už máš pravděpodobně mnohem lepší představu o tom, co se snažíme vytvořit. A proto tě dnes nechci žádat o další nákup.
>
> Chci tě požádat o něco jiného.
> Pomoz nám najít dalšího člověka, který by měl být u začátku.
> Ne deset lidí. Klidně jednoho.
> Člověka, o kterém si řekneš:
> „Tomuhle by iWau Hra Reality mohla dávat smysl."
>
> Možná je to někdo, kdo:
> pořád něco tvoří,
> chce na sobě pracovat, ale nebaví ho další motivační obsah,
> miluje hry,
> zajímá se o nové projekty,
> rád testuje věci před ostatními,
> nebo jednoduše chápe problém, který se snažíme řešit.
>
> **Pošli mu tohle:**
> "Narazil/a jsem na projekt Hra Reality. Snaží se udělat z osobního progresu skutečnou hru — místo dalšího obsahu tě posílá plnit věci do reálného života.
> Teď jsou v Season 0 a staví první hratelnou verzi. Já jsem do toho vstoupil/a mezi prvními.
> Mrkni na to. Myslím, že by tě to mohlo zajímat." [ODKAZ NA /FOUNDER]
>
> Ale ještě něco.
> Nemusíš sdílet vůbec nic.
> Pokud si zatím nejsi jistý/á, jestli za iWau Hrou Reality skutečně stojíš, nesdílej ji.
> Raději chceme jedno doporučení od člověka, který projektu rozumí, než sto prázdných sdílení.
>
> A pokud naopak cítíš:
> „Tohle chci pomoct dostat dál."
>
> uvnitř Founder části postupně otevřeme další možnosti, jak se zapojit:
> testováním → feedbackem → tvorbou → šířením → propojením s lidmi → podporou dalších částí světa.
>
> Ne každý Founder musí dělat všechno.
> Stačí najít způsob, který mu sedí.
> Díky, že pomáháš stavět začátek.
> Tomáš
> Founder Hry Reality ∞

**Proměnné:** `[JMÉNO]` → `firstName`. `[ODKAZ NA /FOUNDER]` → statický odkaz na `https://hrareality.cz/founder` (obecný, ne unikátní/trackovaný).

**Poznámka k poslednímu odstavci** ("uvnitř Founder části postupně otevřeme další možnosti... testováním → feedbackem → tvorbou...") — tohle je jemný předznamenání systému "5 cest", který je mimo scope. Text neslibuje nic konkrétního (žádný odkaz, žádný mechanismus), takže ho nechávám beze změny — je to jen obecná věta o budoucnosti, ne funkční příslib.

---

## MIMO SCOPE — uloženo pro budoucí rozšíření

**Founder Signal** (pravidelný e-mail, např. 1×/týden, po D+14): struktura POSTAVILI JSME / NEFUNGUJE NÁM / ROZHODUJEME / POTŘEBUJEME OD VÁS / DALŠÍ TÝDEN.

**Systém 5 cest** (nabídnuto aktivnímu Founderovi po ~20 dnech): TESTER (testuje MVP) / SCOUT (přivádí hráče) / BUILDER (pomáhá odborností) / CREATOR (vytváří obsah) / PATRON (finanční podpora).

Obojí zůstává jen jako poznámka — needěláme to teď, viz rozhodnutí v konverzaci.

---

## Otevřené otázky — potřebuju odpovědi, než dokončím Scénář 3

1. **Odkaz "Founder roomka"** (použito v D+2 a D+9) — je to konkrétní Discord kanál? Který (#founder-council, #founders, nebo samostatný)? Pošli přesný odkaz/ID kanálu.
2. **Odkaz "Product Bible"** (D+5) — kde ten dokument reálně je (Notion, Google Docs, PDF)? Pošli URL.
3. Malá věc: e-maily D+2 a D+9 obě odkazují na "Founder roomku" — je to schválně stejné místo, nebo mají být různá?

Bez těchhle 2 URL nejde Scénář 3 dodělat do konce — zbytek (časování, Airtable pole, deduplikace) je hotový/navržený nezávisle na nich.
