import FadeIn from "@/components/FadeIn";
import type { FounderOrderData } from "@/hooks/useFounderOrder";

export default function ThankYouFounderNumber({ order }: { order: FounderOrderData }) {
  return (
    <section className="py-12">
      <div className="section-container max-w-md text-center">
        <FadeIn>
          <div className="glass-card-hover p-8">
            {order.founderNumberDisplay ? (
              <>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-display">Tvoje Founder číslo</p>
                <p className="text-3xl font-display font-bold neon-text">{order.founderNumberDisplay}</p>
              </>
            ) : (
              <>
                <p className="font-display font-bold text-lg mb-2">Founder číslo připravujeme.</p>
                <p className="text-sm text-muted-foreground">
                  Přidělíme ho po ověření objednávky, obvykle do 1–2 pracovních dnů, a pošleme na tvůj e-mail.
                </p>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
