import SEO from "@/components/SEO";
import FounderHero from "@/components/founder/FounderHero";
import FounderPersonalOpening from "@/components/founder/FounderPersonalOpening";
import FounderGameBirth from "@/components/founder/FounderGameBirth";
import FounderProduct from "@/components/founder/FounderProduct";
import FounderStatus from "@/components/founder/FounderStatus";
import FounderWhy from "@/components/founder/FounderWhy";
import FounderImpact from "@/components/founder/FounderImpact";
import FounderBenefits from "@/components/founder/FounderBenefits";
import FounderPackages from "@/components/founder/FounderPackages";
import FounderLiveProgress from "@/components/founder/FounderLiveProgress";
import FounderTransparency from "@/components/founder/FounderTransparency";
import FounderDevDiary from "@/components/founder/FounderDevDiary";
import FounderTeam from "@/components/founder/FounderTeam";
import FounderBook from "@/components/founder/FounderBook";
import FounderTestimonials from "@/components/founder/FounderTestimonials";
import FounderFAQ from "@/components/founder/FounderFAQ";
import FounderLetter from "@/components/founder/FounderLetter";
import FounderLegal from "@/components/founder/FounderLegal";
import FounderStickyCTA from "@/components/founder/FounderStickyCTA";

export default function Founder() {
  return (
    <>
      <SEO
        title="Founder Membership Season 0 | iWau HRA REALITY"
        description="Staň se Founderem první generace iWau Hry Reality. Jednorázová podpora od 149 Kč, žádná investice — jen možnost být u úplného začátku."
      />
      <FounderHero />
      <div className="hud-line" />
      <FounderPersonalOpening />
      <FounderGameBirth />
      <div className="hud-line" />
      <FounderProduct />
      <div className="hud-line" />
      <FounderStatus />
      <div className="hud-line" />
      <FounderWhy />
      <div className="hud-line" />
      <FounderImpact />
      <div className="hud-line" />
      <FounderBenefits />
      <div className="hud-line" />
      <FounderPackages />
      <FounderLiveProgress />
      <div className="hud-line" />
      <FounderTransparency />
      <div className="hud-line" />
      <FounderDevDiary />
      <div className="hud-line" />
      <FounderTeam />
      <FounderBook />
      <div className="hud-line" />
      <FounderTestimonials />
      <div className="hud-line" />
      <FounderFAQ />
      <FounderLetter />
      <FounderLegal />
      <FounderStickyCTA />
      <div className="h-16" aria-hidden />
    </>
  );
}
