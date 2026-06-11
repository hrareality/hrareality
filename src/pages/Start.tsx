import { ArrowRight, Target, Locate, Compass } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Start() {
  return (
    <div className="min-h-screen">

      {/* SEKCE 6 — VIZE, MISE, PRO KOHO */}
      <section className="py-24 flex items-center bg-card/10">
        <div className="section-container max-w-6xl">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-12 uppercase">
              Proč to vlastně děláme?
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Box 1 - Vize */}
            <FadeIn delay={0.1}>
              <div className="glass-card-hover p-10 h-full border border-primary/20 flex flex-col bg-background/50">
                <Target className="text-primary mb-6" size={40} />
                <h3 className="font-display text-2xl font-bold mb-6">Vize</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Vytvořit prostředí, kde se nemusíš nutit do akce — protože akce je převlečená za samotnou hru. Uděláš quest, vidíš progres, získáš status. A přirozeně chceš hrát dál.
                </p>
                <p className="text-primary font-bold mt-auto pt-6 border-t border-border/50 text-xl leading-relaxed">
                  Žádné hacky. Žádná manipulace. Jen systém, který funguje tak, jak by mělo fungovat veškeré vzdělávání.
                </p>
              </div>
            </FadeIn>
            
            {/* Box 2 - Mise */}
            <FadeIn delay={0.2}>
              <div className="glass-card-hover p-10 h-full border border-primary/20 flex flex-col bg-background/50">
                <Compass className="text-primary mb-6" size={40} />
                <h3 className="font-display text-2xl font-bold mb-6">Mise</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Zavřít mezeru mezi „vím co dělat“ a „dělám to“.
                </p>
                <p className="text-primary font-bold mt-auto pt-6 border-t border-border/50 text-xl leading-relaxed">
                  Jednoduše. Bez teorie. Bez bullshitu. Quest za questem.
                </p>
              </div>
            </FadeIn>
            
            {/* Box 3 - Pro koho */}
            <FadeIn delay={0.3}>
              <div className="glass-card-hover p-10 h-full border border-primary/20 flex flex-col bg-background/50">
                <Locate className="text-primary mb-6" size={40} />
                <h3 className="font-display text-2xl font-bold mb-6">Pro koho</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Pro generaci, která hodiny denně scrolluje a cítí, že jí to nic nedává a přesto to dělá dál, stále dokola. Generaci, která nechce víc obsahu — chce víc akce.
                </p>
                <p className="text-primary font-bold mt-auto pt-6 border-t border-border/50 text-xl leading-relaxed">
                  Generace, co nehledá motivaci — hledá systém, který motivaci k ničemu nepotřebuje.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEKCE 7 — PROČ ZROZNA TEĎ */}
      <section className="py-24 bg-primary/5">
        <div className="section-container max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-12">
              Proč <span className="neon-text">zrovna teď?</span>
            </h2>
            <div className="text-xl text-muted-foreground space-y-6 mb-12 text-center">
              <p>Starý způsob je mrtvý a nepraktický. Kurzy, videa, motivační posty — nikdo už tomu nevěří. A i kdyby věřil, nefunguje to.</p>
              <p>Pozornost máme navíc úplně v háji. Trpělivost taky. A přesto všichni hledají něco, co by je konečně přimělo se hnout z místa a udělat ten první krok.</p>
            </div>
            <div className="inline-block p-8 glass-card border-primary/30 rounded-3xl w-full sm:w-auto bg-background/60">
              <p className="text-xl sm:text-2xl text-primary font-bold uppercase tracking-widest leading-relaxed">
                Přesně tohle je ta mezera.<br />A iWau HRA REALITY je první, kdo do ní vstupuje.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SEKCE 8 — KDE AKTUÁLNĚ JSI? */}
      <section className="py-24 relative overflow-hidden bg-card/10">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-border/5 to-transparent pointer-events-none" />
        <div className="section-container max-w-3xl relative z-10 text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-12">
              Kde aktuálně <span className="neon-text">jsi?</span>
            </h2>
            <div className="text-xl text-muted-foreground space-y-6 mb-12 text-center">
              <p>Právě teď stojíš na úplném začátku. Před sebou máš dvě cesty — sledovat, jak se hra staví bez tebe. Nebo projít a stát se její součástí.</p>
              <p className="text-foreground font-display font-bold text-2xl">Hráči nečekají na hotovou hru. Hráči vstupují, když se mapa ještě tvoří.</p>
            </div>
            
            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-12 py-5 bg-primary/10 border border-primary/50 text-primary font-display font-bold text-xl rounded-xl hover:bg-primary/20 transition-colors"
            >
              Začít hrát →
            </a>
          </FadeIn>
        </div>
      </section>

      {/* SEKCE 9 — REALITA */}
      <section className="py-32 bg-primary/5 relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="section-container max-w-4xl text-center relative z-10">
          <FadeIn>
            <h2 className="text-5xl sm:text-6xl font-display font-bold mb-16 opacity-50 text-foreground uppercase tracking-widest">
              Realita?
            </h2>
            <div className="space-y-6 text-xl sm:text-2xl text-muted-foreground mb-16 leading-relaxed">
              <p>Nemáme movité investory. Nemáme milion uživatelů. Nemáme vymakanou appku, kde všechno funguje na první dobrou.</p>
              <p>A ani nám to vlastně nevadí. Protože to, co máme, je reálné — fungující koncept, komunita hráčů a systém, který testujeme v praxi. Ne na pouhých spekulacích.</p>
              <p className="text-primary neon-text py-6 text-2xl sm:text-3xl font-display font-bold">→ Jednou to celé bude možná i dokonalé. Ovšem, reálné to je už nyní.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="hud-line" />

      {/* ZÁVĚREČNÉ CTA */}
      <section className="py-24">
        <div className="section-container text-center max-w-3xl">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-10">
              Buď <span className="neon-text">u toho</span>
            </h2>
            <div className="text-xl text-muted-foreground space-y-3 mb-16 text-center">
              <p>Nikdy nevíš, co přijde. Nevíš, jak to dopadne. Nevíš, jestli to změní tvůj den, týden, nebo třeba celý život.</p>
              <p className="text-foreground font-medium pt-6">Ale jednu věc víš na 100 % — že hráči, kteří přijdou teď, budou mít něco, co ostatní nikdy nedostanou.</p>
            </div>

            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center justify-center gap-2 px-14 py-6 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all w-full sm:w-auto"
            >
              <div className="flex items-center gap-3 text-2xl">
                Vstoupit →
              </div>
              <span className="text-xs font-medium opacity-80 font-body uppercase tracking-wider">Season 0 · Prvních 1 000 míst · Discord</span>
            </a>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
