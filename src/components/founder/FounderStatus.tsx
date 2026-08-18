import FadeIn from "@/components/FadeIn";
import { scrollToId } from "@/lib/utils";

const columns = [
  {
    label: "Hotovo",
    color: "text-primary",
    items: [
      "Základní svět a identita iWau Hry Reality",
      "Season 0",
      "Discord komunita",
      "První postavy a jejich lore",
      "První komunitní mise",
      "Základní koncept artefakt systému",
      "Herní ekonomika Season 0",
      "Návrh klíčových obrazovek Season 1 (MVP1)",
    ],
  },
  {
    label: "Právě vzniká",
    color: "text-accent",
    items: [
      "Registrace a onboarding",
      "Hlavní feed",
      "Systém questů v příběhovém uzlu",
      "Hráčský profil",
      "XP a progres",
      "Důkazy splnění",
      "Collection album Season 1",
      "Sdílení herních momentů",
      "Testovací administrace",
      "Napojení komunity",
    ],
  },
  {
    label: "Následuje",
    color: "text-muted-foreground",
    items: [
      "Uzavřené testování",
      "Zapojení prvních Founderů",
      "Opravy a úpravy na základě zpětné vazby",
      "Aktivace prvních Premium funkcí",
      "Veřejné spuštění Season 1 (MVP1)",
    ],
  },
];

export default function FounderStatus() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="section-container max-w-5xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">03 — Realita vývoje</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8 text-center">
            Není to jen nápad. Ovšem, ještě to není úplně hotové.
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto text-center mb-12">
            <p>iWau Hra Reality rozhodně nevznikla v průběhu minulého týdne. Za projektem jsou roky práce na konceptu, příběhu, komunitě a herních mechanismech.</p>
            <p>Otevřeli jsme Discord. Spustili Season 0. Představili první postavy. Začali testovat questy a sběratelskou rovinu. Navrhli strukturu Season 1. A právě teď převádíme celý systém do první hratelné digitální verze.</p>
            <p>Nebudu tvrdit, že je všechno hotové. Rozhodně není. A ani nebudu slibovat, že se během vývoje nic nezmění. Stoprocentně změní — to je přirozená součást stavby projektu, který vzniká společně s prvními hráči.</p>
            <p>Co ale můžu udělat, je otevřeně ukázat, kde přesně jsme. Co reálně existuje, co stavíme a co přijde dál.</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {columns.map((col, i) => (
            <FadeIn key={col.label} delay={i * 0.1}>
              <div className="glass-card p-6 h-full">
                <h3 className={`font-display font-bold text-sm uppercase tracking-wide mb-4 ${col.color}`}>{col.label}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary/60 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="glass-card-hover p-6 sm:p-8 max-w-lg mx-auto text-center border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Aktuální fáze</p>
            <p className="font-display font-bold text-lg mb-4">Season 1 (MVP1) ve vývoji</p>
            <div className="flex justify-center mb-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Plánované spuštění</p>
                <p className="font-medium">Říjen 2026</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              Plánovaný termín není právně garantovaným datem spuštění. Během vývoje může dojít k jeho posunu. O zásadních změnách budeme Foundery průběžně informovat.
            </p>
            <button
              onClick={() => scrollToId("vyvojovy-denik")}
              className="text-sm font-display font-bold text-primary hover:underline"
            >
              Zobrazit vývojový deník →
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
