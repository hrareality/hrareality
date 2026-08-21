import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";

/**
 * Placeholder stránka — prostor pro zásady zpracování osobních údajů (GDPR)
 * je připravený (routa + odkaz v patičce), samotný text zatím chybí. Web
 * reálně zpracovává osobní údaje (Stripe platby, Airtable záznamy Founderů,
 * cookies přes CookieConsent.tsx) — tahle stránka by proto neměla zůstat
 * prázdná dlouho, ideálně po konzultaci s právníkem. Stejný poctivý
 * placeholder vzorec jako u ObchodniPodminky.tsx.
 */
export default function Gdpr() {
  return (
    <section className="py-20 min-h-screen">
      <SEO
        title="GDPR | iWau HRA REALITY"
        description="Zásady zpracování osobních údajů (GDPR) iWau HRA REALITY."
      />
      <div className="section-container max-w-3xl">
        <FadeIn>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8">
            PRÁVNÍ INFORMACE
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-6">Zásady zpracování osobních údajů</h1>
          <div className="glass-card p-6 border-dashed border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Zásady zpracování osobních údajů (GDPR) pro iWau HRA REALITY právě připravujeme. Doplníme je zde, jakmile budou hotové.
            </p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Máš mezitím otázku ke zpracování svých údajů? Napiš nám na{" "}
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
