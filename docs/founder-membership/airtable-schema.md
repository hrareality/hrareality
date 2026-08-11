# Airtable schéma — Founder Membership Season 0

**Base:** `Collection_season0` (`app8Syl2NIgNQkcQm`) — **stejný existující base jako Collection modul**, ne nový. Klient rozhodl přidat FOUNDERS/ENTITLEMENTS do něj místo založení odděleného base. Tabulky `cards`, `users`, `owned_cards` (Collection modul) zůstávají beze změny — obě nové tabulky byly založeny vedle nich přes Airtable Metadata API, nic existujícího se nepřepisovalo ani needitovalo.

**Zdroj pravdy:** tabulka `FOUNDERS` (`tblaWup13buBiKn5s`). Nároky/entitlementy jsou v samostatné tabulce `ENTITLEMENTS` (`tblgEziiVUhPDrwTk`), protože podle zadání (`zadani-landing-page.md` sekce 5.3) nejde o boolean pole, ale o stavový model s vlastníkem, termínem a důkazem doručení — to se do jedné ploché tabulky nedá čistě vyjádřit bez duplicit při upgradu.

Přehledy/filtry (Kniha zakladatelů, admin dashboard) jsou jen **views** nad těmito dvěma tabulkami, ne samostatná data.

**Stav založení:** obě tabulky jsou reálně vytvořené v base (ověřeno přes API, 30 + 9 polí). Drobná odchylka oproti návrhu níže: primary field `ENTITLEMENTS` musí být podle Airtable API prostý text (link/select nejde nastavit jako primary při vytváření) — přidáno pole `Entitlement` (singleLineText, zatím prázdné/volitelné), zbytek schématu odpovídá 1:1.

---

## Tabulka `FOUNDERS`

| Pole | Typ | Poznámka |
|---|---|---|
| `Founder Number` | Number | Přiděluje aplikace (webhook), ne Airtable autonumber — čísluje se chronologicky **jen** při potvrzené platbě, refundované číslo se neuvolňuje. Prázdné, dokud platba není potvrzená. |
| `Founder Number Display` | Formula | `"FOUNDER #" & RIGHT("0000" & {Founder Number}, 4)` |
| `First Name` | Single line text | |
| `Last Name` | Single line text | |
| `Email` | Email | **Identita platby** — párování Stripe objednávky na Foundera |
| `Discord Username` | Single line text | Nick, jen informativní — může se změnit |
| `Discord ID` | Single line text | **Identita pro role/přístupy** — neměnná, tohle používá Make.com pro přiřazení role |
| `Purchase Date` | Date + time | |
| `Package` | Single select | `Podporovatel Season 0` / `První hráč Season 0` / `Zakladatel Season 0` / `Tvůrce Season 0` / `Strážce Season 0` — přesně tyto řetězce, používají se 1:1 i jako Discord role name |
| `Price Paid` | Currency (CZK) | |
| `Payment Status` | Single select | `Čeká na potvrzení` / `Potvrzeno` / `Selhalo` / `Vráceno` |
| `Stripe Checkout Session ID` | Single line text | |
| `Stripe Payment Intent ID` | Single line text | |
| `Order Number` | Single line text | Veřejné číslo objednávky pro support e-maily — **odlišné** od interního record ID i od Founder Number, viz `security-and-access.md` |
| `Invoice URL` | URL | Stripe hosted invoice |
| `Is Upgrade` | Checkbox | |
| `Upgraded From Package` | Single select | stejné hodnoty jako `Package`, prázdné pokud první nákup |
| `Upgrade Date` | Date + time | |
| `Discord Joined At` | Date | prázdné = ještě nepřipojen |
| `First Activity Date` | Date | |
| `Enrolled in MVP1` | Checkbox | |
| `Active Founder` | Checkbox | |
| `Founder Wall Display Choice` | Single select | `Celé jméno` / `Značka` / `Přezdívka` / `Iniciály` / `Anonymně` |
| `Founder Wall Display Name` | Single line text | |
| `Founder Wall Consent` | Checkbox | default `false`, nikdy předzaškrtnuté (vynuceno i na frontendu) |
| `Access Token Issued At` | Date + time | pro audit, samotný token je stateless JWT — viz security dokument |
| `Email Resend Count` | Number | server-side rate limit (max 3×/hod) pro resend na děkovací stránce |
| `Email D2 Sent At` | Date + time | prázdné = ještě neodesláno. Vyplní denní scheduled Make.com scénář (č. 3), viz `makecom-setup-guide.md`. Slouží jako idempotence — brání duplicitnímu odeslání |
| `Email D5 Sent At` | Date + time | totéž pro e-mail D+5 |
| `Email D9 Sent At` | Date + time | totéž pro e-mail D+9 |
| `Email D14 Sent At` | Date + time | totéž pro e-mail D+14 |
| `Email Resend Window Start` | Date + time | reset okna při prvním resendu po vypršení hodiny |
| `Entitlements` | Link to `ENTITLEMENTS` | 1 → N |
| `Notes` | Long text | interní poznámky (Vítek/Tomáš) pro ruční fallback proces |

**Unikátnost:** `Email` a `Discord ID` musí být ošetřené jako lookup klíč v aplikační logice webhooku (Airtable samo unikátnost nevynucuje) — před vytvořením nového záznamu vždy nejdřív hledat existující podle e-mailu (viz upgrade pravidlo).

---

## Tabulka `ENTITLEMENTS`

Jeden řádek = jeden konkrétní nárok jednoho Foundera. Při upgradu se **nevytváří duplicitní řádek** pro nárok, který Founder už má z nižší úrovně — pouze se doplní nové řádky za rozdílové nároky vyšší úrovně.

| Pole | Typ | Poznámka |
|---|---|---|
| `Entitlement` | Single line text | Primary field tabulky (Airtable vyžaduje text/number jako primary field, ne link/select) — kód ho nepoužívá, lze nechat prázdné nebo ho v UI později nahradit formulí pro čitelnost |
| `Founder` | Link to `FOUNDERS` | N → 1 |
| `Benefit Type` | Single select | viz mapovací tabulka níže |
| `Status` | Single select | `ČEKÁ NA AKTIVACI` / `AKTIVNÍ` / `DORUČENO` / `VYUŽITO` / `ZRUŠENO / REFUND` |
| `Owner` | Single select | `Vítek` / `Tomáš` / `Kesamot` / `Discord moderátor` / `Systém (automatizace)` |
| `Due Date` | Date | termín doručení |
| `Delivered Date` | Date | |
| `Delivery Proof` | Long text / Attachment | odkaz, screenshot apod. |
| `Premium Activation Deadline` | Date | **jen pro `Premium 12 měsíců`** — 12 měsíců od veřejného spuštění MVP1, jinak nárok propadá (samostatná lhůta od "délky trvání", viz zadání sekce 4) |

### Mapování `Benefit Type` → balíček (kumulativní, kód dedupe logiky viz `stripe-and-checkout.md`)

| Benefit Type | Od balíčku | Ihned / Později |
|---|---|---|
| Founder Badge | Podporovatel | Ihned |
| Kniha zakladatelů — zápis | Podporovatel | Ihned |
| Discord role | Podporovatel (mění se název role dle nejvyšší úrovně) | Ihned |
| Poděkování (e-mail) | Podporovatel | Ihned |
| Founder číslo | První hráč | Ihned |
| Inner Circle přístup | První hráč | Ihned |
| Přednostní vstup Season 1 | První hráč | Později |
| Founder Card (digitální) | První hráč | Později (tisk) |
| #founders kanál | Zakladatel | Ihned |
| Premium 12 měsíců | Zakladatel | Později (start po MVP1, aktivační okno 12 měs.) |
| Founder certifikát | Zakladatel | Později |
| Beta priorita | Zakladatel | Později |
| #founder-council přístup | Tvůrce Season 0 (balíček 4) | Ihned |
| Hlasování | Tvůrce Season 0 | Později (průběžně) |
| Event vstupenky (2×) | Tvůrce Season 0 | Později |
| Founder Set artefaktů (12 ks Base Edition) | Tvůrce Season 0 | Později — **First Edition nelze dodatečně přidělit, jen live droppy** |
| Zvýrazněný zápis v knize zakladatelů | Strážce | Ihned |
| Zápis do komiksu | Strážce | Ihned |
| VIP vstupenky (2×) | Strážce | Později |
| Podepsaný Founder Set | Strážce | Později |

---

## Limity balíčků (enforcement, ne jen popisek)

| Balíček | Limit | Kde se hlídá |
|---|---|---|
| Podporovatel Season 0 | neomezeně | — |
| První hráč Season 0 | neomezeně | — |
| Zakladatel Season 0 | 1 000 | server-side check před vytvořením Stripe Checkout Session |
| Tvůrce Season 0 | 500 | server-side check před vytvořením Stripe Checkout Session |
| Strážce Season 0 | 100 | server-side check před vytvořením Stripe Checkout Session |

Limit se počítá jako COUNT záznamů ve `FOUNDERS` s `Package = X` AND `Payment Status = Potvrzeno`. Kontrola probíhá při vytváření checkout session (ne až na webhooku), aby se zamezilo prodeji nad limit při souběžných objednávkách — race condition mezi posledními kusy je fallback řešen ručně (viz `zadani-landing-page.md` sekce 5.5).

---

## Otevřené k ověření (neblokuje schéma, ale ověřit před spuštěním)

- Typo v zadání: `DOROUČENO` vs `DORUČENO` — použil jsem `DORUČENO` (doručeno), předpokládám překlep. Pokud myšleno jinak, dej vědět.
