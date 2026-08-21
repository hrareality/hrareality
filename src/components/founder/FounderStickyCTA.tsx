import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/utils";

/**
 * Perzistentní CTA lišta pro dlouhou (18sekční) stránku Founder — ukáže se, jakmile
 * uživatel sjede pod Hero, a schová se znovu, jakmile má na obrazovce přímo balíčky
 * (#balicky), aby nedublovala CTA, které tam už je. Stejně tak se schová, jakmile
 * je vidět patička webu (#site-footer, viz Layout.tsx) — lišta je `fixed`, takže bez
 * tohohle by ležela přes obsah patičky (klientský feedback: "překrývá to patičku").
 */
export default function FounderStickyCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [inPackages, setInPackages] = useState(false);
  const [inFooter, setInFooter] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const packages = document.getElementById("balicky");
    const footer = document.getElementById("site-footer");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => setPastHero(!entry.isIntersecting),
        { rootMargin: "-10% 0px 0px 0px" }
      );
      heroObserver.observe(hero);
      observers.push(heroObserver);
    }

    if (packages) {
      const packagesObserver = new IntersectionObserver(
        ([entry]) => setInPackages(entry.isIntersecting),
        { threshold: 0.2 }
      );
      packagesObserver.observe(packages);
      observers.push(packagesObserver);
    }

    if (footer) {
      const footerObserver = new IntersectionObserver(
        ([entry]) => setInFooter(entry.isIntersecting),
        { threshold: 0 }
      );
      footerObserver.observe(footer);
      observers.push(footerObserver);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const visible = pastHero && !inPackages && !inFooter;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-xl border-t border-border/50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="section-container flex justify-center">
        <button
          onClick={() => scrollToId("balicky")}
          tabIndex={visible ? 0 : -1}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl hover:brightness-110 transition-all min-h-[44px]"
        >
          Vybrat Founder úroveň →
        </button>
      </div>
    </div>
  );
}
