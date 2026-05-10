import { useEffect, useMemo, useState, type FC, type MouseEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { StorytellingSection } from './components/StorytellingSection';
import { blogPosts } from './data/blogPosts';
import { serviceCategories, services } from './data/services';
import type { BlogPost, Service } from './types';

const normalizeBasePath = (baseUrl: string) => {
  if (!baseUrl || baseUrl === '/' || baseUrl === './') {
    return '';
  }

  return `/${baseUrl.replace(/^\/+|\/+$/g, '')}`;
};

const appBasePath = normalizeBasePath(import.meta.env.BASE_URL);

const normalizePath = (path: string) => {
  if (!path) {
    return '/';
  }

  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
};

const stripBasePath = (path: string) => {
  const normalizedPath = normalizePath(path);

  if (!appBasePath) {
    return normalizedPath;
  }

  if (normalizedPath === appBasePath) {
    return '/';
  }

  if (normalizedPath.startsWith(`${appBasePath}/`)) {
    return normalizedPath.slice(appBasePath.length) || '/';
  }

  return normalizedPath;
};

const withBasePath = (path: string) => {
  const normalizedPath = normalizePath(path);

  if (!appBasePath) {
    return normalizedPath;
  }

  if (normalizedPath === '/') {
    return `${appBasePath}/`;
  }

  return `${appBasePath}${normalizedPath}`;
};

const navigateTo = (path: string) => {
  const nextPath = withBasePath(path);
  window.history.pushState({}, '', nextPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const groupServicesByCategory = () =>
  serviceCategories.map((category) => ({
    category,
    items: services.filter((service) => service.category === category),
  }));

const contactEmail = 'pismowsprawie@gmail.com';
const contactMailto = (subject: string) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;

type AppLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

const AppLink = ({ href, className, children }: AppLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('/')) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  };

  return (
    <a href={href.startsWith('/') ? withBasePath(href) : href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

const Shell = ({ children }: { children: ReactNode }) => (
  <main className="min-h-screen bg-[#FBFBFD] font-sans text-[#1D1D1F]">
    <Navigation />
    {children}
    <Footer />
  </main>
);

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 min-h-16 bg-white/85 backdrop-blur-md z-50 border-b border-gray-100 flex items-center px-5 md:px-8 xl:px-12 py-3">
    <div className="flex items-center justify-between w-full gap-4 flex-wrap md:flex-nowrap">
      <AppLink href="/" className="flex items-center gap-3 shrink-0">
        <Scale className="text-[#1D1D1F] w-5 h-5" />
        <span className="font-semibold tracking-tight text-sm uppercase">PISMO W SPRAWIE</span>
      </AppLink>

      <div className="order-3 md:order-none w-full md:w-auto flex items-center gap-5 md:gap-7 text-[10px] md:text-xs font-medium uppercase tracking-[0.16em] text-[#86868B]">
        <AppLink href="/uslugi" className="hover:text-[#1D1D1F] transition-colors">
          Usługi
        </AppLink>
        <AppLink href="/blog" className="hover:text-[#1D1D1F] transition-colors">
          Blog
        </AppLink>
        <AppLink href="/kontakt" className="hover:text-[#1D1D1F] transition-colors">
          Kontakt
        </AppLink>
      </div>

      <AppLink
        href={contactMailto('Zapytanie ze strony Pismo w Sprawie')}
        className="hidden lg:inline-flex bg-[#1D1D1F] hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all"
      >
        Skontaktuj się
      </AppLink>
    </div>
  </nav>
);

const PageIntro = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <section className="pt-32 pb-14 px-5 md:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-[1px] bg-[#D4AF37]" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#86868B]">{eyebrow}</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-4xl">{title}</h1>
      <p className="text-lg md:text-xl text-[#424245] font-light leading-relaxed mt-6 max-w-3xl">
        {description}
      </p>
    </div>
  </section>
);

const HomePage = () => (
  <>
    <section className="h-screen flex items-center justify-center pt-16 bg-[#FBFBFD]">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1D1D1F] mb-6 leading-[1.1]">
          Pisma z klasą.<br />
          <span className="text-[#86868B]">Słowa z mocą.</span>
        </h1>
        <p className="text-xl text-[#424245] mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Tworzymy nowoczesne i skuteczne dokumenty prawne. Poznaj proces, który zmienia zawiłe sprawy w precyzyjne argumenty. Zjedź w dół.
        </p>
        <div className="animate-bounce text-[#86868B] mt-12">↓</div>
      </div>
    </section>

    <StorytellingSection />
    <ServicesPreview />
    <BlogPreview />
  </>
);

const ServicesPreview = () => (
  <section className="py-24 px-5 md:px-8 bg-white border-y border-gray-100">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#86868B]">Usługi</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl">
            Pisma dla urzędów, sądów, firm i instytucji.
          </h2>
        </div>
        <AppLink href="/uslugi" className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F]">
          Zobacz wszystkie <ArrowRight className="w-4 h-4" />
        </AppLink>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {services.slice(0, 6).map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  </section>
);

const ServiceCard: FC<{ service: Service }> = ({ service }) => (
  <AppLink
    href={`/uslugi/${service.slug}`}
    className="group block bg-[#FBFBFD] border border-gray-100 rounded-lg p-6 min-h-[220px] hover:bg-white hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)] transition-all"
  >
    <div className="flex items-center justify-between gap-4 mb-8">
      <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#86868B]">{service.lawArea}</span>
      <FileText className="w-5 h-5 text-[#D4AF37]" />
    </div>
    <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-[#000]">{service.title}</h3>
    <p className="text-sm text-[#424245] leading-relaxed font-light mb-6">{service.summary}</p>
    <div className="flex items-end justify-between gap-4 text-sm">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#86868B]">Od</span>
        <span className="font-medium">{service.priceFrom}</span>
      </div>
      <div className="flex items-end gap-3 text-right">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#86868B] max-w-[92px] leading-tight">
          Wycena indywidualna
        </span>
        <ArrowRight className="w-4 h-4 text-[#86868B] group-hover:text-[#1D1D1F] transition-colors shrink-0" />
      </div>
    </div>
  </AppLink>
);

const ServicesPage = () => {
  const grouped = groupServicesByCategory();

  return (
    <>
      <PageIntro
        eyebrow="Zakres usług"
        title="Wybierz pismo, którego potrzebujesz."
        description="Lista pochodzi ze starszego projektu i została przeniesiona do nowego, spokojniejszego stylu. Każda usługa ma osobną podstronę z opisem, procesem i ceną startową."
      />
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-6xl mx-auto space-y-14">
          {grouped.map(({ category, items }) => (
            <div key={category}>
              <div className="flex items-center justify-between gap-6 mb-5">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{category}</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-[#86868B]">{items.length} pozycji</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const ServiceDetailsPage = ({ slug }: { slug: string }) => {
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <NotFoundPage />;
  }

  return (
    <section className="pt-32 pb-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <AppLink href="/uslugi" className="inline-flex items-center gap-2 text-sm font-medium mb-10 text-[#424245]">
          <ArrowLeft className="w-4 h-4" /> Wróć do usług
        </AppLink>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <article>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-white border border-gray-100 text-[10px] uppercase tracking-[0.22em] font-bold text-[#86868B]">
                {service.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1D1D1F] text-white text-[10px] uppercase tracking-[0.22em] font-bold">
                {service.lawArea}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">{service.title}</h1>
            <p className="text-xl text-[#424245] font-light leading-relaxed max-w-3xl mb-10">{service.description}</p>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <InfoPanel title="Co zyskujesz" items={service.benefits} icon={<ShieldCheck className="w-5 h-5" />} />
              <InfoPanel title="Jak przebiega współpraca" items={service.process} numbered icon={<CheckCircle2 className="w-5 h-5" />} />
            </div>
          </article>

          <aside className="bg-white border border-gray-100 rounded-lg p-7 shadow-[0_18px_50px_rgba(0,0,0,0.05)] sticky top-24">
            <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#86868B] mb-3">Cena od</p>
            <p className="text-4xl font-semibold tracking-tight mb-2">od {service.priceFrom}</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#86868B] mb-6">Wycena indywidualna</p>
            <p className="text-sm text-[#424245] leading-relaxed font-light mb-7">
              Finalna cena zależy od liczby dokumentów, stopnia złożoności sprawy i terminu realizacji.
            </p>
            <AppLink
              href={contactMailto('Prośba o wycenę usług Pismo w Sprawie')}
              className="inline-flex w-full items-center justify-center bg-[#1D1D1F] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Zapytaj o wycenę
            </AppLink>
          </aside>
        </div>
      </div>
    </section>
  );
};

const InfoPanel = ({
  title,
  items,
  numbered = false,
  icon,
}: {
  title: string;
  items: string[];
  numbered?: boolean;
  icon: ReactNode;
}) => (
  <section className="bg-white border border-gray-100 rounded-lg p-7">
    <div className="flex items-center gap-3 mb-5">
      <span className="w-9 h-9 rounded-full bg-[#FBFBFD] border border-gray-100 flex items-center justify-center text-[#D4AF37]">
        {icon}
      </span>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    </div>
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 text-sm text-[#424245] leading-relaxed">
          <span className="mt-0.5 text-[#D4AF37] font-semibold">{numbered ? `${index + 1}.` : '•'}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  </section>
);

const BlogPreview = () => (
  <section className="py-24 px-5 md:px-8 bg-[#FBFBFD]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#86868B]">Blog</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl">
            Praktyczne wskazówki przed wysłaniem pisma.
          </h2>
        </div>
        <AppLink href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F]">
          Wszystkie wpisy <ArrowRight className="w-4 h-4" />
        </AppLink>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {blogPosts.slice(0, 2).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  </section>
);

const BlogPage = () => (
  <>
    <PageIntro
      eyebrow="Blog"
      title="Artykuły, które porządkują sprawę przed działaniem."
      description="Krótka baza wiedzy przeniesiona ze starszej wersji strony. Każdy wpis ma osobną podstronę i czytelny układ tekstu."
    />
    <section className="px-5 md:px-8 pb-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  </>
);

const BlogCard: FC<{ post: BlogPost }> = ({ post }) => (
  <AppLink
    href={`/blog/${post.slug}`}
    className="group block bg-white border border-gray-100 rounded-lg p-7 min-h-[240px] hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)] transition-all"
  >
    <div className="flex flex-wrap items-center gap-3 text-xs text-[#86868B] mb-8">
      <span className="px-3 py-1 rounded-full bg-[#FBFBFD] border border-gray-100 uppercase tracking-[0.18em] font-bold">
        {post.category}
      </span>
      <span className="inline-flex items-center gap-2">
        <Clock3 className="w-3.5 h-3.5" />
        {post.readTime} · {formatDate(post.publishedAt)}
      </span>
    </div>
    <h3 className="text-2xl font-semibold tracking-tight leading-tight mb-4">{post.title}</h3>
    <p className="text-[#424245] font-light leading-relaxed mb-6">{post.excerpt}</p>
    <span className="inline-flex items-center gap-2 text-sm font-medium">
      Czytaj <ArrowRight className="w-4 h-4 text-[#86868B] group-hover:text-[#1D1D1F]" />
    </span>
  </AppLink>
);

type ArticleBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'bullets'; items: string[] };

const renderInlineRichText = (text: string) => {
  const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return segments.map((segment, index) => {
    const boldMatch = segment.match(/^\*\*(.+)\*\*$/);

    if (boldMatch) {
      return (
        <strong key={index} className="font-semibold text-[#1D1D1F]">
          {boldMatch[1]}
        </strong>
      );
    }

    return <span key={index}>{segment}</span>;
  });
};

const isHeadingLike = (text: string) => {
  const stripped = text.replace(/^\d+\.\s+/, '').replace(/:\s*$/, '').trim();
  return stripped.length > 0 && stripped.length <= 110 && !/[.!?]$/.test(stripped);
};

const parseArticleBlocks = (content: string): ArticleBlock[] => {
  const lines = content.split('\n');
  const blocks: ArticleBlock[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    const text = paragraphBuffer.join(' ').replace(/\s+/g, ' ').trim();
    if (!text) {
      paragraphBuffer = [];
      return;
    }

    blocks.push(isHeadingLike(text) ? { kind: 'heading', text } : { kind: 'paragraph', text });
    paragraphBuffer = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      const items: string[] = [line.slice(2).trim()];
      while (index + 1 < lines.length && lines[index + 1].trim().startsWith('- ')) {
        index += 1;
        items.push(lines[index].trim().slice(2).trim());
      }
      blocks.push({ kind: 'bullets', items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      blocks.push({ kind: 'heading', text: line.replace(/^\d+\.\s+/, '') });
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  return blocks;
};

const BlogPostPage = ({ slug }: { slug: string }) => {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const blocks = parseArticleBlocks(post.content);

  return (
    <section className="pt-32 pb-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <AppLink href="/blog" className="inline-flex items-center gap-2 text-sm font-medium mb-10 text-[#424245]">
          <ArrowLeft className="w-4 h-4" /> Wróć do bloga
        </AppLink>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[#86868B] mb-6">
          <span className="px-3 py-1 rounded-full bg-white border border-gray-100 uppercase tracking-[0.18em] font-bold">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="w-3.5 h-3.5" />
            {post.readTime} · {formatDate(post.publishedAt)}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-10">{post.title}</h1>
        <article className="bg-white border border-gray-100 rounded-lg p-7 md:p-10 lg:p-12">
          <div className="space-y-7">
            {blocks.map((block, index) => {
              if (block.kind === 'heading') {
                return (
                  <h2 key={`${block.kind}-${index}`} className="pt-2 text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-[#1D1D1F]">
                    {renderInlineRichText(block.text)}
                  </h2>
                );
              }

              if (block.kind === 'bullets') {
                return (
                  <ul key={`${block.kind}-${index}`} className="space-y-3 pl-5">
                    {block.items.map((item, itemIndex) => (
                      <li key={`${index}-${itemIndex}`} className="list-disc text-lg text-[#424245] font-light leading-[1.8]">
                        {renderInlineRichText(item)}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={`${block.kind}-${index}`} className="text-lg text-[#424245] font-light leading-[1.85]">
                  {renderInlineRichText(block.text)}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
};

const ContactPage = () => (
  <>
    <PageIntro
      eyebrow="Kontakt"
      title="Opisz sprawę. Wrócimy z konkretnym kierunkiem."
      description="Sekcja kontaktowa zachowuje charakter nowego projektu: minimum rozpraszaczy, dużo przestrzeni i jasne informacje o kolejnym kroku."
    />
    <section className="px-5 md:px-8 pb-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-6 items-start">
        <div className="bg-white border border-gray-100 rounded-lg p-7 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Co warto przesłać na początku</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Krótki opis sprawy i cel pisma',
              'Termin, jeśli sprawa jest pilna',
              'Dokumenty lub pisma, na które trzeba odpowiedzieć',
            ].map((item, index) => (
              <div key={item} className="border border-gray-100 rounded-lg p-5 bg-[#FBFBFD]">
                <span className="text-[#D4AF37] font-semibold text-sm">0{index + 1}</span>
                <p className="text-sm text-[#424245] leading-relaxed mt-4">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="bg-[#1D1D1F] text-white rounded-lg p-7 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Dane kontaktowe</h2>
          <div className="space-y-5 text-sm">
            <a
              href="mailto:pismowsprawie@gmail.com"
              className="flex items-center gap-3 text-white/85 hover:text-white"
            >
              <Mail className="w-5 h-5 text-[#D4AF37]" />
              pismowsprawie@gmail.com
            </a>
          </div>
          <p className="text-white/55 font-light leading-relaxed mt-8">
            Wiadomość otworzy się od razu w domyślnej aplikacji pocztowej.
          </p>
        </aside>
      </div>
    </section>
  </>
);

const NotFoundPage = () => (
  <section className="min-h-[70vh] flex items-center justify-center px-5 pt-24">
    <div className="max-w-xl text-center">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-5">Nie znaleziono strony</h1>
      <p className="text-[#424245] font-light leading-relaxed mb-8">
        Podana podstrona nie istnieje. Wróć na stronę główną albo przejdź do listy usług.
      </p>
      <AppLink
        href="/"
        className="inline-flex items-center justify-center bg-[#1D1D1F] text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Wróć na start
      </AppLink>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#FBFBFD] text-[#1D1D1F] py-14 border-t border-gray-100 px-5 md:px-8">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-5 h-5" />
          <span className="font-semibold tracking-tight text-sm uppercase">PISMO W SPRAWIE</span>
        </div>
        <p className="text-[#86868B] font-light max-w-md">
          Profesjonalne pisma, uporządkowana argumentacja i spokojny proces współpracy.
        </p>
      </div>
      <div className="flex flex-wrap gap-5 text-sm text-[#424245]">
        <AppLink href="/uslugi" className="hover:text-[#1D1D1F]">Usługi</AppLink>
        <AppLink href="/blog" className="hover:text-[#1D1D1F]">Blog</AppLink>
        <AppLink href="/kontakt" className="hover:text-[#1D1D1F]">Kontakt</AppLink>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [pathname, setPathname] = useState(() => stripBasePath(window.location.pathname));

  useEffect(() => {
    const handlePathChange = () => setPathname(stripBasePath(window.location.pathname));
    window.addEventListener('popstate', handlePathChange);

    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  const page = useMemo(() => {
    if (pathname === '/') return <HomePage />;
    if (pathname === '/uslugi') return <ServicesPage />;
    if (pathname === '/blog') return <BlogPage />;
    if (pathname === '/kontakt') return <ContactPage />;

    if (pathname.startsWith('/uslugi/')) {
      return <ServiceDetailsPage slug={pathname.split('/')[2]} />;
    }

    if (pathname.startsWith('/blog/')) {
      return <BlogPostPage slug={pathname.split('/')[2]} />;
    }

    return <NotFoundPage />;
  }, [pathname]);

  return <Shell>{page}</Shell>;
}
