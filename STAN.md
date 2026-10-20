# Stan

Aktualizacja: 2026-10-20, koniec dnia 1

## Gdzie jestem

Szczebel 0 (sam czat). Ćwiczenie 0.1 (temperatura) zrobione — wyniki i wnioski w [szczeble/00-sam-czat/README.md](szczeble/00-sam-czat/README.md).

**Notatnik** (pytania do mnie, zadania, notatki): artefakt „Notatnik ai-lab" na claude.ai, prywatny — https://claude.ai/artifact/Q3RC4omQKDzfvRDut2nkbv. Claude czyta i zapisuje go przez bazę artefaktu (kolekcje `pytania`, `zadania`, `notatki`).

## Następny krok

**Ćwiczenie 0.2: kiedy model myśli.** Hipoteza z ćwiczenia 0.1: decyzja „myśleć czy nie" to losowany pierwszy token, więc przy wyższej temperaturze model rzadziej zaczyna myśleć (Gemma 4 E4B, prompt B: T=0 3/3, T=1 2/3, T=2 1/3). Pomiar: Qwen3 4B, po 10 prób na temperaturę 0, 1 i 2, liczymy proporcję prób z myśleniem. Przed startem: przewidywanie z pewnością.

## Otwarte pytania (w notatniku)

- **Q17:** plan Google na prywatnym koncie.
- **Q20:** przypadek przewodni przez drabinę (digest czy budżet domowy).
- **Q22:** czy w pracy jest dostęp do Claude.
- **Q13:** czy wysłać uczestnikom szkolenia aktualizację o modelach rozumujących.

## Do zrobienia: laboratorium

- [x] LM Studio 0.4.26 na PC (tryb Developer, bez usługi przy logowaniu)
- [x] Gemma 4 E4B (Q4_K_M) pobrana
- [ ] Qwen3 4B (Q4_K_M)
- [ ] Wznowić ochronę Kaspersky'ego, jeśli nadal wstrzymana
- [ ] Kaspersky: wykluczyć domeny ze skanowania połączeń szyfrowanych: `huggingface.co`, `hf.co`, `lmstudio.ai` (i `*.huggingface.co`, `*.hf.co`)
- [ ] Sprawdzić stan przycisku Think w LM Studio i trzymać go stałym w pomiarach

## Do zrobienia: infrastruktura

- [ ] **Serwer, krok A1** (na żywo, bez restartu): limit RAM excellence-news do 2 GB i pomiar pamięci VM Home Assistanta. Komendy w [docs/infrastruktura.md](docs/infrastruktura.md).
- [ ] **Serwer, krok A2** (po A1, wymaga restartu HA): ewentualnie przydział HA do 3 GB.
- [ ] **Rozważyć:** druga kość 8 GB DDR4-2666 SO-DIMM do serwera.

## Do zrobienia: n8n

- [ ] Klucze Groq i Gemini do Credentials.
- [ ] Zabezpieczyć webhook `/deep`, włączyć MFA w n8n.
- [ ] Digest v2: nowy kanał i webhook na Discordzie, Credential Groq. Specyfikacja w [docs/decyzje.md](docs/decyzje.md#digest-v2).

## Do zrobienia: repo

- [ ] Tablica GitHub Projects (Kanban, limit WIP 2) i lekcje jako issues.
