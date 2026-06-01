import { ArrowRight, Target, Locate, Compass } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Start() {
  return (
    <div className="min-h-screen">

      {/* SEKCE 6 — VIZE, MISE, CÍL */}
      <section className="py-24 flex items-center bg-card/10">
        <div className="section-container max-w-6xl">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-12 uppercase">
              Vize & Mise
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Box 1 - Vize */}
            <FadeIn delay={0.1}>
              <div className="glass-card-hover p-10 h-full border border-primary/20 flex flex-col bg-background/50">
                <Target className="text-primary mb-6" size={40} />
                <h3 className="font-display text-2xl font-bold mb-6">Vize</h3>
                <p className="text-muted-foreground mb-4 text-xl">Nevytváříme další aplikaci.</p>
                <p className="text-foreground font-medium mb-4 text-xl">→ vytváříme prostředí, ve kterém:</p>
                <ul className="space-y-4 text-muted-foreground mb-12 text-xl">
                  <li>akce = progres</li>
                  <li>progres = status</li>
                  <li>status = reálný důvod pokračovat</li>
                </ul>
                <p className="text-primary font-bold mt-auto pt-6 border-t border-border/50 text-2xl leading-relaxed">
                  Prostředí, které tě přirozeně dostane do pohybu.
                </p>
              </div>
            </FadeIn>

            {/* Box 2 - Mise */}
            <FadeIn delay={0.2}>
              <div className="glass-card-hover p-10 h-full border border-primary/20 flex flex-col bg-background/50">
                <Compass className="text-primary mb-6" size={40} />
                <h3 className="font-display text-2xl font-bold mb-6">Mise</h3>
                <p className="text-muted-foreground mb-4 text-xl">
                  Pomoci lidem přestat jen sledovat svůj život<br />
                  a začít ho reálně žít.
                </p>
                <p className="text-muted-foreground mb-4 text-xl mt-auto">Ne teorií.</p>
                <p className="text-primary font-bold text-2xl pt-6 border-t border-border/50">
                  → akcí
                </p>
              </div>
            </FadeIn>

            {/* Box 3 - Cíl */}
            <FadeIn delay={0.3}>
              <div className="glass-card-hover p-10 h-full border border-primary/20 flex flex-col bg-background/50">
                <Locate className="text-primary mb-6" size={40} />
                <h3 className="font-display text-2xl font-bold mb-6">Cíl</h3>
                <p className="text-muted-foreground mb-6 text-xl">
                  Vytvořit prostředí, které bude dávat smysl generaci, která přichází.
                </p>
                <p className="text-foreground font-medium mb-4 text-xl">Generaci, která:</p>
                <ul className="space-y-3 text-muted-foreground mb-8 text-xl">
                  <li>nechce jen obsah</li>
                  <li>nechce jen rady</li>
                  <li>nechce jen „motivaci“</li>
                </ul>
                <div className="mt-auto space-y-4 pt-6 border-t border-border/50 text-primary font-bold text-2xl">
                  <p>→ chce něco zažít</p>
                  <p>→ chce něco změnit</p>
                  <p>→ chce být součástí něčeho</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEKCE 7 — PROČ PRÁVĚ TEĎ */}
      <section className="py-24 bg-primary/5">
        <div className="section-container max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-12">
              Proč <span className="neon-text">právě teď</span>
            </h2>
            <p className="text-2xl text-foreground font-medium mb-8">Protože:</p>
            <ul className="space-y-4 text-xl text-muted-foreground mb-16">
              <li>starý způsob nefunguje</li>
              <li>naše pozornost je rozbitá</li>
              <li>a lidi hledají něco jiného a nového</li>
            </ul>
            <div className="inline-block p-8 glass-card border-primary/30 rounded-3xl w-full sm:w-auto bg-background/60">
              <p className="text-xl sm:text-2xl text-primary font-bold uppercase tracking-widest leading-relaxed">
                A tohle je moment,<br />kdy to může vzniknout.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SEKCE 8 — KDE JSI TY */}
      <section className="py-24 relative overflow-hidden bg-card/10">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-border/5 to-transparent" />
        <div className="section-container max-w-3xl relative z-10 text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-12">
              Kde jsi <span className="neon-text">ty</span>
            </h2>
            <div className="text-xl text-muted-foreground space-y-8 mb-16">
              <p className="text-2xl text-foreground font-display font-bold">Tohle je začátek.</p>
              <p>Můžeš:</p>
              <div className="space-y-4 font-medium text-foreground text-lg max-w-md mx-auto">
                <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-primary/20">
                  <ArrowRight className="text-primary shrink-0" size={24} />
                  <span className="text-left w-full">počkat, až to bude hotové</span>
                </div>
                <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-primary/20">
                  <ArrowRight className="text-primary shrink-0" size={24} />
                  <span className="text-left w-full">nebo být u toho, když to vzniká</span>
                </div>
              </div>
            </div>

            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-12 py-5 bg-primary/10 border border-primary/50 text-primary font-display font-bold text-xl rounded-xl hover:bg-primary/20 transition-colors"
            >
              Chci být u toho
            </a>
          </FadeIn>
        </div>
      </section>

      {/* SEKCE 9 — REALITA */}
      <section className="py-32 bg-primary/5 relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="section-container max-w-4xl text-center relative z-10">
          <FadeIn>
            <h2 className="text-5xl sm:text-6xl font-display font-bold mb-16 opacity-50 text-foreground uppercase tracking-widest">
              Realita?
            </h2>
            <div className="space-y-6 text-2xl sm:text-3xl text-muted-foreground mb-16 font-display font-bold leading-tight">
              <p>Nebude to perfektní.</p>
              <p>Nebude to hned velké.</p>
              <p className="text-primary neon-text py-6 text-3xl sm:text-4xl">→ ale bude to reálné</p>
            </div>
            <p className="text-xl sm:text-2xl font-display uppercase tracking-[0.2em] text-foreground opacity-80 border-t border-border/50 pt-16 max-w-xl mx-auto">
              A to je přesně ta pointa.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="hud-line" />

      {/* ZÁVĚREČNÉ CTA */}
      <section className="py-24">
        <div className="section-container text-center max-w-3xl">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-10">
              Buď u toho <span className="neon-text">od začátku</span>
            </h2>
            <div className="text-xl text-muted-foreground space-y-3 mb-16">
              <p>Možná je to začátek něčeho většího.</p>
              <p>Možná jen další krok.</p>
              <p className="text-foreground font-medium pt-6">To zjistíš, až vstoupíš.</p>
            </div>

            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center justify-center gap-2 px-14 py-6 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all w-full sm:w-auto"
            >
              <div className="flex items-center gap-3 text-2xl">
                Vstoupit do hry
                <ArrowRight size={24} />
              </div>
              <span className="text-xs font-medium opacity-80 font-body uppercase tracking-wider">Přístup pro první hráče</span>
            </a>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
