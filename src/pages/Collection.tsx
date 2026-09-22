import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { History, Award, Fingerprint, Zap, CheckCircle2, X, Lock, Sparkles, MessageSquare, ExternalLink, Share2 } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/FadeIn";
import CollectionCard from "@/components/CollectionCard";
import SEO from "@/components/SEO";

export interface CardData {
  name: string;
  family: "AWAKENING" | "POSTAVY_IWAU" | "GLITCH" | "RELICS";
  familyName: string;
  previewText: string;
  quote: string;
  edition: string;
  rarity: "COMMON" | "RARE" | "LEGENDARY";
  statusBadge: string;
  src?: string;
  isLocked?: boolean;
  
  // Detail: Jak získat
  whatIsIt: string;
  howToGetIcon: string;
  howToGetText: string;
  conditions?: string[];
  progress?: string;
  availability: string;
  availabilityType: "green" | "red" | "purple" | "orange" | "amber" | "cyan";
  availabilityNote?: string;
  ctaText: string;
  ctaUrl?: string;
  ctaAction?: "discord" | "web" | "album" | "share";


  // Detail: Moje cesta (vlastněná verze)
  journey: {
    obtainedAt: string;
    obtainedDate?: string;
    headline: string;
    story: string;
    point: string;
  };
}

interface CardFamily {
  id: string;
  name: string;
  description: string;
  cards: CardData[];
}

// Definice rodin a karet pro Season 0 se všemi texty
const cardFamilies: CardFamily[] = [
  {
    id: "awakening",
    name: "I — AWAKENING",
    description: "Začátek všeho. Momenty, kdy se z NPC stává hráč.",
    cards: [
      {
        name: "Zrození Hráče",
        family: "AWAKENING",
        familyName: "AWAKENING",
        previewText: "První karta každého hráče. Neříká, jak daleko ses dostal/a. Říká, kde tvoje cesta začala.",
        quote: "Každý hráč začíná ve chvíli, kdy přestane být jen návštěvníkem.",
        edition: "BASE EDITION",
        rarity: "COMMON",
        statusBadge: "VSTUPNÍ ARTEFAKT",
        src: "/cards/previews/awakening_1_blur.webp",
        isLocked: false,
        whatIsIt: "První Artefakt tvé cesty. Zaznamenává okamžik, kdy vstoupíš do iWau Hry Reality jako hráč a začne se zapisovat tvůj osobní Archiv.",
        howToGetIcon: "🔓",
        howToGetText: "Dokonči základní onboarding iWau Hry Reality na Discordu.",
        conditions: ["Dokonči onboarding", "Aktivuj svou hráčskou identitu"],
        availability: "LZE ZÍSKAT",
        availabilityType: "green",
        ctaText: "VSTOUPIT DO HRY →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "Dokončení onboardingu",
          headline: "VSTOUPIL/A JSEM DO HRY.",
          story: "Tímto okamžikem začala tvoje cesta. Dokončil/a jsi první vstup do Hry Reality a přestal/a být pouze návštěvníkem jejího světa. Od tohoto dne se začíná zapisovat tvůj osobní Archiv.",
          point: "Tady všechno začalo.",
        },
      },
      {
        name: "První Signál",
        family: "AWAKENING",
        familyName: "AWAKENING",
        previewText: "První důkaz, že jsi iWau Hru Reality nejen sledoval/a. Začal/a jsi ji hrát.",
        quote: "Někteří Signál zahlédnou. Hráči na něj odpoví.",
        edition: "BASE EDITION",
        rarity: "COMMON",
        statusBadge: "AWAKENING ARTEFAKT",
        src: "/cards/previews/awakening_2_blur.webp",
        isLocked: false,
        whatIsIt: "Signály jsou malé mise dne, které tě mají na chvíli vytáhnout z autopilota. Tento Artefakt zaznamená okamžik, kdy je přestaneš pouze míjet a začneš na ně reagovat.",
        howToGetIcon: "📡",
        howToGetText: "Zareaguj na 3 Mise Dne iWau Hry Reality. Počítá se i onboardingový Signál.",
        progress: "0 / 3 SIGNÁLY",
        availability: "LZE ZÍSKAT",
        availabilityType: "green",
        ctaText: "NAJÍT DALŠÍ SIGNÁL →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "Reakci na 3 Signály",
          headline: "ZAČAL/A JSEM SI VŠÍMAT.",
          story: "Zachytil/a jsi první mise hry a třikrát ses rozhodl/a na ně reagovat. Hra Reality pro tebe přestala být jen něčím, co sleduješ. Začal/a jsi komunikovat se světem kolem sebe.",
          point: "První spojení bylo navázáno.",
        },
      },
      {
        name: "Loop Breaker",
        family: "AWAKENING",
        familyName: "AWAKENING",
        previewText: "Důkaz spojení mezi tebou, reálným světem a systémem iWau Hry Reality.",
        quote: "Loop se nerozbije myšlenkou. Rozbije se akcí.",
        edition: "BASE EDITION",
        rarity: "RARE",
        statusBadge: "ACTION ARTEFAKT",
        src: "/cards/previews/awakening_3_blur.webp",
        isLocked: false,
        whatIsIt: "První důkaz, že iWau Hru Reality nejen sleduješ. Loop Breaker získáš ve chvíli, kdy uděláš první skutečný krok mimo obrazovku.",
        howToGetIcon: "⚡",
        howToGetText: "Dokonči svůj první Real World Quest a odevzdej požadovaný důkaz. Real World Questy jsou každý víkend.",
        conditions: ["0 / 1 REAL WORLD QUEST"],
        availability: "LZE ZÍSKAT",
        availabilityType: "green",
        ctaText: "NAJÍT REAL WORLD QUEST →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "První Real World Quest",
          headline: "UDĚLAL/A JSEM PRVNÍ SKUTEČNÝ KROK.",
          story: "Dokončil/a jsi svůj první Real World Quest. Tentokrát nezůstalo jen u čtení, reakce nebo myšlenky. Něco se skutečně stalo mimo Discord.",
          point: "Hra poprvé vstoupila do tvého reálného světa.",
        },
      },
    ],
  },
  {
    id: "postavy_iwau",
    name: "II — POSTAVY iWAU",
    description: "Svět Hry Reality nepostavil jen jeden člověk. Tyhle tři postavy stály u jeho úplného zrodu. A každá z nich tě bude provázet trošku jiným způsobem.",
    cards: [
      {
        name: "Zaya",
        family: "POSTAVY_IWAU",
        familyName: "POSTAVY iWAU",
        previewText: "První průvodkyně iWau Hry Reality. Neříká ti, kudy jít. Pomáhá ti všimnout si, kde může začít tvoje cesta.",
        quote: "Každý hráč potřebuje někoho, kdo mu ukáže první krok.",
        edition: "FIRST EDITION",
        rarity: "COMMON",
        statusBadge: "HISTORICKÝ ARTEFAKT",
        src: "/cards/previews/postavy_1_blur.webp",
        isLocked: false,
        whatIsIt: "Zaya je první známá průvodkyně iWau Hry Reality. Tento Artefakt zachycuje její FIRST IMPACT – jedno z prvních období, kdy se začala objevovat mezi hráči Season 0.",
        howToGetIcon: "🜂",
        howToGetText: "First Edition bylo možné získat pouze během časově omezeného Portálu FIRST IMPACT. Portál byl uzavřen.",
        availability: "FIRST EDITION VERZI JIŽ NELZE ZÍSKAT",
        availabilityType: "red",
        availabilityNote: "Pokud chceš získat tento Artefakt Zayi, vydrž na dostupnost BASE verze. Tento konkrétní ve FIRST EDITION už nelze získat.",
        ctaText: "PROZKOUMAT KRONIKU →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "První Drop Portál FIRST IMPACT",
          headline: "POZNAL/A JSEM PRVNÍHO PRŮVODCE.",
          story: "Během Season 0 ses setkal/a se Zayou ještě v době, kdy se její role ve světě iWau Hry Reality teprve odhalovala. Zaya ti nebude říkat, jak máš žít. Je tu proto, aby ukázala místa, kde může začít tvoje vlastní rozhodnutí.",
          point: "FIRST IMPACT se stal součástí tvé historie.",
        },
      },
      {
        name: "Temný Mág",
        family: "POSTAVY_IWAU",
        familyName: "POSTAVY iWAU",
        previewText: "Protisíla vědomé volby. Nezastaví tě. Jen ti připomene všechny důvody, proč nemá cenu začínat.",
        quote: "Nezamyká dveře. Jen tě přesvědčí, že žádné neexistují.",
        edition: "FIRST EDITION",
        rarity: "RARE",
        statusBadge: "HISTORICKÝ ARTEFAKT",
        src: "/cards/previews/postavy_2_blur.webp",
        isLocked: false,
        whatIsIt: "Temný Mág představuje protisílu vědomé volby. Pochybnost. Pasivitu. Strach. Okamžiky, kdy člověk začne věřit, že nemá cenu něco měnit.",
        howToGetIcon: "❓",
        howToGetText: "Jeho první Portál zatím nebyl otevřen. Podmínky získání First Edition budou odhaleny až ve chvíli, kdy se Temný Mág objeví v Season 0.",
        availability: "DOSUD NEODHALENO",
        availabilityType: "purple",
        ctaText: "SLEDOVAT SIGNÁLY →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "Speciální Týdenní Drop",
          headline: "POZNAL/A JSEM PROTISÍLU.",
          story: "Ne všechno ve světě iWau Hry Reality tě vede dopředu. Temný Mág představuje chvíle, kdy pochybnost, strach nebo pasivita začnou rozhodovat místo tebe. Není tu proto, abys ho porazil/a. Je tu proto, abys poznal/a, kdy mu předáváš svou volbu.",
          point: "Dnes už víš, kdo je ten, co tě manipuluje.",
        },
      },
      {
        name: "Dr. Wetom",
        family: "POSTAVY_IWAU",
        familyName: "POSTAVY iWAU",
        previewText: "Záhadný tvůrce stojící u počátků iWau Hry Reality. Nikdo přesně neví, kdo je. Ani jak skutečně vypadá.",
        quote: "Čím více stop po sobě zanechává, tím méně je jasné, kdo skutečně je.",
        edition: "FIRST EDITION",
        rarity: "LEGENDARY",
        statusBadge: "LEGENDÁRNÍ ARTEFAKT",
        src: "/cards/previews/postavy_3_blur.webp",
        isLocked: false,
        whatIsIt: "Jedna z nejzáhadnějších postav iWau Hry Reality. Jeho jméno se objevuje u samotných počátků světa, ale nikdo přesně neví, kdo Dr. Wetom je ani jak skutečně vypadá.",
        howToGetIcon: "🔐",
        howToGetText: "Způsob získání je skrytý. Tento Legendary Artefakt nebude možné odemknout běžným splněním mise. Hledej stopy.",
        availability: "UNKNOWN",
        availabilityType: "amber",
        ctaText: "PROZKOUMAT SVĚT →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "Pomoci při rozvoji hry",
          headline: "ODHALIL/A JSEM HLUBŠÍ VRSTVU SVĚTA.",
          story: "Dostal/a ses za hranici toho, co iWau Hra Reality ukazuje každému. Narazil/a jsi na jednu z jejích nejstarších záhad. Dr. Wetom stojí u počátků tohoto světa. Jeho skutečná identita ale zůstává neznámá.",
          point: "Čím hlouběji jdeš, tím více otázek vzniká.",
        },
      },
    ],
  },
  {
    id: "glitch",
    name: "III — GLITCH",
    description: "PARAZITI REALITY\nKaždý z nich je otiskem chování, které lidé opakovali tak dlouho, až získali vlastní život. Neútočí silou. Jen šeptají. A čím méně si jejich hlas uvědomuješ, tím větší moc nad tebou mají.",
    cards: [
      {
        name: "Driptor",
        family: "GLITCH",
        familyName: "GLITCH",
        previewText: "Parazit Reality, který sílí pokaždé, když začneš svou hodnotu hledat ve věcech, které vlastníš.",
        quote: "Zasloužíš si něco lepšího.",
        edition: "FIRST EDITION",
        rarity: "COMMON",
        statusBadge: "HISTORICKÝ GLITCH",
        src: "/cards/previews/glitch_1_blur.webp",
        isLocked: false,
        whatIsIt: "První zaznamenaný Parazit Reality. Driptor se objevuje ve chvílích, kdy spotřeba, porovnávání a touha po něčem dalším začnou znít jako tvoje vlastní rozhodnutí.",
        howToGetIcon: "🌀",
        howToGetText: "First Edition získali hráči, kteří během prvního Portálu rozpoznali Driptora ve svém skutečném životě a zaznamenali své setkání. Portál je již uzavřen.",
        availability: "FIRST EDITION JIŽ NELZE ZÍSKAT",
        availabilityType: "red",
        availabilityNote: "Pokud chceš získat tento Artefakt Driptora, vydrž na dostupnost BASE verze. Jeho první zaznamenání ve FIRST EDITION verzi už ne.",
        ctaText: "PŘEČÍST ZÁZNAM V KRONICE →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "Prvním setkání s Driptorem",
          headline: "ROZPOZNAL/A JSEM PRVNÍ GLITCH.",
          story: "Všiml/a sis okamžiku, kdy spotřeba, porovnávání nebo touha po něčem dalším začaly znít jako tvoje vlastní rozhodnutí. Nemusel/a jsi Driptora porazit. Stačilo ho poprvé zahlédnout.",
          point: "Od této chvíle už není úplně neviditelný.",
        },
      },
      {
        name: "Toilex",
        family: "GLITCH",
        familyName: "GLITCH",
        previewText: "Parazit Reality, který nepotřebuje tvůj čas. Stačí mu tvoje pozornost. „Ještě jedno video.“",
        quote: "Ještě jedno video.",
        edition: "FIRST EDITION",
        rarity: "COMMON",
        statusBadge: "HISTORICKÝ GLITCH",
        src: "/cards/previews/glitch_2_blur.webp",
        isLocked: false,
        whatIsIt: "Parazit Reality, který se živí roztříštěnou pozorností. Feed. Shorts. Notifikace. Automatické otevření telefonu. Toilex nepotřebuje tvůj čas. Stačí mu tvoje pozornost.",
        howToGetIcon: "🧻",
        howToGetText: "First Edition získali hráči, kteří během prvního Portálu zachytili okamžik, kdy jejich pozornost přešla na autopilota, a zaznamenali své setkání.",
        availability: "FIRST EDITION JIŽ NELZE ZÍSKAT",
        availabilityType: "red",
        availabilityNote: "Pokud chceš získat tento Artefakt Toilexe, vydrž na dostupnost BASE verze. Jeho první zaznamenání ve FIRST EDITION verzi už ne.",
        ctaText: "PŘEČÍST ZÁZNAM V KRONICE →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "Prvním setkání s Toilexem",
          headline: "VŠIML/A JSEM SI, KAM MIZÍ MOJE POZORNOST.",
          story: "Zachytil/a jsi okamžik, kdy jsi sáhl/a po telefonu, otevřel/a další obsah nebo pokračoval/a bez skutečného rozhodnutí. Na několik sekund ses zastavil/a. A právě tím ses s Toilexem poprvé skutečně setkal/a.",
          point: "Pozornost se na chvíli vrátila zpět k tobě.",
        },
      },
      {
        name: "Zlooper",
        family: "GLITCH",
        familyName: "GLITCH",
        previewText: "Parazit Reality ukrytý v opakování. Přesvědčí tě, že tentokrát nic měnit nemusíš. Začneš přece zítra.",
        quote: "Zítra to uděláš jinak.",
        edition: "FIRST EDITION",
        rarity: "RARE",
        statusBadge: "HISTORICKÝ GLITCH",
        src: "/cards/previews/glitch_3_blur.webp",
        isLocked: false,
        whatIsIt: "Parazit Reality ukrytý v opakování. Stejný návyk. Stejná výmluva. Stejný den. Zlooper tě nemusí zastavit. Stačí, když tě přesvědčí, abys pokračoval/a stejně.",
        howToGetIcon: "🔁",
        howToGetText: "Jeho první výskyt zatím nebyl plně zaznamenán. Až se Portál otevře, budeš muset Zloopera nejen najít… ale také narušit jeden vlastní loop.",
        availability: "PŘICHÁZÍ V SEASON 0",
        availabilityType: "orange",
        ctaText: "ČEKAT NA OTEVŘENÍ PORTÁLU →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "Narušení vlastního loopu",
          headline: "NARUŠIL/A JSEM OPAKUJÍCÍ SE VZOREC.",
          story: "Rozpoznal/a jsi něco, co ve svém životě opakuješ téměř automaticky. A alespoň jednou ses rozhodl/a jinak. Nemusel/a jsi změnit celý návyk. Stačilo vytvořit první trhlinu.",
          point: "Loop se poprvé přerušil.",
        },
      },
    ],
  },
  {
    id: "relics",
    name: "IV — RELICS",
    description: "Každý svět má své relikvie — věci, které drží realitu pohromadě. Tyhle jsou z Season 0.",
    cards: [
      {
        name: "Discord Portal",
        family: "RELICS",
        familyName: "RELICS",
        previewText: "Relikvie první brány iWau Hry Reality. Místa, kde se první hráči začali scházet ještě před vznikem aplikace.",
        quote: "První brána nebyla aplikace.",
        edition: "SEASON 0 RELIC",
        rarity: "COMMON",
        statusBadge: "SEASON 0 RELIC",
        src: "/cards/previews/relics_1_blur.webp",
        isLocked: false,
        whatIsIt: "Historická Relikvie průvodce iWau Hry Reality. Ještě před MVP1 existovalo místo na Discordu, kde se setkávali první hráči a testovala první pravidla světa. A právě tento okamžik označuje moment, kdy jsi ukázal/a svět iWau Hry Reality i někomu jinému.",
        howToGetIcon: "🚪",
        howToGetText: "Ukaž Discord iWau Hry Reality alespoň jednomu člověku kolem sebe a jakmile projde onboardingem, získáš tento artefakt.",
        progress: "0 / 1 HRÁČŮ",
        availability: "POUZE SEASON 0",
        availabilityType: "green",
        availabilityNote: "Po skončení Season 0 tato cesta zanikne.",
        ctaText: "POSLAT iWAU DÁL →",
        ctaUrl: "https://hrareality.cz",
        ctaAction: "share",
        journey: {
          obtainedAt: "Dosažení Levelu 2",
          headline: "POMOHL/A JSI PROJÍT PRVNÍ BRÁNOU.",
          story: "Postoupil/a jsi původní Discord základnou Hry Reality. Právě tady jsi pomohl/a někomu ze tvého okolí vstoupit do iWau Hry Reality. Jednou ti za to může třeba poděkovat. Nikdy nevíš.",
          point: "Tady máš důkaz, že jsi pomohl/a tomu prvnímu.",
        },
      },
      {
        name: "MVP1 Bridge",
        family: "RELICS",
        familyName: "RELICS",
        previewText: "Most mezi Season 0 a první skutečnou verzí iWau Hry Reality. Okamžik, kdy se svět začíná měnit v hru.",
        quote: "Každý svět jednou musí překročit hranici mezi představou a skutečností.",
        edition: "SEASON 0 RELIC",
        rarity: "RARE",
        statusBadge: "TRANSITION RELIC",
        src: "/cards/previews/relics_2_blur.webp",
        isLocked: false,
        whatIsIt: "Relikvie okamžiku, kdy iWau Hra Reality přestane existovat pouze na Discordu, ale přešla do reálné aplikace. MVP1 Bridge propojí první komunitní experimenty s první funkční verzí hry.",
        howToGetIcon: "🌉",
        howToGetText: "Zapoj se do oficiálního testování nebo validace Season 1. Pouhé členství nestačí. Musíš být jedním z hráčů, kteří pomohou první verzi skutečně ověřit.",
        availability: "ODEMČENÍ SE SEASON 1",
        availabilityType: "cyan",
        ctaText: "CHCI BÝT U TESTOVÁNÍ →",
        ctaUrl: "https://discord.gg/MGnNWkcqQf",
        ctaAction: "discord",
        journey: {
          obtainedAt: "Ověřenou účast na validaci MVP1",
          headline: "POMOHL/A JSEM OTEVŘÍT DALŠÍ SVĚT.",
          story: "Nečekal/a jsi, až bude první verze iWau Hry Reality hotová. Zapojil/a ses do jejího ověřování. Tvůj krok pomohl propojit experimenty Season 0 s první funkční verzí hry.",
          point: "Přešel/a jsi most mezi Discordem a MVP1.",
        },
      },
      {
        name: "Generation Zero",
        family: "RELICS",
        familyName: "RELICS",
        previewText: "Nečekali, až bude iWau Hra Reality hotová. Byli u toho, když teprve vznikala. První generace hráčů.",
        quote: "Nečekali, až hra vznikne. Byli u toho, když se skládala.",
        edition: "GENERATION ZERO EDITION",
        rarity: "LEGENDARY",
        statusBadge: "PERMANENT OG RELIC",
        src: "/cards/previews/relics_3_blur.webp",
        isLocked: false,
        whatIsIt: "Finální Relikvie Season 0. Nevzniká za jeden Quest ani jeden Portál. Je záznamem toho, že jsi prošel/a dostatečnou částí první historie Hry Reality.",
        howToGetIcon: "◈",
        howToGetText: "Staň se součástí Generation Zero.",
        conditions: ["8 / 12 ARTEFAKTŮ", "AKTIVITA V SEASON 0"],
        availability: "POUZE SEASON 0",
        availabilityType: "amber",
        availabilityNote: "Poslední část podmínek bude odhalena před uzavřením Season. Po jejím skončení nebude možné Generation Zero získat.",
        ctaText: "ZOBRAZIT MŮJ PROGRESS →",
        ctaUrl: "https://album.hrareality.cz",
        ctaAction: "album",
        journey: {
          obtainedAt: "Dokončení cesty Generation Zero",
          obtainedDate: "datum ukončení Season 0",
          headline: "STAL/A JSEM SE GENERATION ZERO.",
          story: "Tahle karta nevznikla kvůli jednomu úkolu. Vznikla kvůli celé cestě. Vstoupil/a jsi. Reagoval/a na denní mise. Hrál/a v realitě. Objevoval/a postavy a Glitche. Procházel/a světem ještě v době, kdy se jeho pravidla teprve skládala. A zůstal/a jsi dost dlouho na to, abys viděl/a otevření další kapitoly (Season 1).",
          point: "Nebyl/a jsi první zákazník. Byl/a jsi součástí první generace.",
        },
      },
    ],
  },
];

// Způsoby získání karet pro sběratelský manuál
const obtainingWays = [
  {
    title: "→ Dokonči onboarding",
    desc: "První karta je tvoje do 5 minut. Žádný háček. Vstoupíš, projdeš onboarding, máš ji.",
    type: "FREE",
  },
  {
    title: "→ Dosáhni dalšího levelu na Discordu",
    desc: "Zapoj se do komunity. Reaguj. Sdílej. Až dosáhneš prvního milníku, odemkneš další artefakt.",
    type: "AKTIVITA",
  },
  {
    title: "→ Splň quest v reálném světě",
    desc: "Tohle je core Hry Reality. Výzva v reálu, důkaz na feedu, karta v kolekci. Takhle se skutečně hraje.",
    type: "AKCE",
  },
  {
    title: "→ Přiveď dalšího hráče",
    desc: "Každý nový hráč, kterého přivedeš, ti odemkne odměnu. A jemu taky. To je win-win situace.",
    type: "KOMUNITA",
  },
  {
    title: "→ Zapiš se na MVP waitlist",
    desc: "Early access k platformě. Až se otevřou dveře, projdeš jako první.",
    type: "EARLY ACCESS",
  },
  {
    title: "→ Získávej odměny",
    desc: "Dropy pro ty, kdo se nejvíce zapojují. Žádné metriky, žádné KPI — systém pozná, kdo je reálně aktivní.",
    type: "BONUS",
  },
];

export default function Collection() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const getAvailabilityBadge = (type: CardData["availabilityType"], text: string) => {
    switch (type) {
      case "green":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">🟢 {text}</span>;
      case "red":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30">🔒 {text}</span>;
      case "purple":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">🟣 {text}</span>;
      case "orange":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30">🟠 {text}</span>;
      case "amber":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">🔐 {text}</span>;
      case "cyan":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">⏳ {text}</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-white/10 text-white/70 border border-white/20">⚪ {text}</span>;
    }
  };

  const handleCtaClick = (card: CardData) => {
    if (card.ctaAction === "share") {
      const shareUrl = "https://hrareality.cz";
      const shareData = {
        title: "iWau HRA REALITY",
        text: "Vstup do iWau Hry Reality a objev svět Season 0 — Awakening!",
        url: shareUrl,
      };

      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Odkaz na iWau Hru Reality byl zkopírován do schránky!");
      } else {
        toast.success("Odkaz: " + shareUrl);
      }
    } else if (card.ctaUrl) {
      window.open(card.ctaUrl, "_blank", "noopener,noreferrer");
    }
  };


  return (
    <div className="min-h-screen">
      <SEO 
        title="Kolekce karet Season 0 | iWau HRA REALITY" 
        description="Sběratelská kronika Season 0 — Awakening. 12 unikátních karet rozdělených do rodin a rarit (Common, Rare, Legendary). Získej svůj status zakládajícího hráče iWau HRA REALITY." 
      />
      {/* 1. HERO SEKCE */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />

        <div className="section-container relative z-10 py-20 text-center max-w-4xl mx-auto">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-display tracking-widest mb-8 uppercase">
              SEASON 0 — AWAKENING
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold leading-tight mb-6">
              Každá hra má svůj původ. <span className="neon-text">Toto je ten náš.</span>
            </h1>
            <div className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>12 artefaktů. Každý odkrývá kousek příběhu, který většina lidí ještě nezná. Sbírej je, odemykej lore a staň se součástí první generace hráčů — té, která byla u samého začátku, ještě než se otevřely dveře pro širokou veřejnost.</p>
              <p className="text-primary font-bold text-xl sm:text-2xl">Season 0 se neopakuje. A artefakty z ní taky ne.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://discord.gg/MGnNWkcqQf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] min-h-[44px] w-full sm:w-auto justify-center"
              >
                Vstoupit na Discord →
              </a>
              <a
                href="#album"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary/50 border border-border/60 hover:bg-secondary text-foreground font-display font-bold text-sm rounded-xl transition-all min-h-[44px] w-full sm:w-auto"
              >
                Prohlédnout karty
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="hud-line" />

      {/* 2. CO JE COLLECTION */}
      <section className="py-24 bg-card/10">
        <div className="section-container max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 text-left">
              <FadeIn>
                <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-display tracking-widest mb-6 uppercase">
                  O Season 0
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  Co je <span className="neon-text">Collection?</span>
                </h2>
                <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                  <p>
                    Rozhodně to nejsou jen obyčejné karty. Každý artefakt je kus reálné historie Hry Reality — klíčový moment, rozhodnutí, postava, která změnila směr celého projektu.
                  </p>
                  <p>
                    Kdo je nyní sbírá, nesbírá random obrázky. Buduješ si pozici, kterou později už nepůjde získat. Status zakládajícího hráče. Přístup k věcem, které ostatní neuvidí.
                  </p>
                  <p className="text-foreground font-medium border-l-2 border-primary/30 pl-3 italic text-lg sm:text-xl">
                    A trvalý důkaz, že jsi byl uvnitř od Season 0.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-3 gap-6">
              {/* Pilíř 1 - Historie */}
              <FadeIn delay={0.1}>
                <div className="glass-card p-8 h-full border-white/5 bg-background/40 flex flex-col items-center text-center">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-5">
                    <History size={28} />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2 uppercase tracking-wide">Historie</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Každá karta zachycuje aktivitu a reálný moment ze vzniku hry. Ne fikci. Skutečnost.
                  </p>
                </div>
              </FadeIn>

              {/* Pilíř 2 - Status */}
              <FadeIn delay={0.2}>
                <div className="glass-card p-8 h-full border-white/5 bg-background/40 flex flex-col items-center text-center">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-5">
                    <Award size={28} />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2 uppercase tracking-wide">Status</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Limitovaná edice = pozice mezi prvními. A první mají vždycky náskok.
                  </p>
                </div>
              </FadeIn>

              {/* Pilíř 3 - Identita */}
              <FadeIn delay={0.3}>
                <div className="glass-card p-8 h-full border-white/5 bg-background/40 flex flex-col items-center text-center">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-5">
                    <Fingerprint size={28} />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2 uppercase tracking-wide">Identita</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tvoje kolekce = tvůj profil. Jak tě vidí ostatní hráči, záleží na tom, co reálně máš.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <div className="hud-line" />

      {/* 3. ALBUM — 12 KARET */}
      <section id="album" className="py-24 relative">
        <div className="section-container max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-display tracking-widest mb-6 uppercase">
                ALBUM KARET
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                Season 0 <span className="neon-text">Kolekce</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                12 artefaktů. 4 rodiny. Každá karta je kousek příběhu, který se právě píše. Otázka zní — sesbíráš všechny, než se Season 0 uzavře?
              </p>
            </div>
          </FadeIn>

          <div className="space-y-20">
            {cardFamilies.map((family) => (
              <div key={family.id} className="space-y-6">
                <FadeIn delay={0.05}>
                  <div className="border-b border-white/10 pb-5 mb-10">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-widest uppercase mb-2">
                      {family.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line">{family.description}</p>
                  </div>
                </FadeIn>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {family.cards.map((card, cardIdx) => (
                    <FadeIn key={card.name} delay={cardIdx * 0.1}>
                      <CollectionCard
                         name={card.name}
                         family={card.family}
                         lore={card.previewText}
                         rarity={card.rarity}
                         edition={card.edition}
                         src={card.src}
                         isLocked={card.isLocked}
                         onClick={() => setSelectedCard(card)}
                      />
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hud-line" />

      {/* 4. JAK ZÍSKAT KARTIČKY */}
      <section className="py-24 bg-card/5 relative">
        <div className="section-container max-w-4xl">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-display tracking-widest mb-6 uppercase">
                SBĚRATELSKÝ MANUÁL
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Každá karta má svou <span className="neon-text">vlastní cestu</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Žádná ti nespadne jen tak do klína, ale žádná tě taky nebude stát víc než pouhou akci.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {obtainingWays.map((way, i) => (
              <FadeIn key={way.title} delay={i * 0.05}>
                <div className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-white/5 bg-background/30 hover:border-white/10 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border bg-white/5 border-white/10 text-white/50">
                      <CheckCircle2 size={22} />
                    </div>
                    <div>
                      <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-wide flex items-center gap-2.5 text-foreground">
                        {way.title}
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1.5">{way.desc}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold font-display px-2.5 py-1 rounded uppercase tracking-wider border shrink-0 bg-white/5 text-white/50 border-white/10">
                    {way.type}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="hud-line" />

      {/* 5. CTA SEKCE */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Kolik artefaktů už <span className="neon-text">máš?</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto">
              Přihlaš se přes Discord, zkontroluj svoji kolekci a podívej se, jak daleko už jsi došel. Tvůj progres. Tvoje karty. Tvůj status. Všechno na jednom místě.
            </p>
            <a
              href="https://album.hrareality.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-primary text-primary-foreground font-display font-bold text-lg rounded-2xl pulse-glow hover:brightness-110 transition-all w-full sm:w-auto shadow-lg shadow-primary/20"
            >
              Otevřít album →
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Přesměrování na album.hrareality.cz
            </p>
          </FadeIn>
        </div>
      </section>

      {/* DYNAMIC DETAIL MODAL */}
      {createPortal(
        <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md"
          >
            {/* Kliknutí mimo zavře modal */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedCard(null)} />

            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-3xl w-full max-h-[92vh] overflow-y-auto glass-card border border-white/15 bg-[#0b0c10] shadow-[0_0_50px_rgba(168,85,247,0.18)] rounded-2xl z-10 flex flex-col md:flex-row scrollbar-thin"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-lg bg-black/60 border border-white/20 text-slate-400 hover:text-white transition-colors"
                aria-label="Zavřít"
              >
                <X size={18} />
              </button>

              {/* Levá část: Obrázek karty s rozostřením (náhled) */}
              <div className="w-full md:w-[42%] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 select-none bg-black/40 p-6 md:p-8 gap-4 relative shrink-0">
                <div className="w-full aspect-[7/10] relative rounded-xl overflow-hidden border border-white/15 shadow-2xl">
                  {selectedCard.src ? (
                    <div className="relative w-full h-full">
                      <img
                        src={selectedCard.src}
                        alt={selectedCard.name}
                        className="w-full h-full object-cover filter blur-[0.5px] brightness-[0.8] contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-black/60 border border-white/25 flex items-center justify-center shadow-lg">
                          <Lock size={22} className="text-white/80" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
                      <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative z-10">
                        <Lock className="text-white/30 w-7 h-7" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Status a edice pod obrázkem */}
                <div className="text-center space-y-1 w-full">
                  <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                    {selectedCard.edition}
                  </div>
                  <div className="text-xs font-bold font-display tracking-widest text-primary/90 uppercase">
                    ⬡ {selectedCard.statusBadge}
                  </div>
                </div>
              </div>

              {/* Pravá část: Detaily a CTA */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Horní hlavička karty */}
                  <div className="pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap justify-between pr-8">
                      <h3 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
                        {selectedCard.name}
                      </h3>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border tracking-wider uppercase ${
                        selectedCard.rarity === "LEGENDARY"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : selectedCard.rarity === "RARE"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-white/5 text-white/70 border-white/15"
                      }`}>
                        {selectedCard.rarity === "LEGENDARY" && <Sparkles size={10} className="inline mr-1 text-amber-400" />}
                        {selectedCard.rarity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 tracking-widest uppercase">
                      <span>RODINA: {selectedCard.familyName}</span>
                      <span>·</span>
                      <span>{selectedCard.edition}</span>
                    </div>
                  </div>

                  {/* Citát */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <p className="text-sm text-slate-200 leading-relaxed italic font-serif">
                      „{selectedCard.quote}“
                    </p>
                  </div>

                  {/* CO JE TO */}
                  <div>
                    <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest block mb-1">
                      CO JE TO?
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {selectedCard.whatIsIt}
                    </p>
                  </div>

                  {/* CESTA K ARTEFAKTU */}
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span>{selectedCard.howToGetIcon}</span>
                      CESTA K ARTEFAKTU
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedCard.howToGetText}
                    </p>

                    {/* Podmínky / Checkboxy */}
                    {selectedCard.conditions && (
                      <div className="pt-2 space-y-1.5 border-t border-white/5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                          PODMÍNKY:
                        </span>
                        {selectedCard.conditions.map((cond, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="text-primary font-bold">◉</span>
                            <span>{cond}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Progress */}
                    {selectedCard.progress && (
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                          PROGRESS:
                        </span>
                        <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-md border border-primary/20 inline-block">
                          {selectedCard.progress}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* DOSTUPNOST */}
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                      DOSTUPNOST:
                    </span>
                    <div>
                      {getAvailabilityBadge(selectedCard.availabilityType, selectedCard.availability)}
                    </div>
                    {selectedCard.availabilityNote && (
                      <p className="text-[11px] text-muted-foreground mt-2 italic leading-relaxed">
                        {selectedCard.availabilityNote}
                      </p>
                    )}
                  </div>
                </div>

                {/* Spodní akční tlačítka */}
                <div className="space-y-3 mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleCtaClick(selectedCard)}
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] cursor-pointer"
                  >
                    {selectedCard.ctaAction === "discord" && <MessageSquare size={17} />}
                    {selectedCard.ctaAction === "web" && <ExternalLink size={17} />}
                    {selectedCard.ctaAction === "album" && <ExternalLink size={17} />}
                    {selectedCard.ctaAction === "share" && <Share2 size={17} />}
                    {selectedCard.ctaText}
                  </button>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="w-full py-2.5 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Zavřít detail
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
