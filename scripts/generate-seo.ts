import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { blogPosts } from '../src/data/blogPosts.ts';
import { getPageSeo, metaTags, pagePaths, pageUrl, siteUrl } from '../src/seo.ts';

const distDir = resolve('dist');
const baseHtml = await readFile(resolve(distDir, 'index.html'), 'utf8');
const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

function renderPage(path: string) {
  const page = getPageSeo(path);
  const head = [
    ...metaTags(page).filter(([, , value]) => value).map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value!)}" />`),
    ...(page.canonical ? [`<link rel="canonical" href="${escapeHtml(page.canonical)}" />`] : []),
    `<script id="structured-data" type="application/ld+json">${JSON.stringify(page.schema).replaceAll('<', '\\u003c')}</script>`,
  ].join('\n');
  // The server and browser render the same component tree; no hidden SEO fallback.
  const content = renderToString(createElement(App, { pathname: path }));
  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, '')
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered>${content}</div>`);
}

if (new Set(pagePaths).size !== pagePaths.length) throw new Error('Każda strona musi mieć unikalny adres.');
await Promise.all(pagePaths.map(async (path) => {
  const outputDir = path === '/' ? distDir : resolve(distDir, path.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, 'index.html'), renderPage(path), 'utf8');
}));
await writeFile(resolve(distDir, '404.html'), renderPage('/404'), 'utf8');

const sitemapEntries = pagePaths.map((path) => {
  const article = blogPosts.find((post) => path === `/blog/${post.slug}`);
  const lastmod = article ? `\n    <lastmod>${article.publishedAt}</lastmod>` : '';
  return `  <url>\n    <loc>${escapeHtml(pageUrl(path))}</loc>${lastmod}\n  </url>`;
}).join('\n');
await Promise.all([
  writeFile(resolve(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`, 'utf8'),
  writeFile(resolve(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8'),
]);
console.log(`SEO: wygenerowano ${pagePaths.length} pełnych stron, 404.html, sitemap.xml i robots.txt.`);
