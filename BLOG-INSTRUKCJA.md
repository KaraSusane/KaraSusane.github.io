# Jak dodać artykuł

Artykuły znajdują się w pliku `src/data/blogPosts.ts`. Skopiuj jeden cały obiekt wpisu,
wklej go na początku listy i zmień poniższe pola:

```ts
{
  slug: 'krotki-adres-artykulu-bez-polskich-znakow',
  title: 'Tytuł artykułu',
  excerpt: 'Krótki opis widoczny na kafelku bloga.',
  category: 'Kategoria',
  readTime: '6 min',
  publishedAt: '2026-08-10',
  keywords: ['główne słowo kluczowe', 'drugie słowo kluczowe'],
  coverImage: '/nazwa-zdjecia.jpg',
  coverAlt: 'Opis zdjęcia dla Google i czytników ekranu',
  coverWidth: 1280,
  coverHeight: 853,
  content: `Treść artykułu.

## Tytuł kolejnej części

Kolejny akapit. **Ten fragment będzie pogrubiony.**`,
},
```

Zdjęcie dodaj do folderu `public`. Jeżeli nie podasz `coverImage`, strona użyje
zdjęcia Karoliny.

Kategorię wybierz z `src/data/blogCategories.ts`. Każda ma własną podstronę
i trafia do mapy witryny. Dodając nową kategorię, uzupełnij jej nazwę, adres,
opis, akapity wprowadzające i datę utworzenia/aktualizacji.

Opcjonalne `seoTitle` ustawia bardziej opisowy tytuł dla wyszukiwarki, bez zmiany
widocznego nagłówka artykułu. Po merytorycznej zmianie treści lub bibliografii
dodaj `updatedAt: 'RRRR-MM-DD'`. Nie zmieniaj `publishedAt` ani nie aktualizuj
daty tylko dlatego, że ponownie budujesz stronę. Data aktualizacji będzie widoczna
w artykule, danych strukturalnych i mapie witryny.

Linki zapisuj jako `[opis źródła](https://adres-strony)`, a nagłówki jako `## Tytuł`.
Podaj rzeczywiste wymiary zdjęcia w `coverWidth` i `coverHeight`.
Wersje WebP zdjęć znajdują się w `public/images`, a ich zestawy rozmiarów
w `src/data/responsiveImages.ts`. Przy nowym zdjęciu przygotuj odpowiednie
warianty i dopisz zestaw; oryginał pozostaje zapasem dla przeglądarek bez WebP.

Po zapisaniu i wysłaniu zmian do GitHuba workflow automatycznie:

- tworzy osobny plik HTML artykułu,
- dodaje tytuł, opis i adres kanoniczny,
- dodaje dane `BlogPosting` dla Google,
- dopisuje artykuł do `sitemap.xml`.

Lokalnie sprawdź wynik poleceniami `npm run lint`, `npm run build`, `npm test`.
