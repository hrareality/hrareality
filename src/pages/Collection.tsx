import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, History, Award, Fingerprint, HelpCircle, Users, Zap, CheckCircle2, X, Lock, Sparkles, MessageSquare } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import CollectionCard from "@/components/CollectionCard";
import SEO from "@/components/SEO";

// Definice rodin a karet pro Season 0
const cardFamilies = [
  {
    id: "awakening",
    name: "I — AWAKENING",
    description: "Začátek všeho. Momenty, kdy se z NPC stává hráč.",
    cards: [
      {
        name: "Zrození hráče",
        family: "AWAKENING",
        lore: "Moment, kdy si poprvé uvědomíš, že realitu kolem sebe můžeš začít aktivně hrát.",
        rarity: "COMMON",
        src: "/cards/previews/awakening_1_blur.webp",
        isLocked: false,
      },
      {
        name: "První Signál",
        family: "AWAKENING",
        lore: "Zachycená frekvence vysílaná z hlubin digitální sítě. Kód, který změnil vše.",
        rarity: "COMMON",
        src: "/cards/previews/awakening_2_blur.webp",
        isLocked: false,
      },
      {
        name: "Loop Breaker",
        family: "AWAKENING",
        lore: "Nástroj určený k narušení každodenního stereotypu a probuzení z nekonečného scrollu.",
        rarity: "RARE",
        src: "/cards/previews/awakening_3_blur.webp",
        isLocked: false,
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
        lore: "Záhadná průvodkyně světem Hry Reality. Vidí trhliny v systému dřív než ostatní.",
        rarity: "COMMON",
        src: "/cards/previews/postavy_1_blur.webp",
        isLocked: false,
      },
      {
        name: "Temný Mág",
        family: "POSTAVY_IWAU",
        lore: "Strážce stínů a zosobnění odporu, který tě nutí překonávat vlastní komfortní zónu.",
        rarity: "RARE",
        src: "/cards/previews/postavy_2_blur.webp",
        isLocked: false,
      },
      {
        name: "Dr. Wetom",
        family: "POSTAVY_IWAU",
        lore: "Architekt systému. Postava, jejíž kód drží pravidla celé této hry pohromadě.",
        rarity: "LEGENDARY",
        src: "/cards/previews/postavy_3_blur.webp",
        isLocked: false,
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
        lore: "Vizualizace estetického glitchu. Když styl naruší šedou průměrnost.",
        rarity: "COMMON",
        src: "/cards/previews/glitch_1_blur.webp",
        isLocked: false,
      },
      {
        name: "Toilex",
        family: "GLITCH",
        lore: "Narozen v hlubinách glitch zóny. Humor a absurdita jako štít proti tlaku okolí.",
        rarity: "COMMON",
        src: "/cards/previews/glitch_2_blur.webp",
        isLocked: false,
      },
      {
        name: "Zlooper",
        family: "GLITCH",
        lore: "Glitch entita uvězněná v nekonečné časové smyčce. Varování pro ty, co přestanou jednat.",
        rarity: "RARE",
        src: "/cards/previews/glitch_3_blur.webp",
        isLocked: false,
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
        lore: "První stabilní most spojující hráče z celého světa v reálném čase.",
        rarity: "COMMON",
        src: "/cards/previews/relics_1_blur.webp",
        isLocked: false,
      },
      {
        name: "MVP1 Bridge",
        family: "RELICS",
        lore: "Doklad o účasti na první technické verzi Collection platformy.",
        rarity: "RARE",
        src: "/cards/previews/relics_2_blur.webp",
        isLocked: false,
      },
      {
        name: "Generation zero",
        family: "RELICS",
        lore: "Tajná karta. Informace o tomto artefaktu jsou zatím zahaleny tajemstvím.",
        rarity: "LEGENDARY",
        src: "/cards/previews/relics_3_blur.webp",
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
  interface CardType {
    name: string;
    family: string;
    lore: string;
    rarity: string;
    src?: string;
    isLocked?: boolean;
  }

  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const getFamilyStyles = (family: string) => {
    switch (family) {
      case "AWAKENING":
        return {
          glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)] border-purple-500/30",
          text: "text-purple-400 bg-purple-500/10 border-purple-500/20",
          color: "rgb(168, 85, 247)",
        };
      case "POSTAVY_IWAU":
        return {
          glow: "shadow-[0_0_30px_rgba(99,102,241,0.3)] border-indigo-500/30",
          text: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
          color: "rgb(99, 102, 241)",
        };
      case "GLITCH":
        return {
          glow: "shadow-[0_0_30px_rgba(236,72,153,0.3)] border-pink-500/30",
          text: "text-pink-400 bg-pink-500/10 border-pink-500/20",
          color: "rgb(236, 72, 153)",
        };
      case "RELICS":
        return {
          glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)] border-cyan-500/30",
          text: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
          color: "rgb(6, 182, 212)",
        };
      default:
        return {
          glow: "shadow-[0_0_30px_rgba(168,85,247,0.20)] border-primary/20",
          text: "text-primary bg-primary/10 border-primary/20",
          color: "rgb(168, 85, 247)",
        };
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
            {cardFamilies.map((family, familyIdx) => (
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
                         lore={card.lore}
                         rarity={card.rarity}
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

      {/* DYNAMIC DETAIL & CTA MODAL */}
      <AnimatePresence>
        {selectedCard && (() => {
          const styles = getFamilyStyles(selectedCard.family);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            >
              {/* Kliknutí mimo zavře modal */}
              <div className="absolute inset-0 cursor-default" onClick={() => setSelectedCard(null)} />

              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-card border border-white/10 bg-[#0c0c10] shadow-[0_0_50px_rgba(168,85,247,0.15)] rounded-2xl z-10 flex flex-col md:flex-row scrollbar-thin"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 right-4 z-30 p-2 rounded-lg bg-black/40 border border-white/15 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Levá část: Obrázek karty s rozostřením (náhled) */}
                <div className="w-full md:w-[45%] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 select-none bg-black/30 p-5 md:p-8 gap-4 relative shrink-0">
                  <div className="w-full aspect-[7/10] relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    {selectedCard.src ? (
                      <div className="relative w-full h-full">
                        <img
                          src={selectedCard.src}
                          alt={selectedCard.name}
                          className="w-full h-full object-cover filter blur-[0.5px] brightness-[0.75] contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-black/50 border border-white/20 flex items-center justify-center shadow-lg">
                            <Lock size={22} className="text-white/70" />
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
                </div>

                {/* Pravá část: Detaily a Discord CTA */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                          {selectedCard.isLocked ? "Utajený Artefakt" : selectedCard.name}
                        </h3>
                        {!selectedCard.isLocked && (
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border tracking-wider uppercase ${
                            selectedCard.rarity === "LEGENDARY"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : selectedCard.rarity === "RARE"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-white/5 text-white/50 border-white/10"
                          }`}>
                            {selectedCard.rarity === "LEGENDARY" && <Sparkles size={8} className="inline mr-0.5 text-amber-400" />}
                            {selectedCard.rarity}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                        RODINA: {selectedCard.family.replace("_", " ")}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        {selectedCard.isLocked
                          ? "„Pravá identita a moc této relikvie jsou chráněny přísným kódem. Záznamy v archivu budou odhaleny až nastane správný čas.“"
                          : `„${selectedCard.lore}“`
                        }
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {selectedCard.isLocked
                          ? "Tato karta je aktuálně uzamčená. Informace o tom, jak ji získat a odhalit její lícovou i rubovou stranu, budou zveřejněny v průběhu Season 0."
                          : "Tato karta čeká na své odemčení. Všechny karty mají lícovou i rubovou stranu s detailními informacemi o hráčích, které uvidíš po získání ve svém albu."
                        }
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-8">
                    <a
                      href="https://discord.gg/MGnNWkcqQf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 w-full py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)] cursor-pointer"
                    >
                      <MessageSquare size={16} className="inline" />
                      {selectedCard.isLocked ? "Sledovat novinky na Discordu →" : "Jak získat tuto kartu? →"}
                    </a>
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
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
