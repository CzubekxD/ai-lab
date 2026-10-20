# Szczebel 0: sam czat

| Element | Treść |
|---|---|
| Co odblokowuje | myślenie, pisanie, analiza wklejonego tekstu |
| Wow | lokalny model rozpada się na oczach przy temperaturze 2 |
| Pod maską | tokeny, okno kontekstu, sampling, bezstanowość, halucynacje |
| Red team | sycophancy, zmyślone źródła |
| Ściana | model nie widzi moich danych i nie pamięta |

## Ćwiczenie 0.1: temperatura

**Narzędzie:** LM Studio na PC, model Gemma 4 E4B.

### Prompty

To, jak bardzo temperatura zmienia wynik, zależy od tego, jak mocno prompt zawęża odpowiedź. Dlatego trzy prompty o różnym zakotwiczeniu:

| | Prompt | Zakotwiczenie |
|---|---|---|
| A | `Ile to jest 17 × 23? Odpowiedz samą liczbą.` | silne: jedna poprawna odpowiedź (391) |
| B | `Dokończ jednym zdaniem: Najważniejsza zasada Lean to…` | średnie: kilka sensownych odpowiedzi |
| C | `Napisz jednozdaniową ciekawostkę o kawie.` | luźne: praktycznie nieskończenie wiele odpowiedzi |

### Przewidywanie (przed eksperymentem)

Dla każdego promptu: co zobaczę w 3 generacjach przy temperaturze 0, 1 i 2? Po jednym zdaniu na temperaturę, pewność 1-5. Odpowiedzi w notatniku (P1-P3).

### Przebieg

1. **Pamięć karty przed:** Menedżer zadań → Wydajność → GPU. Zapisać zajętą dedykowaną pamięć GPU.
2. **Wczytanie modelu:** GPU Offload na maksimum. Zapisać przyrost pamięci karty.
3. **Temperatura:** każdy prompt (A, B, C) po 3 generacje przy temperaturze 0, 1 i 2. Każda generacja w nowym czacie albo przez regenerację, żeby poprzednia odpowiedź nie trafiała do kontekstu.
4. **Szybkość:** zapisać tokeny na sekundę.

### Wyniki

| | Wartość |
|---|---|
Przebieg 2026-10-20. Model: Gemma 4 E4B (Q4_K_M) w LM Studio 0.4.26, RTX 2070 SUPER. Filtry domyślne: Top K 64, Repeat Penalty 1.1, Top P 0.95, Min P 0.05. Każda próba w nowym czacie.

| Prompt | T=0 | T=1 | T=2 | Przewidywanie (pewność) |
|---|---|---|---|---|
| A: 17 × 23 | „391" ×3 | „391" ×3 | „391" ×3 | opowie o liczeniu (5) — nietrafione |
| B: zasada Lean | zbliżone odpowiedzi | zbliżone | zbliżone | rozpisze się, przy T=2 dziwnie (4) — nietrafione |
| C: kawa | zwykle 3 zdania | prawie jak T=0 | bajdurzenie | przy T=2 dziwnie (5) — trafione częściowo |

Szybkość przy A: około 34 tokenów/s.

**Thinking w B:** model zaczynał myśleć przy T=0 w 3/3 próbach, przy T=1 w 2/3, przy T=2 w 1/3. Hipoteza: decyzja o myśleniu to losowany pierwszy token. Za mało prób, żeby to stwierdzić.

**Bonus, T=2 bez filtrów (Min P 0, Top P 1, Top K 0):**
- A: „1畐ামান縛総ルジク ɔ" — od razu znaki z kilku pism.
- C: długi tekst z polskopodobnych słów z pojedynczymi wtrąceniami obcych pism; język trzyma się dłużej niż przy A.

### Wnioski

**Moje (z pamięci):** Sterowanie Top K/P jest ważniejsze niż temperatura. To ono odpowiada za to, jak model nam odpowie. Sama temperatura przy mocnym kotwiczeniu daje dużą pewność.

**Uwagi Claude:**
- Temperatura i filtry to interakcja dwóch czynników, a nie jeden ważniejszy od drugiego. Z filtrami T=2 rozbiło tylko C; bez filtrów T=2 rozbiło nawet A; przy T=0 filtry nie mają znaczenia. Filtry decydują, którzy kandydaci w ogóle wchodzą do losowania, temperatura — jak równo się między nimi losuje. Przy wysokiej temperaturze kluczowy okazał się Min P.
- Co model odpowie, decyduje przede wszystkim rozkład, czyli model razem z promptem. Ustawienia losowania mają znaczenie tylko tam, gdzie model jest niepewny.
- Pewność daje zakotwiczenie, nie temperatura. Przy mocnym zakotwiczeniu temperatura (w zakresie z filtrami) po prostu nie ma czego zmieniać.
- Zakotwiczenie zależy od modelu, nie tylko od promptu: B okazało się dla tego modelu prawie tak silne jak A.
- Temperatura steruje przypadkowością, nie posłuszeństwem: „samą liczbą" działało, „jednym zdaniem" nie, niezależnie od temperatury.
- Rozpad ma kolejność: sens, gramatyka, język, pismo. Forma siedzi w modelu głębiej niż treść — to mechanizm halucynacji.

**Kalibracja:** pewność 5, 4, 5 przy jednym częściowym trafieniu.

## Materiały

Wideo:
- Andrej Karpathy, *Intro to Large Language Models* — https://www.youtube.com/watch?v=zjkBMFhNj_g
- Andrej Karpathy, *Deep Dive into LLMs like ChatGPT* — https://www.youtube.com/watch?v=7xTGNNLPyMI
- 3Blue1Brown, *But what is a GPT?* — https://www.youtube.com/watch?v=wjZofJX0v4M
- Andrej Karpathy, *Let's build GPT: from scratch, in code, spelled out* (do ćwiczenia z mini-modelem) — https://www.youtube.com/watch?v=kCc8FmEb1nY

Do eksperymentów z tokenami: Tiktokenizer (tiktokenizer.vercel.app). To samo zdanie po polsku i po angielsku, porównać liczbę tokenów.
