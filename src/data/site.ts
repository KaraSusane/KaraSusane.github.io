import { blogPosts } from './blogPosts';
import { legalPages } from './legalPages';

export const siteUrl = 'https://pismowsprawie.pl';
export const siteName = 'Pismo w Sprawie';
export const authorName = 'Karolina Zdrojek';
export const contactEmail = 'pismowsprawie@gmail.com';
export const tiktokUrl = 'https://www.tiktok.com/@pismowsprawie?_r=1&_t=ZN-97Er7B8gTdW';
export const defaultCover = '/karolina-zdrojek.jpg';
export const mailto = (subject?: string) => `mailto:${contactEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
export const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
export const pageUrl = (path: string) => `${siteUrl}${normalizePath(path) === '/' ? '/' : `${normalizePath(path)}/`}`;

export const navItems = [
  { label: 'Usługi', href: '/uslugi/' },
  { label: 'O mnie', href: '/o-mnie/' },
  { label: 'Praktyka', href: '/praktyka/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export type PageMetadata = {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
};

export const standardPages: Record<string, PageMetadata> = {
  '/': { title: 'Prawne wsparcie i precyzyjne pisma prawne', description: 'Pisma prawne, wezwania, odwołania, analiza umów i doradztwo prawne przygotowane jasno, konkretnie i z myślą o realnym celu Twojej sprawy.' },
  '/uslugi': { title: 'Usługi prawne i cennik - pisma, umowy, doradztwo', description: 'Sprawdź zakres usług i cennik Pismo w Sprawie: sporządzanie pism prawnych, wezwań, odwołań, opiniowanie i tworzenie umów oraz doradztwo prawne.' },
  '/o-mnie': { title: 'O mnie - Karolina Zdrojek, prawnik', description: 'Karolina Zdrojek - prawnik i założycielka Pismo w Sprawie. Specjalizacja w prawie medycznym, obsłudze dokumentacji prawnej i analizie umów.' },
  '/praktyka': { title: 'Obszary praktyki - prawo medyczne, spadkowe, umowy', description: 'Obszary praktyki Pismo w Sprawie: prawo medyczne, prawo beauty, nieruchomości, prawo spadkowe, prawo rolne, prawo karne oraz mediacje.' },
  '/blog': { title: 'Blog prawny - prawo w życiu codziennym', description: 'Praktyczne artykuły i analizy prawne: prawo medyczne, prawa pacjenta, RODO, rękojmia przy zakupie auta, dziedziczenie ustawowe i mediacje.' },
  '/kontakt': { title: 'Kontakt - bezpłatna analiza i wycena sprawy', description: `Opisz swoją sprawę i otrzymaj bezpłatną wycenę oraz termin realizacji. Skontaktuj się mailowo z Pismo w Sprawie: ${contactEmail}.` },
  ...Object.fromEntries(Object.entries(legalPages).map(([path, page]) => [path, { title: page.title, description: page.intro }])),
};

export function getPageMetadata(pathname: string): PageMetadata {
  const path = normalizePath(pathname);
  const standard = standardPages[path];
  if (standard) return standard;
  const post = blogPosts.find(post => path === `/blog/${post.slug}`);
  if (post) return { title: post.title, description: post.excerpt, image: post.coverImage };
  return { title: 'Nie znaleziono strony', description: 'Ten adres nie istnieje. Przejdź na stronę główną Pismo w Sprawie.', noindex: true };
}
