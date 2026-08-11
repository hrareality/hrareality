import FadeIn from "@/components/FadeIn";

const blocks = [
  { title: "Season 1 (MVP1)", subtitle: "První hratelná verze", desc: "Registrace, onboarding, profil hráče, hlavní feed, důkazy, progres a základní komunitní funkce. Všechno, co je potřeba k tomu, aby hra začala pořádně fungovat." },
  { title: "QUESTY", subtitle: "Výzvy v reálném světě", desc: "Nástroje pro zadávání, plnění, ověřování a vyhodnocování jednotlivých misí. Season 1 začíná jedním tématem, a s každou další season se svět více a více rozrůstá." },
  { title: "ARTEFAKTY", subtitle: "Album hráčovy cesty", desc: "Systém pro získávání, ukládání a zobrazování karet, odznaků a artefaktů spojených s konkrétními akcemi a momenty ve hře." },
  { title: "XP A PROGRES", subtitle: "Viditelný postup, ne pocit", desc: "Systém zkušeností, levelů a odemykání, díky kterému hráč vidí, že se posouvá — ne na základě pocitu, ale na základě dat." },
  { title: "HERNÍ MOMENTY", subtitle: "Důkazy, které stojí za sdílení", desc: "Způsob, jak zaznamenat splněnou akci a vytvořit z ní moment použitelný v profilu, komunitě i na sociálních sítích — s odměnou, která má hodnotu i mimo samotnou hru." },
  { title: "TESTOVÁNÍ A OPRAVY", subtitle: "Produkt, který roste s jeho hráči", desc: "Uzavřené testování, odstraňování chyb, úpravy UX a zjednodušování celkového flow. Každá zpětná vazba od Founderů pomáhá udělat hru o kousíček lepší." },
];

export default function FounderImpact() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="section-container">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">05 — Co tvá podpora vytváří</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            Nepodporuješ žádnou vizi. <span className="neon-text">Pomáháš postavit první hratelnou verzi.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-center text-muted-foreground text-lg mb-12">
            Prostředky z Founder Membershipu jdou do vývoje, testování a dokončení Season 1 (MVP1) — verze, ve které člověk přestane o iWau Hře Reality jen číst a poprvé si ji skutečně zahraje.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blocks.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <div className="glass-card-hover p-6 h-full">
                <h3 className="font-display text-sm font-bold mb-1 tracking-wide text-primary">{b.title}</h3>
                <p className="text-sm font-semibold text-foreground/90 mb-2">{b.subtitle}</p>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto italic">
            Tvá podpora nezaručuje, že každý prvek vznikne přesně v původní podobě. Ovšem, pomáhá vytvořit funkční základ, ze kterého může iWau Hra Reality dále růst.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
