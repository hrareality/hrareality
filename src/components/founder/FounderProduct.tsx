import { Target, TrendingUp, Sparkles, Users2, Heart, Gift } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const blocks = [
  { icon: Target, title: "QUESTY", subtitle: "Mise za hranicí obrazovky", desc: "Výzvy, které hráče vedou k reálné akci v jeho každodenním životě. Krátké, na pár minut, ale i dlouhodobé, které se prolínají do jednotlivých herních sérií a pomáhají hráči růst. To vše díky desítkám malých krůčků v reálném světě v oblasti, kterou si sám vybere." },
  { icon: TrendingUp, title: "XP A PROGRES", subtitle: "Vidíš, že se skutečně posouváš", desc: "Hráč získává zkušenosti a XP za to, co skutečně udělá — ne za čas strávený v aplikaci. Každý krok je viditelný a měřitelný. Tím si buduje svůj vlastní osobní kapitál." },
  { icon: Sparkles, title: "ARTEFAKTY", subtitle: "Příběh uložený v artefaktech", desc: "Digitální karty, odznaky a předměty spojené s konkrétními momenty hráčovy cesty. Každý artefakt připomíná akci, příběh nebo dosažení — ne jen pouhý vizuál." },
  { icon: Users2, title: "POSTAVY", subtitle: "Průvodci a překážky v jednom", desc: "Postavy iWau Hry Reality ztělesňují to, co nás v životě brzdí i to, co nás posouvá dál. Vnitřní překážky, návyky a stavy, se kterými se hráč setkává — a postupně je překonává, aniž by si to plně uvědomoval." },
  { icon: Heart, title: "KOMUNITA", subtitle: "Místo, kde hráč není na cestě sám", desc: "Sdílení důkazů, pokroku a zkušeností. Komunita je přímo součástí herního systému, ne pouze nějaký doplněk vedle něj." },
  { icon: Gift, title: "ODMĚNY", subtitle: "Herní progres s přesahem do reálného světa", desc: "Dlouhodobým cílem je propojit postup ve hře s výhodami využitelnými mimo samotnou aplikaci. Konkrétní odměny budou záviset na aktuálních funkcích a partnerských možnostech." },
];

export default function FounderProduct() {
  return (
    <section className="py-20">
      <div className="section-container">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            Hra, ve které neroste jen postava. <span className="neon-text">Rosteš hlavně ty.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-center text-muted-foreground text-lg mb-12">
            iWau Hra Reality spojuje několik vrstev do jednoho systému. Všechny mají společný cíl — pomoci člověku přejít od sledování k reálnému jednání.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blocks.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <div className="glass-card-hover p-6 h-full">
                <b.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display text-sm font-bold mb-1 tracking-wide">{b.title}</h3>
                <p className="text-sm font-semibold text-foreground/90 mb-2">{b.subtitle}</p>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto">
            iWau Hra Reality je ve vývoji. Některé uvedené vrstvy existují již v Season 0, další budou postupně vznikat v Season 1 (MVP1) a následujících seasons.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
