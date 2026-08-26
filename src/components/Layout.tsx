import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StarfieldBackground from "./StarfieldBackground";
import CookieConsent from "./CookieConsent";

const navLinks: { to: string; label: string; external?: boolean }[] = [
  { to: "/", label: "Home" },
  { to: "/jak-to-funguje", label: "Jak to funguje" },
  { to: "/komiksy", label: "Komiksy" },
  { to: "/start", label: "Příběh" },
  { to: "/collection", label: "Season 0" },
  { to: "/zakladatel", label: "Founder" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <StarfieldBackground />
      {/* Fixed Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
        <div className="section-container flex items-center justify-between h-14 md:h-16 py-0">
          <Link to="/" className="relative flex items-center w-36 md:w-48 h-full group transition-all hover:opacity-80 z-20">
            <img src="/logo.png" alt="iWau HRA REALITY Logo" className="h-36 md:h-48 w-auto object-contain absolute left-0 top-1/2 -translate-y-1/2 max-w-none" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-base font-bold transition-colors rounded-lg hover:bg-primary/5 ${
                    location.pathname === link.to 
                      ? "text-primary" 
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="https://discord.gg/MGnNWkcqQf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2 text-sm font-bold font-display bg-primary text-primary-foreground rounded-lg pulse-glow hover:brightness-110 transition-all whitespace-nowrap"
            >
              Vstup do discordu
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border/30"
            >
              <div className="section-container py-4 flex flex-col gap-2">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm text-muted-foreground rounded-lg"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 text-sm rounded-lg ${
                        location.pathname === link.to ? "text-primary bg-primary/5" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <a
                  href="https://discord.gg/MGnNWkcqQf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-5 py-3 text-sm font-bold font-display text-center bg-primary text-primary-foreground rounded-lg"
                >
                  Vstup do discordu
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main */}
      <main className="pt-14 md:pt-16 relative z-10">{children}</main>

      {/* Footer */}
      <footer id="site-footer" className="border-t border-border/30 mt-20">
        <div className="section-container py-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <div className="flex flex-col gap-2 md:items-start items-center">
            <Link to="/" className="block transition-all hover:opacity-80">
              <img src="/logo.png" alt="iWau HRA REALITY" className="h-32 md:h-40 w-auto object-contain" />
            </Link>
            <p className="text-xs text-muted-foreground text-center md:text-left mt-0 flex flex-wrap items-center justify-center md:justify-start gap-x-2">
              <span>© 2026 iWau HRA REALITY. Systém výzev v reálném životě.</span>
              <span className="inline-flex items-center gap-x-2">
                <Link to="/obchodni-podminky" className="hover:text-primary transition-colors">Obchodní podmínky</Link>
                <span aria-hidden>·</span>
                <Link to="/gdpr" className="hover:text-primary transition-colors">GDPR</Link>
              </span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.filter(l => !l.external).map((link) => (
              <Link key={link.to} to={link.to} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="https://www.instagram.com/hrareality/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@hrareality" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                </svg>
              </a>
              {/* Discord */}
              <a href="https://discord.gg/MGnNWkcqQf" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
