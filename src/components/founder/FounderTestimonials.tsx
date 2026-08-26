import FadeIn from "@/components/FadeIn";

/**
 * Sekce 15 dle zadání. První reálná reference (David Chvojka, doslovný text
 * z Discordu — viz Landing Page Texty-6, image8/image9) — do doby, než přibudou
 * další, se nic nevymýšlí. TESTIMONIALS pole je připravené k dalšímu doplňování,
 * jakmile klient pošle další reference.
 */
const TESTIMONIALS = [
  {
    author: "David Chvojka",
    quote:
      "U me to bylo jednoduche.. novy projekt, ktery byl spojenim hry a realneho sveta.. gaming obecne me bavi a jeho promitnuti do reality byl napad, ktery me oslovil a neco, co tu na trhu jeste neni. Chtel jsem vedet vice, videt, jak se napad rodi do skutecnosti a tak jsem se rozhodl projekt podporit a stat se founderem🔥🔥🔥",
    source: "discord" as const,
  },
];

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.674-3.548-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export default function FounderTestimonials() {
  return (
    <section className="py-20">
      <div className="section-container max-w-2xl text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Proč se přidali první Foundeři?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Žádné anonymní recenze ani vymyšlené citáty. Skutečné důvody reálných lidí, kteří se rozhodli být u samého začátku.
          </p>
          <div className="space-y-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="glass-card p-6 text-left">
                <p className="text-sm text-foreground/90 leading-relaxed mb-4">„{t.quote}"</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#5865F2] text-white shrink-0">
                    <DiscordIcon />
                  </span>
                  <span className="font-display font-bold text-foreground">{t.author}</span>
                  <span>· Discord</span>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground italic pt-2">Další reference doplníme, jakmile přibudou.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
