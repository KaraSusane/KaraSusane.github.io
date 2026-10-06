import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { blogPosts } from '../src/data/blogPosts.ts';
import { siteUrl, siteName, authorName, contactEmail, defaultCover, pageUrl, navItems, normalizePath, standardPages as pageMetadata, type PageMetadata } from '../src/data/site.ts';
import { services } from '../src/data/services.ts';

const defaultImage = `${siteUrl}${defaultCover}`;
const distDir = resolve('dist');
const baseHtml = await readFile(resolve(distDir, 'index.html'), 'utf8');

type PageDefinition = PageMetadata & {
  path: string;
  schema?: Record<string, unknown>;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const escapeXml = escapeHtml;

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${pageUrl('/')}#website`,
  name: siteName,
  url: pageUrl('/'),
  inLanguage: 'pl-PL',
};

const publisherLogo = {
  '@type': 'ImageObject',
  url: `${siteUrl}/apple-touch-icon.png`,
  width: 180,
  height: 180,
};

const authorSchema = {
  '@type': 'Person',
  '@id': `${pageUrl('/o-mnie')}#person`,
  name: authorName,
  jobTitle: 'Prawnik',
  url: pageUrl('/o-mnie'),
  image: defaultImage,
  knowsAbout: ['Prawo medyczne', 'Dokumentacja prawna', 'Analiza umów'],
};

const legalServiceSchema = {
  '@type': 'LegalService',
  '@id': `${pageUrl('/')}#organization`,
  name: siteName,
  url: pageUrl('/'),
  image: defaultImage,
  logo: publisherLogo,
  email: contactEmail,
  priceRange: services.find(service => service.number === '02')?.price,
  founder: authorSchema,
  areaServed: { '@type': 'Country', name: 'Polska' },
};

const webPageSchema = (page: PageDefinition) => ({
  '@type': 'WebPage',
  '@id': `${pageUrl(page.path)}#webpage`,
  name: `${page.title} | ${siteName}`,
  description: page.description,
  url: pageUrl(page.path),
  inLanguage: 'pl-PL',
  isPartOf: { '@id': websiteSchema['@id'] },
});

const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: pageUrl(item.path),
  })),
});

const buildHead = (page: PageDefinition) => {
  const canonicalUrl = pageUrl(page.path);
  const completeTitle = `${page.title} | ${siteName}`;
  const image = page.image || defaultImage;
  const schema = page.schema || {
    '@context': 'https://schema.org',
    ...webPageSchema(page),
  };

  return `
    ${page.noindex ? '<meta name="robots" content="noindex, follow" />' : `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" /><meta name="robots" content="index, follow, max-image-preview:large" />`}
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:type" content="${page.path.startsWith('/blog/') ? 'article' : 'website'}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${escapeHtml(completeTitle)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    ${page.noindex ? '' : `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`}
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(completeTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    ${page.noindex ? '' : `<script id="structured-data" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`}`;
};

const renderPage = (page: PageDefinition) => {
  const completeTitle = `${page.title} | ${siteName}`;
  const head = buildHead(page);
  const content = renderToString(createElement(App, { pathname: page.path }));

  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(completeTitle)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered>${content}</div>`);
};

const writePage = async (page: PageDefinition) => {
  const outputDir = page.path === '/' ? distDir : resolve(distDir, page.path.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, 'index.html'), renderPage(page), 'utf8');
};

const standardPages: PageDefinition[] = Object.entries(pageMetadata).map(([path, metadata]) => {
  const page = { path, ...metadata };
  const graph: Record<string, unknown>[] = [websiteSchema];
  if (path === '/') {
    graph.push(webPageSchema(page), legalServiceSchema);
  } else {
    const webpage = webPageSchema(page);
    graph.push(path === '/o-mnie'
      ? { ...webpage, '@type': 'ProfilePage', mainEntity: authorSchema }
      : webpage);
    graph.push(breadcrumbSchema([
      { name: siteName, path: '/' },
      { name: navItems.find(item => normalizePath(item.href) === path)?.label || metadata.title, path },
    ]));
    if (path === '/uslugi') graph.push(legalServiceSchema);
  }
  return { ...page, schema: { '@context': 'https://schema.org', '@graph': graph } };
});

const articlePages: PageDefinition[] = blogPosts.map((post) => {
  const path = `/blog/${post.slug}`;
  const image = post.coverImage ? `${siteUrl}${post.coverImage}` : defaultImage;
  return {
    path,
    title: post.title,
    description: post.excerpt,
    image,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [{
        '@type': 'BlogPosting',
        '@id': `${pageUrl(path)}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [image],
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        inLanguage: 'pl-PL',
        keywords: post.keywords?.join(', '),
        articleSection: post.category,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl(path),
        },
        author: authorSchema,
        publisher: {
          '@type': 'Organization',
          '@id': legalServiceSchema['@id'],
          name: siteName,
          url: pageUrl('/'),
          logo: publisherLogo,
        },
      }, breadcrumbSchema([
        { name: siteName, path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path },
      ])],
    },
  };
});

const slugs = blogPosts.map((post) => post.slug);
if (new Set(slugs).size !== slugs.length) {
  throw new Error('Każdy artykuł musi mieć unikalny slug.');
}

const allPages = [...standardPages, ...articlePages];
await Promise.all(allPages.map(writePage));
await writeFile(resolve(distDir, '404.html'), renderPage({
  path: '/404.html',
  title: 'Nie znaleziono strony',
  description: 'Ten adres nie istnieje. Przejdź na stronę główną Pismo w Sprawie.',
  noindex: true,
}), 'utf8');

const latestArticleDate = blogPosts.map(post => post.publishedAt).sort().at(-1);
const sitemapEntries = allPages
  .map((page) => {
    const article = blogPosts.find((post) => page.path === `/blog/${post.slug}`);
    const modifiedAt = article?.publishedAt || (page.path === '/blog' ? latestArticleDate : undefined);
    const lastmod = modifiedAt ? `\n    <lastmod>${modifiedAt}</lastmod>` : '';
    return `  <url>\n    <loc>${escapeXml(pageUrl(page.path))}</loc>${lastmod}\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await Promise.all([
  writeFile(resolve(distDir, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(resolve(distDir, 'robots.txt'), robots, 'utf8'),
]);

console.log(`SEO: wygenerowano ${allPages.length} stron, sitemap.xml i robots.txt.`);
