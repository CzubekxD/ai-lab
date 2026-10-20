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
| Pamięć GPU przed | |
| Pamięć GPU po wczytaniu | |
| Tokeny/s | |

| Prompt | Temperatura | Odpowiedź 1 | Odpowiedź 2 | Odpowiedź 3 |
|---|---|---|---|---|
| A | 0 | | | |
| A | 1 | | | |
| A | 2 | | | |
| B | 0 | | | |
| B | 1 | | | |
| B | 2 | | | |
| C | 0 | | | |
| C | 1 | | | |
| C | 2 | | | |

### Wnioski

Porównanie z przewidywaniem i z odpowiedzią na D2 z [diagnozy](../../docs/diagnoza.md).

## Materiały

Wideo:
- Andrej Karpathy, *Intro to Large Language Models* — https://www.youtube.com/watch?v=zjkBMFhNj_g
- Andrej Karpathy, *Deep Dive into LLMs like ChatGPT* — https://www.youtube.com/watch?v=7xTGNNLPyMI
- 3Blue1Brown, *But what is a GPT?* — https://www.youtube.com/watch?v=wjZofJX0v4M
- Andrej Karpathy, *Let's build GPT: from scratch, in code, spelled out* (do ćwiczenia z mini-modelem) — https://www.youtube.com/watch?v=kCc8FmEb1nY

Do eksperymentów z tokenami: Tiktokenizer (tiktokenizer.vercel.app). To samo zdanie po polsku i po angielsku, porównać liczbę tokenów.
