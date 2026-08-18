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
  /** Starší plochý formát (název + čárkou oddělené položky) — používá se, dokud balíček nemá `benefits`. */
  contents?: string;
  /**
   * Nový strukturovaný formát benefitů (název + vlastní popisek u každé položky) —
   * viz Landing Page Texty-6, mockupy jednotlivých balíčků. Má přednost před `contents`,
   * pokud je vyplněný. Zdrojem textu jsou přímo klientem dodané obrázky balíčků
   * (na rozdíl od dřívějšího kola — Texty-5 — kde se text z obrázků NEpřebíral,
   * viz historie public/founder/packages/README.md).
   */
  benefits?: { title: string; desc: string }[];
  /** Text vedle ceny — default "Jednorázově". Přepiš, pokud obrázek balíčku uvádí jinou informaci (např. časové omezení nabídky). */
  priceNote?: string;
  cta: string;
  microtext: string;
  /**
   * Volitelná ilustrace postavy pro balíček (viz public/founder/packages/README.md).
   * Dokud pole chybí, karta zůstává v současné čistě textové podobě — žádný jiný
   * zásah v kódu není potřeba, jakmile soubory dorazí, stačí sem doplnit cestu.
   */
  image?: string;
}

const PACKAGES: PackageCopy[] = [
  {
    key: "supporter",
    name: "Podporovatel Season 0",
    price: 149,
    image: "/founder/packages/supporter.webp",
    identity: "Dává mi to smysl. Chci pomoct, aby to vzniklo.",
    description: `Jednoduchý způsob, jak říct — "věřím tomu, co stavíte". Tvoje jméno se zapíše mezi Foundery Season 0 — a to je víc, než by se na první pohled mohlo zdát.`,
    priceNote: "Do ukončení Season 0",
    benefits: [
      { title: "Origin Badge – Founder Season 1", desc: "Automaticky se zapíše po platbě do tvého alba k dalším artefaktům." },
      { title: "Jméno v Knize Zakladatelů", desc: "Jméno nebo značka zapsané mezi lidmi, kteří projekt podpořili během Season 0." },
      { title: `Discord role "Podporovatel Season 0"`, desc: "Exkluzivní role na Discordu." },
      { title: "Poděkování", desc: "Speciální e-mail zpráva s poděkováním ihned po nákupu." },
    ],
    cta: "Stát se Podporovatelem",
    microtext: "Jednorázová platba. Nejedná se o investici ani pravidelné předplatné.",
  },
  {
    key: "first_player",
    name: "První hráč Season 0",
    price: 499,
    image: "/founder/packages/first-player.webp",
    identity: "Chci být mezi prvními, kteří budou hrát.",
    description: "Pro ty, kdo nechtějí pouze podpořit, ale být uvnitř. Přednostní přístup k Season 1 (MVP1), vlastní Founder Card a místo v první generaci hráčů.",
    priceNote: "Do ukončení Season 0",
    benefits: [
      { title: "Vše z předchozí úrovně", desc: "Získáváš vše z úrovně Podporovatel Season 0." },
      { title: "Přednostní vstup do Season 1 (MVP1)", desc: "Získáš přednostní vstup do Season 1 a jejího testování." },
      { title: "Digitální Founder Collection Card", desc: "Speciální founder karta v digitální podobě do tvého alba artefaktů iWau Hry Reality." },
      { title: "Season 1 Player Pack", desc: "Vstupní Mystery Box v Season 1 pouze pro foundery." },
      { title: "Founder číslo", desc: "Unikátní Founder číslo, které podpoří tvůj status ve hře." },
      { title: "Přístup do Inner Circle", desc: "Přístup do soukromé komunity na Telegramu." },
    ],
    cta: "Stát se Prvním hráčem",
    microtext: "Přístup do testování může být kapacitně omezený a nemusí být aktivován všem Founderům současně.",
  },
  {
    key: "founder_tier",
    name: "Zakladatel Season 0",
    price: 999,
    image: "/founder/packages/founder-tier.webp",
    badge: { label: "Nejoblíbenější", tone: "recommended" },
    limitNote: "Limit 1 000 Zakladatelů",
    identity: "Chci být u první Season naplno.",
    description: "Plná Founder úroveň pro člověka, který chce být viditelnou součástí první generace. Premium po spuštění Season 1, priorita při testování a přímý přístup k aktualizacím celého vývoje.",
    priceNote: "1 000 Zakladatelů",
    benefits: [
      { title: "Vše z předchozích úrovní", desc: "Získáváš vše z předchozích balíčků." },
      { title: "12 měsíců Premium", desc: "Po spuštění MVP1 získáš 12 měsíců Premium Pass iWau Hry Reality." },
      { title: "Přístup do uzavřeného vývojového deníku", desc: "Okamžitý přístup do #founders kanálu na Discordu." },
      { title: "Kronika vzniku", desc: "Neveřejný PDF artefakt vzniku iWau Hry Reality." },
      { title: "Digitální Founder certifikát", desc: "Unikátní certifikát s tvým jménem a číslem Foundera." },
      { title: "Inner Circle", desc: "Přístup do soukromé komunity na Instagramu." },
      { title: "Exkluzivní přednosti", desc: "Buď u všeho jako první. Ovlivni budoucnost hry." },
      { title: "Omezená edice", desc: "Pouze do spuštění Season 1 (MVP1)." },
      { title: "Trvalá hodnota", desc: "Tvé místo v historii iWau Hry Reality." },
    ],
    cta: "Stát se Zakladatelem",
    microtext: "Premium začne běžet až po spuštění příslušné Premium vrstvy Season 1. Founder hlasování jsou poradní a nezakládají nárok na rozhodovací kontrolu nad projektem.",
  },
  {
    key: "creator",
    name: "Tvůrce Season 0",
    price: 1999,
    image: "/founder/packages/creator.webp",
    limitNote: "500 Founderů",
    identity: "Chci pomoci určovat podobu iWau Hry Reality.",
    description: "Pro lidi, kteří chtějí víc než jen sledovat vývoj — chtějí se na něm aktivně podílet. Zpětná vazba, hlasování o klíčových rozhodnutích a místo u prvního eventu.",
    priceNote: "500 Tvůrců",
    benefits: [
      { title: "Vše z předchozích úrovní", desc: "Získáváš vše z předchozích balíčků." },
      { title: "Přístup do #founder-council roomky", desc: "Exkluzivní skupina, kterou budeme zapojovat do vybraných produktových rozhodnutí." },
      { title: "Hlasování u vybraných rozhodnutích", desc: "Dostaneš možnost ovlivňovat a hlasovat o klíčových rozhodnutích a směřování iWau Hry Reality." },
      { title: "Dvě vstupenky na event", desc: "2 vstupy na první způsobilý Founder event iWau Hry Reality podle kapacity a podmínek eventu." },
      { title: "Celý set artefaktů Season 0", desc: "Získáš kompletní digitální set artefaktů Season 0 do svého alba." },
      { title: "Inner Circle", desc: "Přístup k dalším možnostem mimo hru." },
      { title: "Společné rozhodování", desc: "Pomáhej utvářet budoucnost iWau Hry Reality." },
      { title: "Exkluzivní zážitky", desc: "Dvě vstupenky na první oficiální event." },
      { title: "Kompletní artefakty", desc: "Získej celý set digitálních artefaktů Season 0." },
      { title: "Founder status", desc: "Jsi zapsán/a nesmazatelným písmem do iWau Hry Reality." },
    ],
    cta: "Stát se Tvůrcem",
    microtext: "Founder Council je poradní komunitní prostor. Účast na událostech může být podmíněna registrací, kapacitou, lokalitou a organizačními pravidly.",
  },
  {
    key: "guardian",
    name: "Strážce Season 0",
    price: 4999,
    image: "/founder/packages/guardian.webp",
    badge: { label: "Limitovaná úroveň", tone: "limited" },
    limitNote: "Pouze 100 Strážců",
    identity: "Chci zanechat výraznější stopu.",
    description: "Nejvyšší Founder úroveň. Pouze 100 míst. Founder Set, VIP přístup na první event, jméno v komiksech a zvýrazněná pozice v Knize Zakladatelů. Po Season 0 navždy nedostupné.",
    priceNote: "100 Strážců",
    benefits: [
      { title: "Vše z předchozích úrovní", desc: "Získáváš vše z předchozích balíčků." },
      { title: "VIP přístup na první event", desc: "Získáváš VIP přístup na první oficiální event iWau Hry Reality." },
      { title: "Origin Founder Set Season 0", desc: "Limitovaný set s překvapením pro každého strážce." },
      { title: "Founder Session", desc: "Uzavřený online call s týmem před spuštěním Season 1 (MVP1)." },
      { title: "Komiks credit", desc: `Tvé jméno, přezdívka nebo značka zapsaná do digitální verze komiksů „Probuď v sobě hráče“ a „Dr. Wetom: Kód naděje“.` },
      { title: "Inner Circle", desc: "Další know-how do tvé hry zvané život." },
      { title: "Společné rozhodování", desc: "I tvé rozhodnutí může ovlivnit směr hry." },
      { title: "Exkluzivní zážitky", desc: "VIP přístup na event a speciální odměny." },
      { title: "Kompletní artefakty", desc: "Tvá sbírka bude kompletní." },
      { title: "Legendární status", desc: "Zvýrazněné jméno v Knize Zakladatelů." },
    ],
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

/**
 * Benefity jsou dominantní prvek karty (viz klientský feedback: "musí to být
 * víc přehledné, dominantní by měly být body, co za to Founder získá, ne popis
 * balíčku"). Pokud balíček má `benefits` (nový strukturovaný formát s popiskem
 * u každé položky, viz Texty-6), použije se ten — jinak fallback na starší
 * plochý `contents` řetězec, dokud daný balíček nemá vlastní obrázek/text.
 */
function PackageContentsList({ pkg }: { pkg: PackageCopy }) {
  return (
    <div className="mb-4">
      <p className="text-[11px] uppercase tracking-widest text-primary font-display font-bold mb-2.5">
        Co jako Founder získáš
      </p>
      {pkg.benefits ? (
        <ul className="space-y-3">
          {pkg.benefits.map((b) => (
            <li key={b.title} className="flex items-start gap-2">
              <Check size={16} className="text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
              <div>
                <p className="text-sm font-semibold text-foreground/90 leading-snug">{b.title}</p>
                <p className="text-xs text-muted-foreground/80 leading-snug mt-0.5">{b.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        (() => {
          const { intro, items } = parsePackageContents(pkg.contents ?? "");
          return (
            <>
              {intro && <p className="text-xs text-foreground/60 mb-2">{intro}</p>}
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/90 leading-snug">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          );
        })()
      )}
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

        {/* items-stretch (ne items-start) — karty musí mít stejnou výšku v řádku,
            jinak tlačítka "Stát se..." nejsou zarovnaná na stejné úrovni napříč
            balíčky (klientský feedback: dát tlačítka "do jedné roviny"). */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10 items-stretch">
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
                <p className="text-xs text-muted-foreground mb-4">{pkg.priceNote ?? "Jednorázově"}</p>
                {pkg.limitNote && (
                  <p className="text-xs font-semibold text-accent mb-3">{pkg.limitNote}</p>
                )}

                {/* Benefity — dominantní prvek karty */}
                <div className="border-t border-primary/20 pt-4">
                  <PackageContentsList pkg={pkg} />
                </div>

                {/* Popis balíčku — teď doplňkový, menší a tišší než benefity */}
                <p className="text-xs text-muted-foreground/80 leading-relaxed mb-5">{pkg.description}</p>

                <div className="mt-auto">
                  <button
                    onClick={() => openCheckout(pkg)}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl hover:brightness-110 transition-all mb-3 min-h-[44px]"
                  >
                    {pkg.cta}
                  </button>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{pkg.microtext}</p>
                </div>
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
