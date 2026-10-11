import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { blogPosts } from '../src/data/blogPosts.ts';
import { blogCategoryPages, categoryPath } from '../src/data/blogCategories.ts';
import { siteUrl, siteName, defaultCover, pageUrl, normalizePath, standardPages, getPageMetadata } from '../src/data/site.ts';
import { getPageSchema, pageModifiedAt } from '../src/data/seo.ts';

const distDir = resolve('dist');
const baseHtml = await readFile(resolve(distDir, 'index.html'), 'utf8');
const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

const renderPage = (path: string) => {
  const page = getPageMetadata(path);
  const canonicalUrl = pageUrl(path);
  const completeTitle = `${page.title} | ${siteName}`;
  const image = `${siteUrl}${page.image || defaultCover}`;
  const schema = getPageSchema(path);
  const isArticle = blogPosts.some(post => path === `/blog/${post.slug}`);
  const head = `
    ${page.noindex ? '<meta name="robots" content="noindex, follow" />' : `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" /><meta name="robots" content="index, follow, max-image-preview:large" />`}
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:type" content="${isArticle ? 'article' : 'website'}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${escapeHtml(completeTitle)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    ${page.noindex ? '' : `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`}
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(completeTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    ${schema ? `<script id="structured-data" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>` : ''}`;
  const content = renderToString(createElement(App, { pathname: path }));
  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(completeTitle)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered>${content}</div>`);
};

const paths = [
  ...Object.keys(standardPages),
  ...blogCategoryPages.map(category => normalizePath(categoryPath(category))),
  ...blogPosts.map(post => `/blog/${post.slug}`),
];
if (new Set(paths).size !== paths.length) throw new Error('Każda podstrona musi mieć unikalny adres.');
for (const post of blogPosts) {
  for (const date of [post.publishedAt, post.updatedAt].filter(Boolean)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date!) || new Date(date!).toISOString().slice(0, 10) !== date) throw new Error(`Nieprawidłowa data: ${post.slug}`);
  }
  if (post.updatedAt && post.updatedAt < post.publishedAt) throw new Error(`Aktualizacja nie może poprzedzać publikacji: ${post.slug}`);
}
await Promise.all(paths.map(async path => {
  const outputDir = path === '/' ? distDir : resolve(distDir, path.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, 'index.html'), renderPage(path), 'utf8');
}));
await writeFile(resolve(distDir, '404.html'), renderPage('/404.html'), 'utf8');

const sitemapEntries = paths.map(path => {
  const modifiedAt = pageModifiedAt(path);
  return `  <url>\n    <loc>${escapeHtml(pageUrl(path))}</loc>${modifiedAt ? `\n    <lastmod>${modifiedAt}</lastmod>` : ''}\n  </url>`;
}).join('\n');
await Promise.all([
  writeFile(resolve(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`, 'utf8'),
  writeFile(resolve(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8'),
]);
console.log(`SEO: wygenerowano ${paths.length} stron, sitemap.xml i robots.txt.`);
