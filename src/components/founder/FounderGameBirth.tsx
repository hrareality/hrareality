import FadeIn from "@/components/FadeIn";

const steps = [
  { n: "1", title: "Objevíš výzvu", desc: "Hra ti ukáže konkrétní úkol, který splníš během svého reálného dne." },
  { n: "2", title: "Uděláš skutečnou akci", desc: "Ne kliknutí. Něco, co vyžaduje vstát a udělat to." },
  { n: "3", title: "Zaznamenáš důkaz", desc: "Fotkou, krátkým zápisem, potvrzením — jednoduše a rychle." },
  { n: "4", title: "Hra zareaguje", desc: "Progres, XP, karta, status, odměna využitelná v reálném světě nebo další část cesty." },
];

export default function FounderGameBirth() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="section-container max-w-4xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">02 — Od obsahu k akci</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8 text-center">
            Právě zde začala iWau Hra Reality.
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto text-center mb-12">
            <p>iWau Hra Reality je pokus o změnu způsobu, jakým používáme digitální svět.</p>
            <p>Nechceme postavit další aplikaci, kterou si člověk stáhne, pár dní ji zkouší a pak na ni zase zapomene. Chceme vytvořit prostředí, které člověku pomůže něco skutečně udělat, ať už třeba zlepšit své zdraví, zvýšit produktivitu, posílit vztahy, navýšit příjmy, pomoct někomu dalšímu nebo přírodě. Nebo cokoliv jiného, co právě potřebuje.</p>
            <p>Princip je jednoduchý. Když hráč udělá skutečný krok ve svém reálném životě, hra na to zareaguje. Získá progres, odměnu, novou část příběhu, sběratelské artefakty, XP a přístup k dalším možnostem.</p>
            <p>Digitální svět se tak nestane místem, kde člověk zůstává. Stane se nástrojem, který ho pošle zpět do jeho vlastního života.</p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.1}>
              <div className="glass-card-hover p-6 h-full text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 font-display font-bold text-primary">
                  {step.n}
                </div>
                <h3 className="font-display text-sm font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-xl sm:text-2xl font-display font-bold neon-text mb-4">
            OBSAH → AKCE → DŮKAZ → POKROK
          </p>
          <p className="text-center text-sm text-muted-foreground italic">
            Nechceme nahrazovat realitu hrou. Chceme pomocí hry probudit to, co se má stát v realitě.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
