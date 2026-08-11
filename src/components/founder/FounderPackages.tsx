import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scrollToId } from "@/lib/utils";
import type { PackageKey } from "@/types/founder";

interface PackageCopy {
  key: PackageKey;
  name: string;
  price: number;
  badge?: { label: string; tone: "recommended" | "limited" };
  limitNote?: string;
  identity: string;
  description: string;
  contents: string;
  cta: string;
  microtext: string;
}

const PACKAGES: PackageCopy[] = [
  {
    key: "supporter",
    name: "Podporovatel Season 0",
    price: 149,
    identity: "Chci být u začátku.",
    description: `Jednoduchý způsob, jak říct — "věřím tomu, co stavíte". Tvoje jméno se zapíše mezi Foundery Season 0 — a to je víc, než by se na první pohled mohlo zdát.`,
    contents: `Founder badge, jméno v Knize Zakladatelů, Discord role "Podporovatel Season 0", poděkování`,
    cta: "Stát se Podporovatelem",
    microtext: "Jednorázová platba. Nejedná se o investici ani pravidelné předplatné.",
  },
  {
    key: "first_player",
    name: "První hráč Season 0",
    price: 499,
    identity: "Chci být mezi prvními, kdo vstoupí do hry.",
    description: "Pro ty, kdo nechtějí pouze podpořit, ale být uvnitř. Přednostní přístup k Season 1 (MVP1), vlastní Founder Card a místo v první generaci hráčů.",
    contents: `Vše z úrovně Podporovatel a navíc: přednostní vstup do Season 1 (MVP1), digitální Founder Card, Discord role "První hráč Season 0", Founder číslo, přístup do Inner Circle`,
    cta: "Stát se Prvním hráčem",
    microtext: "Přístup do testování může být kapacitně omezený a nemusí být aktivován všem Founderům současně.",
  },
  {
    key: "founder_tier",
    name: "Zakladatel Season 0",
    price: 999,
    limitNote: "Limit 1 000 Zakladatelů",
    identity: "Chci skutečně podpořit vývoj.",
    description: "Plná Founder úroveň pro člověka, který chce být viditelnou součástí první generace. Premium po spuštění Season 1, priorita při testování a přímý přístup k aktualizacím celého vývoje.",
    contents: `Vše z úrovně První Hráč a navíc: 12 měsíců Premium po spuštění Season 1 (MVP1), přístup do uzavřeného update kanálu, Discord role "Zakladatel Season 0", digitální Founder certifikát, priorita při beta testování`,
    cta: "Stát se Zakladatelem",
    microtext: "Premium začne běžet až po spuštění příslušné Premium vrstvy Season 1. Founder hlasování jsou poradní a nezakládají nárok na rozhodovací kontrolu nad projektem.",
  },
  {
    key: "creator",
    name: "Tvůrce Season 0",
    price: 1999,
    badge: { label: "Doporučená Founder úroveň", tone: "recommended" },
    limitNote: "500 Founderů",
    identity: "Chci pomoct formovat hru.",
    description: "Pro lidi, kteří chtějí víc než jen sledovat vývoj — chtějí se na něm aktivně podílet. Zpětná vazba, hlasování o klíčových rozhodnutích a místo u prvního eventu.",
    contents: `Vše z úrovně Zakladatel a navíc: přístup do #founder-council na Discordu, hlasování o vybraných rozhodnutích MVP1, dvě vstupenky na první event, celý set artefaktů Season 0, Discord role "Tvůrce Season 0", priorita při beta testování`,
    cta: "Stát se Tvůrcem",
    microtext: "Founder Council je poradní komunitní prostor. Účast na událostech může být podmíněna registrací, kapacitou, lokalitou a organizačními pravidly.",
  },
  {
    key: "guardian",
    name: "Strážce Season 0",
    price: 4999,
    badge: { label: "Limitovaná úroveň", tone: "limited" },
    limitNote: "Pouze 100 Strážců",
    identity: "Chci být jedním z pilířů, na kterých to celé stojí.",
    description: "Nejvyšší Founder úroveň. Pouze 100 míst. Founder Set, VIP přístup na první event, jméno v komiksech a zvýrazněná pozice v Knize Zakladatelů. Po Season 0 navždy nedostupné.",
    contents: `Vše z úrovně Tvůrce a navíc: VIP přístup na první event, Founder Set, zvýrazněné jméno v Knize Zakladatelů, jméno/logo v digitální verzi komiksu, Discord role "Strážce Season 0"`,
    cta: "Stát se Strážcem",
    microtext: "Počet Strážců je omezen na 100. Fyzické předměty budou odesílány samostatně podle výrobního a doručovacího harmonogramu. Doprava, dostupnost zemí a případné doplatky musí být uvedeny před dokončením objednávky.",
  },
];

/**
 * Rozseká pole "contents" (nezměněný text z PACKAGES) na volitelný úvod před dvojtečkou
 * a seznam položek za ní — čistě prezentační transformace, žádná slova se nemění.
 */
function parsePackageContents(contents: string): { intro: string | null; items: string[] } {
  const colonIndex = contents.indexOf(":");
  if (colonIndex === -1) {
    return { intro: null, items: contents.split(", ") };
  }
  return {
    intro: contents.slice(0, colonIndex + 1),
    items: contents.slice(colonIndex + 1).trim().split(", "),
  };
}

function PackageContentsList({ contents }: { contents: string }) {
  const { intro, items } = parsePackageContents(contents);
  return (
    <div className="mb-4 border-t border-border/30 pt-4">
      {intro && <p className="text-xs text-foreground/60 mb-2">{intro}</p>}
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-foreground/80">
            <Check size={13} className="text-primary shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FounderPackages() {
  const [activePackage, setActivePackage] = useState<PackageCopy | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openCheckout(pkg: PackageCopy) {
    setActivePackage(pkg);
    setEmail("");
    setError(null);
  }

  async function submitCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!activePackage) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/founder/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageKey: activePackage.key, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "sold_out") {
          setError("Tato úroveň je bohužel vyprodaná.");
        } else if (data.error === "already_founder_equal_or_higher") {
          setError("U tohoto e-mailu už evidujeme stejnou nebo vyšší Founder úroveň.");
        } else {
          setError(data.message || "Něco se nepovedlo. Zkus to prosím znovu.");
        }
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Nepodařilo se spojit s platební bránou. Zkus to prosím znovu.");
      setLoading(false);
    }
  }

  return (
    <section id="balicky" className="py-20">
      <div className="section-container">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">07 — Vyber si svou stopu</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            Jakou roli chceš mít v <span className="neon-text">Season 0?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-center text-muted-foreground text-lg mb-12">
            Všechny úrovně pomáhají dokončit Season 1 (MVP1). Liší se mírou zapojení a rozsahem toho, co jako Founder reálně získáš.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10 items-start">
          {PACKAGES.map((pkg, i) => (
            <FadeIn key={pkg.key} delay={i * 0.07} className="h-full">
              <div
                className={`glass-card-hover p-6 h-full flex flex-col relative ${
                  pkg.badge?.tone === "recommended"
                    ? "border-primary/60 shadow-[var(--glow-primary)] xl:scale-[1.03] xl:z-10"
                    : ""
                }`}
              >
                {pkg.badge && (
                  <span
                    className={`inline-block self-start mb-3 px-2.5 py-1 rounded-full text-[10px] font-display font-bold tracking-wide uppercase ${
                      pkg.badge.tone === "recommended"
                        ? "bg-primary text-primary-foreground"
                        : "bg-destructive/20 text-destructive border border-destructive/40"
                    }`}
                  >
                    {pkg.badge.label}
                  </span>
                )}
                <h3 className="font-display font-bold text-lg mb-1">{pkg.name}</h3>
                <p className="text-sm text-primary italic mb-3">„{pkg.identity}“</p>
                <p className="text-2xl font-display font-bold mb-1">{pkg.price.toLocaleString("cs-CZ")} Kč</p>
                <p className="text-xs text-muted-foreground mb-4">Jednorázově</p>
                {pkg.limitNote && (
                  <p className="text-xs font-semibold text-accent mb-3">{pkg.limitNote}</p>
                )}
                <p className="text-sm text-muted-foreground mb-4 flex-1">{pkg.description}</p>
                <PackageContentsList contents={pkg.contents} />
                <button
                  onClick={() => openCheckout(pkg)}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl hover:brightness-110 transition-all mb-3 min-h-[44px]"
                >
                  {pkg.cta}
                </button>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{pkg.microtext}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
            Nevíš, kterou úroveň vybrat? Nemusíš nad tím dlouho přemýšlet. Každý Founder je součástí Season 0. Vyšší balíček neznamená větší hodnotu pro komunitu — jen širší rozsah výhod a vyšší míru podpory.
          </p>
          <div className="text-center mb-8">
            <button
              onClick={() => scrollToId("co-founder-ziska")}
              className="text-sm font-display font-bold text-primary hover:underline"
            >
              Porovnat všechny Founder výhody →
            </button>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto text-center">
            Founder Membership je jednorázový nákup konkrétního balíčku. Nejedná se o investici, podíl ve společnosti ani garanci budoucího zhodnocení. Některé výhody se aktivují až po spuštění MVP1 nebo jeho příslušné části. Podrobnosti jsou uvedeny v popisu balíčku a v podmínkách Founder Membershipu.
          </p>
        </FadeIn>
      </div>

      <Dialog open={!!activePackage} onOpenChange={(open) => !open && setActivePackage(null)}>
        <DialogContent className="bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-display">{activePackage?.name}</DialogTitle>
            <DialogDescription>
              {activePackage?.price.toLocaleString("cs-CZ")} Kč / jednorázově. Zadej e-mail, na který ti pošleme potvrzení a Founder číslo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitCheckout} className="space-y-4">
            <Input
              type="email"
              required
              placeholder="tvuj@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full font-display font-bold">
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Pokračovat k platbě"}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              Přesměrujeme tě na zabezpečenou platební bránu Stripe.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
