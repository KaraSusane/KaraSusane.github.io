import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { blogPosts } from '../src/data/blogPosts';
import { rodoWPraktyce } from '../src/data/rodoWPraktyce';
import { standardPages, getPageMetadata, pageUrl, navItems, siteName } from '../src/data/site';

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
  assert.ok(html.includes('<em>Autor: mgr. prawa Karolina Zdrojek</em>'));
  assert.ok(html.includes('href="https://www.magnific.com"'));
  assert.ok(html.includes('text-justify'));
  assert.equal(html.includes('**po co firma'), false);
});
