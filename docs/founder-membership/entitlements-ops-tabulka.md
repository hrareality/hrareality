# Season 0 — přehled balíčků a bonusů (provozní tabulka od klienta)

> Zdroj: Google Sheet dodaný klientem. Uloženo jako referenční materiál pro ruční fallback proces (`zadani-landing-page.md` sekce 5.5) a pro sladění vlastnictví jednotlivých nároků. **Nekóduje se přímo** — `Owner` pole v Airtable `ENTITLEMENTS` má zjednodušený enum (Vítek/Tomáš/Kesamot/Discord moderátor/Systém), tahle tabulka má jemnější granularitu (Community tým, Výroba, Kuřic, "určit vlastníka" u nerozhodnutých).

## ✅ Ověřeno proti kódu při uložení tohoto dokumentu

- **Ceny a kapacity** — 149/499/999/1999/4999 Kč, limity Neomezeně/Neomezeně/1000/500/100 — **100% sedí** s [stripe-and-checkout.md](stripe-and-checkout.md) a Stripe.
- **Balíček 4 název** — tahle tabulka používala "Founder Season 0", což je **potřetí stejný konflikt** jako na začátku zakázky. **Definitivně potvrzeno klientem: "Tvůrce Season 0"** (sedí se živým Stripe produktem i Discord rolí) — v kódu/Airtable/Discordu se nic nemění.
- **Inner Circle přístup** — v tabulce chybí, ale klient potvrdil, že zůstává jako bonus balíčku První hráč+ — beze změny.
- **Founder Collection Card** (digitální vs. fyzická) — otevřeno i interně u klienta ("ověřit, zda je bonus digitální nebo fyzický") — v kódu zůstává jako digitální nárok, dokud nerozhodnou jinak.

## Tabulka (přepis)

| Bonus / výhoda | Podporovatel | První hráč | Zakladatel | Tvůrce* | Strážce | Jak zajistit | Odpovědnost |
|---|---|---|---|---|---|---|---|
| Founder badge | ✓ | ✓ | ✓ | ✓ | ✓ | Automaticky po platbě přidat badge do alba | Automatizace/produkt — určit vlastníka |
| Jméno v Knize zakladatelů | ✓ | ✓ | ✓ | ✓ | ✓ | Discord místnost #knihovna-zakladatelů, průběžný zápis | Tomáš / moderátor |
| Discord role "Podporovatel" | ✓ | ✓ | ✓ | ✓ | ✓ | Vytvořit a přidělovat roli | Kesamot |
| Speciální poděkování | ✓ | ✓ | ✓ | ✓ | ✓ | Ihned po nákupu e-mail + Thank You page | E-mail/web — určit vlastníka |
| Přednostní vstup Season 1 | | ✓ | ✓ | ✓ | ✓ | Seznam oprávněných, whitelist před spuštěním | Vítek; evidence v Sheetu |
| Founder Collection Card | | ✓ | ✓ | ✓ | ✓ | Vyrobit/zalaminovat 100+ ks — **digitální/fyzická neurčeno** | Výroba — určit vlastníka |
| Discord role "První hráč" | | ✓ | ✓ | ✓ | ✓ | Vytvořit a přidělovat roli | Kesamot / Discord |
| Founder číslo | | ✓ | ✓ | ✓ | ✓ | Bot automaticky přidělí unikátní číslo | Kesamot + Petr |
| 12 měsíců Premium po MVP1 | | | ✓ | ✓ | ✓ | Po spuštění automaticky pass na 12 měsíců | Evidence v Sheetu/automatizace |
| Přístup do #founders | | | ✓ | ✓ | ✓ | Vytvořit kanál, přidat po platbě + Discord registraci | Kesamot / technické řešení |
| Discord role "Zakladatel" | | | ✓ | ✓ | ✓ | Vytvořit a přidělovat roli | Kesamot / Discord |
| Digitální Founder certifikát | | | ✓ | ✓ | ✓ | Odeslání oprávněným zákazníkům | Operativa — určit vlastníka |
| Přístup do #founder-council | | | | ✓ | ✓ | Uzavřená místnost pro Tvůrce+Strážce | Kesamot / Discord |
| Hlasování o rozhodnutích MVP1 | | | | ✓ | ✓ | Organizovat v #founder-council | Community tým |
| Dvě vstupenky na první event | | | | ✓ | ✓ | Evidovat nárok, aktivovat při eventu | Evidence v Sheetu / event tým |
| Celý set artefaktů Season 0 | | | | ✓ | ✓ | Ručně přiřadit do alba přes Discord příkaz | Vítek / Kuřic |
| Discord role "Tvůrce"* | | | | ✓ | ✓ | Vytvořit a přidělovat roli | Kesamot / Discord |
| Priorita při beta testování | | | | ✓ | ✓ | Seznam s prioritním přístupem | Evidence v Sheetu / Vítek |
| VIP přístup na první event | | | | | ✓ | Evidovat nárok a využití | Evidence v Sheetu / event tým |
| Podepsaný Founder Set | | | | | ✓ | Fyzický set, osobně podepsaný foundery | Výroba + foundeři |
| Zvýrazněné jméno v Knize | | | | | ✓ | Příznak zvýraznění v evidenci | Tomáš / moderátor |
| Jméno/logo v komiksu | | | | | ✓ | Zápis do Sheetu, ihned do online verze | Vítek — celý proces |
| Discord role "Strážce" | | | | | ✓ | Vytvořit a přidělovat roli | Kesamot / Discord |

*\* Sloupec "Tvůrce" byl v originální tabulce popsaný jako "Founder Season 0" — přejmenováno při uložení podle potvrzeného finálního názvu, viz poznámka výše.*
