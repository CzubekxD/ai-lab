# Diagnoza startowa

Tydzień 0, 2026-10-20. Odpowiedzi bez googlowania i bez pytania modeli. Ten sam test powtarzam w tygodniu 4 i 16.

## Profil

**Builder z silną intuicją i ludzkim modelem mentalnym LLM.** Mocne strony: orkiestracja w n8n, dekompozycja problemu, prompty strukturalne, zasada „kod liczy fakty, model daje styl".

Dwie główne białe plamy:
1. **Antropomorfizacja modelu** („jak człowiek: niewyspany, zmyśla, dochodzi do nowych wniosków"). Jedna plama, która tłumaczy błędy w D2, D3 i D9.
2. **Brak instrumentów pomiarowych:** budowanie bez metrologii.

| Obszar | Poziom 0-3 | Dowód |
|---|---|---|
| Orkiestracja (n8n, dekompozycja) | 2,5 | architektura digestu |
| Prompting strukturalny | 2,5 | prompty digestu i syntezy |
| Agenty (pojęcie) | 1,5 | D5 |
| Mechanika (tokeny, sampling, bezstanowość, kontekst) | 1 | D1, D2 |
| Granice modelu (halucynacje, sycophancy) | 1 | D3 |
| Modele rozumujące a CoT | 0,5 | D9 |
| Ewaluacja | 0,5 | D4 |
| Structured outputs i tool calling | 0,5 | D8 |
| Bezpieczeństwo | 0,5 | D6 |
| RAG i embeddingi | 0 | D7 |
| Czytanie kodu | ? | do sprawdzenia |

## Pytania i wyniki

**D1. Czym jest token? Dlaczego limity liczą się w tokenach? Co po przekroczeniu okna kontekstu?**
Częściowo. Token jako jednostka i „waluta" — trafne. Brakowało: polski zużywa więcej tokenów niż angielski; po przekroczeniu okna API zwraca błąd, a czaty po cichu ucinają najstarsze wiadomości.

**D2. Co zmienia `temperature: 0.3`? Dlaczego przy 0 odpowiedzi mogą się różnić?**
Luka w modelu mentalnym. Temperatura spłaszcza albo wyostrza rozkład prawdopodobieństwa następnego tokenu. Przy 0 różnice biorą się z infrastruktury (obliczenia równoległe na GPU, przetwarzanie wsadowe), a nie ze „stanu" modelu. Wagi są zamrożone, każde wywołanie zaczyna od zera.

**D3. Dlaczego model halucynuje (mechanizm)?**
Częściowo. „Zbyt pomocny" to celna obserwacja, ale osobne zjawisko (sycophancy). Rdzeń: model jest trenowany do generowania tekstu prawdopodobnego, nie prawdziwego; nie ma wbudowanego „wiem / nie wiem"; trening częściej nagradza zgadywanie niż wstrzymanie się.

**D4. Jak sprawdzam, czy zmiana promptu poprawiła wynik?**
Luka. „Bardziej mi odpowiada" to ocena na oko. Eval = MSA i SPC dla promptów: stały zestaw wejść, rubryka, porównanie wersji na tych samych danych.

**D5. Workflow z LLM a agent? Czy Marvin jest agentem?**
Trafione. Doprecyzowanie: agent to model w pętli, który sam wybiera narzędzia i sam decyduje, kiedy skończyć. Marvin i digest to workflowy, i dobrze.

**D6. Prompt injection i gdzie moje workflowy czytają niekontrolowaną treść?**
Luka. Model nie odróżnia danych od poleceń. Radar ofert czyta maile z zewnątrz; ryzyko rośnie z każdym narzędziem, które model dostaje.

**D7. Narzędzie „zapytaj nasze dokumenty". Co to embeddingi?**
Luka. RAG: dokumenty dzielone na fragmenty, fragmenty i pytanie zamieniane na wektory znaczenia, wyszukanie najbliższych, wklejenie tylko ich do promptu.

**D8. Jak wymusić poprawny JSON?**
Luka. Structured outputs: schemat JSON w parametrach API (Gemini `responseSchema`, tryb JSON w Groq), model nie może wygenerować niczego spoza schematu.

**D9. Kiedy „myśl krok po kroku" jest zbędne albo szkodzi?**
Błąd („nigdy nie szkodzi"). Dla modeli rozumujących wytyczne OpenAI zalecają unikać promptów CoT. Badanie „Mind Your Step (by Step)" (Liu i in., arXiv 2410.21333) pokazuje spadki do 36 pkt proc. w zadaniach, w których werbalne myślenie szkodzi też ludziom.
