import { useQuery } from "@tanstack/react-query";

export interface FounderCounterData {
  count: number;
  cap: number;
  nextMilestone: number;
  degraded?: boolean;
}

/**
 * Sdílený zdroj dat pro progress box v Hero (Sekce 1) i Sekci 10 — musí
 * ukazovat stejné číslo na obou místech, viz zadani-landing-page.md 5.2.
 */
export function useFounderCounter() {
  return useQuery<FounderCounterData>({
    queryKey: ["founder-counter"],
    queryFn: async () => {
      const res = await fetch("/api/founder/counter");
      if (!res.ok) throw new Error("Nepodařilo se načíst počet Founderů.");
      return res.json();
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
