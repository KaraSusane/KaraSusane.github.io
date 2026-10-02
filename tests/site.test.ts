import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { blogPosts } from '../src/data/blogPosts';
import { standardPages, getPageMetadata, pageUrl, navItems, siteName } from '../src/data/site';

const paths = [...Object.keys(standardPages), ...blogPosts.map(post => `/blog/${post.slug}`)];
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#039;');

test('Routes, navigation and blog slugs are unique', () => {
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(new Set(navItems.map(item => item.href)).size, navItems.length);
  for (const item of navItems) assert.ok(standardPages[item.href.replace(/\/$/, '')]);
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
