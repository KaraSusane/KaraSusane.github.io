import { blogPosts } from './data/blogPosts';
import { legalPages } from './data/legalPages';
import { services } from './data/serviceOffers';

export const siteUrl = 'https://pismowsprawie.pl';
export const siteName = 'Pismo w Sprawie';
const authorName = 'Karolina Zdrojek';
const organizationId = `${siteUrl}/#organization`;
const personId = `${siteUrl}/o-mnie/#person`;
const logo = { '@type': 'ImageObject', url: `${siteUrl}/logo-pismo-w-sprawie.svg` };
const defaultImage = `${siteUrl}/karolina-zdrojek.webp`;
const standardPages: Record<string, { title: string; description: string }> = {
  '/': { title: 'Prawnik – pisma prawne i analiza umów', description: 'Karolina Zdrojek: sporządzanie pism prawnych, analiza i przygotowanie umów oraz pisemne doradztwo. Poznaj zakres usług i opisz swoją sprawę.' },
  '/uslugi': { title: 'Usługi prawne i cennik – pisma, umowy, porady', description: 'Sprawdź ceny sporządzania pism, przygotowania umów i pisemnego doradztwa prawnego. Poznaj zakres usług oraz kolejne etapy współpracy.' },
  '/o-mnie': { title: 'Karolina Zdrojek – prawnik, prawo medyczne i umowy', description: 'Poznaj Karolinę Zdrojek, prawnika i założycielkę Pismo w Sprawie. Prawo medyczne, analiza umów i dokumenty dopasowane do sytuacji klienta.' },
  '/praktyka': { title: 'Obszary praktyki – prawo medyczne, spadki i nieruchomości', description: 'Poznaj obszary praktyki: prawo medyczne, beauty, nieruchomości, spadkowe, rolne i karne. Sprawdź, jak przygotować dokumenty w swojej sprawie.' },
  '/blog': { title: 'Blog prawny – prawo w życiu codziennym', description: 'Artykuły o prawie medycznym, spadkach, sprzedaży ziemi rolnej i zakupie auta. Wybierz kategorię i poznaj praktyczne wyjaśnienia prawne.' },
  '/kontakt': { title: 'Kontakt z prawnikiem – Karolina Zdrojek', description: 'Opisz swoją sprawę i prześlij dokumenty na pismowsprawie@gmail.com. Zapytaj o zakres usług, indywidualną wycenę oraz termin realizacji.' },
};

export const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
export const pageUrl = (path: string) => `${siteUrl}${normalizePath(path) === '/' ? '/' : `${normalizePath(path)}/`}`;
export const pagePaths = [...Object.keys(standardPages), ...Object.keys(legalPages), ...blogPosts.map((post) => `/blog/${post.slug}`)];

export function getPageSeo(requestedPath: string) {
  const path = normalizePath(requestedPath);
  const post = blogPosts.find((item) => path === `/blog/${item.slug}`);
  const legal = legalPages[path];
  const definition = standardPages[path] || (post ? { title: post.title, description: post.excerpt } : legal ? { title: legal.title, description: legal.intro } : undefined);
  const title = `${definition?.title || 'Nie znaleziono strony'} | ${siteName}`;
  const description = definition?.description || 'Nie znaleziono strony. Przejdź do strony głównej lub wybierz jedną z podstron Pismo w Sprawie.';
  const canonical = definition ? pageUrl(path) : undefined;
  const image = post?.coverImage ? `${siteUrl}${post.coverImage.replace(/\.jpe?g$/, '.webp')}` : defaultImage;
  const organization = {
    '@type': 'ProfessionalService', '@id': organizationId, name: siteName, url: `${siteUrl}/`,
    email: 'pismowsprawie@gmail.com', logo, image: defaultImage,
    founder: { '@id': personId },
    sameAs: ['https://www.tiktok.com/@pismowsprawie'],
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Usługi prawne', itemListElement: services.filter((service) => service.minimumPrice !== undefined).map((service) => ({ '@type': 'Offer', url: `${siteUrl}/uslugi/`, itemOffered: { '@type': 'Service', name: service.title, description: service.description }, priceSpecification: { '@type': 'PriceSpecification', minPrice: service.minimumPrice, priceCurrency: 'PLN' } })) },
  };
  const person = { '@type': 'Person', '@id': personId, name: authorName, url: `${siteUrl}/o-mnie/`, image: defaultImage, jobTitle: 'Prawnik', worksFor: { '@id': organizationId }, knowsAbout: ['Prawo medyczne', 'Dokumentacja prawna', 'Analiza i opiniowanie umów'] };
  const graph: Record<string, unknown>[] = [
    organization, person,
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: siteName, url: `${siteUrl}/`, inLanguage: 'pl-PL', publisher: { '@id': organizationId } },
  ];
  if (canonical) {
    graph.push({ '@type': path === '/o-mnie' ? 'ProfilePage' : path === '/blog' ? 'CollectionPage' : 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description, inLanguage: 'pl-PL', isPartOf: { '@id': `${siteUrl}/#website` }, ...(path === '/o-mnie' ? { mainEntity: { '@id': personId } } : {}), ...(path !== '/' ? { breadcrumb: { '@id': `${canonical}#breadcrumbs` } } : {}) });
    if (path !== '/') {
      const crumbs = [{ name: siteName, item: `${siteUrl}/` }, ...(post ? [{ name: 'Blog', item: `${siteUrl}/blog/` }] : []), { name: definition!.title, item: canonical }];
      graph.push({ '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumbs`, itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })) });
    }
    if (post) graph.push({ '@type': 'BlogPosting', '@id': `${canonical}#article`, headline: post.title, description, image: [image], datePublished: post.publishedAt, dateModified: post.publishedAt, inLanguage: 'pl-PL', keywords: post.keywords?.join(', '), mainEntityOfPage: { '@id': `${canonical}#webpage` }, author: { '@id': personId, '@type': 'Person', name: authorName, url: `${siteUrl}/o-mnie/` }, publisher: { '@id': organizationId, '@type': 'Organization', name: siteName, logo } });
  }
  return { path, title, description, canonical, image, type: post ? 'article' : 'website', robots: canonical ? 'index, follow, max-image-preview:large' : 'noindex, follow', schema: { '@context': 'https://schema.org', '@graph': graph } };
}

export function metaTags(page: ReturnType<typeof getPageSeo>) {
  return [
    ['name', 'description', page.description], ['name', 'robots', page.robots],
    ['property', 'og:locale', 'pl_PL'], ['property', 'og:type', page.type], ['property', 'og:site_name', siteName],
    ['property', 'og:title', page.title], ['property', 'og:description', page.description], ['property', 'og:url', page.canonical],
    ['property', 'og:image', page.image], ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description], ['name', 'twitter:image', page.image],
  ];
}

export function updateMetadata(path: string) {
  const page = getPageSeo(path);
  document.title = page.title;
  for (const [attribute, key, value] of metaTags(page)) {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!value) { element?.remove(); continue; }
    if (!element) { element = document.createElement('meta'); element.setAttribute(attribute!, key!); document.head.append(element); }
    element.content = value;
  }
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (page.canonical) {
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = page.canonical;
  } else canonical?.remove();
  let schema = document.getElementById('structured-data');
  if (!schema) { schema = document.createElement('script'); schema.id = 'structured-data'; schema.setAttribute('type', 'application/ld+json'); document.head.append(schema); }
  schema.textContent = JSON.stringify(page.schema).replaceAll('<', '\\u003c');
}
