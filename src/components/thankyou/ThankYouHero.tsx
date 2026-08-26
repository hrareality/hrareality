import { CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import type { FounderOrderData } from "@/hooks/useFounderOrder";
import { trackFounderEvent } from "@/lib/founderAnalytics";

const DISCORD_INVITE_URL = "https://discord.com/invite/Qe2Zxr4bWJ";

/**
 * Pořadí nad foldem na mobilu podle zadani-dekovaci-stranka.md sekce 5:
 * potvrzovací symbol → H1 → zakoupená úroveň → stav platby → primární CTA
 * "Připojit se do Discordu". Proto je stav platby a CTA přímo tady v hero,
 * ne až v Dalších krocích (ta sekce navíc ukazuje detailnější 5krokový plán).
 */
export default function ThankYouHero({ order }: { order: FounderOrderData }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-container max-w-2xl text-center">
        <FadeIn>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <CheckCircle2 className="text-primary" size={32} />
          </div>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display">
            {order.isUpgrade ? "SEASON 0 · UPGRADE POTVRZEN" : "SEASON 0 · VSTUP POTVRZEN"}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-4">
            Vítej mezi Foundery Season 0.
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            {order.firstName ? `${order.firstName}, tvůj` : "Tvůj"} vstup jako <span className="text-primary font-semibold">{order.package}</span> ({order.pricePaid.toLocaleString("cs-CZ")} Kč) byl zaznamenán.
          </p>
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mb-6">
            <CheckCircle2 size={14} /> Stav: {order.paymentStatus}
          </p>
          <div>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackFounderEvent("discord_join_click", { package: order.package })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all min-h-[44px] mb-4"
            >
              Připojit se do Discordu →
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Vstup byl zaznamenán, zbývá pár kroků k aktivaci všech tvých Founder výhod — projdi si je níže.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
