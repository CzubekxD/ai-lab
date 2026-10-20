# Decyzje

Ustalenia z rozmowy startowej (2026-10-20). Numery Q odpowiadają kolejnym pytaniom.

## Cel i forma

| # | Decyzja |
|---|---|
| Q1 | Cel: builder i lider AI w operacjach. Uczenie innych to efekt uboczny, nie cel. |
| — | Nauka dla siebie, wartość autoteliczna. Bez LinkedIn, bez celów rekrutacyjnych, bez wdrożeń dla firmy jako miary. |
| Q2 | Około 7 h tygodniowo, nierówno (np. 4 + 3). Minimum ~3 h to sam rdzeń. |
| Q3 | Kod: rozumieć logikę, nie pisać na poziomie produkcyjnym. Nie być „białkowym proxy" dla kodu AI. |
| Q9 | Protokół: wyjaśniam logikę kodu własnymi słowami, zanim trafi do użycia. Furtka: SPIKE (tag `spike` + issue „zrozumieć albo wyrzucić"). |
| Q4, Q7, Q15 | Program żyje w publicznym repo na GitHubie. |
| Q8 | Moduły w folderach, lekcje jako issues, tablica Projects z limitem WIP 2. Testy: pytania otwarte. |
| Q16 | Projekt końcowy otwarty, wybierany po ~12 tygodniach. |

## Struktura programu

- **Drabina klocków** (Q19): od samego czatu po własny model; każdy szczebel w Claude i w Gemini. Szczegóły w [README](../README.md#drabina).
- **Rytm szczebla:** co odblokowuje, wow, pod maską, red team, ściana.
- **Mieszanie efektów wow z nudnymi sesjami.** Zasada: zjawisko przed teorią.
- **Rdzeń, tory i szybkie strzały.** Rdzeń idzie zawsze; więcej czasu to dodatkowe tory (np. Google, Dom, Lab) i krótkie zadania za 30-90 min.
- **Ekosystem (Q6):** pełny Claude (Code, Projects, skille, MCP, API) i pełny inwentarz Google (Gemini, Gemy, NotebookLM, Colab, Apps Script, Workspace Studio, AI Studio, API). Blokady w pracy: ticket z uzasadnieniem albo pomijamy narzędzie.
- **Depth (be-ambitious):** zewnętrzny sędzia zamiast oceniania samego siebie, kalibracja pewności przy odpowiedziach, mini-model trenowany od zera (nanoGPT w Colabie), Toyota Kata jako cotygodniowy przegląd.

## Laboratorium (Q10.1, Q21)

- Główne laboratorium lokalnych modeli: PC z RTX 2070 SUPER (8 GB VRAM).
- Serwer: bez kontenera z modelem; tylko odchudzenie przydziałów RAM.
- Colab do trenowania mini-modelu.
- Narzędzie startowe: LM Studio (widać parametry i użycie karty). Ollama dopiero na szczeblu 6, przy podpięciu pod n8n.
- Bionic (agent od LM Studio) i LM Link: później, przy szczeblach 6 i 8.

## Digest v2

Decyzja Q5 i Q11: osobny workflow w n8n, przez 2 tygodnie równolegle z v1 na osobny kanał Discorda. Porównanie obu wersji to pierwszy eval.

Zmienia się jedna zmienna naraz (jak w DOE): ten sam model i prompt, inne są tylko źródła.

- arXiv → Hugging Face Daily Papers (kuratorowane przez ludzi)
- z kanałów newsowych YouTube zostają 2
- dochodzą źródła o mechanice: Andrej Karpathy (YouTube), Simon Willison, Anthropic Engineering, Hamel Husain i Eugene Yan (evale)
- klucze w Credentials od pierwszego dnia
- structured output testowany osobno, później

## Znalezione problemy w obecnych workflowach

- Klucze API i URL webhooka Discorda wpisane jawnym tekstem w węzłach (świadome ryzyko na darmowym tierze; do poprawy jako nawyk).
- Webhook `/deep` bez autoryzacji, n8n publiczny przez Tailscale Funnel (certyfikaty Funnel trafiają do publicznych rejestrów Certificate Transparency, więc adres da się znaleźć).
- Flow 2: do Gemini wysyłany jest sam URL pracy arXiv bez narzędzia do czytania URL-i, więc model nie widzi treści. Abstrakty są pobierane poprawnie w osobnej gałęzi.
- Zescrapowany HTML trafia prosto do promptu: wektor prompt injection.
- Odpowiedzi to wolny tekst cięty po liniach, bez schematu JSON.
