import { CheckCircle2, Loader2, Circle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { scrollToId } from "@/lib/utils";

const timeline = [
  { status: "HOTOVO", title: "Season 0 spuštěna", desc: "Otevřena první vrstva iWau Hry Reality." },
  { status: "HOTOVO", title: "Discord komunita běží", desc: "Vzniklo místo pro první hráče, mise a testování." },
  { status: "HOTOVO", title: "Svět a postavy jsou ready", desc: "První příběhové vrstvy a charaktery Hry Reality už jsou na svých místech." },
  { status: "PROBÍHÁ", title: "Season 1 (MVP1) ve vývoji", desc: "Stavíme první hratelnou digitální verzi." },
  { status: "NÁSLEDUJE", title: "Uzavřené testování", desc: "Vybraní Founderi a hráči otestují hlavní flow." },
  { status: "NÁSLEDUJE", title: "Veřejné spuštění", desc: "Po testování a opravách otevřeme Season 1 pro všechny." },
];

const statusStyles: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  HOTOVO: { icon: CheckCircle2, color: "text-primary" },
  PROBÍHÁ: { icon: Loader2, color: "text-accent" },
  NÁSLEDUJE: { icon: Circle, color: "text-muted-foreground" },
};

export default function FounderDevDiary() {
  return (
    <section id="vyvojovy-denik" className="py-20 bg-primary/5">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">10 — Jak postupujeme</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            Slova nestačí a proto ukazujeme postup.
          </h2>
          <p className="max-w-2xl mx-auto text-center text-muted-foreground text-lg mb-12">
            Vývojový deník je otevřený záznam — co je hotové, co právě stavíme a co nás ještě čeká. Ne každý detail, ale směr, milníky a reálné posuny kupředu. Pravidelně a bez zbytečného přikrášlování.
          </p>
        </FadeIn>

        <div className="relative mb-10">
          {/* Spojnice časové osy mezi jednotlivými milníky */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/50 via-border to-border/30" aria-hidden />
          <div className="space-y-4">
            {timeline.map((item, i) => {
              const style = statusStyles[item.status];
              const Icon = style.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <div className="flex items-start gap-4">
                    <div
                      className={`relative z-10 shrink-0 w-10 h-10 rounded-full glass-card flex items-center justify-center ${style.color} ${
                        item.status === "PROBÍHÁ" ? "border-accent/50" : ""
                      }`}
                    >
                      <Icon className={item.status === "PROBÍHÁ" ? "animate-spin" : ""} size={18} />
                    </div>
                    <div className="glass-card p-5 flex-1">
                      <p className={`text-[11px] font-display font-bold uppercase tracking-wide mb-1 ${style.color}`}>{item.status}</p>
                      <h3 className="font-display font-bold text-sm mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <FadeIn delay={0.3} className="text-center">
          <button
            onClick={() => scrollToId("balicky")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all mb-4 min-h-[44px]"
          >
            Stát se Founderem →
          </button>
          <p className="text-xs text-muted-foreground">
            Aktualizace vývojového deníku nejsou garancí konkrétního data nebo neměnného rozsahu funkcí.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
