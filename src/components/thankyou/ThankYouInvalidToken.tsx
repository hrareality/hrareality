import FadeIn from "@/components/FadeIn";

export default function ThankYouInvalidToken() {
  const mailto =
    "mailto:HraReality@gmail.com?subject=" + encodeURIComponent("Founder onboarding — odkaz nefunguje");

  return (
    <section className="min-h-[60vh] flex items-center py-20">
      <div className="section-container max-w-md text-center">
        <FadeIn>
          <h1 className="text-2xl font-display font-bold mb-4">Odkaz už není platný.</h1>
          <p className="text-muted-foreground mb-8">
            Tenhle odkaz na děkovací stránku vypršel nebo není platný. Číslo objednávky najdeš v potvrzovacím e-mailu — napiš nám prosím na podporu, ozveme se s ověřením ručně.
          </p>
          <a
            href={mailto}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl hover:brightness-110 transition-all"
          >
            Kontaktovat podporu
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
