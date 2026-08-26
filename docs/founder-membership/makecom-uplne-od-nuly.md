# Make.com úplně od nuly — kde co je a jak založit "connection"

Tenhle dokument předpokládá, že jsi Make.com nikdy předtím nepoužil/a. Jde krok po kroku, s vysvětlením každého pojmu.

---

## Co je "connection" (propojení)

Než Make.com může za tebe udělat cokoliv v Airtable, poslat e-mail nebo pracovat s Discordem, potřebuje "klíče" k těm účtům — heslo, token nebo přihlášení. Tomu se v Make.com říká **connection**. Je to jednorázová věc — jednou ji založíš pro danou appku (např. Airtable) a pak ji Make.com nabízí automaticky ve všech scénářích, kde Airtable použiješ.

**Nejjednodušší způsob, jak connection založit, je NEHLEDAT ji předem** — necháš Make.com, ať se tě zeptá přesně ve chvíli, kdy ji potřebuje (viz část C níže). To je pro první seznámení mnohem snazší, než hledat samostatnou sekci.

---

## A) Co vidíš po přihlášení do Make.com

Vlevo na obrazovce je úzký svislý pruh s ikonkami (jako v mnoha appkách — Gmail, Slack apod. mají podobně). Shora dolů tam obvykle je:

- Logo Make (úplně nahoře)
- **Home** (ikona domečku)
- **Scenarios** (ikona vypadá jako propojené tvary/blesk) — tady se stavějí a spravují scénáře
- **Connections** (ikona zástrčky 🔌) — tady je seznam všech propojených účtů
- **Data stores**, **Templates**, **Apps** — tyhle teď nepotřebuješ
- Dole: tvůj profil / nastavení organizace

Pokud najedeš myší (bez kliknutí) na kteroukoliv ikonku, Make.com ti ukáže malý popisek s jejím názvem — tak poznáš, na co koukáš.

---

## B) Kde je "Connections", pokud ji chceš najít sama/sám

1. Klikni na ikonku **zástrčky (🔌)** v levém pruhu — popisek by měl říkat "Connections".
2. Otevře se stránka se seznamem propojení (na začátku prázdná, nic tam nemáš).
3. Vpravo nahoře je tlačítko **"Add a connection"** (nebo jen **"+"**).
4. Po kliknutí se objeví vyhledávací pole — napiš tam jméno appky (`Airtable`, `Discord`, nebo `Email`) a klikni na ni, jakmile se objeví v nabídce.
5. Make.com tě provede přihlášením — buď tlačítkem "Sign in with [appka]", nebo polem na vložení tokenu/klíče.

**Tohle je ale oklika.** Doporučuju rovnou jít na část C.

---

## C) Doporučený postup — založit scénář a nechat si o connection říct

### Krok 1 — Založ nový scénář

1. Klikni v levém pruhu na ikonku **Scenarios**.
2. Vpravo nahoře klikni na fialové/modré tlačítko **"Create a new scenario"**.
3. Otevře se prázdné plátno s jedním velkým šedým kolečkem uprostřed, na kterém je jen **+**.

### Krok 2 — První modul (Webhook) — tenhle žádnou connection nepotřebuje

1. Klikni na to kolečko s **+**.
2. Otevře se okno "Search apps" — do políčka napiš `Webhooks`.
3. Klikni na ikonku, která se objeví (fialová, nápis Webhooks).
4. Vyber **"Custom webhook"**.
5. Objeví se malé okno — klikni **"Add"**.
6. Napiš název, např. `founder-payment`, klikni **Save**.
7. Make.com ti ukáže dlouhou URL adresu (začíná `https://hook...`) — **zkopíruj a ulož si ji** (dej ji třeba do poznámek), budeš ji posílat Petrovi.
8. Klikni **OK/Save** — modul webhooku je hotový a čeká na plátně.

### Krok 3 — Druhý modul (Airtable) — TADY se objeví "connection"

1. Napravo od webhook kolečka je další malé **+** (na spojovací čáře, nebo Make.com ti ho nabídne automaticky). Klikni na něj.
2. Do vyhledávání napiš `Airtable`.
3. Klikni na ikonku Airtable.
4. Vyber akci **"Update a Record"** (nebo jinou, podle toho, co zrovna stavíš — v [makecom-setup-guide.md](makecom-setup-guide.md) je vždy přesně napsané, kterou akci vybrat).
5. **Tady to je** — nahoře v okně modulu uvidíš pole s nápisem něco jako **"Connection"** a vedle něj tlačítko **"Add"** (protože žádnou Airtable connection ještě nemáš).
6. Klikni na **"Add"**.
7. Objeví se formulář. Airtable v Make.com obvykle nabízí dvě možnosti:
   - **Tlačítko "Sign in with Airtable"** → klikni, přihlas se svým Airtable účtem, klikni "Autorizovat".
   - NEBO **pole na vložení API klíče / tokenu** → sem vlož Airtable Personal Access Token (pokud ho nemáš, řekni Petrovi, ať ti ho pošle, nebo si ho vytvoř na `airtable.com/create/tokens` se scope `data.records:read` a `data.records:write` na base `Collection_season0`).
8. Klikni **Save / Continue**.
9. Connection je založená — objeví se v tom poli nahoře už vyplněná. **Příště, když v jakémkoliv scénáři přidáš další Airtable modul, Make.com ti ji nabídne rovnou, nemusíš ji zakládat znovu.**
10. Teď pokračuj podle [makecom-setup-guide.md](makecom-setup-guide.md) — vyplň zbytek modulu (base, tabulka, pole).

### Krok 4 — Stejný princip pro Email a Discord

Přesně stejný postup (klikni **+**, napiš jméno appky, vyber akci, u pole "Connection" klikni "Add", přihlas se) platí i pro:
- **Email** modul → přihlásíš Gmail účet (nebo vložíš SMTP údaje), ze kterého mají chodit e-maily.
- **Discord** modul → Make.com tě přesměruje na Discord přihlášení, kde vybereš server **Hra Reality** a odsouhlasíš oprávnění pro bota (viz [makecom-setup-guide.md](makecom-setup-guide.md) krok 0.3 — tam je i důležité upozornění na hierarchii rolí).

---

## Shrnutí — zapamatuj si jen tohle

> **Kdykoliv v modulu uvidíš pole "Connection" s tlačítkem "Add" vedle něj, klikni na to Add a přihlas se k danému účtu. Make.com si to propojení zapamatuje napořád, děláš to jen jednou za appku.**

Pokud se kdykoliv ztratíš, klidně mi popiš, co přesně vidíš na obrazovce (jaké nápisy, tlačítka) — poradím dál i bez toho, abych to viděl.
