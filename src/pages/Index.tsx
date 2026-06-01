import { ArrowRight, Target, Globe, Zap, Key, Gift, Rocket, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import heroImg from "@/assets/hero-dr-wetom.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  { icon: Target, title: "1. VYBER SI SMĚR", desc: "Fyzické & duševní zdraví. Finance. Příroda… Vybereš si oblast, ve které chceš posunout svůj život." },
  { icon: Globe, title: "2. VSTUP DO SVĚTA", desc: "Každé téma má svůj vlastní „svět“. Vybereš si ten, který tě táhne a zajímá." },
  { icon: Zap, title: "3. PŘIJMI VÝZVU", desc: "Každý den dostaneš krátkou výzvu z reálného života. Žádná teorie. → Jdeš a uděláš ji." },
  { icon: Key, title: "4. DOKAŽ TO", desc: "Nahraješ důkaz. Fotku. Video. Text. Tvůj progres se stává viditelný — pro tebe i pro ostatní." },
  { icon: Gift, title: "5. ZÍSKEJ ODMĚNU", desc: "Za každou akci získáváš klíče, odemykáš nové úrovně a otevíráš mystery boxy. Nikdy nevíš, co padne. → A přesně proto chceš další." },
  { icon: Rocket, title: "6. POSUŇ SE DÁL", desc: "S každým krokem rosteš. Otevíráš nové možnosti. Získáváš status. Odměny, které využiješ v reálném světě. A začínáš hrát na úplně jiné úrovni." },
];

const team = [
  { name: "Tomáš", role: "Founder", desc: "Vize, směr a svět, který tahle hra buduje.", quote: "Začal jsem to tvořit ve chvíli, kdy mi došlo, že většina lidí jen sleduje svůj život… místo aby ho opravdu žila.", img: "/tomas.png" },
  { name: "Vítek", role: "Co-founder", desc: "Strategie, systém a rozhodnutí, která drží hru pohromadě.", quote: "Vždycky mě zajímalo, jak nastavit systém tak, aby lidi nejen motivoval… ale skutečně měnil jejich chování.", img: "/vitek.png" },
  { name: "Marián", role: "Co-founder", desc: "Provoz, exekuce a realita každého dne.", quote: "Věděl jsem, že bez změny zůstane vše tak jak je. Tohle je místo, kde se věci opravdu dějí.", img: "/marian.png" },
  { name: "Lucie", role: "Co-founder", desc: "Energie, empatie a spojení s komunitou.", quote: "Každý den vidím, jak moc lidem chybí prostředí, kde můžou růst a být sami sebou. Tohle má být ten prostor.", img: "/lucie.png" },
];

const faqs = [
  { q: "Co se stane, když se připojím?", a: "Dostaneš přístup do uzavřené komunity, kde Hru Reality společně stavíme. Uvidíš první verzi systému, první výzvy a budeš u toho, jak se celý projekt formuje od začátku.\n→ Nejde jen o hraní.\n→ Jde o to být u vzniku." },
  { q: "Je hra už hotová?", a: "Ne.\nJsme v pre-launch fázi.\nA právě proto hledáme první hráče, kteří chtějí být u toho.\n→ To, co vznikne, bude do velké míry ovlivněné lidmi, kteří přijdou teď." },
  { q: "Proč bych se měl/a připojit už teď?", a: "Protože první hráči vždy získají nejvíc. Mají přímý vliv na směr projektu, dostávají early přístup k novým věcem a budují si pozici od úplného začátku.\n→ Později už jen vstupuješ do hotové hry." },
  { q: "Co se bude dít v Discordu?", a: "První signály hry a testování systému, sdílení progresu, společné budování hry, komunikace přímo s týmem.\n→ Je to kombinace komunity, hry a backstage vývoje." },
  { q: "Musím být aktivní každý den?", a: "Ne.\nAle čím víc se zapojíš, tím víc z toho můžeš získat.\n→ Hra Reality není o dokonalosti.\n→ Je o pohybu." },
  { q: "Co když jen chci sledovat?", a: "Můžeš.\nAle pravděpodobně rychle zjistíš, že je lepší hrát." },
];

export default function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />

        <div className="section-container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          <FadeIn>
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8">
                PRE-LAUNCH
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Staň se jedním z prvních, kdo začne hrát svůj život <span className="neon-text">jinak</span>
              </h1>
              <div className="text-lg text-muted-foreground mb-8 max-w-lg space-y-4">
                <p><strong>Krátké výzvy. Reálný progres. Viditelná změna.</strong></p>
                <p>Teď budujeme první verzi hry a hledáme <span className="whitespace-nowrap">1 000 hráčů</span>, kteří chtějí být u jejího vzniku.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://discord.gg/MGnNWkcqQf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all min-h-[44px]"
                >
                  <ArrowRight size={18} />
                  Připoj se k pre-launch komunitě
                </a>
                <Link
                  to="/collection"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary/50 border border-primary/20 hover:bg-secondary text-foreground font-display font-bold text-sm rounded-xl hover:border-primary/50 transition-all min-h-[44px]"
                >
                  Prohlédnout kolekci karet →
                </Link>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Pre-launch komunita Discord • První verze pro <span className="whitespace-nowrap">1 000 hráčů</span> • Start testování 2026
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative flex justify-center group">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75 animate-pulse" />
              <img
                src={heroImg}
                alt="Dr.Wetom - Hra Reality"
                className="w-full max-w-md lg:max-w-lg animate-float rounded-2xl relative z-10 drop-shadow-[0_0_30px_hsl(270,100%,65%,0.4)]"
                style={{ filter: "drop-shadow(0 0 30px rgba(168, 85, 247, 0.4)) contrast(1.1)" }}
                loading="eager"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CO SE STANE PO VSTUPU */}
      <div className="hud-line" />
      <section className="py-20 bg-primary/5">
        <div className="section-container">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8 text-center">
              Co se stane po <span className="neon-text">vstupu?</span>
            </h2>
            <div className="max-w-2xl mx-auto text-center space-y-6 text-muted-foreground text-lg">
              <p>Projdeš krátkým onboardingem <span className="whitespace-nowrap">(cca 5 minut)</span>.<br />
                Odemkneš Level 1.<br />
                A poprvé uvidíš signály Hry Reality.</p>

              <p>Začneš reagovat.<br />
                A postupně získáš přístup k testování nového světa.</p>

              <div className="p-6 glass-card border-primary/30 mt-8 rounded-2xl">
                <p className="text-foreground font-medium mb-1">První krok ti zabere <span className="whitespace-nowrap">5 minut.</span></p>
                <p className="text-primary font-bold">Ale může změnit celý tvůj směr.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="hud-line" />

      {/* CO JE HRA REALITY */}
      <section className="py-20">
        <div className="section-container">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
              Co je to <span className="neon-text">Hra Reality?</span>
            </h2>
            <div className="max-w-2xl mx-auto text-center space-y-4 text-muted-foreground text-lg">
              <p><strong>Hra Reality je příběhový systém výzev odehrávající se přímo v reálném životě.</strong></p>
              <p>Žádné nekonečné scrollování. Žádná teorie bez akce. Místo toho plníš výzvy, sdílíš důkazy svého progresu a získáváš status, identitu a odměny za to, co skutečně děláš.</p>
              <p>Hra Reality propojuje gamifikaci, osobní růst a komunitu do jednoho systému, který ti s každým krokem odemyká víc možností, odměn a prostoru růst.</p>
              <p>Celý obsah staví na reálných zkušenostech, výzvách inspirovaných experty a síle komunity, která roste společně.</p>
              <p className="text-foreground font-medium pt-4">Není to něco, co jenom sleduješ. Je to něco, co začneš hrát.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="hud-line" />

      {/* JAK SE HRAJE */}
      <section className="py-20">
        <div className="section-container">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
              Jak se Hra Reality <span className="neon-text">hraje</span>
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="glass-card-hover p-6 h-full">
                  <step.icon className="text-primary mb-4" size={32} />
                  <h3 className="font-display text-sm font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="hud-line" />

      {/* TÝM */}
      <section className="py-20 relative">
        <div className="section-container max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
                Kdo stojí za <span className="neon-text">Hrou Reality</span>
              </h2>
              <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground text-lg">
                <p>Hru Reality netvoří anonymní tým.<br />Tvoří ji lidé, kteří se rozhodli přestat jen mluvit… a začít tvořit.</p>
                <p>Začínáme od nuly. Bez investorů. S vírou v to, co budujeme.<br />
                  A s vizí, že tohle může změnit způsob, jak lidé žijí svůj život.</p>
              </div>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-8">
            {team.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.1}>
                <div className="glass-card-hover p-6 flex flex-col items-center sm:items-start text-center sm:text-left gap-6 h-full border border-border/40 bg-card/40">
                  <div className="w-24 h-24 shrink-0 rounded-2xl bg-secondary border border-primary/20 flex items-center justify-center overflow-hidden relative group">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors z-10" />
                    {person.img ? (
                      <img src={person.img} alt={person.name} className="w-full h-full object-cover relative z-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    ) : (
                      <span className="font-display text-primary/50 text-4xl font-bold uppercase relative z-0">
                        {person.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-left w-full sm:w-auto">
                    <h3 className="font-display text-xl font-bold text-foreground text-center sm:text-left">{person.name}</h3>
                    <p className="text-sm font-semibold tracking-wider text-primary mb-3 uppercase text-center sm:text-left">{person.role}</p>
                    <p className="text-sm text-foreground/80 mb-4 text-center sm:text-left">{person.desc}</p>
                    <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">„{person.quote}“</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="mt-16 text-center max-w-2xl mx-auto p-8 glass-card border-primary/20">
              <p className="font-display text-lg mb-2">→ Nejsme jen tým.</p>
              <p className="font-display text-lg mb-6 text-primary font-bold">→ Jsme první hráči téhle hry.</p>
              <p className="text-muted-foreground">Pokud tohle čteš, nejsi tu náhodou.<br />Možná je čas začít hrát taky.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="hud-line" />

      {/* WHY NOW */}
      <section className="py-20 bg-background/50">
        <div className="section-container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn delay={0.2} className="md:order-2">
              <div className="glass-card p-8 border-primary/30 rounded-2xl h-full flex flex-col justify-center">
                <h3 className="text-2xl font-display font-bold mb-4 text-primary">
                  Proč se připojit právě teď
                </h3>
                <p className="text-lg text-muted-foreground mb-4">Hra je na začátku.<br />To znamená jediné:</p>
                <ul className="text-lg text-muted-foreground space-y-2 mb-6">
                  <li>→ Můžeš být u toho od prvního dne</li>
                  <li>→ Ovlivnit, jak bude vypadat</li>
                  <li>→ A získat náskok před ostatními</li>
                </ul>
                <p className="text-xl text-foreground font-bold mb-2">První hráči vždy získají nejvíc.</p>
                <p className="text-muted-foreground mb-6">Otázka je, jestli budeš mezi nimi. Můžeš být u toho od začátku. Nebo přijít později… a jen sledovat, jak roste.</p>
                <a
                  href="https://discord.gg/MGnNWkcqQf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-display font-bold text-base rounded-xl pulse-glow hover:brightness-110 transition-all mt-auto"
                >
                  <ArrowRight size={18} />
                  Vstup do discordu
                </a>
              </div>
            </FadeIn>
            <FadeIn className="md:order-1">
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">
                Proč vzniká Hra Reality <span className="neon-text">právě teď</span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>Nikdy jsme neměli víc možností.<br />A nikdy jsme nebyli víc zahlcení.</p>
                <p>Scrollujeme. Sledujeme. Konzumujeme.<br />Ale reálně se nikam neposouváme.</p>
                <p>Sociální sítě odměňují pozornost. Ne změnu.<br />Vzdělávání dává informace. Ne akci.</p>
                <div className="pt-2 text-foreground font-medium">
                  <p>→ Všichni ví, co dělat.</p>
                  <p>→ Málokdo to dělá.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="hud-line" />

      {/* FAQ */}
      <section className="py-20">
        <div className="section-container max-w-3xl">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
              <HelpCircle className="inline-block text-primary mr-2 -mt-1" size={28} />
              FAQ
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card border border-border/50 px-6 rounded-xl">
                  <AccordionTrigger className="text-lg sm:text-xl font-bold hover:text-primary py-4 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 whitespace-pre-line leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
              Jsi připraven začít <span className="neon-text">hrát</span>?
            </h2>
            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center justify-center gap-1 px-12 py-5 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all"
            >
              <div className="flex items-center gap-2 text-lg">
                <ArrowRight size={20} />
                Vstoupit do hry
              </div>
              <span className="text-xs font-medium opacity-80 font-body">Zabere ti to jen pár minut</span>
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
