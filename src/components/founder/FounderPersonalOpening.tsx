import FadeIn from "@/components/FadeIn";

export default function FounderPersonalOpening() {
  return (
    <section id="pribeh" className="py-20">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display">01 — Proč to vzniká</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
            Otázka, na kterou jsem několik let hledal odpověď.
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>Máme přístup k víc informacím než kterákoliv jiná generace před námi. Každý den můžeme sledovat videa, poslouchat podcasty, číst knihy a ukládat si obsah na později. Moc dobře víme, co bychom měli dělat.</p>
            <p>A přesto většina z nás stojí na místě.</p>
            <p>Sledujeme cizí pokroky. Koukáme se na cizí výsledky. Na chvíli nás to inspiruje — a pak přejedeme prstem k dalšímu videu. Motivace přijde a zase rychle odejde. Nic se ale nezmění.</p>
            <p>A není to o tom, že bychom byli líní nebo neschopní. Celý digitální svět kolem nás je postavený tak, aby nás držel u obrazovky co nejdéle. Odměňuje naši pozornost, ale už ne to, co s ní uděláme.</p>
            <p>Čím víc sledujeme, tím míň jednáme. Ne proto, že bychom nechtěli, ale proto, že nikdo dosud nevytvořil prostředí, které by nás přirozeně dovedlo od znalosti přímo k akci.</p>
            <p>A právě proto vzniká iWau Hra Reality.</p>
          </div>
          <div className="mt-8 p-6 glass-card border-primary/30 text-center">
            <p className="text-xl font-display font-medium text-primary">
              Co kdyby technologie neodměňovala čas strávený sledováním, ale to, co člověk skutečně udělá ve svém reálném životě?
            </p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">Ne další hodina obsahu. Jeden skutečný krok kupředu.</p>
        </FadeIn>
      </div>
    </section>
  );
}
