import FadeIn from "@/components/FadeIn";

const categories = [
  { pct: 45, label: "Vývoj produktu", desc: "Programování, databáze, infrastruktura, integrace a dokončení klíčových funkcí MVP1. Největší položka, protože bez funkčního produktu nemá nic dalšího smysl." },
  { pct: 20, label: "UX a produktový design", desc: "Návrh obrazovek, testování flow a zjednodušování hráčské cesty. Cíl: aby hra fungovala intuitivně už od prvního kontaktu." },
  { pct: 15, label: "Grafika a herní obsah", desc: "Karty, postavy, vizualizace, questy, animace a další obsah pro Season 0 i Season 1 (MVP1)." },
  { pct: 10, label: "Testování a opravy", desc: "Uzavřené testovací vlny, odstraňování chyb a technická příprava na veřejné spuštění." },
  { pct: 10, label: "Provoz a infrastruktura", desc: "Servery, nástroje, platební systémy, licence a nezbytný provoz, bez kterého projekt zkrátka nemůže fungovat." },
];

export default function FounderTransparency() {
  return (
    <section className="py-20">
      <div className="section-container max-w-4xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">09 — Transparentnost</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            Kam jdou peníze z Founder Membershipu?
          </h2>
          <p className="max-w-2xl mx-auto text-center text-muted-foreground text-lg mb-12">
            Founder Membership není podíl ve firmě ani investiční produkt. Prostředky používáme na vývoj a dokončení Season 1 (MVP1). Přesné rozdělení se může podle aktuálních potřeb měnit — hlavní priority ale zůstávají stejné.
          </p>
        </FadeIn>

        <div className="space-y-4 mb-10">
          {categories.map((c, i) => (
            <FadeIn key={c.label} delay={i * 0.08}>
              <div className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="shrink-0 w-16 text-center">
                  <span className="text-2xl font-display font-bold text-primary">{c.pct}%</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-sm mb-1">{c.label}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
                <div className="w-full sm:w-40 h-2 rounded-full bg-secondary overflow-hidden shrink-0">
                  <div className="h-full bg-primary" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-xs text-muted-foreground mb-10">
            Uvedené poměry jsou orientační pracovní rámec, ne závazné účetní rozdělení každé platby. Skutečné využití se může měnit podle priorit a provozních potřeb projektu.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <span>Tvá podpora</span><span className="text-primary">→</span>
            <span>Vývoj a tvorba</span><span className="text-primary">→</span>
            <span>Nová funkce nebo obsah</span><span className="text-primary">→</span>
            <span>Testování</span><span className="text-primary">→</span>
            <span>MVP1</span><span className="text-primary">→</span>
            <span>První hráči ji používají</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
