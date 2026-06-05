import { ArrowRight, History, Award, Fingerprint, HelpCircle, Users, Zap, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import CollectionCard from "@/components/CollectionCard";

// Definice rodin a karet pro Season 0
const cardFamilies = [
  {
    id: "awakening",
    name: "I. AWAKENING",
    description: "Artefakty ze zrození prvních hráčů a probuzení ze smyčky.",
    cards: [
      {
        name: "Zrození hráče",
        family: "AWAKENING",
        lore: "Moment, kdy si poprvé uvědomíš, že realitu kolem sebe můžeš začít aktivně hrát.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "První Signál",
        family: "AWAKENING",
        lore: "Zachycená frekvence vysílaná z hlubin digitální sítě. Kód, který změnil vše.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Loop Breaker",
        family: "AWAKENING",
        lore: "Nástroj určený k narušení každodenního stereotypu a probuzení z nekonečného scrollu.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
    ],
  },
  {
    id: "postavy_iwau",
    name: "II. POSTAVY iWAU",
    description: "Klíčové postavy a archetypy formující počátky světa.",
    cards: [
      {
        name: "Zaya",
        family: "POSTAVY_IWAU",
        lore: "Záhadná průvodkyně světem Hry Reality. Vidí trhliny v systému dřív než ostatní.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Temný Mág",
        family: "POSTAVY_IWAU",
        lore: "Strážce stínů a zosobnění odporu, který tě nutí překonávat vlastní komfortní zónu.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Dr. Wetom",
        family: "POSTAVY_IWAU",
        lore: "Architekt systému. Postava, jejíž kód drží pravidla celé této hry pohromadě.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
    ],
  },
  {
    id: "glitch",
    name: "III. GLITCH",
    description: "Chyby v matrixu reality, které odhalují skryté příležitosti.",
    cards: [
      {
        name: "Driptor",
        family: "GLITCH",
        lore: "Vizualizace estetického glitchu. Když styl naruší šedou průměrnost.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Toilex",
        family: "GLITCH",
        lore: "Narozen v hlubinách glitch zóny. Humor a absurdita jako štít proti tlaku okolí.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "Zlooper",
        family: "GLITCH",
        lore: "Glitch entita uvězněná v nekonečné časové smyčce. Varování pro ty, co přestanou jednat.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
    ],
  },
  {
    id: "relics",
    name: "IV. RELICS",
    description: "Vzácné relikvie a brány spojující herní světy.",
    cards: [
      {
        name: "Discord Portal",
        family: "RELICS",
        lore: "První stabilní most spojující hráče z celého světa v reálném čase.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
      {
        name: "MVP1 Bridge",
        family: "RELICS",
        lore: "Doklad o účasti na první technické verzi Collection platformy.",
        edition: "BASE",
        isLocked: false,
      },
      {
        name: "???",
        family: "RELICS",
        lore: "Tajná karta. Informace o tomto artefaktu jsou zatím zahaleny tajemstvím.",
        edition: "FIRST_EDITION",
        isLocked: true,
      },
    ],
  },
  {
    id: "christmas_2025",
    name: "V. VÁNOČNÍ DROP 2025",
    description: "Časově limitované zimní relikvie a dešifrované poselství.",
    cards: [
      {
        name: "Dárek od Dr. Wetoma",
        family: "CHRISTMAS_2025",
        lore: "Speciální debugovací balíček doručený přímo od architekta systému během vánočního cyklu 2025.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
      {
        name: "Vánoční Glitch",
        family: "CHRISTMAS_2025",
        lore: "Narušení sítě způsobené přetížením serverů během svátků. Zmrzlý kód v čase.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
      {
        name: "Kód Naděje",
        family: "CHRISTMAS_2025",
        lore: "Zašifrovaná zpráva odeslaná do sítě během zimního slunovratu. Důkaz o dešifrování zimního poselství.",
        edition: "FIRST_EDITION",
        isLocked: false,
      },
    ],
  },
];


// Způsoby získání karet
const obtainingWays = [
  {
    title: "Onboarding",
    desc: "Získej svou úplně první kartu ihned po dokončení úvodního onboardingu zdarma.",
    type: "Free",
  },
  {
    title: "Level 1 v Discordu",
    desc: "Připoj se do naší Discord komunity a aktivním zapojením dosáhni prvního milníku.",
    type: "Aktivita",
  },
  {
    title: "Real World Questy",
    desc: "Plň výzvy ve svém skutečném životě, nahraj důkazy a odemkni exkluzivní artefakty.",
    type: "Akce",
  },
  {
    title: "Referral systém",
    desc: "Pozvi do Hry Reality své přátele a získej odměnu za každého nově probuzeného hráče.",
    type: "Komunita",
  },
  {
    title: "MVP Waitlist",
    desc: "Zapiš se na čekací listinu pro early access a buď mezi prvními s přístupem do platformy.",
    type: "Early Access",
  },
  {
    title: "Aktivita v komunitě",
    desc: "Speciální dropy pro nejaktivnější přispěvatele, tvůrce obsahu a pomocníky v začátcích.",
    type: "Bonus",
  },
  {
    title: "Founder drop — FIRST GENERATION",
    desc: "Exkluzivní zakladatelský balíček za 199 Kč. Obsahuje speciální vizuální rám karty, archivní zápis do historie hry a trvalou prioritu v MVP waitlistu.",
    type: "Premium",
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
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8 uppercase">
              SEASON 0 — AWAKENING
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold leading-tight mb-6">
              Zrození <span className="neon-text">hráčů</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              **12 artefaktů. První generace hráčů. Archiv historie Hry Reality.**
              <br />
              Sbírej karty, odemykej lore pozadí a buduj svůj status od samého počátku.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://discord.gg/MGnNWkcqQf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] min-h-[44px] w-full sm:w-auto justify-center"
              >
                Připoj se na Discord
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
                <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-display tracking-widest mb-6 uppercase">
                  O PROJEKTU
                </div>
                <h2 className="text-3xl font-display font-bold mb-6">
                  Co je <span className="neon-text">Collection</span>?
                </h2>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    Collection není jen o hezkých obrázcích. Každý jednotlivý artefakt reprezentuje klíčový moment, těžké rozhodnutí nebo ikonickou postavu ze samotného vzniku Hry Reality.
                  </p>
                  <p>
                    Sběrem těchto karet si nezapisuješ pouze virtuální trofeje. Buduješ si trvalou stopu, která v budoucnu určí tvé postavení a exkluzivní výhody v celém našem ekosystému.
                  </p>
                  <p className="text-foreground font-medium border-l-2 border-primary/30 pl-3 italic">
                    Season 0 slouží jako nezpochybnitelný archiv první generace hráčů.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-3 gap-6">
              {/* Pilíř 1 - Historie */}
              <FadeIn delay={0.1}>
                <div className="glass-card p-6 h-full border-white/5 bg-background/40 flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-4">
                    <History size={24} />
                  </div>
                  <h3 className="font-display font-bold text-sm mb-2 uppercase tracking-wide">Historie</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Každá karta nese otisk reálného momentu z vývoje a vzniku celého světa.
                  </p>
                </div>
              </FadeIn>

              {/* Pilíř 2 - Status */}
              <FadeIn delay={0.2}>
                <div className="glass-card p-6 h-full border-white/5 bg-background/40 flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-4">
                    <Award size={24} />
                  </div>
                  <h3 className="font-display font-bold text-sm mb-2 uppercase tracking-wide">Status</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Vlastnictví limitovaných edic potvrzuje tvoji pozici mezi zakládajícími hráči.
                  </p>
                </div>
              </FadeIn>

              {/* Pilíř 3 - Identita */}
              <FadeIn delay={0.3}>
                <div className="glass-card p-6 h-full border-white/5 bg-background/40 flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-4">
                    <Fingerprint size={24} />
                  </div>
                  <h3 className="font-display font-bold text-sm mb-2 uppercase tracking-wide">Identita</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sestav si svůj profil, odliš se od ostatních a získej unikátní postavení.
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
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-display tracking-widest mb-6 uppercase">
                ALBUM KARET
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Kolekce <span className="neon-text">Season 0</span>
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
                Kompletní přehled všech 12 artefaktů rozdělených do čtyř základních rodin. Dokážeš je získat všechny a zkompletovat tak archiv?
              </p>
            </div>
          </FadeIn>

          <div className="space-y-20">
            {cardFamilies.map((family, familyIdx) => (
              <div key={family.id} className="space-y-6">
                <FadeIn delay={0.05}>
                  <div className="border-b border-white/10 pb-4 mb-8">
                    <h3 className="font-display text-xl font-bold text-foreground tracking-widest uppercase mb-1">
                      {family.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{family.description}</p>
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
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-display tracking-widest mb-6 uppercase">
                SBĚRATELSKÝ MANUÁL
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">
                Jak získat <span className="neon-text">kartičky</span>?
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                Plň výzvy v digitálním i reálném světě a získej karty do svého alba. Cesty k úspěchu jsou rozmanité.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {obtainingWays.map((way, i) => (
              <FadeIn key={way.title} delay={i * 0.05}>
                <div
                  className={`glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border transition-all duration-300 ${
                    way.isPremium
                      ? "border-amber-500/30 bg-amber-500/[0.02] hover:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                      : "border-white/5 bg-background/30 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        way.isPremium
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-white/5 border-white/10 text-white/50"
                      }`}
                    >
                      {way.isPremium ? <Zap size={18} /> : <CheckCircle2 size={18} />}
                    </div>
                    <div>
                      <h4
                        className={`font-display text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${
                          way.isPremium ? "text-amber-400" : "text-foreground"
                        }`}
                      >
                        {way.title}
                        {way.isPremium && (
                          <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-body">
                            SPECIÁLNÍ
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{way.desc}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-bold font-display px-2 py-0.5 rounded uppercase tracking-wider border shrink-0 ${
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
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Chceš vidět své <span className="neon-text">album</span>?
            </h2>
            <p className="text-muted-foreground text-sm mb-10 leading-relaxed max-w-md mx-auto">
              Přihlas se jednoduše přes svůj **Discord účet**, ověř si svůj status, prohlédni si získané karty a zkontroluj svůj postup v reálném čase.
            </p>
            <a
              href="https://album.hrareality.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-5 bg-primary text-primary-foreground font-display font-bold text-base rounded-xl pulse-glow hover:brightness-110 transition-all w-full sm:w-auto shadow-lg shadow-primary/20"
            >
              Zobrazit své album
              <ArrowRight size={18} />
            </a>
            <p className="mt-4 text-[10px] text-muted-foreground">
              Budete přesměrováni na naši zabezpečenou platformu **album.hrareality.cz**
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
