/**
 * Texty 1:1 podle docs/founder-membership/email-templates.md (dodáno klientem,
 * verbatim). Placeholdery `[JMÉNO]` apod. jsou nahrazené skutečnými proměnnými —
 * mapování sedí na tabulky v tom dokumentu. Měnit text tady = měnit i tam.
 *
 * Odkazy:
 *  - DISCORD_INVITE_URL — pozvánka na server, statická (stejná jako dřív v Make šabloně).
 *  - founderRoomkaUrl() — kanál #founders (potvrzeno 28. 8. 2026), skládá se z
 *    DISCORD_SERVER_ID + DISCORD_CHANNEL_FOUNDERS; bez nich spadne zpět na server invite.
 *  - productBibleUrl() — dokument ještě neexistuje (28. 8. 2026) — dokud není
 *    PRODUCT_BIBLE_URL nastavené, vede zatím na /zakladatel, ne na 404.
 *
 * ⚠️ D+2 a D+9 sdílí stejnou "Founder roomku" (#founders) — potvrzeno, není to chyba.
 */
import { wrapEmail, p, heading, ctaButton, signatureBlock } from "./email-html.js";

const DISCORD_INVITE_URL = "https://discord.com/invite/Qe2Zxr4bWJ";
// URL webu přejmenováno z /founder na /zakladatel (26. 8. 2026 SEO), viz src/App.tsx.
const FOUNDER_PAGE_URL = "https://hrareality.cz/zakladatel";

function founderRoomkaUrl() {
  const serverId = process.env.DISCORD_SERVER_ID;
  const channelId = process.env.DISCORD_CHANNEL_FOUNDERS;
  if (!serverId || !channelId) return DISCORD_INVITE_URL;
  return `https://discord.com/channels/${serverId}/${channelId}`;
}

function productBibleUrl() {
  return process.env.PRODUCT_BIBLE_URL || FOUNDER_PAGE_URL;
}

function formatFounderNumber(n) {
  return `#${String(n).padStart(4, "0")}`;
}

function formatPriceCzk(n) {
  return `${n} Kč`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" });
}

/** 1. Potvrzovací e-mail — ihned po platbě (Scénář 1 v Make dřív, teď přímo z stripe-webhook.js). */
export function welcomeEmail({ firstName, packageName, priceCzk, founderNumber, purchaseDate, benefitsIhned, thankYouPageUrl }) {
  const subject = "Jsi součástí Season 0. Vítej mezi prvními hráči. ∞";
  const body = [
    p("Vítej v Season 0. ∞"),
    p(`Ahoj ${firstName},<br>je to potvrzené. Od této chvíle jsi součástí první generace iWau Hry Reality.`),
    p("A chci ti osobně poděkovat. Ne jen za nákup balíčku. Ale za to, že ses rozhodl/a vstoupit právě teď — v momentě, kdy iWau Hra Reality ještě není hotovým produktem."),
    p("Season 1 (MVP1) právě stavíme. Některé věci už fungují, jiné teprve vznikají a stále před sebou máme spoustu rozhodnutí."),
    p("Právě proto pro nás Season 0 znamená tolik.<br>Nepřicházíš k hotové hře. Pomáháš nám ji dostat do její první skutečně hratelné podoby.<br>A až jednou budou do iWau Hry Reality vstupovat další tisíce hráčů, její úplný začátek už znovu existovat nebude."),
    p("Ty jsi u něj právě teď.<br>Díky."),
    signatureBlock(),
    heading("TVŮJ SEASON 0 STATUS"),
    p(`${packageName}<br>Zakoupeno za: ${formatPriceCzk(priceCzk)}<br>Founder ID: ${formatFounderNumber(founderNumber)}<br>Datum vstupu: ${formatDate(purchaseDate)}<br>STATUS: AKTIVNÍ ✓`),
    p("Tvoje Founder ID je unikátní označení tvého záznamu v Season 0."),
    heading("CO JSI PRÁVĚ ZÍSKAL/A"),
    p(`S tvým balíčkem ${packageName} se ti odemykají Founder výhody odpovídající této úrovni:`),
    p(benefitsIhned.map((b) => `— ${b}`).join("<br>")),
    p("Některé získáš okamžitě.<br>Jiné — například Premium, Early Access, eventové výhody nebo další části Season 1 — se aktivují ve chvíli, kdy bude příslušná část Hry Reality spuštěna. O nic nemusíš žádat znovu. Tvůj nárok evidujeme."),
    heading("TEĎ UDĚLEJ JEDNU VĚC"),
    p("Vstup do iWau Hry Reality na Discordu.<br>Season 0 už probíhá."),
    p("Uvnitř najdeš komunitu prvních hráčů, aktuální dění ve světě iWau Hry Reality, questy, dropy, artefakty a postupně také zákulisí vývoje MVP1.<br>Právě tam se bude odehrávat velká část Founder experience."),
    ctaButton("VSTOUPIT DO DISCORDU →", DISCORD_INVITE_URL),
    p("Už na Discordu jsi?<br>Potřebujeme propojit tvůj nákup s Discord účtem, abychom věděli, komu máme přidělit správnou Founder roli a přístupy."),
    ctaButton("PROPOJIT MŮJ DISCORD →", thankYouPageUrl),
    p("Po propojení ti podle zakoupeného balíčku přiřadíme odpovídající roli a přístupy."),
    heading("CO BUDE NÁSLEDOVAT"),
    p("01 — Platba potvrzena ✓<br>Tohle už máš za sebou."),
    p("02 — Founder záznam<br>Tvůj nákup a všechny nároky evidujeme v systému Season 0."),
    p("03 — Propojení Discordu<br>Díky němu poznáme tvůj účet a můžeme ti přiřadit správný status."),
    p("04 — Founder role a výhody<br>Odemkneme okamžité digitální nároky podle tvého balíčku."),
    p("05 — Vznik MVP1<br>Uvnitř Founder části budeš postupně sledovat vývoj, zákulisí, rozhodnutí a vybrané možnosti zapojení."),
    p("06 — Season 1<br>Jakmile přijde čas na Early Access, Premium, beta testování nebo další nároky z tvého balíčku, dostaneš od nás instrukce."),
    heading("JEDNA DŮLEŽITÁ VĚC"),
    p("iWau Hra Reality je stále ve vývoji.<br>Season 0 je právě období, během kterého vzniká její první hratelná verze. Plánované termíny, pořadí vývoje nebo některé konkrétní funkce se proto mohou na základě vývoje a testování změnit."),
    p("Pokud se něco podstatného změní, Foundeři se to dozvědí přímo od nás."),
    heading("NĚCO NEFUNGUJE?"),
    p("Pokud ti chybí Founder role, nesedí zakoupený balíček, nedorazila některá z výhod nebo potřebuješ s čímkoliv pomoct, napiš nám: hrareality@gmail.com"),
    p("Do zprávy přidej e-mail použitý při nákupu a své Founder ID, pokud už ho máš. Díky tomu tě rychleji dohledáme."),
    p("Ještě jednou díky, že jsi u toho právě teď.<br>Season 0 už běží."),
    signatureBlock(),
  ].join("\n");
  return { subject, html: wrapEmail(body) };
}

/** 2. D+2 — "Proč vlastně Hra Reality vzniká" */
export function nurtureD2Email({ firstName }) {
  const subject = "Problém není, že nevíme, co dělat.";
  const body = [
    p(`Ahoj ${firstName},<br>když už jsi vstoupil/a mezi Foundery Season 0, chci ti postupně ukázat trochu víc z toho, co vlastně stavíme.<br>Ne marketingovou prezentaci.<br>Spíš způsob, jak nad tím přemýšlíme uvnitř týmu.`),
    p("iWau Hra Reality vznikla z poměrně jednoduchého pozorování:<br>Nikdy jsme neměli přístup k takovému množství informací jako dnes.<br>Víme, jak lépe spát.<br>Jak cvičit.<br>Jak pracovat se soustředěním.<br>Jak se učit.<br>Jak budovat vztahy.<br>Jak pracovat s penězi.<br>Máme podcasty, kurzy, YouTube, knihy, AI.<br>Přesto existuje obrovská mezera mezi:<br>VÍM a UDĚLÁM.<br>A právě tahle mezera nás zajímá."),
    p("Nechceme vytvořit další místo na obsah. Obsahu už máme dost.<br>Chceme zkusit vytvořit něco jiného. Hru, která používá digitální svět k tomu, aby člověka dostala zpátky do skutečného života."),
    p("Aplikace řekne:<br>Tady je mise."),
    p("Člověk telefon odloží.<br>Něco skutečně udělá.<br>Vrátí se.<br>Zaznamená svůj krok.<br>Posune se."),
    p("A postupně začne svůj skutečný život vnímat trochu víc jako prostor, ve kterém může aktivně hrát a tvořit ho podle libosti.<br>To je základ iWau Hry Reality."),
    p("Momentálně ještě nevíme, jestli všechny naše hypotézy budou fungovat.<br>A bylo by nepoctivé tvrdit opak."),
    p("Právě Season 1 (MVP1) nám má odpovědět na tu nejdůležitější:<br>Dokážeme vytvořit systém, ke kterému se lidé vracejí ne proto, aby konzumovali další obsah, ale protože je dostává do skutečné akce?"),
    p("Pokud ano, máme něco velmi zajímavého.<br>Pokud ne, budeme muset změnit způsob, jakým to děláme."),
    p("A právě proto jsou pro nás první hráči tak důležití."),
    p('Chci po tobě dnes jednu věc.<br>Polož si jednoduchou otázku<br>"Kde ve svém životě přesně víš, co bys měl/a dělat — ale stejně to neděláš?"'),
    p("Produktivita?<br>Pohyb?<br>Telefon?<br>Peníze?<br>Vztahy?<br>Něco úplně jiného?"),
    p("Napiš nám odpověď do Founder roomky."),
    ctaButton("ODPOVĚDĚT VE FOUNDER ROOMCE →", founderRoomkaUrl()),
    p("Nejde o engagement pro engagement.<br>Právě podobné odpovědi nám pomáhají rozhodovat, jaké problémy má iWau Hra Reality skutečně řešit."),
    signatureBlock(),
  ].join("\n");
  return { subject, html: wrapEmail(body) };
}

/** 3. D+5 — "Pojď se podívat pod kapotu" */
export function nurtureD5Email({ firstName }) {
  const subject = "Tohle právě stavíme za dveřmi Season 0.";
  const body = [
    p(`Ahoj ${firstName},<br>minule jsem ti psal o problému mezi:<br>„vím" → „udělám".`),
    p("Dnes ti chci ukázat, jak se ho snažíme řešit produktem.<br>Season 1 (MVP1) nebude obrovská aplikace se stovkou funkcí."),
    p("Naopak.<br>Potřebujeme nejdřív zjistit, jestli funguje samotné srdce Hry Reality.<br>SIGNAL → ACTION → PROOF → PROGRESS → NEXT ACTION"),
    p("Tohle je základ.<br>Hráč dostane impuls.<br>Vybere si skutečnou akci.<br>Telefon na chvíli přestává být cílem.<br>Jde něco udělat.<br>Vrátí se s proofem.<br>Hra jeho krok zaznamená.<br>Dostane progres, XP, artefakt nebo další část cesty.<br>A pokračuje."),
    p("Kolem toho postupně vzniká celý svět.<br>Denní mise<br>Malé kroky, které lze skutečně udělat."),
    p("Questy<br>Větší výzvy a experimenty."),
    p("Collections<br>Artefakty připomínající skutečné momenty a historii hry."),
    p("Aréna hráčů<br>Místo, kde se účastníš turnajů, duelů, buduješ týmy atd.<br>Vrstva pro skutečné hráče."),
    p("Guardians<br>Lidé s odborností v jednotlivých oblastech života."),
    p("Portály<br>Body, kde digitální iWau Hra Reality začne fyzicky vstupovat do skutečného světa."),
    p("A postupně další vrstvy."),
    p("Ale tady je důležitá věc. Spousta z toho může být špatně.<br>Možná XP nikoho nebudou zajímat.<br>Možná zjistíme, že některé questy jsou moc dlouhé.<br>Možná bude Aréna zásadní. Možná nebude.<br>Možná hráči budou chtít něco, co dnes vůbec nevidíme."),
    p("Proto Season 1 (MVP1) nevzniká proto, abychom dokázali, že jsme měli pravdu.<br>Vzniká proto, abychom zjistili, kde jsme se spletli.<br>A opravili to."),
    p("Proto ti dnes otevírám naši Product Bible."),
    p("Je to dokument, podle kterého přemýšlíme o tom:<br>jak se Hra Reality hraje,<br>jak funguje progres,<br>proč používáme questy,<br>co jsou Collections,<br>jak fungují Guardians,<br>jak propojujeme digitální a skutečný svět,<br>kam může produkt dlouhodobě růst."),
    p("Nemusíš ji číst celou.<br>Ale pokud chceš skutečně pochopit, co jsi pomohl/a vznikem svého Founder Membershipu stavět, začni tady."),
    ctaButton("OTEVŘÍT PRODUCT BIBLE →", productBibleUrl()),
    p('A jestli při čtení narazíš na něco, u čeho si řekneš:<br>„Tohle je blbost."'),
    p("řekni nám to.<br>To je pro nás hodnotnější než dalších deset lidí, kteří napíšou, že je všechno super."),
    signatureBlock(),
  ].join("\n");
  return { subject, html: wrapEmail(body) };
}

/** 4. D+9 — "Potřebujeme, abys nám řekl, kde se mýlíme" */
export function nurtureD9Email({ firstName }) {
  const subject = "Teď potřebujeme něco od tebe.";
  const body = [
    p(`Ahoj ${firstName},<br>mohl bych ti každý týden posílat krásné screenshoty toho, co jsme postavili.`),
    p("Ale to by byla promarněná příležitost. Protože jedna z největších výhod Season 0 není kapitál. Jsou to lidé, kteří vidí produkt dřív než ostatní a mohou nám říct věci, které už my sami nevidíme."),
    p("Founder nemá být fanoušek, který všechno pochválí. Právě naopak."),
    p("Potřebujeme slyšet:<br>Tohle nechápu.<br>Tohle bych nepoužíval.<br>Tady bych skončil.<br>Tohle je zbytečné.<br>Tohle mě překvapilo.<br>Kvůli tomuhle bych se zítra vrátil."),
    p("Protože když nám první stovky hráčů pomohou odhalit problémy před veřejným spuštěním, ušetří nám to měsíce špatného vývoje. Proto otevíráme Founder místnost na Discordu."),
    p("Budeme tam postupně dávat:<br>obrazovky MVP1,<br>prototypy,<br>questy,<br>nové mechaniky,<br>varianty funkcí,<br>otázky,<br>hlasování.<br>Někdy budeme chtít hlas.<br>Jindy komentář.<br>A někdy jen:<br>„Zkus to rozbít.\""),
    p("První otázka je už uvnitř.<br>Kdybys mohl/a z první verze iWau Hry Reality odstranit jednu věc a jednu naopak zachovat za každou cenu, co by to bylo?"),
    ctaButton("VSTOUPIT DO FOUNDER ROOMKY →", founderRoomkaUrl()),
    p("Nemusíš nám věnovat hodiny.<br>Někdy nám dvě minuty skutečně kritického feedbacku pomohou víc než dlouhý meeting uvnitř týmu. Season 0 není publikum před pódiem. Je to první testovací vrstva iWau Hry Reality."),
    p("A přesně proto jsi uvnitř."),
    signatureBlock(),
  ].join("\n");
  return { subject, html: wrapEmail(body) };
}

/** 5. D+14 — "Pokud ti to dává smysl, pomoz nám otevřít další dveře"
 * Upraveno oproti dodanému originálu (viz email-templates.md) — bez zmínky
 * unikátního/trackovaného odkazu, protože referral tracking není ve scope. */
export function nurtureD14Email({ firstName }) {
  const subject = "Koho bys vzal/a do Season 0 s sebou?";
  const body = [
    p(`Ahoj ${firstName},<br>za poslední dva týdny už máš pravděpodobně mnohem lepší představu o tom, co se snažíme vytvořit. A proto tě dnes nechci žádat o další nákup.`),
    p("Chci tě požádat o něco jiného.<br>Pomoz nám najít dalšího člověka, který by měl být u začátku.<br>Ne deset lidí. Klidně jednoho.<br>Člověka, o kterém si řekneš:<br>„Tomuhle by iWau Hra Reality mohla dávat smysl.\""),
    p("Možná je to někdo, kdo:<br>pořád něco tvoří,<br>chce na sobě pracovat, ale nebaví ho další motivační obsah,<br>miluje hry,<br>zajímá se o nové projekty,<br>rád testuje věci před ostatními,<br>nebo jednoduše chápe problém, který se snažíme řešit."),
    p(`<strong>Pošli mu tohle:</strong><br>"Narazil/a jsem na projekt Hra Reality. Snaží se udělat z osobního progresu skutečnou hru — místo dalšího obsahu tě posílá plnit věci do reálného života.<br>Teď jsou v Season 0 a staví první hratelnou verzi. Já jsem do toho vstoupil/a mezi prvními.<br>Mrkni na to. Myslím, že by tě to mohlo zajímat." <a href="${FOUNDER_PAGE_URL}">${FOUNDER_PAGE_URL}</a>`),
    p("Ale ještě něco.<br>Nemusíš sdílet vůbec nic.<br>Pokud si zatím nejsi jistý/á, jestli za iWau Hrou Reality skutečně stojíš, nesdílej ji.<br>Raději chceme jedno doporučení od člověka, který projektu rozumí, než sto prázdných sdílení."),
    p('A pokud naopak cítíš:<br>„Tohle chci pomoct dostat dál."'),
    p("uvnitř Founder části postupně otevřeme další možnosti, jak se zapojit:<br>testováním → feedbackem → tvorbou → šířením → propojením s lidmi → podporou dalších částí světa."),
    p("Ne každý Founder musí dělat všechno.<br>Stačí najít způsob, který mu sedí.<br>Díky, že pomáháš stavět začátek."),
    signatureBlock(),
  ].join("\n");
  return { subject, html: wrapEmail(body) };
}

/** Interní notifikace pro Tomáše/Vítka — mimo scope textů od klienta,
 * jednoduchý shrnující formát, ne zákaznická šablona. */
export function internalNotificationEmail({ founderNumber, email, phone, firstName, lastName, packageName, priceCzk, orderNumber }) {
  const subject = `Nová Founder platba — ${formatFounderNumber(founderNumber)} — ${packageName}`;
  const body = [
    heading("Nová Founder platba"),
    p(`Founder ID: ${formatFounderNumber(founderNumber)}<br>Jméno: ${firstName} ${lastName}<br>E-mail: ${email}<br>Telefon: ${phone || "—"}<br>Balíček: ${packageName}<br>Cena: ${formatPriceCzk(priceCzk)}<br>Číslo objednávky: ${orderNumber}`),
  ].join("\n");
  return { subject, html: wrapEmail(body) };
}
