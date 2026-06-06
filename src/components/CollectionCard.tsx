import { Lock, HelpCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  name: string;
  family: "AWAKENING" | "POSTAVY_IWAU" | "GLITCH" | "RELICS" | string;
  lore: string;
  edition: "FIRST_EDITION" | "BASE" | string;
  src?: string;
  isLocked?: boolean;
}

export default function CollectionCard({
  name,
  family,
  lore,
  edition,
  src,
  isLocked = false,
}: CollectionCardProps) {
  // Rozlišení barev neonů podle rodiny karet
  const getFamilyStyles = (fam: string) => {
    switch (fam) {
      case "AWAKENING":
        return {
          glow: "shadow-[0_0_20px_rgba(168,85,247,0.25)] border-purple-500/30",
          text: "text-purple-400 bg-purple-500/10 border-purple-500/20",
          neonBg: "from-purple-950/40 to-background",
          neonLine: "bg-purple-500/40",
        };
      case "POSTAVY_IWAU":
        return {
          glow: "shadow-[0_0_20px_rgba(99,102,241,0.25)] border-indigo-500/30",
          text: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
          neonBg: "from-indigo-950/40 to-background",
          neonLine: "bg-indigo-500/40",
        };
      case "GLITCH":
        return {
          glow: "shadow-[0_0_20px_rgba(236,72,153,0.25)] border-pink-500/30",
          text: "text-pink-400 bg-pink-500/10 border-pink-500/20",
          neonBg: "from-pink-950/40 to-background",
          neonLine: "bg-pink-500/40",
        };
      case "RELICS":
        return {
          glow: "shadow-[0_0_20px_rgba(6,182,212,0.25)] border-cyan-500/30",
          text: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
          neonBg: "from-cyan-950/40 to-background",
          neonLine: "bg-cyan-500/40",
        };
      case "CHRISTMAS_2025":
        return {
          glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)] border-emerald-500/30",
          text: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          neonBg: "from-emerald-950/40 to-background",
          neonLine: "bg-emerald-500/40",
        };
      default:
        return {
          glow: "shadow-[0_0_20px_rgba(168,85,247,0.20)] border-primary/20",
          text: "text-primary bg-primary/10 border-primary/20",
          neonBg: "from-primary/20 to-background",
          neonLine: "bg-primary/30",
        };
    }
  };

  const styles = getFamilyStyles(family);

  return (
    <div
      className={cn(
        "glass-card overflow-hidden border transition-all duration-500 flex flex-col h-full relative group",
        isLocked
          ? "border-white/5 opacity-70 shadow-none pointer-events-none"
          : cn("hover:scale-[1.02] border-white/10 hover:bg-card/80", styles.glow)
      )}
    >
      {/* Obrázek karty nebo silueta */}
      <div className="aspect-[7/10] relative w-full overflow-hidden bg-black/50 border-b border-white/5 flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Prémiová zástupná silueta s neonovým gradientem */
          <div
            className={cn(
              "w-full h-full bg-gradient-to-b flex flex-col items-center justify-center p-6 relative overflow-hidden",
              styles.neonBg
            )}
          >
            {/* Animované neonové čáry na pozadí */}
            <div className={cn("absolute w-[150%] h-[1px] rotate-45 opacity-20 top-1/4", styles.neonLine)} />
            <div className={cn("absolute w-[150%] h-[1px] -rotate-45 opacity-20 bottom-1/4", styles.neonLine)} />
            
            <div className="w-18 h-18 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative z-10 shadow-inner">
              <HelpCircle className="text-white/30 w-9 h-9" />
            </div>
            
            <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-white/35 mt-4 relative z-10">
              {family.replace("_", " ")}
            </span>
          </div>
        )}

        {/* Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-20 backdrop-blur-[2px]">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
              <Lock size={22} className="text-white/60" />
            </div>
            <span className="font-display text-base font-bold text-white/60 tracking-wider uppercase">
              Brzy
            </span>
          </div>
        )}

        {/* Floating Family Badge */}
        {!isLocked && (
          <span
            className={cn(
              "absolute top-4 left-4 text-xs font-bold font-display px-2.5 py-1 rounded border tracking-wider",
              styles.text
            )}
          >
            {family.replace("_", " ")}
          </span>
        )}
      </div>

      {/* Popis karty */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h4 className="font-display font-bold text-base sm:text-lg tracking-wider uppercase text-foreground truncate flex-1">
            {isLocked ? "???" : name}
          </h4>
          
          {/* Edition Badge */}
          {!isLocked && (
            <span
              className={cn(
                "text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shrink-0",
                edition === "FIRST_EDITION"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)] flex items-center gap-1"
                  : "bg-white/5 text-white/60 border border-white/10"
              )}
            >
              {edition === "FIRST_EDITION" && <Sparkles size={10} className="text-amber-400" />}
              {edition === "FIRST_EDITION" ? "1ST EDITION" : "BASE"}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
          {isLocked ? "Informace o tomto artefaktu jsou zatím uzamčené." : lore}
        </p>
      </div>
    </div>
  );
}
