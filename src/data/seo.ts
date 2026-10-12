import type { BlogPost } from '../types';
import { blogPosts } from './blogPosts';
import { categoryPath, findBlogCategory, findCategoryByName } from './blogCategories';
import { services } from './services';
import { siteUrl, siteName, authorName, contactEmail, defaultCover, pageUrl, navItems, normalizePath, getPageMetadata } from './site';

export const postModifiedAt = (post: BlogPost) => post.updatedAt || post.publishedAt;
export const latestPostDate = (posts: BlogPost[]) => posts.map(postModifiedAt).sort().at(-1);
export const pageModifiedAt = (pathname: string) => {
  const path = normalizePath(pathname);
  const post = blogPosts.find(post => path === `/blog/${post.slug}`);
  if (post) return postModifiedAt(post);
  const category = findBlogCategory(path);
  if (category) return [category.updatedAt, latestPostDate(blogPosts.filter(post => post.category === category.name))].filter(Boolean).sort().at(-1);
  if (path === '/blog') return latestPostDate(blogPosts);
  if (path === '/praktyka') return '2026-10-12';
};

const websiteSchema = {
  '@type': 'WebSite', '@id': `${pageUrl('/')}#website`, name: siteName, url: pageUrl('/'), inLanguage: 'pl-PL',
};
const publisherLogo = { '@type': 'ImageObject', url: `${siteUrl}/apple-touch-icon.png`, width: 180, height: 180 };
const authorSchema = {
  '@type': 'Person', '@id': `${pageUrl('/o-mnie')}#person`, name: authorName, jobTitle: 'Prawnik',
  url: pageUrl('/o-mnie'), image: `${siteUrl}${defaultCover}`,
  knowsAbout: ['Prawo medyczne', 'Dokumentacja prawna', 'Analiza umów'],
};
const legalServiceSchema = {
  '@type': 'LegalService', '@id': `${pageUrl('/')}#organization`, name: siteName, url: pageUrl('/'),
  image: `${siteUrl}${defaultCover}`, logo: publisherLogo, email: contactEmail,
  priceRange: services.find(service => service.number === '02')?.price, founder: authorSchema,
  areaServed: { '@type': 'Country', name: 'Polska' },
};
const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: pageUrl(item.path) })),
});

// The build and in-page category navigation use exactly the same metadata graph.
export function getPageSchema(pathname: string) {
  const path = normalizePath(pathname);
  const metadata = getPageMetadata(path);
  if (metadata.noindex) return undefined;
  const category = findBlogCategory(path);
  const post = blogPosts.find(post => path === `/blog/${post.slug}`);
  const webpage = {
    '@type': 'WebPage', '@id': `${pageUrl(path)}#webpage`, name: `${metadata.title} | ${siteName}`,
    description: metadata.description, url: pageUrl(path), inLanguage: 'pl-PL', isPartOf: { '@id': websiteSchema['@id'] },
  };
  const graph: Record<string, unknown>[] = [];
  if (post) {
    const postCategory = findCategoryByName(post.category);
    graph.push({
      '@type': 'BlogPosting', '@id': `${pageUrl(path)}#article`, headline: post.title, description: post.excerpt,
      image: [`${siteUrl}${post.coverImage || defaultCover}`], datePublished: post.publishedAt, dateModified: postModifiedAt(post),
      inLanguage: 'pl-PL', keywords: post.keywords?.join(', '), articleSection: post.category,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl(path) }, author: authorSchema,
      publisher: { '@type': 'Organization', '@id': legalServiceSchema['@id'], name: siteName, url: pageUrl('/'), logo: publisherLogo },
    }, breadcrumbSchema([
      { name: siteName, path: '/' }, { name: 'Blog', path: '/blog' },
      ...(postCategory ? [{ name: postCategory.name, path: categoryPath(postCategory) }] : []),
      { name: post.title, path },
    ]));
  } else if (category) {
    graph.push(websiteSchema, {
      ...webpage, '@type': 'CollectionPage', dateModified: pageModifiedAt(path),
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: blogPosts.filter(post => post.category === category.name).map((post, index) => ({
          '@type': 'ListItem', position: index + 1, name: post.title, url: pageUrl(`/blog/${post.slug}`),
        })),
      },
    }, breadcrumbSchema([{ name: siteName, path: '/' }, { name: 'Blog', path: '/blog' }, { name: category.name, path }]));
  } else {
    graph.push(websiteSchema, path === '/o-mnie' ? { ...webpage, '@type': 'ProfilePage', mainEntity: authorSchema } : webpage);
    if (path === '/' || path === '/uslugi') graph.push(legalServiceSchema);
    if (path !== '/') graph.push(breadcrumbSchema([
      { name: siteName, path: '/' },
      { name: navItems.find(item => normalizePath(item.href) === path)?.label || metadata.title, path },
    ]));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
