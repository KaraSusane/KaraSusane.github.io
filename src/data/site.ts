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
  '/': { title: 'Prawne wsparcie. Precyzyjne pisma', description: 'Pisma prawne, umowy i doradztwo przygotowane jasno, konkretnie i z myślą o Twojej sprawie.' },
  '/uslugi': { title: 'Usługi', description: 'Pisma, umowy, analiza sprawy, doradztwo prawne i mediacje.' },
  '/o-mnie': { title: 'O mnie', description: 'Karolina Zdrojek, prawnik i założycielka Pismo w Sprawie.' },
  '/praktyka': { title: 'Praktyka', description: 'Obszary praktyki Pismo w Sprawie: prawo medyczne, beauty, nieruchomości, spadki, prawo rolne, karne i mediacje.' },
  '/blog': { title: 'Blog prawny', description: 'Praktyczne artykuły o prawie w życiu codziennym.' },
  '/kontakt': { title: 'Kontakt', description: `Kontakt z Pismo w Sprawie: ${contactEmail}.` },
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
