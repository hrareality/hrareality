import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Start from "./pages/Start";
import HowItWorks from "./pages/HowItWorks";
import Comics from "./pages/Comics";
import Partners from "./pages/Partners";
import Collection from "./pages/Collection";
import Founder from "./pages/Founder";
import ThankYou from "./pages/ThankYou";
import ObchodniPodminky from "./pages/ObchodniPodminky";
import Gdpr from "./pages/Gdpr";
import NotFound from "./pages/NotFound";

import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

/**
 * Přesměruje na nové /zakladatel URL a zachová query string i hash — čistý
 * <Navigate to="..."> by je zahodil, což by u /founder/dekujeme?t=... rozbilo
 * přístup přes bezpečnostní token (viz security-and-access.md).
 */
function RedirectPreservingSearch({ to }: { to: string }) {
  const location = useLocation();
  return <Navigate to={`${to}${location.search}${location.hash}`} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <SpeedInsights />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/start" element={<Start />} />
            <Route path="/jak-to-funguje" element={<HowItWorks />} />
            <Route path="/komiksy" element={<Comics />} />
            <Route path="/partneri" element={<Partners />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/zakladatel" element={<Founder />} />
            <Route path="/zakladatel/dekujeme" element={<ThankYou />} />
            {/* České SEO: URL přejmenováno z /founder na /zakladatel před prvním produkčním
                nasazením (26. 8. 2026), takže tohle není migrace už indexované stránky —
                redirecty jsou jen levná pojistka pro případ, že /founder odkaz už někdo
                někam sdílel neformálně (Discord, e-mail apod.). */}
            <Route path="/founder" element={<RedirectPreservingSearch to="/zakladatel" />} />
            <Route path="/founder/dekujeme" element={<RedirectPreservingSearch to="/zakladatel/dekujeme" />} />
            <Route path="/obchodni-podminky" element={<ObchodniPodminky />} />
            <Route path="/gdpr" element={<Gdpr />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
