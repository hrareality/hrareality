import FadeIn from "@/components/FadeIn";
import { trackFounderEvent } from "@/lib/founderAnalytics";
import type { FounderOrderData } from "@/hooks/useFounderOrder";

const DISCORD_INVITE_URL = "https://discord.com/invite/Qe2Zxr4bWJ";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface Props {
  order: FounderOrderData;
  discordSubmitted: boolean;
}

export default function ThankYouFinal({ order, discordSubmitted }: Props) {
  return (
    <section className="py-16">
      <div className="section-container max-w-lg text-center">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
            Díky, že jsi mezi prvními.
          </h2>
          <p className="text-muted-foreground mb-8">
            Tvoje podpora nás posouvá blíž ke spuštění Season 1. Uvidíme se na Discordu.
          </p>
          {discordSubmitted ? (
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackFounderEvent("onboarding_complete", { package: order.package })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all min-h-[44px]"
            >
              Přejít do Discordu →
            </a>
          ) : (
            <button
              onClick={() => scrollTo("discord-form")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all min-h-[44px]"
            >
              Dokončit Discord onboarding →
            </button>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
