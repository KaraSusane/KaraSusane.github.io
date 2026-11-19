# Pismo w Sprawie – strona pismowsprawie.pl (instrukcje dla AI: Codex, Claude i inne)

Strona Karoliny Zdrojek: pisma i analizy prawne, blog, e-booki. Rozmawiamy po polsku.

## Jak to działa
- React 19 + Vite 6 + Tailwind v4. Nie ma routera: `App` dostaje `pathname`, a każda podstrona to osobny plik HTML.
- `npm run build` = `vite build` + `scripts/generate-seo.ts`. Skrypt prerenderuje każdą stronę (pełny HTML, meta, OG, JSON-LD), tworzy `sitemap.xml`, `robots.txt` i `404.html`, a potem usuwa `dist/.vite`. Klient robi `hydrateRoot`.
- Publikacja: push na `main` uruchamia `.github/workflows/deploy-pages.yml` (build, `npm run lint`, `npm test`, GitHub Pages). Cache trwa 10 minut, więc po zmianach odświeżaj przez Cmd+Shift+R.
- Przed commitem uruchom `npm run lint`, `npm run build` i `npm test`. Testy w `tests/site.test.ts` czytają `dist`, więc najpierw build. Na macOS nie ma `timeout`, dlatego: `perl -e 'alarm 240; exec @ARGV' npm test`.

## Dodawanie artykułu (szczegóły i przykład: BLOG-INSTRUKCJA.md)
Tekst artykułu jest oddzielony od metadanych i ładuje się tylko na stronie tego artykułu:
1. **Metadane** (slug, tytuł, seoTitle, excerpt, kategoria, readTime, daty, keywords, okładka): wpis w `src/data/blogPosts.ts`, a przy dłuższym artykule osobny plik w `src/data/` importowany w `blogPosts.ts`. Bez pola `content`.
2. **Tekst**: `src/data/articles/<slug>.ts` z `export default \`...\`;`.
3. **Loader**: jedna linia w `src/data/articleBodies.ts`.
4. **Okładka**: oryginał w `public/` oraz warianty WebP 480/960/pełna w `public/images/`, zarejestrowane w `src/data/responsiveImages.ts`.
   - Przed `cwebp` przekonwertuj zdjęcie do sRGB (PIL ImageCms), bo `cwebp` gubi profil ICC i kolory wychodzą źle.
   - Okładkę zmniejsz do szerokości 1280 px.

Format tekstu: `## ` to nagłówek sekcji (spis treści pojawia się od 4 sekcji), `> ` to przykładowe pismo, `- ` to lista, `**pogrubienie**`. Link `[tekst](/sciezka/)` otwiera się w tej samej karcie, a `[tekst](https://...)` w nowej. Akapit `**Czytaj też:** [..](/blog/../)` linkuje do innych artykułów; dodawaj takie linki wewnętrzne.

Jeśli brakuje tekstu albo loadera, test i build to wyłapią.

## Zasady wyglądu i animacji
- Reszta strony ma czarny motyw. Artykuły, strony prawne i e-book mają jasny „papier” (`.article-paper`, kremowe tło i akcenty w żółtym kolorze marki `#ebc256`).
- Na telefonie tekst jest wyjustowany. Użytkowniczka nie chce tekstu wyrównanego do lewej.
- HTML z serwera zawsze pokazuje stan końcowy. Animacje startują dopiero po hydratacji i respektują `prefers-reduced-motion`.
- Nie ma biblioteki animacji, wszystko robi CSS. Pojawianie się przy przewijaniu obsługują `ScrollReveal` i `useRevealOnce`: sprawdzają pozycję przy scrollu, a nie przez IntersectionObserver, żeby działał też przycisk „wstecz”.
- W stopce nie umieszczaj danych działalności.
- Czysty CSS spoza warstw w `src/index.css` nadpisuje utility Tailwinda.

## Treści
- FAQ: Pismo w Sprawie nie jest kancelarią adwokacką ani radcowską.
- Nota prawna: „własność działalności nierejestrowanej”.
- Kontakt i TikTok są w `src/data/site.ts`.

## Pliki
- `AGENTS.md` (ten plik) to jedyne źródło instrukcji. `CLAUDE.md` tylko go importuje.
- Nie commituj ignorowanych plików: kopii zapasowych `backup-strony-*.zip`, folderu `private-ebook-settings/`, `JAK-WYSYLAC-NA-GITHUB.txt`, `.env*` ani lokalnych ustawień narzędzi.
