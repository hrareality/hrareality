import { ArrowRight, Target, Globe, Zap, Key, Gift, Rocket, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import heroImg from "@/assets/hero-dr-wetom.png";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  { icon: Target, title: "1. ZVOL SI SMĚR", desc: "Každý hráč startuje trošku někde jinde. Zdraví, finance, příroda, myšlení — vyber si oblast, která tě zrovna nejvíc táhne. Nemusíš vědět, kam to povede. Stačí vědět, kde chceš začít." },
  { icon: Globe, title: "2. VSTUP DO SVĚTA", desc: "Každý směr má svůj vlastní svět se specifickými pravidly, questy a příběhem. Nevybíráš si kurz. Vybíráš si své nové dobrodružství." },
  { icon: Zap, title: "3. PŘIJMI VÝZVU", desc: "Krátká. Reálná. V tvém životě, ne na obrazovce. Žádná teorie — prostě jdi a udělej to. Svůj první krok uděláš dřív, než si stihneš rozmyslet, jestli na to máš nebo nemáš." },
  { icon: Key, title: "4. NAHRAJ DŮKAZ", desc: "Splnil jsi quest? Dokaž to. Fotka, video, text — je jedno jak. Důležitý je, že to není jen v tvé hlavě. Tvůj progres totiž nevidíš jen ty, ale i ostatní hráči." },
  { icon: Gift, title: "5. CLAIMNI ODMĚNU", desc: "Každá splněná výzva = klíče. Klíče odemykají nové levely a mystery boxy. Co v nich bude? To nikdy nevíš. A přesně proto chceš další." },
  { icon: Rocket, title: "6. LEVEL UP", desc: "S každým questem se posuneš o něco dál. Nové světy. Nové výzvy. Status v komunitě. A odměny, které fungují i mimo hru — v tvém reálném životě." },
];

const team = [
  { name: "Tomáš", role: "Founder", desc: "Vize, směr a svět, který tahle hra buduje.", quote: "Začal jsem to tvořit ve chvíli, kdy mi došlo, že většina lidí jen sleduje svůj život… místo aby ho opravdu žila.", img: "/tomas.png" },
  { name: "Vítek", role: "Co-founder", desc: "Strategie, systém a rozhodnutí, která drží hru pohromadě.", quote: "Vždycky mě zajímalo, jak nastavit systém tak, aby lidi nejen motivoval… ale skutečně měnil jejich chování.", img: "/vitek.png" },
  { name: "Marián", role: "Co-founder", desc: "Provoz, exekuce a realita každého dne.", quote: "Věděl jsem, že bez změny zůstane vše tak jak je. Tohle je místo, kde se věci opravdu dějí.", img: "/marian.png" },
  { name: "Lucie", role: "Co-founder", desc: "Energie, empatie a spojení s komunitou.", quote: "Každý den vidím, jak moc lidem chybí prostředí, kde můžou růst a být sami sebou. Tohle má být ten prostor.", img: "/lucie.png" },
];

const faqs = [
  { q: "Co tě čeká uvnitř?", a: "Vstoupíš do uzavřené Discord komunity, kde se v reálném čase staví iWau HRA REALITY. Uvidíš, jak vznikají questy. Jak se testují první levely. Jak se mění pravidla na základě toho, co funguje a co ne.\n\nNejsi jen pouhý divák. Jsi beta tester s možností podílet se na vývoji. Tvůj feedback formuje hru, kterou jednou budou hrát tisíce lidí.\n→ Tohle není „sleduj náš progress“.\n→ Tohle je „pojď ho tvořit s námi“." },
  { q: "Je hra hotová?", a: "Ještě ne. A právě proto je tohle ten nejvzácnější okamžik.\n\nKaždá legendární hra měla svůj začátek — verzi, kterou hrálo pár stovek lidí, než ji objevil zbytek světa. Lidi, kteří ji formovali. Kteří hlásili bugy. Kteří navrhovali, co přidat a co odstranit.\n→ Tohle je přesně ta fáze.\n→ Pravidla se píšou teď. A kdo je u toho, píše je s námi." },
  { q: "Proč bych se měl připojit zrovna teď?", a: "Protože v každé hře existuje moment, který se nedá zopakovat. Moment, kdy je mapa prázdná, všechno je nové a každý krok je novým objevem.\n\nTohle je přesně ten moment. Právě teď. První hráči jen nehrají — určují směr. Testují. Objevují. Mají přímý přístup k lidem, kteří hru staví.\n\nAž se jednou někdo zeptá, jak iWau HRA REALITY vlastně začala — ty budeš moct říct, že jsi u toho byl a nepropásl to.\n→ A to je level, na který se později už nedá dostat." },
  { q: "Co se bude dít na Discordu?", a: "Představ si místo, kde se potkávají první hráči, tvůrci hry a systém, který se mění každý týden. To is přesně náš Discord.\n\nDostaneš první questy k testování. Uvidíš, jak vznikají nové levely. Budeš moct říct „tohle nefunguje“ nebo „tohle je sick“ — a přímo tím ovlivníš, co se bude dít dál.\n\nNení to žádné forum ani group chat. Je to místo, kde se iWau HRA REALITY odehrává ještě předtím, než se spustí pro širokou veřejnost.\n→ Privní hráči nesledují vývoj. Jsou jeho součástí." },
  { q: "Musím hrát každý den?", a: "Rozhodně ne. Život není sprint a iWau HRA REALITY taky ne.\n\nMůžeš hrát jednou týdně. Můžeš hrát každý den. Tempo si volíš podle sebe, je to jen na tobě. Ale jedno je jisté — hráči, kteří jsou aktivní, levelují více. A ti, co čekají na správný moment, stojí pořád na stejném místě.\n→ Nejde o to být dokonalý.\n→ Jde o to jít do akce." },
  { q: "Co když chci jen sledovat a nic nedělat?", a: "Můžeš. Ale hráči to říkají jasně — jakmile vidíš, jak ostatní plní questy a levelují, „budu jen sledovat“ ti vydrží tak týden, uvidíš sám." },
];

export default function Index() {
  return (
    <>
      <SEO 
        title="iWau HRA REALITY | Gamifikace reálného života – výzvy, příběh, komunita" 
        description="iWau HRA REALITY je inovativní systém výzev v reálném životě spojený s příběhem, komiksy a pre-launch Discord komunitou. Přestaň jen sledovat svůj život – začni ho hrát." 
      />
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
                Většina lidí jen konzumuje obsah a říká si, že se jednou změní. <span className="neon-text">Hráči ne, ti začnou okamžitě</span>.
              </h1>
              <div className="text-lg text-muted-foreground mb-8 max-w-lg space-y-4">
                <p><strong>iWau HRA REALITY je systém krátkých výzev v reálném životě.</strong> Žádné pasivní sledování. Žádné nekonečné odkládání. Jen quest, akce a reálný progres.</p>
                <p>Právě teď stavíme první verzi. A hledáme <span className="whitespace-nowrap">1 000 lidí</span>, co nechtějí jen čekat.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://discord.gg/MGnNWkcqQf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all min-h-[44px]"
                >
                  Začni hrát →
                </a>
                <Link
                  to="/collection"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary/50 border border-primary/20 hover:bg-secondary text-foreground font-display font-bold text-sm rounded-xl hover:border-primary/50 transition-all min-h-[44px]"
                >
                  Prohlédnout kolekci karet →
                </Link>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Pre-launch na Discordu · Prvních 1 000 hráčů · Start 2026
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative flex justify-center group">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75 animate-pulse" />
              <img
                src={heroImg}
                alt="Dr.Wetom - iWau HRA REALITY"
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
              Co se stane, když <span className="neon-text">vstoupíš?</span>
            </h2>
            <div className="max-w-2xl mx-auto text-center space-y-6 text-muted-foreground text-lg">
              <p>Onboarding na 5 minut. Bez zbytečné omáčky. Odemkneš Level 1 a dostaneš svůj první quest — krátkou výzvu v reálném světě.</p>
              
              <p>Žádné několikahodinové tutoriály. Žádné vyplňování dotazníků. Rovnou hraješ.</p>

              <p>Splníš první quest. Uvidíš, jak funguje systém. A pokud tě hra chytne, odemkneš si přístup k testování nového světa, a to dřív než všichni ostatní.</p>

              <div className="p-6 glass-card border-primary/30 mt-8 rounded-2xl">
                <p className="text-foreground font-medium mb-1">5 minut. Jeden quest.</p>
                <p className="text-primary font-bold">Budeš s jistotou vědět, jestli jsi hráč nebo ne.</p>
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
              Co přesně je <span className="neon-text">iWau HRA REALITY?</span>
            </h2>
            <div className="max-w-2xl mx-auto text-center space-y-4 text-muted-foreground text-lg">
              <p>Představ si svět, ve kterém každý tvůj den obsahuje skryté výzvy. Jsou všude kolem tebe — jen jsi je doteď neviděl.</p>
              <p>iWau HRA REALITY ti je ukáže. Dostaneš quest. Splníš ho v reálném světě. Nahraješ důkaz a posuneš se dál — v levelu, ve statusu, v tom, kým se stáváš.</p>
              <p>Žádná teorie. Žádné scrollování. Jen akce, výsledky a komunita hráčů, kteří rostou společně s tebou.</p>
              <p>Za každým questem stojí know-how od lidí, co si tím sami prošli. A s každým krokem se ti odemyká něco nového - víc světů, víc odměn, víc možností.</p>
              <p className="text-foreground font-medium pt-4">Život totiž není problém. Je to hra, kterou je potřeba začít hrát. A tenhle systém ti dává pravidla, podle kterých v ní můžeš začít vyhrávat.</p>
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
              Jak se <span className="neon-text">hraje?</span>
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
          <FadeIn delay={0.6}>
            <p className="text-center text-lg text-muted-foreground font-medium mt-12 italic">
              Cyklus, který tě táhne dál. Ne proto, že musíš. Ale proto, že chceš.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="hud-line" />

      {/* TÝM */}
      <section className="py-20 relative">
        <div className="section-container max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
                Kdo tvoří <span className="neon-text">iWau HRA REALITY?</span>
              </h2>
              <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground text-lg text-center">
                <p>Každá hra má své tvůrce. My jsme čtyři lidi, kteří se shodli na jedné myšlence — že osobní růst může fungovat úplně jinak, než jak ho zná dnešní svět.</p>
                <p>Začali jsme bez investorů. Bez zázemí. Bez jistoty, že to vyjde. Jediné, co jsme měli, byl koncept, který dával smysl — a ochota to celé dotáhnout.</p>
                <p>Aktuálně stavíme první verzi hry. A hledáme hráče, kteří chtějí být u toho, než se o tom dozví všichni ostatní.</p>
                <p className="text-foreground font-medium pt-2">Tohle není produkt velké firmy. Tohle je hra, kterou stavíme společně s vámi.</p>
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
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-primary">Neřekneme ti, jak žít. To není náš styl.</h3>
              <p className="text-muted-foreground mb-4">Jsme první hráči. Prošli jsme si tím sami — a pak jsme z toho postavili systém, aby tím mohl projít kdokoliv jiný.</p>
              <p className="text-muted-foreground mb-6">Navíc jsi se dočetl až sem, což rozhodně není náhoda. Většina lidí odpadla někde u prvních řádků. Ty ne.<br /><strong>Tak co — jsi připraven hrát?</strong></p>
              <a
                href="https://discord.gg/MGnNWkcqQf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl pulse-glow hover:brightness-110 transition-all min-h-[44px]"
              >
                Začni hrát →
              </a>
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
              <div className="glass-card p-8 sm:p-10 border-primary/30 rounded-2xl h-full flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-6 text-primary">
                  Proč začít teď a ne až zítra?
                </h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                  iWau HRA REALITY je v pre-launch fázi. Všechno se teprve buduje. A právě proto je teď ten nejlepší okamžik pro vstup.
                </p>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Prvních 1 000 hráčů nejsou jen běžní uživatelé. Jsou to lidi, kteří tvoří samotnou hru. Jsou to ti, kteří mají vliv na to, jak vypadá. Ti, jež reálně byli uvnitř dřív, než se otevřely dveře pro všechny ostatní.
                </p>
                <p className="text-base md:text-lg text-foreground font-bold mb-6 leading-relaxed">
                  Tahle výhoda se nedá dohnat. Buď jsi u toho od season 0, nebo přijdeš, až bude plno, a budeš koukat na hráče, kteří začali dřív.
                </p>
                <a
                  href="https://discord.gg/MGnNWkcqQf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-display font-bold text-base rounded-xl pulse-glow hover:brightness-110 transition-all mt-auto"
                >
                  Vstup do hry →
                </a>
              </div>
            </FadeIn>
            <FadeIn className="md:order-1">
              <div className="glass-card p-8 sm:p-10 border-border/30 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">
                    Proč vznikla iWau HRA REALITY <span className="neon-text">zrovna teď?</span>
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                    <p>Žijeme v době, kdy máš odpověď na všechno — a přesto nevíš, co dělat dál.</p>
                    <p>Obsahu je víc než kdy dřív. Kurzů, videí, podcastů, knížek. Ale mezi „vědět“ a „udělat“ je propast, kterou dokáže překonat jen hrstka lidí.</p>
                    <p>Sociální sítě tě naučily sledovat cizí životy. Vzdělávací platformy tě zase naučily hromadit informace. Ale nikdo tě nenaučil udělat první krok.</p>
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-border/20 space-y-3">
                  <p className="text-foreground font-medium text-base md:text-lg leading-relaxed">iWau HRA REALITY nevzniká proto, že chybí obsah. Vzniká proto, že chybí akce.</p>
                  <p className="text-primary font-bold text-base md:text-lg leading-relaxed">→ Svět nepotřebuje další video. Potřebuje systém, který tě přiměje vstát a udělat první kroky ke změně.</p>
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
              Tak co? Připraven začít <span className="neon-text">hrát?</span>
            </h2>
            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center justify-center gap-1 px-12 py-5 bg-primary text-primary-foreground font-display font-bold rounded-xl pulse-glow hover:brightness-110 transition-all"
            >
              <div className="flex items-center gap-2 text-lg">
                Vstoupit do hry →
              </div>
              <span className="text-xs font-medium opacity-80 font-body">Stačí jen pár kliků a je to.</span>
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
