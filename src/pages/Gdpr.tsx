import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";

/**
 * Plné znění zásad ochrany osobních údajů dodané klientem (21. 8. 2026), vloženo
 * verbatim jako text — žádné přeformulování, žádné opravy (na rozdíl od
 * ObchodniPodminky.tsx, kde byl jeden odkaz opravený a explicitně nahlášený).
 * Tabulky zachované jako prostý text (whitespace-pre-line).
 */
const SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. Kdo jsme a jak nás kontaktovat",
    body: `Tyto zásady vysvětlují, jaké osobní údaje o tobě zpracováváme, proč to děláme, jak dlouho je uchováváme a jaká máš práva.

Správcem osobních údajů je:
Obchodní firma: iWauland s.r.o.
Sídlo: Příčná 1892/4, Nové Město (Praha 1), 110 00 Praha
IČO: 22139061
Zápis: Obchodní rejstřík vedený Městský soud v Praze, oddíl C 411468/MSPH
E-mail: HraReality@gmail.com
Telefon: +420 606981153
(dále jen „my", „nás" nebo „Provozovatel")

Nejmenovali jsme pověřence pro ochranu osobních údajů — nesplňujeme podmínky podle čl. 37 GDPR, které by nám to ukládaly. Ve všech záležitostech ochrany osobních údajů se obracej na kontaktní e-mail výše.

Zpracování se řídí nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb., o zpracování osobních údajů.`,
  },
  {
    title: "2. Základní pravidla, kterými se řídíme",
    body: `Než půjdeme do detailů, tři věci, které ti chceme říct rovnou:

Neprodáváme tvoje údaje. Nikomu. Nikdy. Nepředáváme je ani inzertním sítím ani datovým brokerům.

Zveřejnění je vždy dobrovolné. Tvoje jméno se objeví v Knize zakladatelů nebo na Founder Wall jen tehdy, když nám k tomu dáš souhlas. Souhlas můžeš kdykoli odvolat a neztratíš tím Founder status ani žádnou výhodu.

Sbíráme jen to, co potřebujeme. Telefon je volitelný. Doručovací adresu chceme jen u balíčků s fyzickými odměnami. Discord účet nemusíš mít.`,
  },
  {
    title: "3. Jaké údaje zpracováváme",
    body: `3.1 Údaje, které nám dáš sám

Identifikační (jméno, příjmení) — při objednávce
Kontaktní (e-mail, telefon — volitelný) — při objednávce
Fakturační (fakturační adresa, u firem název, IČO, DIČ) — při objednávce
Doručovací (doručovací adresa) — jen u balíčků s fyzickými odměnami
Komunitní (Discord nick, Discord ID) — při propojení účtu (dobrovolné)
Zveřejňovací (jméno / značka / přezdívka / iniciály dle tvé volby) — jen se souhlasem
Obsahové (zprávy podpoře, zpětná vazba, hlasování ve Founder Council) — průběžně

3.2 Údaje, které vzniknou zpracováním objednávky

Founder číslo; zakoupený Balíček, cena, datum a čas platby; ID objednávky a platební transakce; stav platby, případný refund; přehled Nároků a jejich stavu (přiděleno / doručeno / čeká); historie komunikace s podporou.

3.3 Údaje o platbě

Číslo tvé platební karty ani CVV kód nevidíme a neukládáme. Platba probíhá výhradně v prostředí platební brány. My dostaneme jen informaci o tom, zda platba proběhla, částku a identifikátor transakce.

3.4 Údaje z návštěvy webu

IP adresa, typ prohlížeče a zařízení, zdroj návštěvy, navštívené stránky a čas. Podrobnosti v článku 9 (cookies).

3.5 Údaje o dětech

Founder Membership je určen osobám starším 18 let. Vědomě nezpracováváme údaje osob mladších 15 let bez souhlasu zákonného zástupce (§ 7 zákona č. 110/2019 Sb.). Pokud zjistíme, že jsme takové údaje získali, bez zbytečného odkladu je smažeme.`,
  },
  {
    title: "4. Proč údaje zpracováváme a na jakém základě",
    body: `Každé zpracování musí mít právní důvod. Zde je jejich přehled.

4.1 Uzavření a plnění smlouvy
Právní základ: čl. 6 odst. 1 písm. b) GDPR — plnění smlouvy

Zpracováváme identifikační, kontaktní, fakturační, doručovací a komunitní údaje, abychom:
— vyřídili tvoji objednávku a přijali platbu,
— přidělili ti Founder číslo,
— aktivovali Discord roli a přístupy,
— evidovali, na které Nároky máš právo, a doručili ti je,
— informovali tě o průběhu vývoje a aktivaci výhod,
— odpověděli na tvoje dotazy.

Bez těchto údajů ti nemůžeme Founder Membership poskytnout. Jejich poskytnutí je smluvním požadavkem.

4.2 Účetnictví a daňové povinnosti
Právní základ: čl. 6 odst. 1 písm. c) GDPR — plnění právní povinnosti

Vystavujeme a archivujeme daňové doklady podle zákona č. 563/1991 Sb., o účetnictví, a zákona č. 280/2009 Sb., daňový řád. Tuto povinnost nemůžeme obejít ani na tvoji žádost — proto po dobu archivace nelze údaje z účetních dokladů smazat.

4.3 Zveřejnění v Knize zakladatelů a na Founder Wall
Právní základ: čl. 6 odst. 1 písm. a) GDPR — souhlas

Jen pokud nám ho dáš. Zvolíš si, zda budeš uveden/a celým jménem, značkou, přezdívkou, iniciálami, nebo anonymně (jen Founder číslo).

Souhlas můžeš kdykoli odvolat e-mailem na HraReality@gmail.com. Odstranění provedeme bez zbytečného odkladu, nejpozději do 30 dnů. Odvolání souhlasu nemá vliv na zákonnost zpracování před jeho odvoláním.

Buďme upřímní k jednomu omezení. Pokud tvoje jméno už bylo vytištěno (například v Kronice vzniku nebo na fyzických materiálech) nebo zachyceno třetí osobou (snímek obrazovky, internetový archiv), nemáme technickou možnost je odtud odstranit. Před jakýmkoli tiskem tě proto vždy znovu požádáme o potvrzení souhlasu.

4.4 Zasílání Founder aktualizací
Právní základ: čl. 6 odst. 1 písm. b) GDPR — plnění smlouvy

Informace o vývoji projektu, aktivaci výhod a spuštění Season 1 jsou součástí toho, co sis koupil. Nejde o marketing — proto tyto zprávy chodí po celou dobu trvání tvých Nároků.

4.5 Obchodní sdělení k dalším produktům
Právní základ: čl. 6 odst. 1 písm. f) GDPR — oprávněný zájem (§ 7 odst. 3 zákona č. 480/2004 Sb.)

Jako našemu zákazníkovi ti můžeme posílat sdělení o obdobných produktech. V každé takové zprávě najdeš odkaz na odhlášení a odhlásit se můžeš i kdykoli e-mailem. Odhlášení z marketingu nemá vliv na zprávy podle článku 4.4.

4.6 Ochrana našich práv a obrana nároků
Právní základ: čl. 6 odst. 1 písm. f) GDPR — oprávněný zájem

Uchováváme doklad o tom, že jsi odsouhlasil obchodní podmínky a udělil souhlas se zahájením plnění, abychom to mohli v případě sporu prokázat. Zpracováváme rovněž údaje nutné k vymáhání pohledávek či obraně proti nárokům.

4.7 Bezpečnost a provoz
Právní základ: čl. 6 odst. 1 písm. f) GDPR — oprávněný zájem

Logy, ochrana proti zneužití, podvodným objednávkám a útokům na web.

4.8 Analytika návštěvnosti
Právní základ: čl. 6 odst. 1 písm. a) GDPR — souhlas (cookie lišta)

Viz článek 9.`,
  },
  {
    title: "5. Jak dlouho údaje uchováváme",
    body: `Údaje o Founder Membership a Nárocích — po dobu trvání Nároků a 4 roky poté (promlčecí lhůta dle § 629 OZ)
Účetní doklady — 5 let od konce účetního období (§ 31 zákona o účetnictví)
Daňové doklady a související podklady — 10 let (s ohledem na lhůty pro stanovení daně dle § 148 daňového řádu)
Zveřejnění v Knize zakladatelů — do odvolání souhlasu
Doklad o udělení souhlasů a akceptaci podmínek — 4 roky po ukončení smlouvy
Komunikace s podporou — 3 roky
Marketingová databáze — 3 roky od posledního nákupu nebo do odhlášení
Provozní logy webu — 12 měsíců
Cookies — dle článku 9

Po uplynutí uvedených dob údaje smažeme nebo anonymizujeme tak, aby tě podle nich nebylo možné identifikovat.`,
  },
  {
    title: "6. Komu údaje předáváme",
    body: `Nemáme vlastní servery ani vlastní účetní oddělení. Používáme prověřené dodavatele, kteří pro nás údaje zpracovávají na základě smlouvy o zpracování osobních údajů podle čl. 28 GDPR. Nikdo z nich není oprávněn používat tvoje údaje pro vlastní účely.

stripe.com — zpracování plateb, fakturace — Irsko / EU
Airtable / Google — evidence Founderů — USA
Make.com — automatizace procesů — EU
Discord Netherlands BV / Discord Inc. — komunitní platforma, role a přístupy — Nizozemsko / USA
make.com — rozesílání e-mailů — EU
Vercel.com — provoz webu — USA
Google Analytics — měření návštěvnosti — USA
ViaPrint.cz — výroba fyzických odměn — Česká republika
Zásilkovna, Balíkovna — doručení fyzických odměn — Česká republika
Účetní a daňový poradce — vedení účetnictví — Česká republika
Advokátní kancelář — právní poradenství, vymáhání nároků — Česká republika

Údaje můžeme dále předat orgánům veřejné moci, pokud nám to ukládá zákon (finanční úřad, Česká obchodní inspekce, soudy, orgány činné v trestním řízení).

6.1 Předávání mimo Evropskou unii

Někteří naši dodavatelé sídlí ve Spojených státech amerických. Předání údajů do třetí země je v takovém případě zajištěno:
— rozhodnutím Evropské komise o odpovídající ochraně ze dne 10. 7. 2023 (rámec EU–USA pro ochranu osobních údajů, EU-US Data Privacy Framework), je-li dodavatel v tomto rámci certifikován, nebo
— standardními smluvními doložkami schválenými Evropskou komisí (čl. 46 odst. 2 GDPR).

Aktuální informaci o tom, který mechanismus se u konkrétního dodavatele uplatní, ti na požádání poskytneme.

Chceš tomu předejít? Discord účet propojovat nemusíš. Bez něj ti některé komunitní výhody doručíme jiným způsobem — napiš nám.`,
  },
  {
    title: "7. Tvoje práva",
    body: `Máš následující práva. Uplatnit je můžeš kdykoli e-mailem na HraReality@gmail.com

Právo na přístup (čl. 15) — Můžeš se nás zeptat, jaké údaje o tobě zpracováváme, a získat jejich kopii.
Právo na opravu (čl. 16) — Pokud jsou tvoje údaje nepřesné nebo neúplné, opravíme je.
Právo na výmaz (čl. 17) — Můžeš požádat o smazání údajů. Vyhovíme, pokud pro jejich zpracování nemáme jiný právní důvod — typicky zákonnou povinnost archivovat účetní doklady nebo probíhající spor.
Právo na omezení zpracování (čl. 18) — Můžeš požádat, abychom s údaji dočasně přestali pracovat, například po dobu ověřování jejich správnosti.
Právo na přenositelnost (čl. 20) — Údaje, které jsi nám poskytl/a a které zpracováváme automatizovaně na základě smlouvy nebo souhlasu, ti předáme ve strojově čitelném formátu.
Právo vznést námitku (čl. 21) — Proti zpracování z oprávněného zájmu můžeš vznést námitku. Proti přímému marketingu námitce vyhovíme vždy a bez dalšího.
Právo odvolat souhlas (čl. 7 odst. 3) — Tam, kde zpracováváme na základě souhlasu, můžeš souhlas kdykoli odvolat. Odvolání je stejně jednoduché jako udělení.
Právo nebýt předmětem automatizovaného rozhodování (čl. 22) — Neprovádíme automatizované rozhodování ani profilování s právními účinky.
Právo podat stížnost (čl. 77) — Pokud si myslíš, že s tvými údaji nakládáme špatně, řekni nám to — chceme to napravit. Vždy se ale můžeš obrátit i přímo na dozorový úřad:

Úřad pro ochranu osobních údajů
Pplk. Sochora 27, 170 00 Praha 7
Web: www.uoou.cz · E-mail: posta@uoou.gov.cz
Telefon: +420 234 665 111

Jak žádost vyřídíme

Odpovíme do jednoho měsíce od doručení žádosti. U složitých žádostí můžeme lhůtu prodloužit o dva měsíce — v takovém případě tě o tom a o důvodech informujeme do jednoho měsíce.

Vyřízení je bezplatné. Poplatek můžeme účtovat jen u žádostí zjevně nedůvodných nebo nepřiměřených, zejména opakovaných.

Abychom tvoje údaje nevydali někomu jinému, můžeme tě požádat o doplňující ověření totožnosti. Nejjednodušší je napsat z e-mailu, který jsi použil při objednávce, a uvést své Founder číslo.`,
  },
  {
    title: "8. Jak údaje chráníme",
    body: `Přijali jsme technická a organizační opatření odpovídající rizikům zpracování, zejména:
— šifrovaný přenos dat (HTTPS/TLS),
— omezení přístupu k databázi jen na osoby, které jej potřebují k výkonu práce,
— vícefaktorové ověření u administrátorských přístupů,
— pravidelné zálohování,
— smluvní závazek mlčenlivosti u členů týmu a dodavatelů,
— pravidelnou kontrolu oprávnění.

Pokud by přesto došlo k porušení zabezpečení s rizikem pro tvoje práva, ohlásíme je Úřadu pro ochranu osobních údajů do 72 hodin a při vysokém riziku o něm bez zbytečného odkladu informujeme i tebe.`,
  },
  {
    title: "9. Cookies a měření návštěvnosti",
    body: `9.1 Co jsou cookies

Malé soubory, které web ukládá do tvého prohlížeče.

9.2 Jaké používáme

Nezbytné — funkčnost webu, nákupní proces, bezpečnost — souhlas: není potřeba — doba: relace až 12 měsíců
Analytické — měření návštěvnosti a chování na webu a v aplikaci — souhlas: ano — doba: relace až 12 měsíců
Marketingové — měření účinnosti kampaní, remarketing — souhlas: ano — doba: relace až 12 měsíců

9.3 Tvoje volba

Analytické a marketingové cookies nastavíme až poté, co k tomu dáš souhlas v cookie liště (§ 89 odst. 3 zákona č. 127/2005 Sb.). Souhlas můžeš kdykoli změnit nebo odvolat prostřednictvím odkazu Spravovat cookies v patičce webu.

Cookies můžeš také spravovat nebo mazat přímo v nastavení svého prohlížeče. Zakázání nezbytných cookies může způsobit, že web nebude fungovat správně.`,
  },
  {
    title: "10. Změny těchto zásad",
    body: `Zásady můžeme aktualizovat, například když začneme používat nový nástroj nebo se změní právní úprava. Aktuální znění je vždy na: https://www.hrareality.cz/gdpr

O podstatných změnách tě budeme informovat e-mailem nebo viditelným upozorněním na webu, a to alespoň 15 dnů předem. Pokud změna vyžaduje tvůj souhlas, vyžádáme si ho.

Verze 1.0, účinná od 21. 8. 2026. V případě jakýchkoli dotazů piš na HraReality@gmail.com — odpovíme.`,
  },
];

export default function Gdpr() {
  return (
    <section className="py-20 min-h-screen">
      <SEO
        title="GDPR | iWau HRA REALITY"
        description="Zásady zpracování osobních údajů (GDPR) iWau Hra Reality."
      />
      <div className="section-container max-w-3xl">
        <FadeIn>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display tracking-widest mb-8">
            PRÁVNÍ INFORMACE
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">GDPR — Zásady ochrany osobních údajů</h1>
          <p className="text-sm text-muted-foreground mb-1">iWau Hra Reality · hrareality.cz</p>
          <p className="text-xs text-muted-foreground mb-12">Účinné od: 21. 8. 2026 · Verze: 1.0</p>
        </FadeIn>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <FadeIn key={s.title}>
              <h2 className="font-display text-lg font-bold mb-3 text-primary">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.body}</p>
            </FadeIn>
          ))}
        </div>

        <p className="mt-16 text-sm text-muted-foreground">
          Máš dotaz ke zpracování svých údajů? Napiš nám na{" "}
          <a href="mailto:hrareality@gmail.com" className="text-primary hover:underline">
            hrareality@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
