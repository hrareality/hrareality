# Screenshoty z appky — konvence

Sem patří reálné screenshoty z iWau Hry Reality pro sekci "Takhle to vypadá v appce"
(`src/components/founder/FounderAppShowcase.tsx`, samostatná sekce hned za "Hra, ve
které neroste jen postava").

> **Aktualizace (13. 8. 2026):** dřívější konvence vázala screenshoty na 6 dlaždic
> mechanik appky přímo ve `FounderProduct.tsx` — klientovi se to vizuálně nelíbilo,
> takže screenshoty teď mají vlastní samostatnou sekci s jiným layoutem (rozházená
> galerie "plovoucích" telefonů). `FounderProduct.tsx` zůstává jen ikony/text, beze
> změny.

## Formát

- **WebP**, stejná konvence jako zbytek webu.
- Mobilní/portrétní poměr stran (jak byly dodané) — zobrazují se celé, ne oříznuté.
- Cílová velikost do ~150 KB/soubor.

## Pojmenování

`<screen>.webp`, podle obrazovky appky, kterou zachycuje:

- `dashboard.webp` — Domů / denní přehled (XP, série, klíče, cesta)
- `interrupt.webp` — "Realita se láme" (SYS_INTERRUPT moment)
- `feed.webp` — Feed komunity
- `share-card.webp` — "Sdílet úspěch" karta
- `roadmap.webp` — "Mapa cesty" (uzly Season 0)

Šestý screenshot zatím chybí (klient poslal 5 z avizovaných 6) — až dorazí, přidej
další položku do pole `SCREENS` v `FounderAppShowcase.tsx` se souborem podle stejné
konvence (např. `rewards.webp`).

## Jak zapojit do kódu

Soubory stačí nahrát do téhle složky s přesně těmito názvy — `FounderAppShowcase.tsx`
na ně už odkazuje. Dokud soubor chybí, karta se v galerii jednoduše přeskočí (žádný
rozbitý obrázek). Pokud sekce nemá žádný dostupný screenshot, celá se skryje
(`return null`), takže se nemůže zobrazit prázdná/rozbitá sekce.
