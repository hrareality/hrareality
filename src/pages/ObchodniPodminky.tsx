import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";

/**
 * Placeholder stránka — prostor pro obchodní podmínky je připravený (routa +
 * odkaz v patičce), samotný právní text zatím chybí a musí dodat/schválit
 * klient (ideálně po konzultaci s právníkem, vzhledem k tomu, že web
 * zpracovává platby přes Stripe). Stejný poctivý placeholder vzorec jako
 * u FounderTestimonials/FounderBook — nevymýšlí se obsah, jen se čestně
 * označí, že dorazí později.
 */
export default function ObchodniPodminky() {
  return (
    <section className="py-20 min-h-screen">
      <SEO
        title="Obchodní podmínky | iWau HRA REALITY"
        description="Obchodní podmínky iWau HRA REALITY."
      />
      <div className="section-container max-w-3xl">
        <FadeIn>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8">
            PRÁVNÍ INFORMACE
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-6">Obchodní podmínky</h1>
          <div className="glass-card p-6 border-dashed border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Obchodní podmínky pro Founder Membership a další nabídky iWau HRA REALITY právě připravujeme. Doplníme je zde, jakmile budou hotové.
            </p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Máš mezitím otázku k platbě nebo objednávce? Napiš nám na{" "}
            <a href="mailto:hrareality@gmail.com" className="text-primary hover:underline">
              hrareality@gmail.com
            </a>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
