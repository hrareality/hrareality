import FadeIn from "@/components/FadeIn";
import { useFounderCounter } from "@/hooks/useFounderCounter";

export default function FounderLiveProgress() {
  const { data: counter } = useFounderCounter();
  const count = counter?.count ?? 0;

  return (
    <section className="py-20 bg-primary/5">
      <div className="section-container max-w-3xl text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display">08 — První generace roste</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
            Už <span className="neon-text">{count.toLocaleString("cs-CZ")}</span> lidí se rozhodlo být u začátku.
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>Každý Founder přináší něco jiného. Někdo finanční podporu nebo zpětnou vazbu. Někdo zase energii a aktivitu v komunitě. A někdo jednoduše první důkaz, že tahle myšlenka dává smysl i za hranicemi našeho týmu.</p>
            <p>Cílem Season 0 je vytvořit první generaci 1 000 Founderů. Ne jako číslo na počítadle, ale jako skupinu konkrétních lidí, kteří stáli u začátku něčeho, co ještě nemělo jistotu, že uspěje. A přesto se rozhodli vstoupit.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
