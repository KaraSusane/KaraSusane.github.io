import { useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Mail,
  Menu,
  Scale,
  ShieldCheck,
  X,
} from 'lucide-react';
import { blogPosts } from './data/blogPosts';
import { legalPages, type LegalPageData } from './data/legalPages';

const contactEmail = 'pismowsprawie@gmail.com';
const tiktokUrl = 'https://www.tiktok.com/@pismowsprawie?_r=1&_t=ZN-97Er7B8gTdW';
const defaultCover = '/karolina-zdrojek.jpg';

const mailto = (subject?: string) =>
  `mailto:${contactEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

const navItems = [
  { label: 'Usługi', href: '/uslugi' },
  { label: 'O mnie', href: '/o-mnie' },
  { label: 'Współpraca', href: '/wspolpraca' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
];

const services = [
  {
    number: '01',
    title: 'Analiza i wycena',
    price: '0 zł',
    description: 'Wstępne sprawdzenie zgłoszenia, dokumentów i możliwego terminu realizacji.',
    details: [
      'Pilna sprawa: cena podstawowa plus 50 procent za tryb szybszej realizacji.',
      'Tryb pilny jest dostępny po wcześniejszym sprawdzeniu terminu i zakresu dokumentów.',
    ],
  },
  {
    number: '02',
    title: 'Pisma',
    price: 'od 149 zł',
    description: 'Pisma, wezwania, wnioski, odwołania i odpowiedzi dopasowane do konkretnej sprawy.',
    details: [
      'Krótkie pismo do dwóch stron: od 149 zł',
      'Odpowiedź na pismo: od 299 zł',
      'Pismo z argumentacją: od 399 zł',
      'Rozbudowane pismo powyżej 4 stron: od 499 zł',
    ],
  },
  {
    number: '03',
    title: 'Umowy',
    price: 'od 299 zł',
    description: 'Umowy gospodarcze i cywilne przygotowane od podstaw lub uporządkowane przed podpisaniem.',
    details: ['Krótka umowa do dwóch stron: od 299 zł', 'Rozbudowana umowa powyżej 4 stron: od 499 zł'],
  },
  {
    number: '04',
    title: 'Doradztwo prawne',
    price: 'od 199 zł',
    description: 'Pisemne wyjaśnienie sytuacji i możliwych dalszych kroków.',
    details: [
      'Pisemna konsultacja lub opracowanie sprawy: od 199 zł',
      'Konsultacja online przez Microsoft Teams JUŻ WKRÓTCE',
    ],
  },
  {
    number: '05',
    title: 'Mediacje',
    price: 'już wkrótce',
    description: 'Wsparcie w spokojnym wypracowaniu rozwiązania akceptowalnego dla stron.',
    details: ['Szczegółowy zakres i terminy pojawią się wkrótce.'],
  },
];

const cooperationSteps = [
  'Najpierw opisujesz sprawę w mailu i przesyłasz istotne dla sprawy dokumenty.',
  'Następnie otrzymujesz wycenę, dodatkowe pytania, zakres usługi i termin realizacji.',
  'Po Twojej akceptacji oraz dokonaniu płatności zabieram się do pracy.',
  'Gotowy materiał otrzymujesz w pliku edytowalnym i PDF.',
  'W cenie otrzymujesz jedną turę poprawek w ustalonym zakresie.',
];

const aboutParagraphs = [
  'Nazywam się Karolina Zdrojek. Jestem prawnikiem i założycielką Pismo w Sprawie, miejsca, w którym prawo ma być nie tylko poprawnie zastosowane, ale przede wszystkim zrozumiałe, konkretne i użyteczne.',
  'W pracy prawniczej szczególną wagę przykładam do słowa. Dobrze napisane pismo, umowa czy odpowiedź nie powinny pozostawiać przestrzeni na domysły. Powinny chronić interes klienta, jasno określać jego stanowisko i prowadzić do konkretnego celu. Dlatego jednym z głównych obszarów mojej praktyki jest analiza, opiniowanie i tworzenie umów oraz dokumentów prawnych, od A do Z.',
  'Moje zainteresowania zawodowe obejmują przede wszystkim prawo medyczne i beauty, prawo AI i reklamy, prawo rolne oraz mediacje. Ukończyłam studia podyplomowe z zakresu prawa medycznego i farmaceutycznego, a jednocześnie stale rozwijam wiedzę na różnych płaszczyznach oraz drążę interesujące mnie ścieżki. Interesuje mnie także działalność edukacyjna, dlatego rozwijam swoje kompetencje w zakresie dydaktyki i przygotowania pedagogicznego, aby w przyszłości jeszcze lepiej dzielić się wiedzą i przekazywać ją w przystępny, uporządkowany sposób.',
  'Doświadczenie zdobywałam, pracując w kancelariach adwokackich i prawnych w Warszawie oraz odbywając liczne praktyki zawodowe. Dzięki temu znam prawo nie tylko od strony akademickiej, wiem również, jak wygląda sprawa z perspektywy osoby, która otrzymuje wezwanie, musi odpowiedzieć kontrahentowi, podpisać umowę, uporządkować dokumentację albo podjąć decyzję, od której mogą zależeć jej dalsze działania.',
];

const SectionHeading = ({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) => (
  <div className="mb-10">
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-8 bg-[#D4AF37]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#86868B]">{eyebrow}</span>
    </div>
    <h1 className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">{title}</h1>
    {children && <div className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-[#424245]">{children}</div>}
  </div>
);

const TikTokCard = ({ className = '' }: { className?: string }) => (
  <a
    href={tiktokUrl}
    target="_blank"
    rel="noreferrer"
    className={`group flex items-center justify-between gap-6 rounded-lg bg-[#1D1D1F] px-6 py-6 text-white transition-transform hover:-translate-y-0.5 ${className}`}
  >
    <div>
      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">TikTok</span>
      <span className="mt-2 block text-xl font-semibold tracking-tight">Znajdziesz mnie na TikToku</span>
    </div>
    <ArrowRight className="h-5 w-5 shrink-0 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
  </a>
);

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 min-h-16 border-b border-gray-100 bg-white/90 px-5 py-3 backdrop-blur-md md:px-8 xl:px-10">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <a href="/" className="flex shrink-0 items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <Scale className="h-5 w-5 text-[#1D1D1F]" />
          <span className="text-sm font-semibold uppercase tracking-tight">Pismo w Sprawie</span>
        </a>

        <div className="hidden items-center gap-6 text-[10px] font-medium uppercase tracking-[0.16em] text-[#86868B] xl:flex">
          {navItems.map((item) => <a key={item.href} href={item.href} className="transition-colors hover:text-[#1D1D1F]">{item.label}</a>)}
        </div>

        <div className="flex items-center gap-2">
          <a href={mailto()} className="hidden rounded-full bg-[#1D1D1F] px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-gray-800 md:inline-flex">Napisz maila</a>
          <button type="button" aria-label="Otwórz menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white xl:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <button type="button" aria-label="Zamknij menu" onClick={() => setIsMenuOpen(false)} className={`fixed inset-0 z-50 bg-[#1D1D1F]/30 backdrop-blur-sm transition-opacity xl:hidden ${isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside aria-hidden={!isMenuOpen} className={`fixed right-0 top-0 z-50 h-dvh w-[min(86vw,360px)] bg-white px-6 py-5 shadow-[-24px_0_80px_rgba(0,0,0,0.16)] transition-transform duration-300 xl:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase">Menu</span>
          <button type="button" aria-label="Zamknij menu" onClick={() => setIsMenuOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-10 flex flex-col gap-2">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-lg px-4 py-4 text-sm font-semibold uppercase tracking-[0.16em] hover:bg-[#FBFBFD]">{item.label}</a>)}
        </div>
        <a href={mailto()} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-7 py-3 text-sm font-medium text-white"><Mail className="h-4 w-4 text-[#D4AF37]" />Napisz maila</a>
      </aside>
    </nav>
  );
};

const Footer = () => (
  <footer className="border-t border-gray-100 bg-white px-5 text-[#1D1D1F] md:px-8">
    <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 py-12 md:flex-row">
      <div>
        <div className="mb-3 flex items-center gap-3"><Scale className="h-5 w-5" /><span className="text-sm font-semibold uppercase">Pismo w Sprawie</span></div>
        <p className="max-w-md font-light text-[#86868B]">Prawne wsparcie, precyzyjne pisma i spokojny proces współpracy.</p>
      </div>
      <div className="flex flex-wrap gap-5 text-sm text-[#424245]">
        {navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-[#1D1D1F]">{item.label}</a>)}
      </div>
    </div>
    <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-gray-100 py-5 text-xs text-[#86868B] md:flex-row md:items-center md:justify-between">
      <span>© Pismo w Sprawie</span>
      <div className="flex flex-wrap gap-4">
        <a href="/polityka-prywatnosci" className="hover:text-[#1D1D1F]">Polityka prywatności</a>
        <a href="/nota-prawna" className="hover:text-[#1D1D1F]">Nota prawna</a>
        <a href="/wazne-informacje" className="hover:text-[#1D1D1F]">Ważne informacje</a>
      </div>
    </div>
  </footer>
);

const PageShell = ({ children }: { children: ReactNode }) => (
  <main className="relative min-h-screen overflow-x-hidden bg-[#FBFBFD] font-sans text-[#1D1D1F] selection:bg-[#D4AF37] selection:text-white">
    <Navigation />
    {children}
    <Footer />
  </main>
);

const Hero = () => (
  <section className="flex min-h-screen items-center bg-[#FBFBFD] px-5 pb-16 pt-28 md:px-8">
    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[420px_1fr]">
      <div className="lg:order-2">
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.32em] text-[#86868B]">WWW.PISMOWSPRAWIE.PL</p>
        <h1 className="text-5xl font-semibold leading-[0.96] tracking-tight md:text-7xl xl:text-8xl">Prawne wsparcie<span className="block text-[#86868B]">Precyzyjne pisma</span></h1>
        <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-[#424245] md:text-xl">Pismo w Sprawie to coś więcej niż wirtualna kancelaria prawna. To relacja oparta o wzajemne porozumienie pomiędzy klientem, a prawnikiem, którego implikacją jest zaoszczędzony czas, estetyczny dokument skrojony na miarę oraz ciągły kontakt i pewność.</p>
        <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
          <a href="/uslugi" className="flex items-center justify-between rounded-lg bg-[#1D1D1F] px-6 py-5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">Sprawdź, jak mogę Ci pomóc<ArrowRight className="h-4 w-4" /></a>
          <a href="/o-mnie" className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-5 text-sm font-medium transition-transform hover:-translate-y-0.5">Krótko o mnie<ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="hero-document-card relative rounded-lg border border-gray-100 bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.06)] lg:order-1 md:p-8">
        <div className="mb-10 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#86868B]">Pismo w Sprawie</span><FileText className="h-6 w-6 text-[#D4AF37]" /></div>
        <div className="space-y-4"><div className="h-2 w-24 rounded-full bg-[#D4AF37]/70" /><div className="h-3 w-4/5 rounded-full bg-[#F0F0F2]" /><div className="h-3 w-2/3 rounded-full bg-[#F0F0F2]" /><div className="space-y-3 pt-8">{['w-full','w-11/12','w-full','w-3/4'].map((width, index) => <div key={index} className={`h-2 ${width} rounded-full bg-[#F5F5F7]`} />)}</div></div>
        <div className="mt-10 flex items-center gap-3 text-sm text-[#424245]"><ShieldCheck className="h-5 w-5 text-[#D4AF37]" />Dokument dopasowany do sprawy, terminu i celu.</div>
      </div>
    </div>
  </section>
);

const HomePage = () => <PageShell><Hero /></PageShell>;

const ServicesPage = () => (
  <PageShell>
    <section className="px-5 pb-24 pt-36 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Usługi" title="Czego potrzebujesz?">Kafelki pokazują pełny zakres i ceny minimalne. Ostateczna wycena zależy od rodzaju sprawy, objętości dokumentów i terminu.</SectionHeading>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.number} className="flex min-h-[350px] flex-col rounded-lg border border-gray-100 bg-white p-7 shadow-[0_16px_48px_rgba(0,0,0,0.04)]">
              <div className="mb-7 flex items-start justify-between"><span className="text-sm font-semibold text-[#D4AF37]">{service.number}</span><span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#86868B]">{service.price}</span></div>
              <h2 className="text-3xl font-semibold tracking-tight">{service.title}</h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-[#424245]">{service.description}</p>
              <ul className="mt-7 space-y-3 border-t border-gray-100 pt-6 text-sm leading-relaxed text-[#424245]">
                {service.details.map((detail) => {
                  const upcomingLabel = 'JUŻ WKRÓTCE';
                  const isUpcoming = detail.endsWith(upcomingLabel);
                  return (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span>
                        {isUpcoming ? detail.slice(0, -upcomingLabel.length).trim() : detail}
                        {isUpcoming && <span className="ml-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#86868B]">{upcomingLabel}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  </PageShell>
);

const CooperationPage = () => (
  <PageShell>
    <section className="px-5 pb-24 pt-36 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Współpraca" title="Jak będzie wyglądała nasza współpraca?" />
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
          <ol className="space-y-5 rounded-lg border border-gray-100 bg-white p-7 md:p-10">
            {cooperationSteps.map((step, index) => <li key={step} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1D1D1F] text-sm text-white">{index + 1}</span><span className="font-light leading-relaxed text-[#424245]">{step}</span></li>)}
          </ol>
          <div className="rounded-lg bg-[#1D1D1F] p-7 text-white md:p-8">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight">Czego nie obejmuje usługa?</h2>
            <div className="space-y-4 font-light leading-relaxed text-white/75">
              <p>Pismo w Sprawie nie jest kancelarią adwokacką ani radcowską. W ramach projektu nie prowadzimy zastępstwa procesowego, nie występujemy przed sądami, urzędami ani innymi instytucjami jako pełnomocnik klienta oraz nie podpisujemy pism w imieniu klienta.</p>
              <p>Przygotowane materiały mają pomóc klientowi w uporządkowaniu sprawy, przedstawieniu stanowiska oraz stworzeniu dokumentu dopasowanego do opisanej sytuacji. Klient samodzielnie decyduje o wykorzystaniu przygotowanego pisma.</p>
              <p>Realizacja usługi nie oznacza gwarancji konkretnego wyniku sprawy.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageShell>
);

const AboutPage = () => (
  <PageShell>
    <section className="px-5 pb-24 pt-36 md:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[420px_1fr]">
        <figure className="hidden overflow-hidden rounded-lg border border-gray-100 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)] lg:block"><img src="/karolina-zdrojek.jpg" alt="Karolina Zdrojek" className="block aspect-[4/5] w-full object-cover object-top" /></figure>
        <div>
          <SectionHeading eyebrow="O mnie" title="Karolina Zdrojek" />
          <div className="flow-root text-lg font-light leading-relaxed text-[#424245]">
            <figure className="float-right mb-4 ml-4 w-[40%] max-w-[160px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.08)] lg:hidden">
              <img src="/karolina-zdrojek.jpg" alt="Karolina Zdrojek" className="block aspect-[4/5] w-full object-cover object-top" />
            </figure>
            <div className="space-y-5">
              {aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <TikTokCard className="mt-8" />
        </div>
      </div>
    </section>
  </PageShell>
);

const formatDate = (date: string) => new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`));

const BlogPage = () => (
  <PageShell>
    <section className="px-5 pb-24 pt-36 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Blog" title="Prawo w życiu codziennym." />
        <TikTokCard className="mb-8" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-lg border border-gray-100 bg-white transition-transform hover:-translate-y-1">
              <img src={post.coverImage || defaultCover} alt={post.coverAlt || post.title} className="aspect-[16/10] w-full object-cover object-top" />
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868B]"><span>{post.category}</span><time>{formatDate(post.publishedAt)}</time></div>
                <h2 className="text-2xl font-semibold leading-tight tracking-tight">{post.title}</h2>
                <p className="mt-4 line-clamp-5 text-sm font-light leading-relaxed text-[#424245]">{post.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Czytaj dalej<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  </PageShell>
);

const renderInline = (text: string) => text.split(/(\*\*.*?\*\*)/g).map((part, index) => part.startsWith('**') && part.endsWith('**') ? <strong key={index} className="font-semibold text-[#1D1D1F]">{part.slice(2, -2)}</strong> : part);

const ArticleContent = ({ content }: { content: string }) => {
  const blocks = content.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  return <div className="space-y-6">{blocks.map((block, index) => {
    if (block.startsWith('## ')) return <h2 key={index} className="pt-5 text-2xl font-semibold tracking-tight md:text-3xl">{block.slice(3)}</h2>;
    if (block.startsWith('- ')) return <ul key={index} className="space-y-2 pl-1">{block.split('\n').map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" /><span>{renderInline(item.replace(/^- /, ''))}</span></li>)}</ul>;
    return <p key={index} className="text-justify text-lg font-light leading-[1.85] text-[#424245]">{renderInline(block)}</p>;
  })}</div>;
};

const ArticlePage = ({ slug }: { slug: string }) => {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return <NotFoundPage />;
  return (
    <PageShell>
      <article className="px-5 pb-24 pt-32 md:px-8">
        <div className="mx-auto max-w-5xl">
          <a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#424245]"><ArrowLeft className="h-4 w-4" />Wróć do bloga</a>
          <img src={post.coverImage || defaultCover} alt={post.coverAlt || post.title} className="max-h-[560px] w-full rounded-lg object-cover object-top" />
          <header className="w-full py-10 md:py-14">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#86868B]">{post.category}</p>
            <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl">{post.title}</h1>
            <div className="mt-6 flex gap-4 text-sm text-[#86868B]"><time>{formatDate(post.publishedAt)}</time><span>{post.readTime} czytania</span></div>
          </header>
          <div className="w-full rounded-lg border border-gray-100 bg-white p-7 md:p-12"><ArticleContent content={post.content} /></div>
        </div>
      </article>
    </PageShell>
  );
};

const ContactPage = () => (
  <PageShell>
    <section className="flex min-h-[80vh] items-center px-5 pb-24 pt-36 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow="Kontakt" title="Porozmawiajmy o Twojej sprawie.">Możesz się ze mną skontaktować, pisząc bezpośrednio na adres mailowy: <strong className="font-semibold">{contactEmail}</strong></SectionHeading>
        <a href={mailto('Zapytanie o współpracę')} className="inline-flex items-center gap-3 rounded-full bg-[#1D1D1F] px-7 py-3 text-sm font-medium text-white hover:bg-gray-800"><Mail className="h-5 w-5 text-[#D4AF37]" />Napisz maila</a>
      </div>
    </section>
  </PageShell>
);

const LegalPage = ({ page }: { page: LegalPageData }) => (
  <PageShell>
    <section className="px-5 pb-24 pt-36 md:px-8">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#424245]"><ArrowLeft className="h-4 w-4" />Wróć na stronę główną</a>
        <SectionHeading eyebrow="Informacje" title={page.title}>{page.intro}</SectionHeading>
        <article className="space-y-9 rounded-lg border border-gray-100 bg-white p-7 md:p-10">
          {page.sections.map((section) => <section key={section.title}><h2 className="mb-4 text-2xl font-semibold tracking-tight">{section.title}</h2><div className="space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="font-light leading-relaxed text-[#424245]">{paragraph}</p>)}</div></section>)}
        </article>
      </div>
    </section>
  </PageShell>
);

const NotFoundPage = () => <PageShell><section className="flex min-h-[75vh] items-center px-5 pt-28"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold text-[#D4AF37]">404</p><h1 className="mt-4 text-5xl font-semibold tracking-tight">Nie znaleziono strony</h1><a href="/" className="mt-8 inline-flex rounded-full bg-[#1D1D1F] px-7 py-3 text-sm text-white">Wróć na stronę główną</a></div></section></PageShell>;

const updateMeta = (title: string, description: string) => {
  document.title = `${title} | Pismo w Sprawie`;
  const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = description;
};

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const articleMatch = path.match(/^\/blog\/([^/]+)$/);
  const article = articleMatch ? blogPosts.find((post) => post.slug === articleMatch[1]) : undefined;

  if (article) {
    updateMeta(article.title, article.excerpt);
    return <ArticlePage slug={article.slug} />;
  }

  const legalPage = legalPages[path];
  if (legalPage) {
    updateMeta(legalPage.title, legalPage.intro);
    return <LegalPage page={legalPage} />;
  }

  const routes: Record<string, { title: string; description: string; page: ReactNode }> = {
    '/': { title: 'Prawne wsparcie. Precyzyjne pisma', description: 'Pisma prawne, umowy i doradztwo przygotowane jasno, konkretnie i z myślą o Twojej sprawie.', page: <HomePage /> },
    '/uslugi': { title: 'Usługi', description: 'Pisma, umowy, analiza sprawy, doradztwo prawne i mediacje.', page: <ServicesPage /> },
    '/wspolpraca': { title: 'Współpraca', description: 'Poznaj jasne zasady współpracy z Pismo w Sprawie.', page: <CooperationPage /> },
    '/o-mnie': { title: 'O mnie', description: 'Karolina Zdrojek, prawnik i założycielka Pismo w Sprawie.', page: <AboutPage /> },
    '/blog': { title: 'Blog prawny', description: 'Praktyczne artykuły o prawie w życiu codziennym.', page: <BlogPage /> },
    '/kontakt': { title: 'Kontakt', description: `Kontakt mailowy: ${contactEmail}.`, page: <ContactPage /> },
  };

  const route = routes[path];
  if (!route) return <NotFoundPage />;
  updateMeta(route.title, route.description);
  return route.page;
}
