import FadeIn from "@/components/FadeIn";

import { ArrowRight } from "lucide-react";

const points = [
  {
    title: "Tvůj život je hra. Tak ji začni hrát.",
    desc: "Každý den vstaneš a hraješ, ať se ti to líbí nebo ne. Otázka je, jestli hraješ svoji hru, nebo hru někoho cizího. iWau HRA REALITY ti ukáže ten pravý rozdíl.",
    bullets: [],
    highlight: ""
  },
  {
    title: "Dostaneš quest. Jdeš ho splnit.",
    desc: "To je celé. Žádný kurz. Žádný webinář. Žádný 30stránkový ebook.",
    bullets: ["→ Výzva → akce → hotovo."],
    highlight: ""
  },
  {
    title: "Nepotřebuješ velkou změnu. Potřebuješ první krok.",
    desc: "5 až 20 minut denně. Víc ne. iWau HRA REALITY nesází na to, že zítra vstaneš jako jiný člověk. Sází na to, že za měsíc plněním malých kroků budeš o kousek dál, než jsi dneska.\n\nA to funguje. Malé kroky jsou skutečně splnitelné. Velké plány se dají jen donekonečna odkládat.",
    bullets: [],
    highlight: ""
  },
  {
    title: "Vidíš, že se něco děje.",
    desc: "Znáš ten pocit, kdy se snažíš, ale nic se nemění? Makáš na sobě, čteš knížky, snažíš se vstávat dřív — a po měsíci máš pocit, že jsi furt na tom stejném místě.\n\nV iWau HRA REALITY je každý quest viditelný. Každý krok zaznamenaný. Každá akce má odezvu, a to jak od systému, tak i od komunity. Neděláš věci jen tak pro nic za nic. Děláš věci, které se doopravdy počítají.",
    bullets: [],
    highlight: ""
  },
  {
    title: "Nesbíráš body. Buduješ identitu.",
    desc: "Levely a odměny jsou fajn. Ale my půjdeme o mnoho hlouběji. S každým questem si odpovídáš na otázky, které ti žádná appka nepoloží — kdo jsi, jak jednáš, jak tě vidí ostatní.\n\nA navíc si jen nebuduješ profil, jako například na sociálních sítích. Buduješ si reputaci. A ta se přenáší i mimo hru.",
    bullets: [],
    highlight: ""
  },
  {
    title: "Sám to nedáš. Komunita je tu pro tebe.",
    desc: "Většina lidí to zkusí sama. A po týdnu skončí. V iWau HRA REALITY vidíš, jak ostatní plní questy. Sdílíš svůj progres. Reagujete na sebe. Posouváte se dopředu.\n\nNení to žádný toxický grind. Je to zdravý tlak od lidí, kteří jedou na stejné vlně.",
    bullets: [],
    highlight: ""
  },
  {
    title: "Nikdy nevíš, co přijde.",
    desc: "Když víš všechno dopředu, přestaneš hrát. Proto pracuje iWau HRA REALITY s překvapením — mystery boxy, nové události, odměny, které nikdy nečekáš.\n\nKaždý quest může odemknout něco nového a možná i neznámého. A přesně tahle zvědavost tě táhne dál a dál.",
    bullets: [],
    highlight: ""
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 min-h-screen">
      <div className="section-container max-w-4xl">
        <FadeIn>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8 uppercase">
            FILOZOFIE iWau HRA REALITY
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold mb-8">
            Jak <span className="neon-text">iWau HRA REALITY</span> funguje?
          </h1>
          
          <div className="text-lg text-muted-foreground mb-16 space-y-4">
            <p className="text-foreground font-display font-medium text-xl">Začni tím, co znáš. Ráno otevřeš telefon. Scrolluješ. Něco tě zaujme, něco si uložíš, něco lajkneš. Zavřeš telefon. Nic se nezměnilo.</p>
            <p>iWau HRA REALITY funguje přesně obráceně. Nekonzumuješ — hraješ. Nesleduješ — jdeš do akce. A každý den máš důkaz, že ses někam skutečně posunul.</p>
            <div className="p-6 mt-6 glass-card border-primary/20 bg-background/50 rounded-2xl">
              <p className="text-primary font-bold text-xl mb-3">iWau HRA REALITY to dělá jinak.</p>
              <p className="text-foreground text-lg">
                Žádná teorie. Žádné pasivní sledování. Jen systém, který tě dostane z autopilota do akce.
              </p>
              <p className="font-medium text-muted-foreground mt-6">Takhle to funguje:</p>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-6 mb-20">
          {points.map((point, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card p-6 flex flex-col md:flex-row gap-6 border border-border/40 hover:border-primary/40 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center font-display text-xl text-primary font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">{point.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed mb-3 text-sm">
                    {point.desc}
                  </p>
                  {point.bullets.length > 0 && (
                    <ul className="mb-4 space-y-1">
                      {point.bullets.map((bullet, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary/70">{bullet.startsWith('→') ? '' : '•'}</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {point.highlight && (
                    <p className="text-sm font-semibold text-primary/90 bg-primary/5 inline-block px-3 py-1.5 rounded-md mt-2">
                      {point.highlight}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center max-w-2xl mx-auto p-12 glass-card border-primary/30 rounded-3xl bg-secondary/20">
            <h2 className="text-2xl font-display font-bold mb-6">Co tvoříme?</h2>
            <div className="space-y-4 text-lg text-muted-foreground mb-8">
              <p>Ne appku. Ne kurz. Ne další motivační obsah, který zkonzumuješ a za minutu na něj zapomeneš.</p>
              <p>Tvoříme systém, ve kterém růst není něco, co si musíš vydřít. Je to něco, co se děje, protože hraješ.</p>
              <p className="text-foreground font-display font-bold text-xl mt-4 text-primary">Žádná disciplína nasílu. Žádné „musíš chtít“. Jen hra, která tě přirozeně posouvá dál — quest za questem.</p>
            </div>
            
            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all text-lg w-full sm:w-auto"
            >
              Vstup do hry →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
