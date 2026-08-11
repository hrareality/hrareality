import { useEffect, useState } from "react";
import type { FounderOrderData } from "@/hooks/useFounderOrder";

const DISCORD_INVITE_URL = "https://discord.com/invite/Qe2Zxr4bWJ";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Sticky CTA nesmí být vidět, když je otevřená klávesnice (mobil) — aproximace přes
 * porovnání výšky visualViewport vs. layout viewportu, viz zadani-dekovaci-stranka.md sekce 5.
 */
function useKeyboardOpen() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => {
      const heightDiff = window.innerHeight - vv.height;
      setKeyboardOpen(heightDiff > 120);
    };
    vv.addEventListener("resize", handler);
    return () => vv.removeEventListener("resize", handler);
  }, []);

  return keyboardOpen;
}

interface Props {
  order: FounderOrderData;
  discordSubmitted: boolean;
}

export default function ThankYouStickyCTA({ order, discordSubmitted }: Props) {
  const keyboardOpen = useKeyboardOpen();
  if (keyboardOpen) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-xl border-t border-border/50">
      {discordSubmitted ? (
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl min-h-[44px]"
        >
          Přejít do Discordu →
        </a>
      ) : (
        <button
          onClick={() => scrollTo("discord-form")}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl min-h-[44px]"
        >
          Odeslat Discord nick
        </button>
      )}
    </div>
  );
}
