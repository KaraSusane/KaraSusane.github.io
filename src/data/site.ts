import { blogPosts } from './blogPosts';
import { legalPages } from './legalPages';
import { findBlogCategory } from './blogCategories';
import { findEbook } from './ebooks';

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
  { label: 'E-booki', href: '/e-booki/' },
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
  '/praktyka': { title: 'Obszary praktyki - prawo administracyjne, medyczne, AI i RODO', description: 'Poznaj obszary praktyki Pismo w Sprawie: prawo administracyjne, medyczne, nieruchomości, prawo sztucznej inteligencji, AI Act, RODO oraz mediacje.' },
  '/blog': { title: 'Blog prawny - prawo w życiu codziennym', description: 'Praktyczne artykuły i analizy prawne: prawo medyczne, prawa pacjenta, RODO, rękojmia przy zakupie auta, dziedziczenie ustawowe i mediacje.' },
  '/kontakt': { title: 'Kontakt - bezpłatna analiza i wycena sprawy', description: `Opisz swoją sprawę i otrzymaj bezpłatną wycenę oraz termin realizacji. Skontaktuj się mailowo z Pismo w Sprawie: ${contactEmail}.` },
  '/e-booki': { title: 'E-booki i kursy - publikacje Pismo w Sprawie', description: 'Autorskie publikacje Karoliny Zdrojek. Pobierz praktyczny przewodnik prawny po ochronie danych osobowych w firmie: 66 stron o RODO, przykłady i checklisty.', image: '/ebooks/przewodnik-po-rodo-okladka.webp' },
  ...Object.fromEntries(Object.entries(legalPages).map(([path, page]) => [path, { title: page.title, description: page.intro }])),
};

export function getPageMetadata(pathname: string): PageMetadata {
  const path = normalizePath(pathname);
  const standard = standardPages[path];
  if (standard) return standard;
  const ebook = findEbook(path);
  if (ebook) return { title: ebook.seoTitle, description: ebook.seoDescription, image: ebook.cover };
  const category = findBlogCategory(path);
  if (category) return { title: `${category.name} - artykuły i praktyczne wyjaśnienia`, description: category.description };
  const post = blogPosts.find(post => path === `/blog/${post.slug}`);
  if (post) return { title: post.seoTitle || post.title, description: post.excerpt, image: post.coverImage };
  return { title: 'Nie znaleziono strony', description: 'Ten adres nie istnieje. Przejdź na stronę główną Pismo w Sprawie.', noindex: true };
}
