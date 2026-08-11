import { HelpCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Co je Founder Membership?",
    a: "Jednorázový balíček, kterým podpoříš vznik první hratelné verze iWau Hry Reality. Vybereš si úroveň, jednou zaplatíš a získáš konkrétní Founder výhody — digitální, komunitní nebo fyzické dle zvoleného balíčku. Žádné měsíční platby.",
  },
  {
    q: "Je to investice?",
    a: "Rozhodně ne. Nekupuješ podíl ve firmě a ani nárok na zisk. Kupuješ konkrétní balíček s jasně definovanými výhodami — nic víc, nic míň.",
  },
  {
    q: "Kdy se spustí MVP1?",
    a: "Plánované spuštění je 7. 9. 2026. Pracujeme na tom, aby to vyšlo, ale vývoj softwaru přináší proměnné, které nemůžeme stoprocentně kontrolovat. Z toho důvodu uvádíme tento termín jako plán, ne jako slib. Foundery budeme o případných změnách informovat.",
  },
  {
    q: "A co když se to zdrží?",
    a: "Řekneme to, otevřeně a včas. Harmonogram se může měnit podle vývoje projektu. Práva zákazníka podle platných předpisů tím nejsou dotčena.",
  },
  {
    q: "Musím být na Discordu?",
    a: "Ne, ale v Season 0 se většina dění odehrává právě tam — aktualizace, komunita, průběžné výhody. Pokud chceš být blízko vývoji, Discord je to správné místo.",
  },
  {
    q: "Co se stane, když zaplatím?",
    a: "Dostaneš potvrzovací e-mail, vytvoříme ti Founder záznam s tvým číslem, aktivujeme dostupné výhody a pošleme instrukce, co dál. Nepřišel ti e-mail? Zkontroluj spam, pak napiš na podporu: hrareality@gmail.com",
  },
];

export default function FounderFAQ() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">13 — Než se rozhodneš</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
            <HelpCircle className="inline-block text-primary mr-2 -mt-1" size={28} />
            Časté otázky
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`founder-faq-${i}`} className="glass-card border border-border/50 px-6 rounded-xl">
                <AccordionTrigger className="text-base sm:text-lg font-bold hover:text-primary py-4 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed whitespace-pre-line">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
