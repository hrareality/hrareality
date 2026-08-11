import { useState } from "react";
import { Loader2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import type { FounderOrderData } from "@/hooks/useFounderOrder";
import { trackFounderEvent } from "@/lib/founderAnalytics";

interface Props {
  order: FounderOrderData;
  token: string;
}

export default function ThankYouEmailNotice({ order, token }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [rateLimitedMinutes, setRateLimitedMinutes] = useState<number | null>(null);

  async function handleResend() {
    setStatus("sending");
    trackFounderEvent("email_resend_click", { package: order.package });
    try {
      const res = await fetch("/api/founder/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setRateLimitedMinutes(data.retryAfterMinutes);
        setStatus("error");
        return;
      }
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-12 bg-primary/5">
      <div className="section-container max-w-md text-center">
        <FadeIn>
          <div className="glass-card p-6">
            <p className="text-sm text-muted-foreground mb-1">Potvrzení jsme poslali na</p>
            <p className="font-medium mb-4 break-all">{order.email}</p>
            <p className="text-xs text-muted-foreground mb-5">
              Pokud e-mail nevidíš do 15 minut, zkontroluj prosím spam, hromadné nebo promo záložku.
            </p>

            {status === "sent" ? (
              <p className="text-sm text-primary font-medium">Potvrzení odesláno znovu ✓</p>
            ) : rateLimitedMinutes !== null ? (
              <p className="text-xs text-muted-foreground">
                Dosáhl jsi limitu 3 odeslání za hodinu. Zkus to znovu za {rateLimitedMinutes} min.
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/50 border border-primary/20 hover:bg-secondary text-foreground font-display font-bold text-sm rounded-lg transition-all disabled:opacity-50"
              >
                {status === "sending" && <Loader2 className="animate-spin" size={14} />}
                Odeslat potvrzení znovu
              </button>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
