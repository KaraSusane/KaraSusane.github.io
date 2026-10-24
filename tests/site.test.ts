import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { blogPosts } from '../src/data/blogPosts';
import { rodoWPraktyce } from '../src/data/rodoWPraktyce';
import { intymnoscIGodnosc } from '../src/data/intymnoscIGodnosc';
import { ebooks, ebookPath, findEbook } from '../src/data/ebooks';
import { standardPages, getPageMetadata, pageUrl, navItems, siteName, authorName, contactEmail, siteUrl, fullTitle, pageShareImage, tiktokUrl, mailCtaLabel, mailto } from '../src/data/site';
import { services } from '../src/data/services';
import { servicesEnabled } from '../src/data/features';
import { blogCategoryPages, categoryPath } from '../src/data/blogCategories';
import { practiceAreas, practiceContent } from '../src/data/practiceAreas';
import { responsiveImages } from '../src/data/responsiveImages';
import { getPageSchema, latestPostDate, pageModifiedAt, postModifiedAt } from '../src/data/seo';

const paths = [...Object.keys(standardPages), ...ebooks.map(ebook => ebookPath(ebook).replace(/\/$/, '')), ...blogCategoryPages.map(category => categoryPath(category).replace(/\/$/, '')), ...blogPosts.map(post => `/blog/${post.slug}`)];
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#039;');

test('Routes, navigation and blog slugs are unique', () => {
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(new Set(navItems.map(item => item.href)).size, navItems.length);
  for (const item of navItems) assert.ok(standardPages[item.href.replace(/\/$/, '')]);
});

test('Services can be unpublished and restored through one feature flag', async () => {
  assert.equal(navItems.some(item => item.href === '/uslugi/'), servicesEnabled);
  assert.equal(Boolean(standardPages['/uslugi']), servicesEnabled);
  assert.equal(Boolean(getPageMetadata('/uslugi/').noindex), !servicesEnabled);
  const html = renderToString(createElement(App, { pathname: '/uslugi/' }));
  assert.equal(html.includes('W czym mogę Ci pomóc?'), servicesEnabled);
  assert.equal(html.includes('Nie znaleziono strony'), !servicesEnabled);
  assert.equal(Boolean(getPageSchema('/uslugi/')), servicesEnabled);
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal(sitemap.includes('<loc>https://pismowsprawie.pl/uslugi/</loc>'), servicesEnabled);
  if (servicesEnabled) await access('dist/uslugi/index.html');
  else {
    await assert.rejects(access('dist/uslugi/index.html'));
    for (const path of paths) {
      const page = await readFile(resolve('dist', `.${path === '/' ? '' : path}/index.html`), 'utf8');
      assert.equal(page.includes('href="/uslugi/"'), false, path);
      assert.equal(page.includes('Zobacz usługi'), false, path);
    }
  }
  const source = await readFile('src/App.tsx', 'utf8');
  assert.ok(source.includes('const ServicesPage ='));
  assert.ok(source.includes('<CooperationSection />'));
  assert.equal(services.length, 5);
});

test('Mail calls to action share the requested wording and keep working mail links', () => {
  assert.equal(mailCtaLabel, 'Masz problem? Napisz maila!');
  for (const path of ['/', '/kontakt/', `/blog/${blogPosts[0].slug}/`]) {
    const html = renderToString(createElement(App, { pathname: path }));
    assert.ok(html.includes(mailCtaLabel), path);
    assert.ok(html.includes(`href="${mailto()}"`), path);
    assert.equal(html.includes('>Napisz maila<'), false, path);
  }
  const home = renderToString(createElement(App, { pathname: '/' }));
  assert.equal(home.includes('Zobacz usługi'), servicesEnabled);
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
    assert.ok(html.includes(`<title>${escape(fullTitle(metadata.title))}</title>`));
    assert.ok(html.includes(`property="og:title" content="${escape(fullTitle(metadata.title))}"`));
    assert.ok(html.includes(`name="twitter:title" content="${escape(fullTitle(metadata.title))}"`));
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
  assert.equal((html.match(/class="page-enter /g) || []).length, Object.keys(practiceContent).length + 1);
  assert.equal(html.includes('opacity:0'), false);
});

test('Practice cards share six responsive row tracks instead of bottom-aligning their text', () => {
  const html = renderToString(createElement(App, { pathname: '/praktyka/' }));
  const cards = [...html.matchAll(/<article id="[^"]+"[^>]*class="([^"]+)"/g)];
  assert.equal(cards.length, Object.keys(practiceContent).length);
  for (const [, classes] of cards) {
    assert.ok(classes.includes('md:row-span-6 md:grid-rows-subgrid'));
    assert.ok(classes.includes('grid min-h-60 gap-y-0'));
    assert.equal(classes.includes('justify-between'), false);
    assert.equal(classes.includes('@container'), false, 'Container queries belong to the heading, not the shared-row card');
  }
  assert.equal((html.match(/class="relative selection-boundary @container min-w-0"/g) || []).length, cards.length);
});

test('Reading columns contain WebKit selection painting without changing justification', () => {
  for (const post of blogPosts) {
    const html = renderToString(createElement(App, { pathname: `/blog/${post.slug}/` }));
    assert.ok(html.includes('class="relative selection-boundary space-y-6"'));
    assert.ok(html.includes('class="text-justify text-lg leading-[1.85]'));
  }
  const about = renderToString(createElement(App, { pathname: '/o-mnie/' }));
  assert.ok(about.includes('class="relative selection-boundary space-y-6 text-justify'));
  for (const path of ['/polityka-prywatnosci/', '/nota-prawna/', '/wazne-informacje/']) {
    const html = renderToString(createElement(App, { pathname: path }));
    assert.ok(html.includes('<article class="relative selection-boundary space-y-10'));
  }
});

test('Selection boundaries cover complete pages and the ebook cross-section reading column', async () => {
  for (const path of paths) {
    const html = renderToString(createElement(App, { pathname: path }));
    assert.ok(html.includes('<main class="selection-boundary">'), path);
    assert.ok(html.includes('<footer class="selection-boundary border-t'), path);
    assert.ok(html.includes('selection:bg-[#ebc256] selection:text-[#111113]'), path);
  }
  const html = renderToString(createElement(App, { pathname: ebookPath(ebooks[0]) }));
  assert.ok(html.includes('class="relative selection-boundary max-w-4xl space-y-14 pt-14"'));
  const css = await readFile('src/index.css', 'utf8');
  assert.ok(css.includes('.selection-boundary::selection,\nmain > :is(section, article)::selection {\n  background-color: transparent;'));
  assert.equal(css.includes('user-select: none'), false, 'Text must remain selectable and copyable');
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

test('Hospital privacy article preserves headings, quotes, bibliography and publication date', async () => {
  const post = intymnoscIGodnosc;
  assert.ok(blogPosts.includes(post));
  assert.equal(post.category, 'Prawo medyczne');
  assert.equal(post.publishedAt, '2026-10-13');
  const html = await readFile(resolve('dist', `blog/${post.slug}/index.html`), 'utf8');
  assert.ok(html.includes(`>${escape(post.title)}</h1>`));
  assert.ok(html.includes('dateTime="2026-10-13"'));
  assert.ok(html.includes('src="/intymnosc-i-godnosc-w-szpitalu.jpeg"'));
  const headings = [...post.content.matchAll(/^## (.+)$/gm)];
  assert.equal(headings.length, 15);
  for (const [, heading] of headings) assert.ok(html.includes(escape(heading)));
  assert.ok(html.includes('„Proszę odnotować mój sprzeciw w dokumentacji”.'));
  assert.ok(html.includes('Szpital dydaktyczny nie stanowi wyłączenia godności i obowiązku informacji.'));
  assert.ok(html.includes('<em>Niniejszy artykuł ma charakter informacyjny i nie stanowi porady prawnej.</em>'));
  assert.ok(html.includes('<em>Autor: mgr. prawa Karolina Zdrojek</em>'));
  assert.equal((post.content.match(/^- /gm) || []).length, 10);
  assert.ok(html.includes('href="https://www.magnific.com"'));
  assert.ok(html.includes('href="https://eli.gov.pl/eli/DU/2009/417/ogl"'));
  assert.ok(html.includes('href="https://eli.gov.pl/eli/DU/1997/152/ogl"'));
  assert.ok(html.includes('href="https://nil.org.pl/dokumenty/kodeks-etyki-lekarskiej"'));
  assert.ok(html.includes('href="https://www.gov.pl/web/rpp/prawo-do-poszanowania-intymnosci-i-godnosci"'));
  assert.ok(html.includes('class="relative selection-boundary space-y-6"'));
  assert.ok(html.includes('text-justify'));
  const category = await readFile('dist/blog/kategoria/prawo-medyczne/index.html', 'utf8');
  assert.ok(category.includes(`href="/blog/${post.slug}/"`));
});

test('E-books follow Contact and provide working downloads without analytics', async () => {
  const contactIndex = navItems.findIndex(item => item.href === '/kontakt/');
  assert.deepEqual(navItems[contactIndex + 1], { label: 'E-booki', href: '/e-booki/' });
  const html = await readFile('dist/e-booki/index.html', 'utf8');
  assert.ok(html.includes('E-booki i kursy</h1>'));
  for (const ebook of ebooks) {
    assert.ok(html.includes(`id="${ebook.id}"`));
    assert.ok(html.includes(escape(ebook.title)));
    assert.ok(html.includes(escape(ebook.author)));
    assert.ok(html.includes(`href="${ebook.file}" download="${ebook.file.split('/').at(-1)}"`));
    assert.ok(html.includes(`src="${ebook.cover}"`));
    assert.ok(html.includes(`${ebook.pages} stron`));
    assert.ok(html.includes(`href="${ebookPath(ebook)}"`));
    const pdf = await readFile(resolve('dist', `.${ebook.file}`));
    assert.ok(pdf.subarray(0, 8).toString().startsWith('%PDF-2.0'));
    assert.ok(pdf.length > 1000);
    await access(resolve('dist', `.${ebook.cover}`));
  }
  assert.ok(html.includes('Drukowanie jest dozwolone.'));
  assert.equal(html.includes('googletagmanager.com'), false);
  assert.equal(html.includes('google-analytics.com'), false);
  assert.equal(html.includes('private-ebook-settings'), false);
});

test('Individual e-book pages expose descriptions, full contents and the original sample in static HTML', async () => {
  for (const ebook of ebooks) {
    const path = ebookPath(ebook);
    assert.equal(findEbook(path), ebook);
    assert.equal(findEbook(path.replace(/\/$/, '')), ebook);
    const html = await readFile(resolve('dist', `.${path}index.html`), 'utf8');
    assert.ok(html.includes(`>${escape(ebook.title)}</h1>`));
    assert.ok(html.includes(`href="/e-booki/"`));
    for (const paragraph of [...ebook.details, ebook.audience, ...ebook.sample.paragraphs]) assert.ok(html.includes(escape(paragraph)));
    assert.equal(ebook.chapters.length, 20);
    assert.equal(ebook.chapters[0].page, 8);
    assert.equal(ebook.chapters.at(-1)?.page, 57);
    for (const chapter of [...ebook.chapters, ...ebook.appendices]) {
      assert.ok(html.includes(escape(chapter.title)));
      assert.ok(chapter.page > 0 && chapter.page <= ebook.pages);
    }
    for (const title of ebook.checklists) assert.ok(html.includes(escape(title)));
    for (const id of ['o-ebooku', 'spis-tresci', 'fragment', 'autorka']) {
      assert.ok(html.includes(`id="${id}"`));
      assert.ok(html.includes(`href="#${id}"`));
    }
    assert.ok(html.includes(`cite="${ebook.file}#page=${ebook.sample.page}"`));
    assert.ok(html.includes(`href="${ebook.file}" download="${ebook.file.split('/').at(-1)}"`));
    assert.ok(html.includes('href="/blog/kategoria/ochrona-danych-osobowych/"'));
    assert.equal(getPageMetadata(path).title, ebook.seoTitle);
    assert.equal(getPageMetadata(path).description, ebook.seoDescription);
    assert.equal(pageModifiedAt(path), ebook.updatedAt);
  }
  assert.equal(findEbook('/e-booki/unknown/'), undefined);
  assert.equal(getPageMetadata('/e-booki/unknown/').noindex, true);
  assert.equal(getPageSchema('/e-booki/unknown/'), undefined);
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
  for (const path of servicesEnabled ? ['/', '/uslugi'] : ['/']) {
    const schema = await readSchema(path);
    const service = schema.find(node => node['@type'] === 'LegalService');
    assert.ok(service);
    assert.equal(service.name, siteName);
    assert.equal(service.email, contactEmail);
    assert.equal(service.priceRange, servicesEnabled ? services.find(service => service.number === '02')?.price : undefined);
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

test('E-book structured data matches the published PDF rather than an invented offer', async () => {
  const schema = await readSchema('/e-booki');
  const collection = schema.find(node => node['@type'] === 'CollectionPage');
  assert.ok(collection);
  assert.equal(collection.dateModified, '2026-10-17');
  assert.equal(collection.mainEntity.itemListElement.length, ebooks.length);
  for (const [index, ebook] of ebooks.entries()) {
    const book = collection.mainEntity.itemListElement[index].item;
    assert.equal(book['@type'], 'Book');
    assert.equal(book.name, ebook.title);
    assert.equal(book.author.name, ebook.author);
    assert.equal(book.numberOfPages, ebook.pages);
    assert.equal(book.bookFormat, 'https://schema.org/EBook');
    assert.equal(book.encoding.contentUrl, `${siteUrl}${ebook.file}`);
    assert.equal(book.url, pageUrl(ebookPath(ebook)));
    assert.equal(book.offers, undefined);
  }
});

test('Individual e-book structured data shares the book identity and a three-level breadcrumb', async () => {
  for (const ebook of ebooks) {
    const path = ebookPath(ebook);
    const schema = await readSchema(path.replace(/\/$/, ''));
    const page = schema.find(node => node['@type'] === 'WebPage');
    const book = schema.find(node => node['@type'] === 'Book');
    assert.ok(page && book);
    assert.equal(page.mainEntity['@id'], book['@id']);
    assert.equal(book.url, pageUrl(path));
    assert.equal(book.name, ebook.title);
    assert.equal(book.author.name, ebook.author);
    assert.equal(book.numberOfPages, ebook.pages);
    assert.equal(book.encoding.contentUrl, `${siteUrl}${ebook.file}`);
    const items = schema.find(node => node['@type'] === 'BreadcrumbList').itemListElement;
    assert.deepEqual(items.map((item: Record<string, any>) => item.item), [pageUrl('/'), pageUrl('/e-booki'), pageUrl(path)]);
    const collection = await readSchema('/e-booki');
    const listed = collection.find(node => node['@type'] === 'CollectionPage').mainEntity.itemListElement.find((item: Record<string, any>) => item.item.url === book.url).item;
    assert.deepEqual(book, listed);
  }
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
      assert.equal(article.dateModified, postModifiedAt(post));
      assert.equal(article.publisher.logo['@type'], 'ImageObject');
      assert.equal(article.publisher.logo.url, `${siteUrl}/apple-touch-icon.png`);
      assert.equal(items[1].item, pageUrl('/blog'));
      assert.equal(items[2].item, pageUrl(categoryPath(blogCategoryPages.find(category => category.name === post.category)!)));
    }
  }
});

test('Blog sitemap date follows the newest article, regardless of array order', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  const blogEntry = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find(([, entry]) => entry.includes(`<loc>${pageUrl('/blog')}</loc>`));
  assert.ok(blogEntry);
  const latest = latestPostDate(blogPosts);
  assert.ok(blogEntry[1].includes(`<lastmod>${latest}</lastmod>`));
});

test('Category pages contain only matching articles and expose crawlable filters', async () => {
  for (const category of blogCategoryPages) {
    const path = categoryPath(category);
    const html = await readFile(resolve('dist', `.${path}index.html`), 'utf8');
    for (const paragraph of category.paragraphs) assert.ok(html.includes(escape(paragraph)));
    for (const other of blogCategoryPages) assert.ok(html.includes(`href="${categoryPath(other)}"`));
    for (const post of blogPosts) {
      const card = `href="/blog/${post.slug}/" class="relative selection-boundary group block h-full`;
      assert.equal(html.includes(card), post.category === category.name, `${category.name}: ${post.slug}`);
    }
    assert.ok(html.includes(`data-blog-category="${category.name}" href="${path}" aria-current="page"`));
    const graph = await readSchema(path);
    const collection = graph.find(node => node['@type'] === 'CollectionPage');
    assert.ok(collection);
    assert.deepEqual(collection.mainEntity.itemListElement.map((item: Record<string, any>) => item.url), blogPosts.filter(post => post.category === category.name).map(post => pageUrl(`/blog/${post.slug}`)));
    assert.equal(collection.dateModified, pageModifiedAt(path));
  }
  assert.equal(getPageMetadata('/blog/kategoria/unknown/').noindex, true);
  assert.equal(getPageSchema('/blog/kategoria/unknown/'), undefined);
});

test('Sitemap lists all canonical pages exactly once and uses actual modification dates', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  const entries = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].map(([, entry]) => entry);
  assert.equal(entries.length, paths.length);
  for (const path of paths) {
    const matches = entries.filter(entry => entry.includes(`<loc>${pageUrl(path)}</loc>`));
    assert.equal(matches.length, 1, path);
    const modified = pageModifiedAt(path);
    assert.equal(matches[0].includes('<lastmod>'), Boolean(modified));
    if (modified) assert.ok(matches[0].includes(`<lastmod>${modified}</lastmod>`));
  }
  const unchanged = { ...blogPosts[0], updatedAt: undefined };
  assert.equal(postModifiedAt(unchanged), unchanged.publishedAt);
  assert.equal(latestPostDate([unchanged, blogPosts[0]]), latestPostDate([blogPosts[0], unchanged]));
  assert.equal(latestPostDate([]), undefined);
});

test('SEO titles can be descriptive without replacing original article headlines', async () => {
  const posts = blogPosts.filter(post => post.seoTitle);
  assert.ok(posts.length > 0);
  for (const post of posts) {
    const html = await readFile(resolve('dist', 'blog', post.slug, 'index.html'), 'utf8');
    assert.ok(html.includes(`<title>${escape(fullTitle(post.seoTitle!))}</title>`), post.slug);
    assert.ok(html.includes(`>${escape(post.title)}</h1>`), post.slug);
    assert.ok(html.includes(`dateTime="${post.updatedAt || post.publishedAt}"`), post.slug);
    assert.ok(html.includes('href="/o-mnie/" rel="author"'), post.slug);
  }
  assert.equal(new Set(paths.map(path => getPageMetadata(path).title)).size, paths.length);
  assert.equal(new Set(paths.map(path => getPageMetadata(path).description)).size, paths.length);
});

test('Every practice area includes useful descriptions and an available next step', async () => {
  const html = await readFile('dist/praktyka/index.html', 'utf8');
  for (const [id, content] of Object.entries(practiceContent)) {
    assert.ok(html.includes(`id="${id}"`));
    assert.ok(html.includes(escape(content.description)));
    assert.ok(html.includes(escape(content.examples)));
    assert.ok(content.description.split(/\s+/).length >= 25);
  }
  assert.equal((html.match(/href="\/uslugi\/" class="underline underline-offset-4"/g) || []).length, servicesEnabled ? Object.keys(practiceContent).length : 0);
  if (!servicesEnabled) assert.equal((html.match(/>Opisz swoją sprawę<\/a>/g) || []).length, Object.keys(practiceContent).length);
});

test('Practice lists the six requested areas in order and keeps blog practice links valid', async () => {
  const html = await readFile('dist/praktyka/index.html', 'utf8');
  const headings = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map(([, title]) => title);
  assert.deepEqual(headings, [
    'Prawo sztucznej inteligencji, AI Act, RODO', 'Prawo medyczne', 'Prawo spadkowe',
    'Prawo nieruchomości', 'Legal tech i cyberbezpieczeństwo', 'Mediacje',
  ]);
  assert.equal(Object.keys(practiceContent).length, 6);
  assert.equal(html.includes('Prawo administracyjne'), false);
  for (const category of blogCategoryPages) {
    if (!category.practiceId) continue;
    assert.ok(html.includes(`id="${category.practiceId}"`), category.name);
    for (const post of blogPosts.filter(post => post.category === category.name)) {
      const article = await readFile(resolve('dist', `blog/${post.slug}/index.html`), 'utf8');
      assert.ok(article.includes(`href="/praktyka/#${category.practiceId}"`));
    }
  }
  assert.equal(pageModifiedAt('/praktyka/'), '2026-10-19');
});

test('Responsive images use valid WebP files and retain original image fallbacks', async () => {
  const html = await readFile('dist/blog/index.html', 'utf8');
  for (const [original, image] of Object.entries(responsiveImages)) {
    await access(resolve('dist', `.${original}`));
    for (const candidate of image.srcSet.split(', ')) {
      const [path] = candidate.split(' ');
      const bytes = await readFile(resolve('dist', `.${path}`));
      assert.equal(bytes.subarray(0, 4).toString(), 'RIFF');
      assert.equal(bytes.subarray(8, 12).toString(), 'WEBP');
    }
    if (original !== '/karolina-zdrojek.jpg') assert.ok(html.includes(`type="image/webp" srcSet="${image.srcSet}"`));
  }
});

test('Article 561 reference points to the civil code, not the unrelated pledge chapter', () => {
  const post = blogPosts.find(post => post.slug.startsWith('auto-po-zakupie'))!;
  const reference = post.content.split('\n').find(line => line.startsWith('- Art. 561'))!;
  assert.ok(reference.includes('https://eli.gov.pl/eli/DU/1964/93/ogl'));
  assert.equal(post.content.includes('rozdzial-ii-zastaw-na-prawach'), false);
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

test('Content visible on first screen is not hidden until the script hydrates', () => {
  const home = renderToString(createElement(App, { pathname: '/' }));
  const hero = home.slice(0, home.indexOf('id="od-sprawy-do-pisma"'));
  assert.ok(hero.includes('Prawo po Twojej stronie.'));
  assert.equal(hero.includes('opacity:0'), false);
  for (const path of ['/blog/', '/nota-prawna/', '/polityka-prywatnosci/', '/wazne-informacje/']) {
    assert.equal(renderToString(createElement(App, { pathname: path })).includes('opacity:0'), false, path);
  }
});

test('Page titles do not end with a period before the site name', () => {
  for (const path of paths) assert.equal(getPageMetadata(path).title.endsWith('.'), false, path);
});

test('Contact metadata does not promise a free quote absent from the page', () => {
  const contact = getPageMetadata('/kontakt');
  assert.equal(`${contact.title} ${contact.description}`.toLowerCase().includes('bezpłatn'), false);
});

test('Article practice cards name an existing practice area or fall back to the category', () => {
  for (const post of blogPosts) {
    const html = renderToString(createElement(App, { pathname: `/blog/${post.slug}/` }));
    const category = blogCategoryPages.find(item => item.name === post.category)!;
    if (category.practiceId) assert.ok(html.includes(`href="/praktyka/#${category.practiceId}"`), post.slug);
    else {
      assert.ok(html.includes('Więcej w kategorii'), post.slug);
      assert.equal(html.includes('>Obszar praktyki<'), false, post.slug);
    }
  }
  const practice = renderToString(createElement(App, { pathname: '/praktyka/' }));
  for (const category of blogCategoryPages.filter(item => item.practiceId)) {
    assert.ok(practice.includes(`href="${categoryPath(category)}"`), category.name);
  }
});

test('Ebook pages take their headings and related links from the ebook data', () => {
  for (const ebook of ebooks) {
    const html = renderToString(createElement(App, { pathname: ebookPath(ebook) }));
    assert.ok(html.includes(`>${ebook.aboutTitle}</h2>`));
    for (const link of ebook.relatedLinks) assert.ok(html.includes(`href="${link.href}"`));
  }
  const list = renderToString(createElement(App, { pathname: '/e-booki/' }));
  assert.equal((list.match(/<img[^>]*fetchPriority="high"/g) || []).length, 1);
});

test('Home H1 reads as the brand name with a space between its lines', () => {
  const html = renderToString(createElement(App, { pathname: '/' }));
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/s)![1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  assert.equal(h1, 'Pismo w Sprawie');
});

test('Search titles fit in 60 characters and carry the brand only once', () => {
  for (const path of paths) {
    const title = fullTitle(getPageMetadata(path).title);
    assert.ok(title.length <= 60, `${path}: ${title.length}`);
    assert.ok((title.match(/Pismo w Sprawie/g) || []).length <= 1, path);
  }
  assert.equal(fullTitle('Blog'), `Blog | ${siteName}`);
});

test('Every indexed page has a meta description of useful length', () => {
  for (const path of paths) {
    const { description } = getPageMetadata(path);
    assert.ok(description.length >= 70 && description.length <= 160, `${path}: ${description.length}`);
  }
});

test('Share images are landscape files with declared size and alt text', async () => {
  for (const path of paths) {
    const html = await readFile(resolve('dist', `.${path === '/' ? '' : path}/index.html`), 'utf8');
    const image = pageShareImage(getPageMetadata(path));
    assert.ok(image.width && image.height && image.width > image.height, path);
    assert.ok(html.includes(`property="og:image" content="${siteUrl}${image.url}"`), path);
    assert.ok(html.includes(`property="og:image:width" content="${image.width}"`), path);
    assert.ok(html.includes(`property="og:image:height" content="${image.height}"`), path);
    assert.ok(html.includes(`property="og:image:alt" content="${escape(image.alt)}"`), path);
    await access(resolve('dist', `.${image.url}`));
  }
});

test('Articles expose publication dates and the organization links its social profile', async () => {
  for (const post of blogPosts) {
    const html = await readFile(resolve('dist', 'blog', post.slug, 'index.html'), 'utf8');
    assert.ok(html.includes(`property="article:published_time" content="${post.publishedAt}"`), post.slug);
    assert.ok(html.includes(`property="article:modified_time" content="${postModifiedAt(post)}"`), post.slug);
  }
  const organization = (getPageSchema('/')!['@graph'] as Array<Record<string, any>>).find(item => item['@type'] === 'LegalService')!;
  assert.deepEqual(organization.sameAs, [tiktokUrl]);
  assert.equal(tiktokUrl.includes('?'), false);
});

test('Articles link to related site pages in their content, in the same tab', () => {
  const routes = new Set(paths.map(path => pageUrl(path).replace(siteUrl, '')));
  for (const post of blogPosts) {
    const targets = [...post.content.matchAll(/\]\((\/[^)]+)\)/g)].map(match => match[1]);
    assert.ok(targets.length > 0, post.slug);
    const html = renderToString(createElement(App, { pathname: `/blog/${post.slug}/` }));
    for (const target of targets) {
      assert.ok(routes.has(target), `${post.slug}: ${target}`);
      assert.notEqual(target, `/blog/${post.slug}/`, post.slug);
      assert.ok(html.includes(`href="${target}" class=`), `${post.slug}: ${target}`);
      assert.equal(html.includes(`href="${target}" target="_blank"`), false, `${post.slug}: ${target}`);
    }
  }
});

test('The ebook is linked from its blog category, practice area and the RODO article', () => {
  for (const ebook of ebooks) {
    const href = `href="${ebookPath(ebook)}"`;
    const category = blogCategoryPages.find(item => item.name === ebook.blogCategory)!;
    assert.ok(renderToString(createElement(App, { pathname: categoryPath(category) })).includes(href));
    assert.ok(renderToString(createElement(App, { pathname: '/praktyka/' })).includes(href));
  }
  assert.ok(rodoWPraktyce.content.includes('](/e-booki/przewodnik-po-rodo/)'));
});

test('Outbound links carry no tracking parameters', () => {
  for (const post of blogPosts) assert.equal(/[?&](utm_[a-z]+|_t|_r)=/.test(post.content), false, post.slug);
  assert.equal(tiktokUrl.includes('?'), false);
});

test('Home page introduces practice areas, newest articles and common questions without hiding them', () => {
  const html = renderToString(createElement(App, { pathname: '/' }));
  for (const area of practiceAreas) {
    assert.ok(html.includes(`href="/praktyka/#${area.slug}"`), area.slug);
    assert.ok(html.includes(area.summary), area.slug);
  }
  const newest = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);
  for (const post of newest) assert.ok(html.includes(`href="/blog/${post.slug}/"`), post.slug);
  for (const question of ['Czy Pismo w Sprawie to kancelaria?', 'Jak wygląda współpraca?', 'Ile trwa przygotowanie pisma?', 'Ile to kosztuje?']) {
    assert.ok(html.includes(`<summary><h3>${question}</h3>`), question);
  }
  for (const id of ['home-practice-title', 'home-blog-title', 'home-faq-title']) {
    const section = html.slice(html.indexOf(`id="${id}"`) - 400, html.indexOf(`id="${id}"`) + 4000);
    assert.equal(section.includes('opacity:0'), false, id);
  }
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
  const words = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').match(/\p{L}+/gu)!.length;
  assert.ok(words > 500, `${words} słów`);
});
