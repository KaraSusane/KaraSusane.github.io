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
export const defaultShareImage = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Pismo w Sprawie - prawo po Twojej stronie' };
export const mailto = (subject?: string) => `mailto:${contactEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
export const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
// Search results cut titles at roughly 60 characters, so the brand is added only when it fits.
export const fullTitle = (title: string) => {
  const branded = `${title} | ${siteName}`;
  return branded.length <= 60 ? branded : title;
};
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
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  noindex?: boolean;
};

export const standardPages: Record<string, PageMetadata> = {
  '/': { title: 'Prawne wsparcie i precyzyjne pisma prawne', description: 'Pisma prawne, wezwania, odwołania, analiza umów i doradztwo prawne przygotowane jasno, konkretnie i z myślą o realnym celu Twojej sprawy.' },
  '/uslugi': { title: 'Usługi i cennik - pisma, umowy, doradztwo', description: 'Sprawdź zakres usług i cennik Pismo w Sprawie: sporządzanie pism prawnych, wezwań, odwołań, opiniowanie i tworzenie umów oraz doradztwo prawne.' },
  '/o-mnie': { title: 'O mnie - Karolina Zdrojek, prawnik', description: 'Karolina Zdrojek - prawnik i założycielka Pismo w Sprawie. Specjalizacja w prawie medycznym, obsłudze dokumentacji prawnej i analizie umów.' },
  '/praktyka': { title: 'Obszary praktyki - prawo medyczne, AI, RODO', description: 'Poznaj obszary praktyki Pismo w Sprawie: prawo administracyjne, medyczne, nieruchomości, prawo sztucznej inteligencji, AI Act, RODO oraz mediacje.' },
  '/blog': { title: 'Blog prawny - prawo w życiu codziennym', description: 'Praktyczne artykuły i analizy prawne: prawo medyczne, prawa pacjenta, RODO, rękojmia przy zakupie auta, dziedziczenie ustawowe i mediacje.' },
  '/kontakt': { title: 'Kontakt - opisz sprawę i otrzymaj wycenę', description: `Opisz swoją sprawę i otrzymaj indywidualną wycenę oraz proponowany termin realizacji. Skontaktuj się mailowo z Pismo w Sprawie: ${contactEmail}.` },
  '/e-booki': { title: 'E-booki prawne - przewodnik po RODO', description: 'Autorskie publikacje Karoliny Zdrojek. Pobierz praktyczny przewodnik prawny po ochronie danych osobowych w firmie: 66 stron o RODO, przykłady i checklisty.', image: '/ebooks/przewodnik-po-rodo-og.jpg', imageWidth: 1200, imageHeight: 630, imageAlt: 'Okładka e-booka o RODO w firmie' },
  ...Object.fromEntries(Object.entries(legalPages).map(([path, page]) => [path, { title: page.title, description: page.description }])),
};

export const pageShareImage = (page: PageMetadata) => page.image
  ? { url: page.image, width: page.imageWidth, height: page.imageHeight, alt: page.imageAlt || page.title }
  : defaultShareImage;

export function getPageMetadata(pathname: string): PageMetadata {
  const path = normalizePath(pathname);
  const standard = standardPages[path];
  if (standard) return standard;
  const ebook = findEbook(path);
  if (ebook) return { title: ebook.seoTitle, description: ebook.seoDescription, image: ebook.shareImage, imageWidth: 1200, imageHeight: 630, imageAlt: `Okładka e-booka: ${ebook.title}` };
  const category = findBlogCategory(path);
  if (category) return { title: `${category.name} - artykuły prawne`, description: category.description };
  const post = blogPosts.find(post => path === `/blog/${post.slug}`);
  if (post?.coverImage) return { title: post.seoTitle || post.title, description: post.excerpt, image: post.coverImage, imageWidth: post.coverWidth, imageHeight: post.coverHeight, imageAlt: post.coverAlt || post.title };
  if (post) return { title: post.seoTitle || post.title, description: post.excerpt };
  return { title: 'Nie znaleziono strony', description: 'Ten adres nie istnieje. Przejdź na stronę główną Pismo w Sprawie.', noindex: true };
}
