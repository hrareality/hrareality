import FadeIn from "@/components/FadeIn";
import type { FounderOrderData } from "@/hooks/useFounderOrder";
import { trackFounderEvent } from "@/lib/founderAnalytics";

export default function ThankYouSupport({ order }: { order: FounderOrderData }) {
  const subject = `Founder onboarding — objednávka ${order.orderNumber}`;
  const body = `Číslo objednávky: ${order.orderNumber}\nZakoupená úroveň: ${order.package}\nProblém: `;
  const mailto = `mailto:HraReality@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section className="py-12">
      <div className="section-container max-w-md text-center">
        <FadeIn>
          <h2 className="font-display font-bold text-lg mb-2">Potřebuješ pomoct?</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Napiš na HraReality@gmail.com, odpovídáme do 3 pracovních dnů.
          </p>
          <a
            href={mailto}
            onClick={() => trackFounderEvent("support_click", { package: order.package })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/50 border border-primary/20 hover:bg-secondary text-foreground font-display font-bold text-sm rounded-lg transition-all"
          >
            Kontaktovat podporu
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
