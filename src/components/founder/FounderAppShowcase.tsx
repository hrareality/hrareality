import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
  { image: "/founder/app/dashboard.webp", title: "Denní přehled", desc: "Tvůj dnešní krok ve Hře Reality. XP, mise, progres a dění komunity na jednom místě." },
  { image: "/founder/app/interrupt.webp", title: "Zásah do reality", desc: "Příběh tě pošle něco skutečně udělat. Krátké momenty propojují svět hry s reálným životem." },
  { image: "/founder/app/feed.webp", title: "Feed hry", desc: "Místo, kde je vidět akce, ne dokonalost. Sleduj, co ostatní hráči skutečně udělali." },
  { image: "/founder/app/share-card.webp", title: "Share Card", desc: "Proměň svou akci v herní moment. Sdílej progres a pošli výzvu dál." },
  { image: "/founder/app/roadmap.webp", title: "Mapa cesty", desc: "Vidíš, kde právě jsi a co tě čeká dál. Postupuj uzly Seasons a postupně odemykej další části hry." },
];

// Jemný, nesynchronní pohyb (každý telefon plave jinak rychle/s jiným zpožděním)
// a mírný nakloněný úhel, co se při hoveru narovná — spíš "vznášející se výstava",
// ne strojová mřížka. Naklonění je jen od `sm` výš (`rotate-0` na mobilu) — na
// malé obrazovce, kde je vidět jeden telefon po druhém, by natočení jen kazilo
// dojem čistého jednotlivého snímku. .animate-float i tak respektuje
// prefers-reduced-motion (viz index.css), tady se řeší jen vizuální rozmanitost.
const VARIANTS = [
  { rotate: "sm:-rotate-1", duration: "4.5s", delay: "0s" },
  { rotate: "sm:rotate-2", duration: "5.2s", delay: "0.4s" },
  { rotate: "sm:-rotate-2", duration: "4s", delay: "0.9s" },
  { rotate: "sm:rotate-1", duration: "5s", delay: "0.2s" },
  { rotate: "sm:-rotate-1", duration: "4.8s", delay: "0.6s" },
];

export default function FounderAppShowcase() {
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const screens = SCREENS.filter((s) => s.image && !failed.has(s.image));

  // Jednorázové "posunutí" pár px doprava a zpět krátce po zobrazení sekce —
  // konkrétní fyzický náznak "tohle jde posunout", ne jen spoléhání na to,
  // že si toho někdo všimne sám. Jen na mobilu (kde je jeden snímek na slide),
  // jen jednou, a vůbec ne s "omezit pohyb" v OS.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || shouldReduceMotion || window.innerWidth >= 640 || screens.length < 2) return;
    const timer = setTimeout(() => {
      el.scrollTo({ left: 56, behavior: "smooth" });
      setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 550);
    }, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  if (screens.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-primary/5 blur-[140px]" aria-hidden />
      <div className="section-container relative">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-display text-center">Nahlédni do vývoje</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            Tohle už není jen nápad. Hra právě vzniká.
          </h2>
          <p className="max-w-2xl mx-auto text-center text-muted-foreground text-lg mb-2">
            Tohle jsou skutečné obrazovky první verze iWau Hry Reality, na které právě pracujeme. Ne marketingový koncept ani finální design. Rozpracovaný build, který postupně měníme v první hratelnou Season 1.
          </p>
          <p className="max-w-2xl mx-auto text-center text-sm text-primary/80 mb-8 sm:mb-10">
            Jako Founder pomáháš dokončit právě tuhle verzi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-20 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-400 text-xs font-display tracking-widest">
              🟢 MVP1 · AKTIVNĚ VE VÝVOJI
            </span>
            <span className="text-xs text-muted-foreground">Poslední aktualizace: srpen 2026</span>
          </div>
        </FadeIn>

        {/* Na mobilu jeden telefon po druhém, celá šířka obrazovky na slide
            (ne "blok" několika naráz vedle sebe) — swipe/snap vždy zarovná
            přesně jeden snímek doprostřed. Od `sm` výš se z toho stává hustší
            řada (víc jich je vidět zároveň) a od `lg` je to jedna neschodovitá
            řada všech 5. Full-bleed: -mx-4 ruší padding section-containeru jen
            pro tenhle scroll pás, ať slide reálně zabírá celou šířku obrazovky. */}
        <div className="-mx-4 sm:mx-0 lg:mx-0 pt-6">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-nowrap overflow-x-auto lg:overflow-visible lg:flex-wrap lg:justify-center gap-x-0 sm:gap-x-8 pb-6 lg:pb-0 snap-x snap-mandatory lg:snap-none"
          >
            {screens.map((s, i) => {
              const v = VARIANTS[i % VARIANTS.length];
              return (
                <FadeIn key={s.image} delay={i * 0.08} className="shrink-0 snap-center w-screen sm:w-auto flex justify-center">
                  <figure className="group w-[220px] sm:w-[200px] lg:w-[190px] xl:w-[210px]">
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
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
                    </figcaption>
                  </figure>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Tečky + textový náznak "přejeď prstem" — jen na mobilu (od `sm` je
            vidět víc snímků naráz, tam už to netřeba). Tečky reagují na scroll
            pozici (aktivní = ta, u které se právě jsi), hint zmizí, jakmile
            uživatel poprvé posune dál od prvního snímku. */}
        <div className="sm:hidden -mt-2 mb-2 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {screens.map((s, i) => (
              <span
                key={s.image}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 bg-primary" : "w-1.5 bg-primary/25"
                }`}
              />
            ))}
          </div>
          {activeIndex === 0 && (
            <p className="flex items-center gap-1 text-xs text-primary/80 motion-safe:animate-pulse">
              Přejeď prstem pro další screenshoty <ChevronRight size={14} />
            </p>
          )}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-10 sm:mt-20 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
            Appka je ve vývoji — konkrétní obrazovky, texty i vizuální styl se do spuštění Season 1 (MVP1) ještě mohou změnit.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
