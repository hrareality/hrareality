# Otázky pro Tomáše — Founder Membership Season 0

> **Stav: všech 5 bodů vyřešeno/rozhodnuto** (viz poznámky u každého). Soubor ponechán jako záznam rozhodnutí.

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

## 5. Počáteční stav Founder counteru → rozhodnuto: ponechat od nuly

Counter běží reálně od 0 (čerstvá Airtable tabulka), žádné navazování na starší data.

---

Zbývá: Fáze C (Make.com scénáře 1 a 2) — potřebuje někoho s přístupem do Make.com, kdo to postaví podle `makecom-blueprints.md`. Tohle už není otázka na Tomáše, ale exekuční krok.
