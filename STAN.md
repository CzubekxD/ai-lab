# Stan

Aktualizacja: 2026-10-20

## Teraz

Szczebel 0, ćwiczenie 0.1 (temperatura) na lokalnym modelu w LM Studio. Opis: [szczeble/00-sam-czat/README.md](szczeble/00-sam-czat/README.md).

- [x] LM Studio 0.4.26 zainstalowane na PC, tryb Developer włączony, usługa przy logowaniu wyłączona
- [x] Przyczyna błędu pobierania z Hugging Face znaleziona: Kaspersky skanuje połączenia szyfrowane
- [ ] Pobrać Gemma 4 E4B (Q4_K_M) — w trakcie
- [ ] Pobrać Qwen3 4B (Q4_K_M)
- [ ] Wznowić ochronę Kaspersky'ego po pobraniu
- [ ] Zapisać przewidywania i wykonać ćwiczenie 0.1

## Otwarte decyzje

- **Q17:** jaki plan Google na prywatnym koncie? Od tego zależy, czy `=AI()` i Workspace Studio przećwiczę też w domu.
- **Q20:** przypadek przewodni przez całą drabinę. Rekomendacja: digest AI z n8n. Alternatywa: budżet domowy od paragonu po agenta.

## Do zrobienia: infrastruktura

- [ ] **Serwer, krok A1** (na żywo, bez restartu): obniżyć limit RAM kontenera excellence-news do 2 GB i zmierzyć, ile pamięci hosta trzyma VM Home Assistanta. Komendy w [docs/infrastruktura.md](docs/infrastruktura.md).
- [ ] **Serwer, krok A2** (po wyniku A1, wymaga restartu HA): ewentualnie obniżyć przydział HA do 3 GB.
- [ ] **Kaspersky:** wykluczyć domeny ze skanowania połączeń szyfrowanych: `huggingface.co`, `hf.co`, `lmstudio.ai` (i `*.huggingface.co`, `*.hf.co`, jeśli przyjmuje gwiazdki).
- [ ] **Rozważyć:** druga kość 8 GB DDR4-2666 SO-DIMM do serwera (16 GB i tryb dwukanałowy).

## Do zrobienia: bezpieczeństwo n8n

- [ ] Klucze API (Groq, Gemini) przenieść z parametrów węzłów do n8n Credentials.
- [ ] Webhook `/deep` zabezpieczyć (Header Auth albo sekret w zapytaniu). n8n jest publiczny przez Tailscale Funnel.
- [ ] Włączyć MFA w n8n.

## Do zrobienia: digest v2

Specyfikacja w [docs/decyzje.md](docs/decyzje.md#digest-v2). Potrzebne ode mnie przed budową:
- [ ] nowy kanał i webhook na Discordzie,
- [ ] Credential Groq w n8n.

## Do zrobienia: repo

- [ ] Tablica GitHub Projects (Kanban, limit WIP 2) i lekcje jako issues.
