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
  content: `Treść artykułu.

Tytuł kolejnej części

Kolejny akapit. **Ten fragment będzie pogrubiony.**`,
},
```

Zdjęcie dodaj do folderu `public`. Jeżeli nie podasz `coverImage`, strona użyje
zdjęcia Karoliny.

Po zapisaniu i wysłaniu zmian do GitHuba workflow automatycznie:

- tworzy osobny plik HTML artykułu,
- dodaje tytuł, opis i adres kanoniczny,
- dodaje dane `BlogPosting` dla Google,
- dopisuje artykuł do `sitemap.xml`.

Lokalnie możesz sprawdzić wynik poleceniem `npm run build`.
