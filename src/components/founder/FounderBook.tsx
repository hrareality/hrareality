import FadeIn from "@/components/FadeIn";

export default function FounderBook() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">12 — Lidé u začátku</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8 text-center">
            Kniha Zakladatelů
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-center">
            <p>Za každým projektem stojí lidé, kteří mu dali důvěru ještě předtím, než měl co ukázat. Kniha Zakladatelů je veřejný záznam právě takových lidí — první generace iWau Hry Reality.</p>
            <p>Jak chceš být zobrazen, je jen na tobě. Celým jménem, jako značka, přezdívkou, iniciálami, nebo třeba i anonymně.</p>
            <p>Tímto krokem se stáváš nesmazatelnou součástí iWau Hry Reality a pokud uspěje, můžeš jednoho dne říci, byl jsem na samém začátku a i díky mé podpoře to teď existuje.</p>
          </div>
          <p className="mt-6 text-xs text-muted-foreground text-center">
            Zobrazení v Knize Zakladatelů je zcela dobrovolné. Nastavení lze spravovat podle aktuálně dostupného procesu projektu.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
