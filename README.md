# ai-lab

Moja ścieżka od power usera do eksperta AI. Nauka dla samej nauki: liczy się to, co umiem zrozumieć, zmierzyć i zbudować.

**Gdzie jestem teraz:** [STAN.md](STAN.md)

## Jak to działa

**Drabina klocków.** Na każdym szczeblu dokładam jedno narzędzie i sprawdzam, co nagle staje się możliwe. Każdy szczebel przerabiam w dwóch ekosystemach: Claude i Gemini.

Każdy szczebel ma ten sam rytm:

| Element | Pytanie |
|---|---|
| Co odblokowuje | Co mogę zbudować, czego wcześniej nie mogłem? |
| Wow | Jedna rzecz, która to pokazuje. |
| Pod maską | Jaki fundament tu wychodzi i jak to działa w środku? |
| Red team | Jak to się psuje albo jak to złamać? |
| Ściana | Gdzie jest granica? To powód, żeby dołożyć następny klocek. |

**Zjawisko przed teorią.** Najpierw eksperyment, który zaskakuje, potem teoria, która tłumaczy, dlaczego tak się stało.

**Przewidywanie przed eksperymentem.** Przed każdym ćwiczeniem zapisuję, co się stanie, i pewność od 1 do 5. Potem porównuję z wynikiem.

**Czas.** Minimum to rdzeń, około 3 h tygodniowo. Bazowo 7 h. Więcej czasu oznacza dodatkowe tory i szybkie strzały (30-90 min), a nie szybsze przechodzenie rdzenia.

**Przegląd tygodnia: Toyota Kata.** Gdzie chcę być? Gdzie jestem? Co mnie blokuje? Jaki następny eksperyment? Kiedy zobaczę wynik?

**Kod.** Kod napisany przez AI trafia do użycia dopiero wtedy, gdy umiem własnymi słowami wyjaśnić jego logikę. Wyjątek: słowo **SPIKE**. Wtedy kod idzie od razu, workflow dostaje tag `spike`, a w repo powstaje issue „zrozumieć albo wyrzucić".

**Ocena nie przez siebie samego:**
- wynik obiektywny: działa albo nie, eval daje liczbę,
- zewnętrzne testy z kursów,
- inny model jako ślepy sędzia,
- raz na fazę sesja na klubie dyskusyjnym: jeśli nie umiem tego wytłumaczyć ludziom spoza tematu, to tego nie umiem.

**Pomiar postępu.** Test diagnostyczny D1-D9 ([docs/diagnoza.md](docs/diagnoza.md)) powtarzam w tygodniu 4 i 16.

## Drabina

| # | Klocek | Claude | Gemini | Ściana |
|---|---|---|---|---|
| 0 | Sam czat | aplikacja Claude | aplikacja Gemini (Flash, Myślący, Pro) | nie widzi moich danych, nie pamięta |
| 1 | Pliki i źródła | upload, wyszukiwanie, Research | upload, Deep Research, NotebookLM | wszystko jednorazowe |
| 2 | Konfiguracja i małe aplikacje | Projects, skille, pamięć, artefakty | Gemy, Canvas, Opal | wciąż ja klikam |
| 3 | Arkusz | connector Google Sheets, artefakt-arkusz | `=AI()`, Gemini w panelu | uruchamiam ręcznie |
| 4 | Cały Workspace | connectory Gmail, Kalendarz, Dysk; zadania zaplanowane | Gemini w Workspace, Workspace Studio | logika bez kodu się kończy |
| 5 | Skrypty | środowisko z Pythonem, artefakty z danymi | Apps Script (+ Vertex AI), Colab | wszystko zamknięte w jednym ekosystemie |
| 6 | Automatyzacja | n8n + Claude API | n8n + Gemini API, webhooki ze Studio | decyzje zaszyte w kodzie |
| 7 | Kod i GitHub | Claude Code | Antigravity, Jules, AI Studio Build | model w cudzej chmurze |
| 8 | Agenty i narzędzia | MCP, Claude in Chrome, Agent SDK | Managed Agents, Antigravity SDK, agenci w Studio | brak pełnej kontroli nad modelem |
| 9 | Własny model | nie istnieje (brak otwartych wag) | Gemma: lokalnie i z fine-tuningiem | koniec drabiny |

Lokalny model pojawia się już na szczeblu 0 jako mikroskop (tokeny, prawdopodobieństwa, temperatura). Na szczeblu 9 wraca jako pełne narzędzie.

**Projekt końcowy** wybieram po około 12 tygodniach. Może być prywatny, zawodowy albo dowolny. Kandydat: „maszyna do nauki", czyli system, który sam dobiera mi kolejne lekcje na podstawie luk.

## Struktura repo

```
README.md          zasady i drabina
STAN.md            gdzie jestem, co otwarte, następny krok
docs/
  decyzje.md       wszystkie ustalenia z rozmowy startowej
  diagnoza.md      test startowy D1-D9 i profil
  infrastruktura.md sprzęt, laboratorium, lekcje z konfiguracji
szczeble/
  00-sam-czat/     szczebel 0: ćwiczenia, materiały, test
```

## Zasady repo

- Zero danych firmowych.
- Zero sekretów: kluczy API, URL-i webhooków, adresów prywatnej sieci.
- Zero plików modeli (`.gguf` i podobne są w `.gitignore`).
