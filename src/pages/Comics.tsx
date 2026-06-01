import { BookOpen, ArrowRight, Download } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import cover1 from "@/assets/comic-cover-probud-hrace.png";
import cover2 from "@/assets/comic-cover-dr-wetom.png";

import { cn } from "@/lib/utils";

const comics = [
  {
    title: "PROBUĎ HRÁČE V SOBĚ",
    desc: "Žiješ ve hře, jen ti to možná nikdo neřekl.\n\nZačíná to nenápadně. Pocit, že něco nesedí. Že svět, ve kterém žiješ… není úplně skutečný. Tenhle příběh tě neprobudí.",
    bullets: [
      "ale může být první trhlina",
      "první kontakt se světem Hry Reality",
      "začátek pochopení"
    ],
    img: cover1,
    pdf: "/downloads/komiks-probud-hrace-v-sobe.pdf",
    aspectRatio: "aspect-[4/5]",
  },
  {
    title: "DR. WETOM: KÓD NADĚJE",
    desc: "Existují lidé, kteří vidí víc.\nA existují ti, kteří to drží pohromadě.\n\nKdo je Dr. Wetom…\na proč jeho existence mění pravidla hry?",
    bullets: [
      "hlubší vrstva světa",
      "první náznaky toho, co se opravdu děje"
    ],
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
            Vstup do světa <span className="neon-text">Hry Reality</span>
          </h1>

          <div className="text-lg text-muted-foreground mb-20 space-y-4 max-w-2xl">
            <p className="text-foreground font-medium text-xl">Tohle nejsou jen komiksy.</p>
            <p className="text-primary font-bold">→ Jsou to první portály do světa, který není takový, jak se zdá.</p>
            <p>Každý příběh ti ukáže jen část.<br />Nikdy ne celý obraz.</p>
            <p className="text-primary font-bold mt-4">→ A právě proto tě to začne táhnout dál.</p>
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
            <h2 className="text-xl font-display font-bold mb-4 text-primary uppercase tracking-widest">Co se stane potom</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>Možná si řekneš, že je to jen příběh.<br />Ale možná…</p>
              <p className="text-foreground font-medium">→ začneš vidět věci jinak</p>
              <p className="italic pt-2">A právě v tu chvíli začíná hra.</p>
            </div>
          </div>
        </FadeIn>

        {/* SEKCE 4 - CO DÁL */}
        <FadeIn delay={0.4}>
          <div className="p-12 glass-card border-primary/40 bg-secondary/30 text-center rounded-3xl mt-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">KDE TO POKRAČUJE</h2>
            <p className="text-xl text-muted-foreground mb-2">Komiksy nejsou konec.</p>
            <p className="text-xl text-primary font-bold mb-8">→ jsou vstup</p>

            <p className="text-muted-foreground mb-4">Pokud chceš jít dál:</p>
            <ul className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 text-foreground font-medium mb-8">
              <li>první signály</li>
              <li className="hidden sm:block text-primary/40">•</li>
              <li>první výzvy</li>
              <li className="hidden sm:block text-primary/40">•</li>
              <li>první hráči</li>
            </ul>
            <p className="text-primary font-bold mb-10">→ všechno pokračuje tady</p>

            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center justify-center gap-1 px-12 py-5 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all w-full sm:w-auto"
            >
              <div className="flex items-center gap-2 text-xl">
                Vstoupit do hry
                <ArrowRight size={20} />
              </div>
              <span className="text-xs font-medium opacity-80 font-body normal-case">přístup do světa, který se právě odemyká</span>
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
