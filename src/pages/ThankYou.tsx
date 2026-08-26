import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { useFounderOrder } from "@/hooks/useFounderOrder";
import { trackFounderEvent } from "@/lib/founderAnalytics";
import ThankYouHero from "@/components/thankyou/ThankYouHero";
import ThankYouOrderRecap from "@/components/thankyou/ThankYouOrderRecap";
import ThankYouProcess from "@/components/thankyou/ThankYouProcess";
import ThankYouNextSteps from "@/components/thankyou/ThankYouNextSteps";
import ThankYouDiscordForm from "@/components/thankyou/ThankYouDiscordForm";
import ThankYouBenefits from "@/components/thankyou/ThankYouBenefits";
import ThankYouFounderNumber from "@/components/thankyou/ThankYouFounderNumber";
import ThankYouEmailNotice from "@/components/thankyou/ThankYouEmailNotice";
import ThankYouSupport from "@/components/thankyou/ThankYouSupport";
import ThankYouFinal from "@/components/thankyou/ThankYouFinal";
import ThankYouStickyCTA from "@/components/thankyou/ThankYouStickyCTA";
import ThankYouInvalidToken from "@/components/thankyou/ThankYouInvalidToken";
import ThankYouProcessing from "@/components/thankyou/ThankYouProcessing";

const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 20_000;

/**
 * Přemostí Stripe `?session_id=` (okamžitý redirect) na bezpečný `?t=` token
 * (vzniká asynchronně ve webhooku) — viz api/founder/resolve-session.js.
 */
function useResolveSessionToToken(sessionId: string | null) {
  const [resolvedToken, setResolvedToken] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;

    async function poll() {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/founder/resolve-session?session_id=${encodeURIComponent(sessionId!)}`);
        const data = await res.json();
        if (data.token) {
          setResolvedToken(data.token);
          return;
        }
      } catch {
        // tichý retry, dokud nevyprší timeout
      }
      if (Date.now() - startedAt.current > POLL_TIMEOUT_MS) {
        setTimedOut(true);
        return;
      }
      setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return { resolvedToken, timedOut };
}

export default function ThankYou() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("t");
  const sessionId = searchParams.get("session_id");

  const { resolvedToken, timedOut } = useResolveSessionToToken(!tokenFromUrl ? sessionId : null);

  // Jakmile se token dopočítá ze session_id, přepiš URL na finální bezpečný tvar.
  useEffect(() => {
    if (resolvedToken && !tokenFromUrl) {
      setSearchParams({ t: resolvedToken }, { replace: true });
    }
  }, [resolvedToken, tokenFromUrl, setSearchParams]);

  const activeToken = tokenFromUrl || resolvedToken;
  const { data: order, isLoading, isError } = useFounderOrder(activeToken);

  const [discordSubmitted, setDiscordSubmitted] = useState(false);
  useEffect(() => {
    if (order?.discordUsername) setDiscordSubmitted(true);
  }, [order?.discordUsername]);

  useEffect(() => {
    trackFounderEvent("thank_you_page_view");
  }, []);

  useEffect(() => {
    if (order) trackFounderEvent("order_detail_open", { package: order.package, paymentStatus: order.paymentStatus });
  }, [order]);

  // Ani token, ani session_id — rovnou neplatný přístup.
  if (!tokenFromUrl && !sessionId) {
    return (
      <>
        <SEO title="Děkovací stránka | iWau HRA REALITY" description="Potvrzení Founder Membershipu." />
        <ThankYouInvalidToken />
      </>
    );
  }

  // Čekáme na webhook (session_id ještě nemá odpovídající token).
  if (!activeToken) {
    return (
      <>
        <SEO title="Zpracováváme platbu… | iWau HRA REALITY" description="Potvrzení Founder Membershipu." />
        <ThankYouProcessing timedOut={timedOut} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <SEO title="Děkovací stránka | iWau HRA REALITY" description="Potvrzení Founder Membershipu." />
        <ThankYouProcessing timedOut={false} />
      </>
    );
  }

  if (isError || !order) {
    return (
      <>
        <SEO title="Děkovací stránka | iWau HRA REALITY" description="Potvrzení Founder Membershipu." />
        <ThankYouInvalidToken />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Vítej mezi Foundery Season 0 | iWau HRA REALITY"
        description="Potvrzení Founder Membershipu a další kroky k dokončení vstupu."
      />
      <ThankYouHero order={order} />
      <ThankYouOrderRecap order={order} />
      <ThankYouProcess order={order} />
      <ThankYouNextSteps order={order} />
      <ThankYouDiscordForm order={order} token={activeToken} onSubmitted={() => setDiscordSubmitted(true)} />
      <ThankYouBenefits order={order} />
      <ThankYouFounderNumber order={order} />
      <ThankYouEmailNotice order={order} token={activeToken} />
      <ThankYouSupport order={order} />
      <ThankYouFinal order={order} discordSubmitted={discordSubmitted} />
      <ThankYouStickyCTA order={order} discordSubmitted={discordSubmitted} />
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
