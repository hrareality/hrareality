import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Start from "./pages/Start";
import HowItWorks from "./pages/HowItWorks";
import Comics from "./pages/Comics";
import Partners from "./pages/Partners";
import Collection from "./pages/Collection";
import NotFound from "./pages/NotFound";

import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
