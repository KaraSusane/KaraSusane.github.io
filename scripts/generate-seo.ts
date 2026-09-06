import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { blogPosts } from '../src/data/blogPosts.ts';

const siteUrl = 'https://pismowsprawie.pl';
const siteName = 'Pismo w Sprawie';
const authorName = 'Karolina Zdrojek';
const defaultImage = `${siteUrl}/karolina-zdrojek.jpg`;
const distDir = resolve('dist');
const baseHtml = await readFile(resolve(distDir, 'index.html'), 'utf8');

const pageUrl = (path: string) => `${siteUrl}${path === '/' ? '/' : `${path}/`}`;

type PageDefinition = {
  path: string;
  title: string;
  description: string;
  staticContent: string;
  image?: string;
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

const renderInline = (value: string) =>
  escapeHtml(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const renderArticleContent = (content: string) =>
  content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('## ')) {
        return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      }

      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .map((item) => `<li>${renderInline(item.replace(/^- /, ''))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }

      return `<p>${renderInline(block).replaceAll('\n', '<br>')}</p>`;
    })
    .join('\n');

const staticShell = (content: string) => `
  <div style="min-height:100vh;max-width:960px;margin:0 auto;padding:120px 24px 72px;font-family:Arial,sans-serif;color:#fff;background:#111113">
    ${content}
  </div>`;

const buildHead = (page: PageDefinition) => {
  const canonicalUrl = pageUrl(page.path);
  const image = page.image || defaultImage;
  const schema = page.schema || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
  };

  return `
    <style>#root[data-static-seo]{visibility:hidden}</style>
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:type" content="${page.path.startsWith('/blog/') ? 'article' : 'website'}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script id="structured-data" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`;
};

const renderPage = (page: PageDefinition) => {
  const completeTitle = `${page.title} | ${siteName}`;
  const head = buildHead(page);

  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(completeTitle)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-static-seo>${page.staticContent}</div>`);
};

const writePage = async (page: PageDefinition) => {
  const outputDir = page.path === '/' ? distDir : resolve(distDir, page.path.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, 'index.html'), renderPage(page), 'utf8');
};

const standardPages: PageDefinition[] = [
  {
    path: '/',
    title: 'Prawne wsparcie. Precyzyjne pisma',
    description: 'Pisma prawne, umowy i doradztwo przygotowane jasno, konkretnie i z myślą o Twojej sprawie.',
    staticContent: staticShell('<h1>Prawne wsparcie. Precyzyjne pisma.</h1><p>Pismo w Sprawie pomaga uporządkować fakty i przygotować zrozumiały, rzeczowy dokument prawny.</p>'),
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      inLanguage: 'pl-PL',
    },
  },
  { path: '/uslugi', title: 'Usługi', description: 'Pisma, umowy, analiza sprawy, doradztwo prawne i mediacje.', staticContent: staticShell('<h1>Usługi</h1><p>Pisma, umowy, analiza sprawy, doradztwo prawne i mediacje.</p>') },
  { path: '/o-mnie', title: 'O mnie', description: 'Karolina Zdrojek, prawnik i założycielka Pismo w Sprawie.', staticContent: staticShell('<h1>Karolina Zdrojek</h1><p>Prawnik i założycielka Pismo w Sprawie.</p>') },
  { path: '/praktyka', title: 'Praktyka', description: 'Prawo medyczne, beauty, nieruchomości, spadki, prawo rolne, karne i mediacje.', staticContent: staticShell('<h1>Praktyka</h1><p>Obszary praktyki Pismo w Sprawie.</p>') },
  { path: '/blog', title: 'Blog prawny', description: 'Praktyczne artykuły o prawie w życiu codziennym.', staticContent: staticShell(`<h1>Prawo w życiu codziennym.</h1>${blogPosts.map((post) => `<h2><a href="/blog/${escapeHtml(post.slug)}/">${escapeHtml(post.title)}</a></h2><p>${escapeHtml(post.excerpt)}</p>`).join('')}`) },
  { path: '/kontakt', title: 'Kontakt', description: 'Kontakt z Pismo w Sprawie: pismowsprawie@gmail.com.', staticContent: staticShell('<h1>Kontakt</h1><p>Napisz na adres pismowsprawie@gmail.com.</p>') },
  { path: '/polityka-prywatnosci', title: 'Polityka prywatności', description: 'Polityka prywatności strony Pismo w Sprawie.', staticContent: staticShell('<h1>Polityka prywatności</h1><p>Polityka prywatności strony internetowej Pismo w Sprawie.</p>') },
  { path: '/nota-prawna', title: 'Nota prawna i prawa autorskie', description: 'Informacje dotyczące praw autorskich i wyłączenia odpowiedzialności.', staticContent: staticShell('<h1>Nota prawna i prawa autorskie</h1><p>Informacje dotyczące praw autorskich i wyłączenia odpowiedzialności.</p>') },
  { path: '/wazne-informacje', title: 'Ważne informacje', description: 'Najważniejsze zasady realizacji usług Pismo w Sprawie.', staticContent: staticShell('<h1>Ważne informacje</h1><p>Najważniejsze zasady realizacji usługi.</p>') },
];

const articlePages: PageDefinition[] = blogPosts.map((post) => {
  const path = `/blog/${post.slug}`;
  const image = post.coverImage ? `${siteUrl}${post.coverImage}` : defaultImage;
  const articleBody = `
    <article>
      <img src="${escapeHtml(image)}" alt="${escapeHtml(post.coverAlt || post.title)}" style="max-width:100%;height:auto" />
      <h1>${escapeHtml(post.title)}</h1>
      <p><time datetime="${escapeHtml(post.publishedAt)}">${escapeHtml(post.publishedAt)}</time> · ${escapeHtml(post.readTime)} czytania</p>
      ${renderArticleContent(post.content)}
    </article>`;

  return {
    path,
    title: post.title,
    description: post.excerpt,
    image,
    staticContent: staticShell(articleBody),
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: [image],
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: 'pl-PL',
      keywords: post.keywords?.join(', '),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl(path),
      },
      author: {
        '@type': 'Person',
        name: authorName,
        url: `${siteUrl}/o-mnie/`,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
      },
    },
  };
});

const slugs = blogPosts.map((post) => post.slug);
if (new Set(slugs).size !== slugs.length) {
  throw new Error('Każdy artykuł musi mieć unikalny slug.');
}

const allPages = [...standardPages, ...articlePages];
await Promise.all(allPages.map(writePage));

const sitemapEntries = allPages
  .map((page) => {
    const article = blogPosts.find((post) => page.path === `/blog/${post.slug}`);
    const lastmod = article ? `\n    <lastmod>${article.publishedAt}</lastmod>` : '';
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
