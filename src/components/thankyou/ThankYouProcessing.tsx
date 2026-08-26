import { Loader2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function ThankYouProcessing({ timedOut }: { timedOut: boolean }) {
  return (
    <section className="min-h-[60vh] flex items-center py-20">
      <div className="section-container max-w-md text-center">
        <FadeIn>
          {timedOut ? (
            <>
              <h1 className="text-2xl font-display font-bold mb-4">Platba se zpracovává o něco déle.</h1>
              <p className="text-muted-foreground">
                Nic se neděje — někdy to trvá pár minut navíc. Za chvíli ti dorazí potvrzovací e-mail s odkazem přímo na tuhle stránku. Pokud nedorazí do 15 minut, napiš nám na HraReality@gmail.com.
              </p>
            </>
          ) : (
            <>
              <Loader2 className="animate-spin text-primary mx-auto mb-6" size={32} />
              <h1 className="text-2xl font-display font-bold mb-2">Zpracováváme platbu…</h1>
              <p className="text-muted-foreground">Ověřujeme tvou objednávku, chvilku strpení.</p>
            </>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
