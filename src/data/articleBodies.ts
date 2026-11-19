// Article text lives in src/data/articles/<slug>.ts and is downloaded only on that article's page,
// so the shared bundle carries just the metadata from blogPosts.ts. A new article needs an entry here.
const loaders: Record<string, () => Promise<{ default: string }>> = {
  'wezwanie-do-zaplaty-faktury-wzor': () => import('./articles/wezwanie-do-zaplaty-faktury-wzor'),
  'jak-napisac-pismo-w-sprawie': () => import('./articles/jak-napisac-pismo-w-sprawie'),
  'o-prawie-do-intymnosci-i-godnosci-w-szpitalu': () => import('./articles/o-prawie-do-intymnosci-i-godnosci-w-szpitalu'),
  '10-bledow-stosowania-przepisow-rodo-w-praktyce': () => import('./articles/10-bledow-stosowania-przepisow-rodo-w-praktyce'),
  'auto-po-zakupie-okazalo-sie-mina-co-moze-zrobic-kupujacy': () => import('./articles/auto-po-zakupie-okazalo-sie-mina-co-moze-zrobic-kupujacy'),
  'najtaniej-jest-wyrwac': () => import('./articles/najtaniej-jest-wyrwac'),
  'klauzula-sumienia-lekarza-kiedy-mozna-odmowic-wykonania-swiadczenia': () => import('./articles/klauzula-sumienia-lekarza-kiedy-mozna-odmowic-wykonania-swiadczenia'),
  'dziedziczenie-ustawowe-kto-dostaje-spadek-gdy-nie-ma-testamentu': () => import('./articles/dziedziczenie-ustawowe-kto-dostaje-spadek-gdy-nie-ma-testamentu'),
  'mediacja-a-sprawa-w-sadzie-dwie-drogi-rozwiazywania-sporu': () => import('./articles/mediacja-a-sprawa-w-sadzie-dwie-drogi-rozwiazywania-sporu'),
  'prawo-pierwokupu-kowr-przy-sprzedazy-nieruchomosci-rolnej': () => import('./articles/prawo-pierwokupu-kowr-przy-sprzedazy-nieruchomosci-rolnej'),
};

const loaded = new Map<string, string>();

export const articleBodySlugs = Object.keys(loaders);

export const articleSlugFromPath = (pathname: string) => {
  const slug = pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  return slug && slug in loaders ? slug : undefined;
};

export async function loadArticleBody(slug: string) {
  const cached = loaded.get(slug);
  if (cached !== undefined) return cached;
  const load = loaders[slug];
  if (!load) throw new Error(`Brak treści artykułu: ${slug}`);
  const body = (await load()).default;
  loaded.set(slug, body);
  return body;
}

// Already downloaded text, available synchronously so prerendered HTML hydrates without a flash.
export const articleBody = (slug: string) => loaded.get(slug);
