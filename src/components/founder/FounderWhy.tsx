import FadeIn from "@/components/FadeIn";
import { scrollToId } from "@/lib/utils";

export default function FounderWhy() {
  return (
    <section className="py-20">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display">04 — Proč právě teď</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
            Proč jsme se rozhodli otevřít Founder Membership?
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
            <p>Měli jsme na výběr. Hledat investora, stavět za zavřenými dveřmi a jednoho dne představit hotový produkt. Tak to totiž dělá většina projektů.</p>
            <p>My jsme zvolili opačnou cestu. Chceme Season 1 (MVP1) dokončit společně s lidmi, pro které iWau Hra Reality vzniká. S prvními hráči. S lidmi, kteří přinesou nejen podporu, ale i zpětnou vazbu, energii a zkušenosti, díky kterým bude výsledek o něco lepší.</p>
            <p>Founder Membership je jednorázová možnost být u toho — pomoct dokončit první hratelnou verzi, získat konkrétní Founder výhody, vstoupit do první generace a zanechat v projektu své jméno, značku nebo přezdívku.</p>
            <p>Není to investice a ani příslib budoucího výdělku. Je to pozvánka dovnitř ve chvíli, kdy se projekt teprve rodí.</p>
          </div>
          <div className="p-6 glass-card border-destructive/30 mb-8">
            <p className="text-sm text-foreground/90">
              <strong>Founder Membership není investice.</strong> Zakoupením nezískáváš podíl ve společnosti, nárok na zisk ani garanci finančního zhodnocení. Získáváš konkrétní Founder balíček a výhody odpovídající zvolené úrovni.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => scrollToId("balicky")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all min-h-[44px]"
            >
              Chci být součástí první generace →
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
