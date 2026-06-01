import FadeIn from "@/components/FadeIn";

import { ArrowRight } from "lucide-react";

const points = [
  {
    title: "Realita je hra – a ty jsi hráč",
    desc: "Nejsi jen pozorovatel. Každý den hraješ — vědomě či nevědomě.",
    bullets: [],
    highlight: "→ Hra Reality ti tohle ukazuje a dává ti možnost si vybrat"
  },
  {
    title: "Akce místo učení",
    desc: "Žádné dlouhé návody. Žádné „jak bys měl žít“.",
    bullets: ["→ dostaneš výzvu", "→ jdeš ji udělat"],
    highlight: "To je celý princip."
  },
  {
    title: "Malé kroky mění směr",
    desc: "Velké změny selhávají. Malé kroky se sčítají.",
    bullets: ["→ 5–20 minut denně", "→ reálný posun v čase"],
    highlight: ""
  },
  {
    title: "Progres, který vidíš",
    desc: "Největší problém dneška → děláš věci… ale nevidíš změnu.\nVe Hře Reality:",
    bullets: ["každý krok se počítá", "každý progres je vidět", "každá akce má odezvu"],
    highlight: "→ a právě to tě drží ve hře"
  },
  {
    title: "Buduješ infrastrukturu osobního kapitálu",
    desc: "Nejde jen o výkon → buduješ identitu:",
    bullets: ["kdo jsi", "jak jednáš", "jak tě vidí ostatní"],
    highlight: "A postupně začneš hrát jinou hru."
  },
  {
    title: "Komunita tě táhne dál",
    desc: "Sama to většina lidí nedá.\nTady:",
    bullets: ["sdílíš progres", "vidíš ostatní", "reagujete na sebe", "navzájem si pomáháte"],
    highlight: "→ tlak + podpora zároveň"
  },
  {
    title: "Nikdy nevíš, co odemkneš dál",
    desc: "Když víš všechno dopředu → nuda\nProto hra pracuje s:",
    bullets: ["překvapením", "odměnami", "novými vrstvami"],
    highlight: "→ a právě to tě drží ve hře"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 min-h-screen">
      <div className="section-container max-w-4xl">
        <FadeIn>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8 uppercase">
            FILOZOFIE HRY REALITY
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold mb-8">
            Jak <span className="neon-text">Hra Reality</span> funguje
          </h1>
          
          <div className="text-lg text-muted-foreground mb-16 space-y-4">
            <p className="text-foreground font-display font-medium text-xl">Hra Reality není jen systém.<br/>Je to nový způsob, jak přemýšlet o vlastním životě.</p>
            <p>Scrollujeme. Sledujeme. Učíme se.<br/>
            Ale ve výsledku zůstává všechno stejné.</p>
            <div className="p-6 mt-6 glass-card border-primary/20 bg-background/50 rounded-2xl">
              <p className="text-primary font-bold text-xl mb-3">→ Hra Reality tohle obrací.</p>
              <p className="text-foreground text-lg">
                Místo teorie přichází akce.<br/>
                Místo sledování přichází hra.
              </p>
              <p className="font-medium text-muted-foreground mt-6">Podívej se na základní principy:</p>
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
            <h2 className="text-2xl font-display font-bold mb-6">Co tím chceme vytvořit</h2>
            <div className="space-y-2 text-lg text-muted-foreground mb-8">
              <p>Ne další appku.</p>
              <p>Ne další kurz.</p>
              <p className="text-foreground font-display font-bold text-xl mt-4 text-primary">Svět, který tě přirozeně nutí růst.</p>
            </div>
            
            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all text-lg w-full sm:w-auto"
            >
              Vstup do hry
              <ArrowRight size={20} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
