# Vizuály balíčků — konvence

Sem patří ilustrace postav pro jednotlivé Founder balíčky (Sekce 9, `FounderPackages.tsx`),
poslané klientem.

## Formát

- **WebP** (stejná konvence jako `public/founder/app/`), do ~200 KB/soubor
- Poměr stran podle dodaných obrázků (portrét, karta zobrazuje `object-cover`)

## Pojmenování

`<package-key>.webp`, podle interního klíče balíčku:

- `supporter.webp` — Podporovatel Season 0
- `first-player.webp` — První hráč Season 0
- `founder-tier.webp` — Zakladatel Season 0
- `creator.webp` — Tvůrce Season 0
- `guardian.webp` — Strážce Season 0

## Jak zapojit do kódu

V `FounderPackages.tsx` doplň `image: "/founder/packages/supporter.webp"` (atd.) k odpovídajícímu
balíčku v poli `PACKAGES`. Bez zásahu jinam — dokud pole `image` chybí, karta zůstává ve
stávající textové podobě.

**Aktualizace (Landing Page Texty-6, 13. 8. 2026):** klient tohle rozhodnutí otočil — u nového
kola mockupů (balíček po balíčku) se text **přebírá** přímo z obrázků (viz `benefits` pole
u `PackageCopy` v `FounderPackages.tsx`). Beze změny zůstává jen to, co by odporovalo reálné
automatizaci (např. přesný název Discord role musí sedět na `role_id` v Make.com, i když
obrázek použije jiné znění — potvrzeno u balíčku #1).

Předchozí pravidlo (Texty-5, jen vizuál/ilustrace postavy, text beze změny) platilo jen pro
tamní kolo obrázků — cena balíčku #2 tehdy zůstala 499 Kč (obrázek měl 449 Kč, potvrzeno jako
neaktuální).
