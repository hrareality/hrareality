import FadeIn from "@/components/FadeIn";
import type { FounderOrderData } from "@/hooks/useFounderOrder";
import { trackFounderEvent } from "@/lib/founderAnalytics";

const DISCORD_INVITE_URL = "https://discord.com/invite/Qe2Zxr4bWJ";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ThankYouNextSteps({ order }: { order: FounderOrderData }) {
  const discordDone = !!order.discordUsername;

  const steps = [
    {
      title: "Připojit se do Discordu",
      body: (
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackFounderEvent("discord_join_click", { package: order.package })}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-display font-bold text-sm rounded-lg hover:brightness-110 transition-all"
        >
          Připojit se do Discordu →
        </a>
      ),
    },
    {
      title: "Odeslat Discord nick",
      body: discordDone ? (
        <p className="text-sm text-primary">Discord nick byl uložen ✓</p>
      ) : (
        <button onClick={() => scrollTo("discord-form")} className="text-sm font-display font-bold text-primary hover:underline">
          Vyplnit formulář níže →
        </button>
      ),
    },
    {
      title: "Vyčkat na přidělení role",
      body: <p className="text-sm text-muted-foreground">Status: <span className="text-accent font-medium">Čeká na ověření</span> — obvyklé zpracování 1–2 pracovní dny.</p>,
    },
    {
      title: "Sledovat Founder update kanál",
      body: <p className="text-sm text-muted-foreground">Kanál se odemkne po přiřazení role.</p>,
    },
    {
      title: "Zkontrolovat e-mail s Founder číslem",
      body: <p className="text-sm text-muted-foreground">Může dorazit s malým zpožděním — zkontroluj i spam/hromadné.</p>,
    },
  ];

  return (
    <section className="py-12 bg-primary/5">
      <div className="section-container max-w-2xl">
        <FadeIn>
          <h2 className="font-display font-bold text-xl mb-8 text-center">Další kroky k dokončení vstupu</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.title} className="glass-card p-5 flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-display font-bold text-primary text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm mb-2">{step.title}</h3>
                  {step.body}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
