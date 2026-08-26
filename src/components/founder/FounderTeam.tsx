import FadeIn from "@/components/FadeIn";

export default function FounderTeam() {
  return (
    <section className="py-20">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display">11 — Kdo za tím stojí</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
            Za iWau Hrou Reality stojí konkrétní lidé.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-secondary border border-primary/20 overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors z-10" />
              <img
                src="/tomas.png"
                alt="Tomáš, Founder iWau Hry Reality"
                className="w-full h-full object-cover relative z-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>Ahoj, jmenuji se Tomáš.</p>
              <p>Přes 18 let se pohybuji v online prostředí. Za tu dobu jsem sledoval, jak se internet proměnil — z místa, kde člověk mohl cokoliv vytvořit, na místo, které stále sofistikovaněji soutěží o jeho čas a pozornost.</p>
              <p>iWau Hra Reality vznikla díky jednoduché otázce: Co kdyby technologie fungovala obráceně? Ne aby člověka držela u displeje co nejdéle, ale aby ho poslala zpátky do jeho skutečného života — s konkrétním krokem, který by jinak ani neudělal.</p>
              <p>Právě na tom pracuji společně s týmem lidí, kteří pokrývají produkt, vývoj, design, komunitu, obsah, provoz a celý herní svět.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
