import FadeIn from "@/components/FadeIn";
import { useFounderCounter } from "@/hooks/useFounderCounter";
import { scrollToId } from "@/lib/utils";

export default function FounderHero() {
  const { data: counter } = useFounderCounter();
  const count = counter?.count ?? 0;
  const cap = counter?.cap ?? 1000;
  const nextMilestone = counter?.nextMilestone ?? 50;
  const progressPct = Math.min(100, (count / cap) * 100);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden pt-12 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="section-container relative z-10">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8">
              SEASON 0 · PRVNÍ GENERACE iWAU HRY REALITY
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Staň se součástí <span className="neon-text">první kapitoly</span> iWau Hry Reality.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Budujeme prostředí, který lidi přiměje jednat a růst, formou hry v reálném světě. Právě teď dokončujeme první hratelnou verzi — a otevíráme možnost být u toho jako Founder. Ne jako zákazník, ale jako člověk, který stál u úplného začátku.
            </p>

            {/* Tomášova promluva — zvětšeno a zvýrazněno (klientský feedback: "rozšířit,
                udělat víc viditelné"), text beze změny, jen vizuální důraz. */}
            <div className="glass-card-hover p-7 sm:p-10 border-primary/30 border-l-4 border-l-primary text-left mb-8 max-w-2xl mx-auto relative">
              <span className="absolute top-4 left-6 text-6xl leading-none text-primary/20 font-display select-none" aria-hidden>
                „
              </span>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed relative">
                Ahoj, jmenuji se Tomáš. Posledních několik let pracujeme na iWau Hře Reality — prostředí, které propojuje principy her, osobního růstu s reálným životem. Naším cílem je přestat jen informovat a vzdělávat dalšími kurzy a videi, ale vytvořit prostředí, které hráče přiměje jednat. Právě teď dokončujeme Season 1 (MVP1) a poprvé zveme lidi dovnitř.
              </p>
              <p className="mt-4 text-sm text-primary font-display font-bold">— Tomáš, zakladatel iWau Hry Reality</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button
                onClick={() => scrollToId("balicky")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all min-h-[44px]"
              >
                Chci být u začátku →
              </button>
              <button
                onClick={() => scrollToId("pribeh")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary/50 border border-primary/20 hover:bg-secondary text-foreground font-display font-bold text-sm rounded-xl hover:border-primary/50 transition-all min-h-[44px]"
              >
                Přečíst si příběh iWau Hrou Reality
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-12">
              Jednorázová podpora od 149 Kč. Founder Membership není investice ani měsíční předplatné.
            </p>

            {/* Progress box — roztaženo (klientský feedback: "klidně víc roztáhnout"),
                dynamicky ze stejného /api/founder/counter jako Sekce 08, viz counter.js. */}
            <div className="glass-card-hover p-8 sm:p-10 border-primary/30 max-w-xl mx-auto text-left">
              <p className="text-xs uppercase tracking-widest text-primary mb-1 font-display">První generace právě vzniká</p>
              <h2 className="text-xl font-display font-bold mb-5">Season 0 se plní</h2>
              <p className="text-4xl sm:text-5xl font-display font-bold mb-3">
                {count.toLocaleString("cs-CZ")} <span className="text-muted-foreground text-lg font-body font-normal">/ 1 000 Founderů</span>
              </p>
              <div className="h-3 w-full rounded-full bg-secondary overflow-hidden mb-3">
                <div className="h-full bg-primary transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Každý Founder přibližuje Season 1 (MVP1) k jejímu spuštění.</p>
              <p className="text-sm text-primary font-medium mb-3">Další milník: {nextMilestone.toLocaleString("cs-CZ")} Founderů</p>
              <p className="text-xs text-muted-foreground">Počítají se pouze dokončené a uhrazené Founder Membershipy.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
