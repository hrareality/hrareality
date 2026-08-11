import { Award, Fingerprint, Zap, Sparkles, Users, Crown } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const pillars = [
  { icon: Award, title: "FOUNDER STATUS", subtitle: "Viditelné označení první generace", desc: "Získáš Founder status navázaný na Season 0. Jak a kde se zobrazí, závisí na tvé Founder úrovni a aktuální fázi produktu." },
  { icon: Fingerprint, title: "FOUNDER IDENTITA", subtitle: "Jméno, které v projektu zůstane", desc: "Možnost zápisu do Knihy Zakladatelů — pod jménem, značkou, přezdívkou, iniciálami nebo klidně i anonymně. Záleží jen na tobě, jak chceš být viděn." },
  { icon: Zap, title: "EARLY ACCESS", subtitle: "Dřív než ostatní", desc: "Vybrané úrovně získají přednostní přístup k testování Season 1 (MVP1) a dalším uzavřeným částem celého vývoje. Rozsah se liší podle zvoleného balíčku." },
  { icon: Sparkles, title: "FOUNDER COLLECTION", subtitle: "Artefakty, které patří jen Season 0", desc: "Digitální Founder karty, artefakty a sběratelské prvky dostupné pouze pro první generaci. Tyto prvky nemají garantovanou finanční hodnotu." },
  { icon: Users, title: "FOUNDER COUNCIL", subtitle: "Prostor pro zpětnou vazbu", desc: "Vybrané úrovně získají přístup do prostoru, kde mohou testovat, diskutovat a sdílet zpětnou vazbu na vývoj hry. Founder Council je zase poradní komunitní prostor, ne rozhodovací orgán." },
  { icon: Crown, title: "PREMIUM", subtitle: "Premium po spuštění Season 1", desc: "Balíčky obsahující Premium se aktivují až po spuštění příslušné vrstvy v Season 1 (MVP1). Doba Premium neběží zpětně." },
];

export default function FounderBenefits() {
  return (
    <section id="co-founder-ziska" className="py-20">
      <div className="section-container">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">06 — Tvá stopa v Season 0</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            Nestáváš se zákazníkem. <span className="neon-text">Vstupuješ do první generace.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-center text-muted-foreground text-lg mb-12">
            Každá Founder úroveň nabízí jiný rozsah výhod. Jedno ale mají společné — všechny patří do Season 0, první kapitoly iWau Hry Reality, která bude existovat jen jednou.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="glass-card-hover p-6 h-full">
                <p.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display text-sm font-bold mb-1 tracking-wide">{p.title}</h3>
                <p className="text-sm font-semibold text-foreground/90 mb-2">{p.subtitle}</p>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="glass-card p-6 border-primary/30">
              <h4 className="font-display font-bold text-primary mb-2">Co získáš ihned</h4>
              <p className="text-sm text-muted-foreground">
                Potvrzení Membershipu, Founder číslo, Discord roli, přístup do určených komunitních místností a další digitální výhody, které jsou aktuálně dostupné.
              </p>
            </div>
            <div className="glass-card p-6 border-border/40">
              <h4 className="font-display font-bold text-foreground mb-2">Co přijde s vývojem</h4>
              <p className="text-sm text-muted-foreground">
                Přístup k MVP1, Premium období, beta testování, budoucí karty, fyzické Founder předměty a eventy. Konkrétní časování vždy závisí na zvolené úrovni a stavu vývoje.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
