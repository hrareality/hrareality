import { BookOpen, ArrowRight, Download } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import cover1 from "@/assets/comic-cover-probud-hrace.png";
import cover2 from "@/assets/comic-cover-dr-wetom.png";

import { cn } from "@/lib/utils";

const comics = [
  {
    title: "PROBUĎ V SOBĚ HRÁČE",
    desc: "Žiješ ve hře. Nikdo ti to neřekl, protože většina lidí to sama ani neví.\n\nTenhle komiks ti bohužel nezmění život. Ale dá ti první uvědomění — pocit, že něco kolem tebe nefunguje tak, jak by mělo. A že odpovědi možná skutečně existují. Jen ne tam, kde jsi je hledal doteď.",
    bullets: [],
    img: cover1,
    pdf: "/downloads/komiks-probud-hrace-v-sobe.pdf",
    aspectRatio: "aspect-[4/5]",
  },
  {
    title: "DR. WETOM: KÓD NADĚJE",
    desc: "Existují lidé, kteří vidí, jak hra funguje. Dr. Wetom je jedním z nich.\n\nKdo to je? Proč mění pravidla? A proč ho někteří hráči potkávají dřív než ostatní?\n\nDruhý komiks. Hlubší poznání. Víc odpovědí — a ještě víc otázek.",
    bullets: [],
    img: cover2,
    pdf: "/downloads/komiks-dr-wetom-kod-nadeje.pdf",
  },
];

export default function Comics() {
  return (
    <section className="py-20 min-h-screen">
      <div className="section-container max-w-5xl">
        {/* SEKCE 1 - HERO */}
        <FadeIn>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8 uppercase">
            KOMIKSY
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold mb-8">
            Vstup do <span className="neon-text">Hry Reality</span>
          </h1>
          
          <div className="text-lg text-muted-foreground mb-20 space-y-4 max-w-2xl">
            <p className="text-foreground font-medium text-xl">Komiksy, které nejsou jen příběhy — jsou to první vstupní body do samotné Hry Reality.</p>
            <p>Žádný z nich ti neukáže celý obraz, a to zcela záměrně. Celý obraz se ti totiž odemkne, až začneš skutečně hrát.</p>
          </div>
        </FadeIn>

        {/* SEKCE 2 - KOMIKSY BOXES */}
        <div className="grid md:grid-cols-2 items-stretch gap-8 mb-20">
          {comics.map((comic, i) => (
            <FadeIn key={comic.title} delay={i * 0.15}>
              <div className="glass-card-hover overflow-hidden group h-full flex flex-col border border-border/40">
                <div className="aspect-[7/10] overflow-hidden relative bg-black/40 flex items-center justify-center p-0">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay group-hover:bg-transparent transition-colors z-20" />
                  <img
                    src={comic.img}
                    alt={comic.title}
                    className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-display text-2xl font-bold mb-4">{comic.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line mb-4">
                    {comic.desc}
                  </p>
                  <ul className="mb-8 space-y-2 flex-1">
                    {comic.bullets.map((bullet, j) => (
                      <li key={j} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <a
                      href={comic.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 border border-primary/30 text-primary font-display font-bold rounded-xl hover:bg-primary/20 transition-colors text-sm"
                    >
                      <BookOpen size={18} />
                      Prohlédnout
                    </a>
                    <a
                      href={comic.pdf}
                      download
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-display font-bold rounded-xl hover:brightness-110 transition-all text-sm shadow-lg shadow-primary/20"
                    >
                      <Download size={18} />
                      Stáhnout
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>


        {/* SEKCE 3 - CO POTÉ */}
        <FadeIn delay={0.3}>
          <div className="mb-8 p-10 glass-card border-primary/20 max-w-3xl">
            <h2 className="text-xl font-display font-bold mb-4 text-primary uppercase tracking-widest">Co přijde po přečtení komiksu?</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>Zavřeš ho. Vrátíš se do svého běžného dne. A všechno vypadá stejně, jako kdykoliv předtím.</p>
              <p>Ale něco se přeci jen změnilo. Malá drobnost. Všimneš si věci, kolem které chodíš každý den. Zareaguješ jinak, než bys normálně reagoval. Položíš si otázku, kterou sis dříve nepoložil.</p>
              <p className="text-foreground font-medium pt-2">A v tu chvíli? V tu chvíli už hraješ.</p>
            </div>
          </div>
        </FadeIn>

        {/* SEKCE 4 - CO DÁL */}
        <FadeIn delay={0.4}>
          <div className="p-12 glass-card border-primary/40 bg-secondary/30 text-center rounded-3xl mt-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 uppercase tracking-wider">Tady končí komiks, ale Hra Reality rozhodně ne.</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Právě jsi prošel první branou. Ale portál zůstává i nadále otevřený — a za ním jsou první signály, první výzvy a komunita hráčů, kteří už vědí něco víc.
            </p>
            <p className="text-xl text-primary font-bold mb-10">
              Vstoupíš? Nebo zavřeš stránku a zapomeneš, co jsi právě zažil?
            </p>
            
            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all w-full sm:w-auto text-xl"
            >
              Projít portálem →
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
