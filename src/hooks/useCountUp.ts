import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Plynulé "počítání nahoru" k cílové hodnotě — použito pro veřejné počítadlo
 * Founderů (Hero + Sekce 08), ať po doražení dat nedojde k neohrabanému skoku
 * z 0 rovnou na finální číslo. `target` je `undefined`, dokud data ještě
 * nedorazila — volající si na to musí sám ošetřit skeleton stav (viz
 * FounderHero.tsx / FounderLiveProgress.tsx), tenhle hook animaci nespouští,
 * dokud `target` není číslo.
 *
 * Respektuje "omezit pohyb" v OS — v tom případě rovnou skočí na cílovou
 * hodnotu bez animace.
 */
export function useCountUp(target: number | undefined, durationMs = 1200) {
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const animatedTarget = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (target === undefined || animatedTarget.current === target) return;

    if (shouldReduceMotion) {
      setDisplay(target);
      animatedTarget.current = target;
      return;
    }

    const from = 0;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        animatedTarget.current = target;
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, shouldReduceMotion, durationMs]);

  return display;
}
