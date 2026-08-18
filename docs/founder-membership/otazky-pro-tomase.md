# Otázky pro Tomáše — Founder Membership Season 0

> **Stav (aktualizováno 12. 8. 2026, dle Landing Page Texty-6):** body 1–4 vyřešeny/rozhodnuty. Bod 5 přepsán novým rozhodnutím klienta (counter od 17, ne od nuly) — kód už upraven, zbývá doladit dopad na limity balíčků. Přidány body 6 (Google Sheet vs. Airtable) a 7 (e-mailoví příjemci interní notifikace) jako nové otevřené otázky ze stejného zadání.

Ahoj Tomáši,

potřebuju od tebe rozhodnutí/podklady na pár věcí, než dotáhnu poslední kus zakázky (Make.com automatizace) a spustíme to naostro. Nic z toho neblokuje samotný kód — landing page i děkovací stránka jsou hotové a otestované — ale bez týhle sady na to nemůžu narazit správně live.

## 1. Discord invite link — rozpor → ✅ vyřešeno

Ověřeno přímo přes Discord API: oba odkazy (`discord.gg/MGnNWkcqQf` i `discord.com/invite/Qe2Zxr4bWJ`) vedou na **stejný server** (Guild ID `1107912737985663047`, "Hra Reality"). Invite link sám o sobě neuděluje privilegia — ta řeší až role přiřazená Make.com podle balíčku. Ponecháno jak je (dva invite kódy na stejný server, možná kvůli trackingu zdroje).

## 2. Obsah E-mailu 3 → rozhodnuto: nepřidávat zatím

Klient rozhodl e-mail po aktivaci role zatím nepřidávat, případně později. Make.com scénář 2 podle toho končí přiřazením role a update Airtable, bez e-mailového kroku (viz `makecom-blueprints.md`).

## 3. Sekce 15 landing page → rozhodnuto: necháno prázdné

Zůstává nadpis + úvod + poctivé "doplníme, jakmile budou k dispozici", bez vymyšlených citací.

## 4. Vizuální assety → rozhodnuto: neřešit teď

V repu existují reálně použitelné assety (postavy, komiks, karty, týmové fotky), ale nic se nepřidává, dokud si klient sám neřekne o konkrétní použití.

## 5. Počáteční stav Founder counteru → ✅ vyřešeno (počítá se od 17, rozpis po balíčcích potvrzen)

Původní rozhodnutí (counter od 0) klient **zrušil**. Podle nového zadání už reálně existuje 17 Founderů mimo tuhle Airtable tabulku (prodáno dřív/jinou cestou) a veřejně zobrazené číslo (Hero progress box + Sekce 10 "První generace roste") má být **17 + potvrzené záznamy v Airtable**, ne jen COUNT z Airtable.

Implementováno v `api/founder/counter.js` jako `FOUNDER_COUNT_BASE_OFFSET` (env-konfigurovatelné, default `17`).

**Rozpis potvrzen klientem (13. 8. 2026):** všech 17 mělo balíček za 1 999 Kč = **Tvůrce Season 0** (creator). Nastaveno `FOUNDER_COUNT_OFFSET_CREATOR=17` (`FOUNDER_TIER`/`GUARDIAN` zůstávají 0) — limit Tvůrce (500) se teď reálně počítá jako 17 + potvrzené Airtable záznamy, ostatní limity beze změny. Ověřeno na `localhost:3210` (`/api/founder/counter` vrací 17, přesně dle offsetu).

**Zbývá jen:** doplnit stejné dvě proměnné (`FOUNDER_COUNT_BASE_OFFSET=17`, `FOUNDER_COUNT_OFFSET_CREATOR=17`) i do Vercel Project Settings (production env) při nasazení — v `.env.local` jsou už uložené, ale to je jen lokální kopie.

## 6. Google Sheet vs. Airtable → ✅ potvrzeno klientem: chceme oboje

Klient potvrdil (12. 8. 2026): Google Sheet chceme **navíc** k Airtable, ne místo něj. Krok je připravený v `makecom-setup-guide.md` (1.6b, "Google Sheets — Add a Row", paralelní větev hned vedle interního e-mailu) — mapuje datum/Founder číslo/jméno/e-mail/balíček/cenu/upgrade/číslo objednávky z webhook dat, přesně jako u e-mailu. **Čeká se jen na:** (a) Google účet, kam se má Sheet ukládat, a (b) buď odkaz na existující Sheet, nebo pokyn ať se v Make.com založí nový — dodá klient.

## 7. E-mail o objednávce na hrareality@gmail.com a kosatomas123@gmail.com → ✅ potvrzeno, čeká na dokončení v Make.com

Scénář 1 v Make.com má od začátku počítáno s interním upozorňovacím e-mailem hned po platbě (viz `makecom-setup-guide.md` krok 1.6: "**To:** e-maily Tomáše a Vítka") — jde o přesně tenhle požadavek, jen dřív bez konkrétních adres. **Potvrzeno klientem (12. 8. 2026):** `hrareality@gmail.com` a `kosatomas123@gmail.com` **jsou** reálné adresy Tomáše a Vítka — nejde o doplnění navíc, jsou to ty samé osoby, jen s konkrétní adresou místo generického popisu. Žádná další adresa se nepřidává.

Blokuje to jen dokončení Make.com scénáře (Gmail připojení + vyplnění pole To/Subject/Content) — na straně kódu není potřeba nic měnit, webhook (`api/founder/stripe-webhook.js`) už posílá kompletní data do Make.com při každé potvrzené platbě.

---

Zbývá: Fáze C (Make.com scénáře 1 a 2) — potřebuje někoho s přístupem do Make.com, kdo to postaví podle `makecom-blueprints.md`. Tohle už není otázka na Tomáše, ale exekuční krok.
