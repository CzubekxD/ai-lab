# Infrastruktura

## Serwer domowy

Lenovo ThinkCentre M720q z Proxmox VE.

- **CPU:** Intel Core i5-9500T, 6 rdzeni, AVX2.
- **RAM:** 8 GB, jedna kość w kanale A, kanał B pusty (pamięć jednokanałowa).
- **Goście:** Home Assistant OS (VM, przydział 4 GB), n8n (LXC, 2 GB), excellence-news (LXC, 4 GB).

**Stan na 2026-10-20:** przydziały 10 GB na 7,6 GiB fizycznie, host w swapie (1,2 GB). Realne zużycie: n8n ~650 MB, excellence-news ~800 MB, HA w środku ~2,6 GB.

**Lekcja:** w kontenerach LXC przydział RAM to limit, a nie rezerwacja. Maszyna wirtualna zajmuje na hoście pamięć, którą system w środku dotknął (także na cache), więc VM bywa prawdziwym pożeraczem RAM-u.

**Decyzja:** na serwerze nie stawiamy lokalnego modelu, tylko odchudzamy przydziały.

### Krok A1 (na żywo, bez restartu)

```bash
pct set 102 --memory 2048
ps -C kvm -o rss= | awk '{printf "HA na hoście: %.0f MB\n", $1/1024}'
free -h
```

### Krok A2 (po wyniku A1)

Jeśli VM HA trzyma na hoście blisko 4 GB: obniżyć jej przydział do 3 GB. Wymaga restartu HA.

### Rozbudowa (do rozważenia)

Druga identyczna kość 8 GB DDR4-2666 SO-DIMM: 16 GB i tryb dwukanałowy, czyli większa przepustowość pamięci (ważne dla modeli liczonych na CPU).

## PC (laboratorium lokalnych modeli)

- **CPU:** Intel Core i9-9900KF.
- **RAM:** 32 GB.
- **GPU:** NVIDIA GeForce RTX 2070 SUPER, 8 GB VRAM.
- **System:** Windows 10 Pro 22H2. Od października 2025 bez darmowych poprawek bezpieczeństwa; do przemyślenia przed wystawieniem modelu w sieci (szczebel 6).

| Rozmiar modelu (Q4) | Na tym PC | Zastosowanie |
|---|---|---|
| 1-4B | cały w VRAM, błyskawicznie | mikroskop: tokeny, temperatura |
| 7-8B | cały w VRAM, szybko | testy, podpięcie pod n8n |
| 12-14B | część warstw w RAM, wolniej | porównania jakości |
| fine-tuning LoRA | małe modele 1-3B | szczebel 9 |

### LM Studio

- Wersja 0.4.26. Tryb Developer włączony. Usługa przy logowaniu wyłączona (włączymy na szczeblu 6). LM Link pominięty.
- Modele: Gemma 4 E4B i Qwen3 4B, wariant Q4_K_M, od oficjalnego wydawcy albo `lmstudio-community`.

### Lekcja: Kaspersky a pobieranie modeli

Objaw: przeglądarka łączy się z Hugging Face, LM Studio nie. Przyczyna potwierdzona testem izolującym (wstrzymanie ochrony → działa): Kaspersky skanuje szyfrowany ruch HTTPS, podstawiając własny certyfikat, którego LM Studio nie uznaje.

- Wyjątek dla aplikacji nie zadziałał, prawdopodobnie dlatego, że pobieraniem zajmuje się osobny proces pomocniczy.
- Docelowo: wykluczenie domen ze skanowania połączeń szyfrowanych: `huggingface.co`, `hf.co`, `lmstudio.ai` (oraz `*.huggingface.co`, `*.hf.co`).
- Zasada: wyjątek zamiast wyłączania ochrony (najmniejsze uprawnienia).
- Lista „Dozwolone aplikacje" w zaporze Windows dotyczy połączeń przychodzących; pobieranie to ruch wychodzący, domyślnie przepuszczany.
