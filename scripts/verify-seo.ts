import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { blogPosts } from '../src/data/blogPosts.ts';
import { legalPages } from '../src/data/legalPages.ts';
import { getPageSeo, pagePaths, pageUrl } from '../src/seo.ts';

const htmlFor = (path: string) => readFile(resolve('dist', path === '/' ? 'index.html' : `${path.slice(1)}/index.html`), 'utf8');

for (const path of pagePaths) {
  test(`Full, visible prerender and metadata: ${path}`, async () => {
    const html = await htmlFor(path);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.equal((html.match(/name="description"/g) || []).length, 1);
    assert.ok(html.includes(`href="${pageUrl(path)}"`));
    assert.ok(html.includes('data-prerendered'));
    assert.ok(html.includes('<nav ') && html.includes('<footer '));
    assert.ok(!html.includes('data-static-seo') && !html.includes('visibility:hidden') && !html.includes('opacity:0;'));
    const schema = JSON.parse(html.match(/id="structured-data"[^>]*>(.*?)<\/script>/s)![1]);
    assert.deepEqual(schema, getPageSeo(path).schema);
    for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(tag[0], /width="\d+"/);
      assert.match(tag[0], /height="\d+"/);
    }
    for (const image of html.matchAll(/<img[^>]*src="([^"?]+)"/g)) {
      assert.ok((await stat(resolve('dist', image[1].slice(1)))).isFile());
    }
  });
}

test('Full services, biography, practice and legal content', async () => {
  assert.match(await htmlFor('/uslugi'), /Rozbudowane pismo powyżej 4 stron/);
  assert.match(await htmlFor('/o-mnie'), /Doświadczenie zawodowe zdobywałam/);
  assert.match(await htmlFor('/praktyka'), /ograniczenia w obrocie ziemią/);
  for (const [path, page] of Object.entries(legalPages)) {
    const html = await htmlFor(path);
    for (const section of page.sections) assert.ok(html.includes(section.title));
  }
});

test('Articles retain source links and related articles', async () => {
  for (const post of blogPosts) {
    const html = await htmlFor(`/blog/${post.slug}`);
    assert.match(html, /Przeczytaj również/);
    assert.match(html, new RegExp(`datetime="${post.publishedAt}"`, 'i'));
    for (const link of post.content.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)) {
      assert.ok(html.includes(`href="${link[1].replaceAll('&', '&amp;')}"`));
    }
  }
});

test('404 stays a noindex error, without redirects or home canonical', async () => {
  const html = await readFile('dist/404.html', 'utf8');
  assert.match(html, /Nie znaleziono strony/);
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!html.includes('location.replace') && !html.includes('/?/'));
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, pagePaths.length);
  assert.ok(!sitemap.includes('/404'));
});
