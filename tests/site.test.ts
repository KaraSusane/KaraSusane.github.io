import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { blogPosts } from '../src/data/blogPosts';
import { rodoWPraktyce } from '../src/data/rodoWPraktyce';
import { standardPages, getPageMetadata, pageUrl, navItems, siteName, authorName, contactEmail, siteUrl } from '../src/data/site';
import { services } from '../src/data/services';

const paths = [...Object.keys(standardPages), ...blogPosts.map(post => `/blog/${post.slug}`)];
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#039;');

test('Routes, navigation and blog slugs are unique', () => {
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(new Set(navItems.map(item => item.href)).size, navItems.length);
  for (const item of navItems) assert.ok(standardPages[item.href.replace(/\/$/, '')]);
});

test('Every published page provides versioned browser icons and an iPhone touch icon', async () => {
  for (const path of [...paths, '/404.html']) {
    const file = path === '/404.html' ? 'dist/404.html' : resolve('dist', `.${path === '/' ? '' : path}/index.html`);
    const html = await readFile(file, 'utf8');
    assert.ok(html.includes('rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180"'));
    assert.ok(html.includes('href="/favicon.ico?v=2" sizes="16x16 32x32 48x48"'));
    assert.ok(html.includes('href="/favicon-32x32.png?v=2" type="image/png" sizes="32x32"'));
    assert.ok(html.includes('href="/favicon-48x48.png?v=2" type="image/png" sizes="48x48"'));
    assert.ok(html.includes('href="/favicon.svg?v=2" type="image/svg+xml" sizes="any"'));
  }
  for (const [name, size] of [['apple-touch-icon.png', 180], ['favicon-32x32.png', 32], ['favicon-48x48.png', 48]] as const) {
    const png = await readFile(resolve('dist', name));
    assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
    assert.equal(png[25], 2, 'Icons must have an opaque RGB background');
  }
  const ico = await readFile('dist/favicon.ico');
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + index * 16;
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    const length = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.ok(offset + length <= ico.length);
    assert.equal(ico.readUInt32BE(offset + 16), size);
    assert.equal(ico.readUInt32BE(offset + 20), size);
  }
});

for (const path of paths) {
  test(`Prerendered ${path}: one H1, shared metadata, working internal links`, async () => {
    const html = await readFile(resolve('dist', `.${path === '/' ? '' : path}/index.html`), 'utf8');
    const metadata = getPageMetadata(`${path}/`);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
    assert.ok(html.includes(`<title>${escape(metadata.title)} | ${siteName}</title>`));
    assert.ok(html.includes(`property="og:title" content="${escape(metadata.title)} | ${siteName}"`));
    assert.ok(html.includes(`name="twitter:title" content="${escape(metadata.title)} | ${siteName}"`));
    assert.ok(html.includes(`name="description" content="${escape(metadata.description)}"`));
    assert.ok(html.includes(`rel="canonical" href="${pageUrl(path)}"`));
    assert.ok(html.includes('data-prerendered'));
    assert.ok(html.includes('<nav'));
    assert.ok(html.includes('<footer'));
    assert.equal(html.includes('data-static-seo'), false);
    for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const target = match[1];
      await access(resolve('dist', `.${target.endsWith('/') ? `${target}index.html` : target}`));
    }
  });
}

test('404 renders without redirecting to a 200 homepage', async () => {
  const html = await readFile('dist/404.html', 'utf8');
  assert.ok(html.includes('noindex, follow'));
  assert.ok(html.includes('Nie znaleziono strony'));
  assert.equal(html.includes('window.location.replace'), false);
  assert.equal(html.includes('rel="canonical"'), false);
  assert.equal(html.includes('property="og:url"'), false);
  assert.equal(html.includes('id="structured-data"'), false);
  assert.equal(getPageMetadata('/not-a-route/').noindex, true);
});

test('Article source links survive the shared SSR renderer', () => {
  for (const post of blogPosts) {
    const html = renderToString(createElement(App, { pathname: `/blog/${post.slug}/` }));
    for (const link of post.content.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)) {
      assert.ok(html.includes(`href="${escape(link[1])}"`), `${post.slug}: ${link[1]}`);
    }
  }
});

test('Practice headings and cards use the same CSS entrance, without hidden Motion initial states', () => {
  const html = renderToString(createElement(App, { pathname: '/praktyka/' }));
  assert.equal((html.match(/class="page-enter /g) || []).length, 8);
  assert.equal(html.includes('opacity:0'), false);
});

test('RODO article preserves publication date, cover, headings and Word formatting', async () => {
  const html = await readFile(resolve('dist', 'blog', rodoWPraktyce.slug, 'index.html'), 'utf8');
  assert.ok(html.includes('dateTime="2026-10-05"'));
  assert.ok(html.includes('src="/rodo-w-praktyce.jpeg"'));
  assert.ok(html.includes('Ochrona danych osobowych'));
  const headings = [...rodoWPraktyce.content.matchAll(/^## (.+)$/gm)];
  assert.equal(headings.length, 16);
  for (const [, heading] of headings) assert.ok(html.includes(escape(heading)));
  assert.ok(html.includes('<em>Niniejszy artykuł ma charakter informacyjny i nie stanowi porady prawnej.</em>'));
  assert.ok(html.includes('<em>Autor: mgr prawa Karolina Zdrojek</em>'));
  assert.ok(html.includes('<strong class="font-black text-white">Nadmiar zgód nie wzmacnia firmy.</strong>'));
  assert.ok(html.includes('href="https://www.magnific.com"'));
  assert.ok(html.includes('text-justify'));
  assert.equal(html.includes('**po co firma'), false);
});

const readSchema = async (path: string) => {
  const html = await readFile(resolve('dist', `.${path === '/' ? '' : path}/index.html`), 'utf8');
  const match = html.match(/<script id="structured-data" type="application\/ld\+json">(.+?)<\/script>/s);
  assert.ok(match, `Missing structured data on ${path}`);
  const schema = JSON.parse(match[1]);
  assert.equal(schema['@context'], 'https://schema.org');
  return schema['@graph'] as Array<Record<string, any>>;
};

test('Structured data describes the actual legal service and author profile', async () => {
  for (const path of ['/', '/uslugi']) {
    const schema = await readSchema(path);
    const service = schema.find(node => node['@type'] === 'LegalService');
    assert.ok(service);
    assert.equal(service.name, siteName);
    assert.equal(service.email, contactEmail);
    assert.equal(service.priceRange, services.find(service => service.number === '02')?.price);
    assert.equal(service.founder.name, authorName);
    assert.equal(service.founder.url, pageUrl('/o-mnie'));
    assert.equal(service.areaServed.name, 'Polska');
    assert.equal(service.logo.url, `${siteUrl}/apple-touch-icon.png`);
    assert.equal(service.address, undefined, 'Do not invent an office address');
  }
  const about = await readSchema('/o-mnie');
  const profile = about.find(node => node['@type'] === 'ProfilePage');
  assert.ok(profile);
  assert.equal(profile.mainEntity['@type'], 'Person');
  assert.equal(profile.mainEntity.name, authorName);
  assert.equal(profile.mainEntity.jobTitle, 'Prawnik');
  assert.equal(profile.mainEntity.url, pageUrl('/o-mnie'));
});

test('Breadcrumbs and article schemas have canonical URLs, category and publisher logo', async () => {
  for (const path of paths.filter(path => path !== '/')) {
    const schema = await readSchema(path);
    const breadcrumb = schema.find(node => node['@type'] === 'BreadcrumbList');
    assert.ok(breadcrumb, path);
    const items = breadcrumb.itemListElement;
    assert.equal(items[0].item, pageUrl('/'));
    assert.equal(items.at(-1).item, pageUrl(path));
    items.forEach((item: Record<string, any>, index: number) => {
      assert.equal(item['@type'], 'ListItem');
      assert.equal(item.position, index + 1);
      assert.ok(item.name);
    });
    const post = blogPosts.find(post => path === `/blog/${post.slug}`);
    if (post) {
      const article = schema.find(node => node['@type'] === 'BlogPosting');
      assert.ok(article);
      assert.equal(article.articleSection, post.category);
      assert.equal(article.headline, post.title);
      assert.equal(article.author.name, authorName);
      assert.equal(article.datePublished, post.publishedAt);
      assert.equal(article.publisher.logo['@type'], 'ImageObject');
      assert.equal(article.publisher.logo.url, `${siteUrl}/apple-touch-icon.png`);
      assert.equal(items[1].item, pageUrl('/blog'));
    }
  }
});

test('Blog sitemap date follows the newest article, regardless of array order', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  const blogEntry = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find(([, entry]) => entry.includes(`<loc>${pageUrl('/blog')}</loc>`));
  assert.ok(blogEntry);
  const latest = blogPosts.map(post => post.publishedAt).sort().at(-1);
  assert.ok(blogEntry[1].includes(`<lastmod>${latest}</lastmod>`));
});

test('Article covers reserve their real proportions and have appropriate loading priorities', async () => {
  const blogHtml = await readFile('dist/blog/index.html', 'utf8');
  for (const post of blogPosts) {
    assert.ok(post.coverWidth > 0 && post.coverHeight > 0);
    const cover = `src="${post.coverImage}" alt="${escape(post.coverAlt || post.title)}" width="${post.coverWidth}" height="${post.coverHeight}"`;
    assert.ok(blogHtml.includes(`${cover} loading="lazy" decoding="async"`));
    const articleHtml = await readFile(resolve('dist', 'blog', post.slug, 'index.html'), 'utf8');
    assert.ok(articleHtml.includes(`${cover} fetchPriority="high" decoding="async"`));
    assert.equal(articleHtml.includes(`${cover} loading="lazy"`), false);
  }
});
