# Fonty pro PDF export (obchodní podmínky — formulář pro odstoupení)

`notosans-regular.ttf` a `notosans-bold.ttf` jsou **ořezané** (subset) verze Noto Sans
(SIL Open Font License 1.1, volně distribuovatelná) — obsahují jen základní latinku,
Latin Extended-A (české znaky: č, ď, ě, ň, ř, š, ť, ů, ž…) a pár interpunkčních znaků.
Původní font má ~556 KB/řez, tenhle subset ~22 KB/řez.

**Proč vůbec vlastní font:** jsPDF ve výchozích fontech (Helvetica) neumí českou
diakritiku — bez tohohle by PDF formulář v `ObchodniPodminky.tsx`
(`downloadWithdrawalForm()`) vypadalo jako "pYizposo..." místo "přizpůsobené".

## Jak subset vznikl

```bash
pip3 install fonttools

# Stažení plného Noto Sans (starý User-Agent vynutí .ttf místo .woff2):
curl -sL "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" \
  -H "User-Agent: Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
# → z výstupu vezmi url(...) adresy pro weight 400 a 700, stáhni je

pyftsubset notosans-regular.ttf --output-file=notosans-regular.ttf \
  --unicodes="U+0020-007E,U+00A0-017F,U+2010-2015,U+2018-201E,U+2026" \
  --layout-features='' --no-hinting

pyftsubset notosans-bold.ttf --output-file=notosans-bold.ttf \
  --unicodes="U+0020-007E,U+00A0-017F,U+2010-2015,U+2018-201E,U+2026" \
  --layout-features='' --no-hinting
```

Pokud bude PDF export potřebovat další znaky (např. při rozšíření na jiný jazyk),
přidej odpovídající Unicode rozsah do `--unicodes` a subset znovu vygeneruj.
