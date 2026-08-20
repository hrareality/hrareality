import FadeIn from "@/components/FadeIn";
import { scrollToId } from "@/lib/utils";

export default function FounderLetter() {
  return (
    <section className="py-20">
      <div className="section-container max-w-2xl text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display">14 — Poslední věc</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
            A pak už je rozhodnutí jen na tobě.
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-left mb-8">
            <p>Nevím, jak velká iWau Hra Reality jednou bude. Kolik lidí ji bude hrát za rok nebo třeba za pět let. A ani nebudu předstírat, že to vím.</p>
            <p>Vím ale, proč ji stavíme. Digitální svět totiž nemusí člověka jen rozptylovat. Může ho vést a ukázat mu, že se nemusí posouvat jen imaginární postava na obrazovce, ale i on sám, díky stovkám malých krůčků, které dělá v běžném životě, které by jinak neudělal.</p>
            <p>Ještě nejsme v cíli. Jsme na samém začátku. A právě proto má Founder Membership smysl jen v tento moment.</p>
            <p>Ti, kdo přijdou později, dostanou lepší aplikaci, víc obsahu, nové funkce a větší komunitu. Ovšem, nikdy nebudou stát u první kapitoly.</p>
            <p>Pokud se rozhodneš stát Founderem, nebudeš jeden z lidí, kteří si jen něco koupili. Budeš jeden z lidí, kteří dali téhle myšlence důvěru ve chvíli, kdy se teprve měnila ve skutečnou hru.</p>
            <p>A za to ti děkuji.</p>
            <p className="text-foreground font-medium">
              Tomáš Kosiewicz<br />Founder iWau Hry Reality
            </p>
          </div>
          <div className="p-6 glass-card border-primary/30 mb-10">
            <p className="text-lg font-display italic text-primary">
              „Jednou možná nebude důležité, na jakém levelu jsi skončil, ale že jsi byl u toho, když se hra poprvé zapnula."
            </p>
          </div>
          <h3 className="text-2xl font-display font-bold mb-4">Chci být součástí Season 0</h3>
          <button
            onClick={() => scrollToId("balicky")}
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all mb-4 min-h-[44px]"
          >
            Vybrat Founder úroveň →
          </button>
          <p className="text-xs text-muted-foreground">
            Jednorázová podpora od 149 Kč. Jasně definované výhody. Žádná investice ani příslib finančního výnosu. Jen možnost být u úplného začátku.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
