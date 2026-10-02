# Pismo w Sprawie

Statyczna strona oparta o `Vite` i `React`, przygotowana do wdrozenia na `GitHub Pages`.

## Uruchomienie lokalne

1. Zainstaluj zaleznosci:
   `npm install`
2. Uruchom serwer deweloperski:
   `npm run dev`

## Build produkcyjny

Zbuduj projekt poleceniem:

`npm run build`

Gotowe pliki trafiaja do katalogu `dist/`.

## Sprawdzenie zmian

Po zbudowaniu projektu uruchom `npm run lint` i `npm test`.
Testy sprawdzaja m.in. linki wewnetrzne, naglowki, metadane i zachowanie strony 404.
GitHub Actions wykonuje te kontrole przed publikacja strony.

Dane kontaktowe, nawigacja i metadane podstron maja jedno zrodlo w `src/data/site.ts`.
Aktualna oferta znajduje sie w `src/data/services.ts`.

## Deployment na GitHub Pages

Projekt ma juz przygotowany workflow w `.github/workflows/deploy-pages.yml`.

1. Wrzuć projekt do repozytorium GitHub.
2. W `Settings -> Pages` ustaw `Source: GitHub Actions`.
3. Wypchnij zmiany na branch `main`.
4. GitHub sam zbuduje i opublikuje strone.

## Uwagi bezpieczenstwa

- Nie wrzucaj plikow `.env`.
- Nie wrzucaj kluczy API ani danych prywatnych klientow.
- `dist/` i `node_modules/` nie sa potrzebne w repozytorium.
