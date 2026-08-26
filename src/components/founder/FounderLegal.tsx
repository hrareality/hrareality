import FadeIn from "@/components/FadeIn";

export default function FounderLegal() {
  return (
    <section className="py-16 border-t border-border/30">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Founder Membership je jednorázový nákup konkrétního balíčku. Není to investiční produkt, cenný papír, podíl ve společnosti ani příslib finančního výnosu. Některé výhody se aktivují až po spuštění Season 1 (MVP1) nebo příslušné části platformy. Plánované termíny se mohou během vývoje změnit. Digitální karty a artefakty nemají garantovanou finanční hodnotu. Marketplace ani budoucí obchodovatelnost artefaktů nejsou garantovanou součástí Founder Membershipu.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
