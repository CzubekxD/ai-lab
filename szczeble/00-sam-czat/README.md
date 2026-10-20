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

### Przewidywanie (przed eksperymentem)

Jedno zdanie na punkt, pewność 1-5:

1. Co się stanie, gdy przy temperaturze 0 trzy razy wygeneruję odpowiedź na to samo pytanie?
2. A przy temperaturze 1?
3. A przy temperaturze 2?

### Przebieg

1. **Pamięć karty przed:** Menedżer zadań → Wydajność → GPU. Zapisać zajętą dedykowaną pamięć GPU.
2. **Wczytanie modelu:** GPU Offload na maksimum. Zapisać przyrost pamięci karty.
3. **Temperatura:** prompt
   > Dokończ jednym zdaniem: Najważniejsza zasada Lean to…

   Po 3 generacje przy temperaturze 0, 1 i 2.
4. **Szybkość:** zapisać tokeny na sekundę.

### Wyniki

| | Wartość |
|---|---|
| Pamięć GPU przed | |
| Pamięć GPU po wczytaniu | |
| Tokeny/s | |

| Temperatura | Odpowiedź 1 | Odpowiedź 2 | Odpowiedź 3 |
|---|---|---|---|
| 0 | | | |
| 1 | | | |
| 2 | | | |

### Wnioski

Porównanie z przewidywaniem i z odpowiedzią na D2 z [diagnozy](../../docs/diagnoza.md).

## Materiały

Wideo:
- Andrej Karpathy, *Intro to Large Language Models* — https://www.youtube.com/watch?v=zjkBMFhNj_g
- Andrej Karpathy, *Deep Dive into LLMs like ChatGPT* — https://www.youtube.com/watch?v=7xTGNNLPyMI
- 3Blue1Brown, *But what is a GPT?* — https://www.youtube.com/watch?v=wjZofJX0v4M
- Andrej Karpathy, *Let's build GPT: from scratch, in code, spelled out* (do ćwiczenia z mini-modelem) — https://www.youtube.com/watch?v=kCc8FmEb1nY

Do eksperymentów z tokenami: Tiktokenizer (tiktokenizer.vercel.app). To samo zdanie po polsku i po angielsku, porównać liczbę tokenów.
