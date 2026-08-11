import FadeIn from "@/components/FadeIn";

/**
 * Sekce 15 dle zadání — v dodaném zdroji obsahuje jen nadpis a úvodní větu,
 * žádné konkrétní citace/screeny (viz otevřená otázka v docs/founder-membership).
 * Sekce se nevynechává (klient zjišťoval stav), ale nevymýšlí se obsah — jen
 * čestně označuje, že citace dorazí později.
 */
export default function FounderTestimonials() {
  return (
    <section className="py-20">
      <div className="section-container max-w-2xl text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Proč se přidali první Founderi?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Žádné anonymní recenze ani vymyšlené citáty. Skutečné důvody reálných lidí, kteří se rozhodli být u samého začátku.
          </p>
          <div className="glass-card p-6 border-dashed border-border/50">
            <p className="text-sm text-muted-foreground italic">
              Citace prvních Founderů doplníme, jakmile budou k dispozici.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
