import FadeIn from "@/components/FadeIn";
import type { FounderOrderData } from "@/hooks/useFounderOrder";
import { getBenefitsForPackage, type FounderPackage } from "@/types/founder";

export default function ThankYouBenefits({ order }: { order: FounderOrderData }) {
  const benefits = getBenefitsForPackage(order.package as FounderPackage);

  return (
    <section className="py-12 bg-primary/5">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <h2 className="font-display font-bold text-xl mb-8 text-center">
            Co následuje pro úroveň {order.package}?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 border-primary/30">
              <h3 className="font-display font-bold text-primary mb-3">Aktivujeme nyní</h3>
              <ul className="space-y-2">
                {benefits.ihned.map((b) => (
                  <li key={b} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-6 border-border/40">
              <h3 className="font-display font-bold text-foreground mb-3">Aktivujeme později</h3>
              {benefits.pozdeji.length > 0 ? (
                <ul className="space-y-2">
                  {benefits.pozdeji.map((b) => (
                    <li key={b} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-muted-foreground">→</span> {b}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Tvůj balíček nemá žádné později aktivované výhody — vše je aktivní hned.</p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
