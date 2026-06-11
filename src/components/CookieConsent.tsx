import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { initTracking } from "@/lib/tracking";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("hra-reality-cookie-consent");
    if (consent === "granted") {
      initTracking();
    } else if (!consent) {
      // Zobrazení lišty po krátké prodlevě pro prémiový dojem z náběhu
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hra-reality-cookie-consent", "granted");
    initTracking();
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("hra-reality-cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[100] glass-card border-primary/30 p-6 shadow-[var(--glow-primary)] neon-border"
        >
          <div className="flex gap-4 items-start">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary shrink-0">
              <ShieldCheck size={22} className="animate-pulse" />
            </div>
            <div className="flex-1">
              <h4 className="font-display text-base font-bold text-foreground mb-1.5">
                Bezpečnost & Cookies
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                iWau HRA REALITY respektuje tvé soukromí. Pro analýzu návštěvnosti a vylepšování herního světa využíváme anonymní soubory cookies.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-lg bg-secondary/50 hover:bg-secondary border border-border/50 min-h-[38px]"
                >
                  Pouze nezbytné
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-4 py-2 text-xs font-bold font-display bg-primary text-primary-foreground rounded-lg pulse-glow hover:brightness-110 transition-all text-center min-h-[38px]"
                >
                  Přijmout výzvu & Povolit
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
