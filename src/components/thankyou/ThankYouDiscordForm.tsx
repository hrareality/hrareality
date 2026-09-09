import { useState } from "react";
import { Loader2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FounderOrderData } from "@/hooks/useFounderOrder";
import { trackFounderEvent } from "@/lib/founderAnalytics";

const WALL_CHOICES = ["Celé jméno", "Značka", "Přezdívka", "Iniciály", "Anonymně"];
const DISCORD_INVITE_URL = "https://discord.com/invite/Qe2Zxr4bWJ";

interface Props {
  order: FounderOrderData;
  token: string;
  onSubmitted: () => void;
}

export default function ThankYouDiscordForm({ order, token, onSubmitted }: Props) {
  const [discordUsername, setDiscordUsername] = useState(order.discordUsername || "");
  const [wallChoice, setWallChoice] = useState<string | undefined>(order.founderWallChoice || undefined);
  const [wallDisplayName, setWallDisplayName] = useState(order.founderWallDisplayName || "");
  const [wallConsent, setWallConsent] = useState(order.founderWallConsent || false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    order.discordUsername ? "success" : "idle"
  );
  const [startedTracking, setStartedTracking] = useState(false);

  const showWallNameField = !!wallChoice && wallChoice !== "Anonymně";
  const ctaLabel = wallChoice || wallDisplayName ? "Dokončit Founder profil" : "Odeslat Discord nick";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    trackFounderEvent("discord_username_submit", { package: order.package });
    if (wallChoice) trackFounderEvent("founder_wall_preference_submit", { package: order.package });

    try {
      const res = await fetch("/api/founder/submit-discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          discordUsername,
          founderWallChoice: wallChoice,
          founderWallDisplayName: showWallNameField ? wallDisplayName : undefined,
          founderWallConsent: wallConsent,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      onSubmitted();
    } catch {
      setStatus("error");
      trackFounderEvent("discord_username_error", { package: order.package });
    }
  }

  return (
    <section id="discord-form" className="py-12">
      <div className="section-container max-w-lg">
        <FadeIn>
          <div className="glass-card-hover p-6 sm:p-8">
            <h2 className="font-display font-bold text-lg mb-1">Discord profil</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Zadej svoje Discord uživatelské jméno (to, které používáš k přihlášení) — ne zobrazované jméno na serveru.
            </p>

            {/* Pojistka: role se přiřazuje hledáním mezi členy serveru — pokud
                člověk vyplní username dřív, než se na server reálně připojí,
                hledání ho nenajde a přiřazení selže (viz oprava Discord scénáře,
                9/2026). Pořadí kroků je teď jasně vynucené vizuálně, i když
                formulář samotný to technicky nekontroluje. */}
            {status !== "success" && (
              <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-display font-bold flex items-center justify-center">1</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">Nejdřív se připoj na Discord</p>
                    <p className="text-xs text-muted-foreground mb-2">Bez tohohle kroku tě nenajdeme a role se nepřiřadí.</p>
                    <a
                      href={DISCORD_INVITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-display font-bold text-xs rounded-lg hover:brightness-110 transition-all"
                    >
                      Vstoupit do Discordu →
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-display font-bold flex items-center justify-center">2</span>
                  <p className="text-sm font-medium text-foreground pt-0.5">Pak sem vlož svoje uživatelské jméno níže</p>
                </div>
              </div>
            )}

            {status === "success" ? (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-primary font-medium">
                  Discord nick byl uložen. Founder roli přiřadíme po ověření objednávky.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Discord uživatelské jméno</label>
                  <Input
                    required
                    placeholder="např. tomas_hrac"
                    value={discordUsername}
                    onFocus={() => {
                      if (!startedTracking) {
                        trackFounderEvent("discord_username_start", { package: order.package });
                        setStartedTracking(true);
                      }
                    }}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">E-mail objednávky</label>
                  <Input value={order.email} disabled />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Číslo objednávky</label>
                  <Input value={order.orderNumber} disabled className="font-mono text-xs" />
                </div>

                <div className="border-t border-border/30 pt-4">
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Jméno v Knize Zakladatelů (volitelné)
                  </label>
                  <Select value={wallChoice} onValueChange={setWallChoice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vyber, jak chceš být zobrazen" />
                    </SelectTrigger>
                    <SelectContent>
                      {WALL_CHOICES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {showWallNameField && (
                  <Input
                    placeholder="Zobrazované jméno"
                    value={wallDisplayName}
                    onChange={(e) => setWallDisplayName(e.target.value)}
                  />
                )}

                {wallChoice && (
                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Checkbox checked={wallConsent} onCheckedChange={(v) => setWallConsent(!!v)} className="mt-0.5" />
                    Souhlasím se zobrazením v Knize Zakladatelů.
                  </label>
                )}

                {status === "error" && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 space-y-2">
                    <p className="text-sm text-destructive">
                      Discord nick se nepodařilo uložit. Zkontroluj připojení a zkus to znovu.
                    </p>
                    <div className="flex gap-3">
                      <button type="submit" className="text-xs font-bold text-primary hover:underline">
                        Zkusit znovu
                      </button>
                      <a
                        href={`mailto:HraReality@gmail.com?subject=${encodeURIComponent(
                          `Founder onboarding — objednávka ${order.orderNumber}`
                        )}`}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Kontaktovat podporu emailem
                      </a>
                    </div>
                  </div>
                )}

                <Button type="submit" disabled={status === "submitting"} className="w-full font-display font-bold">
                  {status === "submitting" ? <Loader2 className="animate-spin" size={18} /> : ctaLabel}
                </Button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
