import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import type { FounderOrderData } from "@/hooks/useFounderOrder";

type StepState = "done" | "current" | "pending";

export default function ThankYouProcess({ order }: { order: FounderOrderData }) {
  // Odvozeno z reálných dat objednávky, ne jen statický obrázek — viz zadani-dekovaci-stranka.md 4.3.
  const steps: { label: string; state: StepState }[] = [
    { label: "Platba potvrzena", state: "done" },
    { label: "Ověření Founder záznamu", state: order.founderNumber ? "done" : "current" },
    { label: "Propojení Discord účtu", state: order.discordUsername ? "done" : order.founderNumber ? "current" : "pending" },
    { label: "Přidělení Founder role", state: order.discordJoinedAt ? "done" : "pending" },
    { label: "Odeslání Founder čísla", state: order.founderNumber ? "done" : "pending" },
    { label: "Aktivace dostupných výhod", state: order.discordJoinedAt ? "done" : "pending" },
  ];

  return (
    <section className="py-12">
      <div className="section-container max-w-2xl">
        <FadeIn>
          <h2 className="font-display font-bold text-lg mb-6 text-center">Co se teď děje</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium border ${
                    step.state === "done"
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : step.state === "current"
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border/40 text-muted-foreground"
                  }`}
                >
                  {step.state === "done" && <CheckCircle2 size={14} />}
                  {step.state === "current" && <Loader2 size={14} className="animate-spin" />}
                  {step.state === "pending" && <Circle size={14} />}
                  {step.label}
                </div>
                {i < steps.length - 1 && <span className="text-muted-foreground hidden sm:inline">→</span>}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
