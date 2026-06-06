import { ArrowRight, History, Award, Fingerprint, HelpCircle, Users, Zap, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import CollectionCard from "@/components/CollectionCard";

// Definice rodin a karet pro Season 0
const cardFamilies = [
  {
    id: "awakening",
    name: "I. AWAKENING",
    description: "Začátek všeho. Momenty, kdy se z NPC stává hráč.",
    cards: [
      {
        name: "Zrození hráče",
        family: "AWAKENING",
        lore: "Ten moment, kdy ti dojde, že realita kolem tebe není jen nějaká kulisa. Je to hřiště. A ty ses právě rozhodl vstoupit do hry.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "První Signál",
        family: "AWAKENING",
        lore: "Frekvence, kterou zachytíš jen jednou. Kód vyslaný z hlubin sítě, po kterém už nic neuvidíš stejně jako doteď.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Loop Breaker",
        family: "AWAKENING",
        lore: "Nástroj, který rozbíjí dějový cyklus. Konec autopilota. Konec scrollování. První vědomý krok do neznáma.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
    ],
  },
  {
    id: "postavy_iwau",
    name: "II. POSTAVY iWAU",
    description: "Svět Hry Reality nepostavil jen jeden člověk. Tyhle tři postavy stály u jeho úplného zrodu. A každá z nich tě bude provázet trošku jiným způsobem.",
    cards: [
      {
        name: "Zaya",
        family: "POSTAVY_IWAU",
        lore: "Záhadná. Tichá. Vždycky o krok napřed. Zaya vidí trhlinie v systému, které ostatní nevidí — a pokud ji potkáš, znamená to, že jsi připravený vidět něco navíc.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Temný Mág",
        family: "POSTAVY_IWAU",
        lore: "Strážce všeho, co nechceš řešit. Komfortní zóna, výmluvy, autopilot — to je jeho teritorium. Nepřekonáš ho tím, že ho ignoruješ. Překonáš ho tím, že splníš quest, i když se ti zrovna nechce.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Dr. Wetom",
        family: "POSTAVY_IWAU",
        lore: "Nikdo přesně neví, kdo to je. Ale jeho kód drží pravidla celého světa. Říká se, že ti, kdo rozluští jeho systém, uvidí Hru Reality tak, jak ji nevidí nikdo jiný.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
    ],
  },
  {
    id: "glitch",
    name: "III. GLITCH",
    description: "Chyby v systému. Trhliny v realitě. Momenty, kdy to, co považuješ za normální, přestane dávat smysl — a ty začneš vidět věci jinak.",
    cards: [
      {
        name: "Driptor",
        family: "GLITCH",
        lore: "Když šedý průměr dostane pořádnou pecku. Driptor je estetický glitch — důkaz, že jinak neznamená špatně. Znamená to líp.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Toilex",
        family: "GLITCH",
        lore: "Zrozený v nejtemnějších koutech glitch zóny. Absurdní. Vtipný. A přesně proto nebezpečný pro každého, kdo sám sebe bere příliš vážně. Humor využívá jako zbraň proti tlaku okolí.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Zlooper",
        family: "GLITCH",
        lore: "Uvězněný v časové smyčce. Každý den stejný. Každý den znovu. Zlooper je varování — tohle se stane, když přestaneš jednat a necháš autopilota řídit za tebe.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
    ],
  },
  {
    id: "relics",
    name: "IV. RELICS",
    description: "Každý svět má své relikvie — věci, které drží realitu pohromadě. Tyhle jsou z Season 0. A některé z nich ještě nikdo neobjevil.",
    cards: [
      {
        name: "Discord Portal",
        family: "RELICS",
        lore: "První stabilní spojení mezi hráči. Portál, který otevřel cestu pro všechno, co přišlo až později. Bez něj by Hra Reality zůstala jen nápadem v hlavě jednoho člověka.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
      {
        name: "MVP1 Bridge",
        family: "RELICS",
        lore: "Surový. Nedokonalý. Funkční. Most mezi vizí a realitou — první technická verze, na které stojí všechno, co dnes vidíš. Kdo po něm prošel, ví, jak to vypadalo na začátku.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "???",
        family: "RELICS",
        lore: "Informace uzamčeny. Tento artefakt ještě neexistuje — nebo možná jo. Jen ho zatím nikdo nenašel.",
        edition: "FIRST_EDITION",
        isLocked: true,
      },
    ],
  },
  {
    id: "christmas_2025",
    name: "V. VÁNOČNÍ DROP 2025",
    description: "Zima 2025. Něco se změnilo v síti. Tři artefakty, které z toho zůstaly — a které drží jen ti, kdo byli online ve správný čas.",
    cards: [
      {
        name: "Dárek od Dr. Wetoma",
        family: "CHRISTMAS_2025",
        lore: "Nikdo nečekal, že se ozve. Přesto — uprostřed vánočního cyklu dorazil balíček přímo od architekta. Nebugovací nástroj zabalený jako dárek. Od koho? Pro koho? Odpovědi jsou uvnitř něj.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
      {
        name: "Vánoční Glitch",
        family: "CHRISTMAS_2025",
        lore: "Přetížení. Kolaps. A v tom na zlomek sekundy — zmrzlý kód, který tam ani neměl být. Svátky rozbily síť a ta nakonec odhalila něco, co mělo zůstat skryté.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
      {
        name: "Kód Naděje",
        family: "CHRISTMAS_2025",
        lore: "Zimní slunovrat. Zašifrovaná zpráva v síti. Žádný odesílatel. Žádný kontext. Jen kód — a ti, kdo ho rozluštili, vědí víc než ostatní. Tenhle artefakt je jejich důkazem.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
    ],
  },
];


// Způsoby získání karet
const obtainingWays = [
  {
    title: "→ Dokonči onboarding",
    desc: "První karta je tvoje do 5 minut. Žádný háček. Vstoupíš, projdeš onboarding, máš ji.",
    type: "FREE",
  },
  {
    title: "→ Dosáhni Level 1 na Discordu",
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
    title: "→ Buduj komunitu",
    desc: "Dropy pro ty, kdo se nejvíce zapojují. Žádné metriky, žádné KPI — systém pozná, kdo je reálně aktivní.",
    type: "BONUS",
  },
  {
    title: "FOUNDER DROP — FIRST GENERATION",
    desc: "Jediná věc, kterou si tady koupíš za peníze. Speciální vizuální rám, trvalý zápis do archivu hry a přednost na MVP waitlistu. 199 Kč za místo v historii Season 0. Buď jsi founder, nebo prostě nejsi.",
    type: "199 Kč",
    isPremium: true,
  },
];

export default function Collection() {

  return (
    <div className="min-h-screen">
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
                  O PROJEKTU
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  Co je <span className="neon-text">Collection</span>?
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
                    Každá karta zachycuje reálný moment ze vzniku hry. Ne fikci. Skutečnost.
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
            {cardFamilies.map((family, familyIdx) => (
              <div key={family.id} className="space-y-6">
                <FadeIn delay={0.05}>
                  <div className="border-b border-white/10 pb-5 mb-10">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-widest uppercase mb-2">
                      {family.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{family.description}</p>
                  </div>
                </FadeIn>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {family.cards.map((card, cardIdx) => (
                    <FadeIn key={card.name} delay={cardIdx * 0.1}>
                      <CollectionCard
                         name={card.name}
                         family={card.family}
                         lore={card.lore}
                         edition={card.edition}
                         isLocked={card.isLocked}
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
                <div
                  className={`glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border transition-all duration-300 ${
                    way.isPremium
                      ? "border-amber-500/30 bg-amber-500/[0.02] hover:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                      : "border-white/5 bg-background/30 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        way.isPremium
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-white/5 border-white/10 text-white/50"
                      }`}
                    >
                      {way.isPremium ? <Zap size={22} /> : <CheckCircle2 size={22} />}
                    </div>
                    <div>
                      <h4
                        className={`font-display text-base sm:text-lg font-bold uppercase tracking-wide flex items-center gap-2.5 ${
                          way.isPremium ? "text-amber-400" : "text-foreground"
                        }`}
                      >
                        {way.title}
                        {way.isPremium && (
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-body">
                            SPECIÁLNÍ
                          </span>
                        )}
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1.5">{way.desc}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold font-display px-2.5 py-1 rounded uppercase tracking-wider border shrink-0 ${
                      way.isPremium
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-white/5 text-white/50 border-white/10"
                    }`}
                  >
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
    </div>
  );
}
