import { useState } from "react";
import FadeIn from "@/components/FadeIn";

/**
 * Screenshoty appky — samostatná sekce, ne vměstnané do dlaždic FounderProduct
 * (tam to klientovi nesedělo vizuálně). Bez čísla, stejně jako FounderProduct,
 * se kterým tvoří pár (nejdřív abstraktní popis mechanik, hned poté vizuální
 * důkaz) — zbytek stránky jde 01–14 bez mezer, vkládat sem číslo by znamenalo
 * přečíslovat všechno za tím jen kvůli popisku.
 *
 * `image` chybí, dokud soubor nedorazí — karta se v tom případě přeskočí
 * (viz filter níže). Pozor: samotná přítomnost cesty v tomhle poli NEZARUČUJE,
 * že soubor v public/founder/app/ reálně existuje — pokud ne, prohlížeč vyhodí
 * `onError`, což se dole odchytává a karta se schová (žádná rozbitá ikona).
 * Až přijdou reálné screenshoty, stačí doplnit soubor do public/founder/app/
 * s přesně tímhle názvem (viz README.md tamtéž) — v kódu není nic potřeba měnit.
 */
const SCREENS: { image?: string; title: string; desc: string }[] = [
  { image: "/founder/app/dashboard.webp", title: "Denní přehled", desc: "XP, série a další krok" },
  { image: "/founder/app/interrupt.webp", title: "Zásah do reality", desc: "Moment, kdy hra promluví do tvého dne" },
  { image: "/founder/app/feed.webp", title: "Feed komunity", desc: "Vidíš, co právě dělají ostatní" },
  { image: "/founder/app/share-card.webp", title: "Sdílej úspěch", desc: "Ukaž svůj postup dál" },
  { image: "/founder/app/roadmap.webp", title: "Mapa cesty", desc: "Tvoje trasa Season 0" },
];

// Jemný, nesynchronní pohyb (každý telefon plave jinak rychle/s jiným zpožděním)
// a mírný nakloněný úhel, co se při hoveru narovná — spíš "vznášející se výstava",
// ne strojová mřížka. .animate-float i tak respektuje prefers-reduced-motion
// (viz index.css), tady se řeší jen vizuální rozmanitost.
const VARIANTS = [
  { rotate: "-rotate-1", duration: "4.5s", delay: "0s" },
  { rotate: "rotate-2", duration: "5.2s", delay: "0.4s" },
  { rotate: "-rotate-2", duration: "4s", delay: "0.9s" },
  { rotate: "rotate-1", duration: "5s", delay: "0.2s" },
  { rotate: "-rotate-1", duration: "4.8s", delay: "0.6s" },
];

export default function FounderAppShowcase() {
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const screens = SCREENS.filter((s) => s.image && !failed.has(s.image));
  if (screens.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-primary/5 blur-[140px]" aria-hidden />
      <div className="section-container relative">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">Nahlédni dovnitř</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            Takhle to vypadá <span className="neon-text">v appce</span>.
          </h2>
          <p className="max-w-2xl mx-auto text-center text-muted-foreground text-lg mb-20">
            Zatím rozpracované, ale živé. Žádné vizualizace z prezentace — reálné obrazovky appky, na které právě teď pracujeme.
          </p>
        </FadeIn>

        {/* Jedna řada vedle sebe (ne schodovitě) — na menších šířkách, kam se
            všech 5 nevejde, se řada horizontálně scrolluje se snapem. */}
        <div className="flex flex-nowrap overflow-x-auto lg:overflow-visible lg:flex-wrap lg:justify-center gap-x-6 sm:gap-x-8 pb-6 lg:pb-0 snap-x snap-mandatory lg:snap-none -mx-4 px-4 lg:mx-0 lg:px-0">
          {screens.map((s, i) => {
            const v = VARIANTS[i % VARIANTS.length];
            return (
              <FadeIn key={s.image} delay={i * 0.08} className="shrink-0 snap-center">
                <figure className="group w-[170px] sm:w-[200px] lg:w-[190px] xl:w-[210px]">
                  <div
                    className={`relative flex justify-center motion-safe:animate-float ${v.rotate} transition-[transform] duration-500 group-hover:rotate-0 group-hover:-translate-y-3`}
                    style={{ animationDuration: v.duration, animationDelay: v.delay }}
                  >
                    <div className="absolute inset-x-1 top-6 h-32 bg-primary/30 blur-3xl rounded-full" aria-hidden />
                    <div className="absolute inset-x-6 top-12 h-24 bg-accent/20 blur-3xl rounded-full" aria-hidden />
                    <img
                      src={s.image}
                      alt={`${s.title} — ${s.desc}`}
                      className="relative w-full rounded-[1.75rem] border border-primary/25 shadow-[var(--glow-primary)] transition-shadow duration-500 group-hover:shadow-[0_0_50px_hsl(270,100%,65%,0.5)]"
                      loading="lazy"
                      onError={() => setFailed((prev) => new Set(prev).add(s.image!))}
                    />
                  </div>
                  <figcaption className="mt-5 text-center">
                    <p className="font-display font-bold text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                  </figcaption>
                </figure>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-20 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
            Appka je ve vývoji — konkrétní obrazovky, texty i vizuální styl se do spuštění Season 1 (MVP1) ještě mohou změnit.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
