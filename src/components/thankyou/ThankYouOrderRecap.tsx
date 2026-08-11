import FadeIn from "@/components/FadeIn";
import type { FounderOrderData } from "@/hooks/useFounderOrder";

const PREMIUM_PACKAGES = ["Zakladatel Season 0", "Tvůrce Season 0", "Strážce Season 0"];

export default function ThankYouOrderRecap({ order }: { order: FounderOrderData }) {
  const hasPremium = PREMIUM_PACKAGES.includes(order.package);

  return (
    <section className="pb-4">
      <div className="section-container max-w-2xl">
        <FadeIn>
          <div className="glass-card p-6 sm:p-8">
            <h2 className="font-display font-bold text-sm uppercase tracking-wide text-muted-foreground mb-4">
              Rekapitulace nákupu
            </h2>
            <dl className="grid grid-cols-2 gap-y-3 text-sm mb-4">
              <dt className="text-muted-foreground">Balíček</dt>
              <dd className="text-right font-medium">{order.package}</dd>
              <dt className="text-muted-foreground">Zaplacená cena</dt>
              <dd className="text-right font-medium">{order.pricePaid.toLocaleString("cs-CZ")} Kč</dd>
              <dt className="text-muted-foreground">Typ platby</dt>
              <dd className="text-right font-medium">Jednorázová</dd>
              <dt className="text-muted-foreground">Stav</dt>
              <dd className="text-right font-medium text-primary">{order.paymentStatus}</dd>
              <dt className="text-muted-foreground">Číslo objednávky</dt>
              <dd className="text-right font-medium font-mono text-xs">{order.orderNumber}</dd>
              <dt className="text-muted-foreground">Potvrzení odesláno na</dt>
              <dd className="text-right font-medium break-all">{order.email}</dd>
            </dl>
            <p className="text-xs text-muted-foreground border-t border-border/30 pt-4">
              Founder Membership není automaticky obnovované předplatné.
              {hasPremium && " Premium výhody tohoto balíčku se aktivují až po spuštění Season 1 (MVP1), ne ihned."}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
