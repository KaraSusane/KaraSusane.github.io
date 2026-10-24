import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Download, Menu, X } from 'lucide-react';
import { blogPosts } from './data/blogPosts';
import { ebooks, ebookPath, findEbook, type Ebook } from './data/ebooks';
import { AnimatedHero, HomeSections } from './HomeExperience';
import { legalPages, type LegalPageData } from './data/legalPages';
import { services } from './data/services';
import { servicesEnabled } from './data/features';
import { contactEmail, tiktokUrl, defaultCover, mailto, mailCtaLabel, navItems, siteUrl, pageUrl, normalizePath, getPageMetadata, authorName, fullTitle, pageShareImage } from './data/site';
import { blogCategoryPages, categoryPath, findBlogCategory, findCategoryByName, type BlogCategory } from './data/blogCategories';
import { practiceAreas, practiceContent } from './data/practiceAreas';
import { getPageSchema } from './data/seo';
import { ResponsiveImage } from './components/ResponsiveImage';
import { BlogCard, formatDate } from './components/BlogCard';
import { CopyEmailButton } from './components/CopyEmailButton';
import { Envelope, MailSendLink } from './components/MailSend';
import { ArticleProgress } from './components/ArticleProgress';
import { Entrance, entranceStyle } from './components/Entrance';

const cooperationSteps = [
  'Najpierw opisujesz sprawę w mailu i przesyłasz istotne dla sprawy dokumenty.',
  'Następnie otrzymujesz wycenę, dodatkowe pytania, zakres usługi i termin realizacji.',
  'Po Twojej akceptacji oraz dokonaniu płatności zabieram się do pracy.',
  'Gotowy materiał otrzymujesz w pliku edytowalnym i PDF.',
  'W cenie otrzymujesz jedną turę poprawek w ustalonym zakresie.',
];

const aboutParagraphs = [
  'Nazywam się Karolina Zdrojek. Jestem prawnikiem oraz założycielką Pismo w Sprawie, marki prawniczej stworzonej z myślą o osobach i podmiotach, które oczekują od prawa nie tylko poprawności formalnej, ale przede wszystkim precyzji, przejrzystości i realnej użyteczności.',
  'Specjalizuję się w szeroko rozumianym prawie medycznym, a swoje kompetencje w tym obszarze rozwijałam również w ramach ukończonych studiów podyplomowych. W pracy prawniczej szczególne znaczenie ma dla mnie słowo. To właśnie sposób sformułowania stanowiska, konstrukcja zapisów umownych czy precyzja argumentacji często decydują o tym, czy dokument rzeczywiście zabezpiecza interes klienta i spełnia swoją funkcję.',
  'Dlatego jednym z głównych obszarów mojej praktyki jest kompleksowa obsługa dokumentacji prawnej, analiza i opiniowanie umów, identyfikowanie ryzyk prawnych, przygotowywanie projektów dokumentów oraz tworzenie pism i stanowisk od podstaw. Każdy dokument traktuję jako narzędzie, które powinno być nie tylko zgodne z prawem, ale również celowe, przemyślane i dostosowane do konkretnej sytuacji klienta.',
  'Doświadczenie zawodowe zdobywałam, pracując w kancelariach adwokackich i prawnych w Warszawie oraz odbywając liczne praktyki zawodowe. Pozwoliło mi to poznać prawo zarówno od strony merytorycznej, jak i praktycznej z perspektywy realnych spraw, decyzji i konsekwencji, z którymi mierzą się klienci.',
  'Mam świadomość, że sprawa prawna rzadko sprowadza się wyłącznie do interpretacji przepisów. Często oznacza konieczność podjęcia decyzji, odpowiedzi na wezwanie, zabezpieczenia relacji z kontrahentem, oceny ryzyka przed podpisaniem umowy czy uporządkowania dokumentacji w sposób, który pozwoli uniknąć problemów w przyszłości.',
  'W Pismo w Sprawie łączę wiedzę prawniczą z dbałością o język, strukturę i strategię działania. Moim celem jest tworzenie rozwiązań, które dają klientowi jasność sytuacji, poczucie kontroli i solidną podstawę do podejmowania dalszych decyzji.',
];


const Brand = () => <span className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-8 items-center justify-center bg-[#ebc256] px-1.5 py-1"><img src="/logo-pismo-w-sprawie.svg" alt="" width="20" height="32" className="h-full w-full object-contain" /></span><span className="text-sm font-black uppercase text-white">Pismo w Sprawie</span></span>;

const Reveal = ({ children, className = '', delay = 0, x = 0, y = 24, id }: { children: ReactNode; className?: string; delay?: number; x?: number; y?: number; id?: string }) => {
  const reduceMotion = useReducedMotion();
  return <motion.div id={id} className={className} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
};

const SectionHeading = ({ eyebrow, title, children, level = 'h1', titleClassName = 'text-4xl md:text-6xl' }: { eyebrow: string; title: string; children?: ReactNode; level?: 'h1' | 'h2'; titleClassName?: string }) => {
  const Heading = level;
  const Wrapper = level === 'h1' ? Entrance : Reveal;
  return <Wrapper className="relative selection-boundary mb-12 border-l-4 border-[#ebc256] pl-5 md:pl-7"><p className="mb-4 text-xs font-black uppercase text-[#ebc256]">{eyebrow}</p><Heading className={`relative max-w-5xl font-black uppercase leading-[1.02] text-white ${titleClassName}`}>{title}</Heading>{children && <div className="relative mt-6 max-w-3xl text-lg leading-relaxed text-[#c9c9cf]">{children}</div>}</Wrapper>;
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPanel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const panel = menuPanel.current;
    panel?.querySelector<HTMLButtonElement>('button')?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setIsMenuOpen(false); }
      if (event.key !== 'Tab' || !panel) return;
      const focusable = Array.from<HTMLElement>(panel.querySelectorAll<HTMLElement>('a[href], button'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      desktop.removeEventListener('change', closeOnDesktop);
      previousFocus?.focus();
    };
  }, [isMenuOpen]);
  return <><nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111113]/95 px-5 py-3 backdrop-blur-md md:px-8"><div className="relative selection-boundary mx-auto flex max-w-[1500px] items-center justify-between gap-5"><a href="/" onClick={() => setIsMenuOpen(false)}><Brand /></a><div className="hidden items-center gap-7 text-xs font-bold uppercase text-[#b7b7bd] lg:flex">{navItems.map((item) => <a key={item.href} href={item.href} className="transition-colors hover:text-[#ebc256]">{item.label}</a>)}</div><div className="flex items-center gap-2"><MailSendLink href={mailto()} className="hidden items-center gap-2 bg-[#ebc256] px-5 py-3 text-xs font-black uppercase text-[#111113] transition-colors hover:bg-white md:inline-flex"><Envelope className="h-4 w-5" />{mailCtaLabel}</MailSendLink><button type="button" aria-label="Otwórz menu" aria-controls="mobile-menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(true)} className="flex h-11 w-11 items-center justify-center border border-white/20 text-white lg:hidden"><Menu className="h-5 w-5" /></button></div></div></nav><button type="button" tabIndex={-1} aria-hidden="true" aria-label="Zamknij menu" onClick={() => setIsMenuOpen(false)} className={`fixed inset-0 z-40 bg-black/70 transition-opacity lg:hidden ${isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} /><aside id="mobile-menu" ref={menuPanel} role="dialog" aria-label="Menu nawigacyjne" aria-modal={isMenuOpen} inert={!isMenuOpen} aria-hidden={!isMenuOpen} className={`fixed right-0 top-0 z-50 h-dvh w-[min(86vw,360px)] border-l border-white/10 bg-[#17171a] overflow-y-auto p-6 text-white transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}><div className="flex items-center justify-between gap-3"><Brand /><button type="button" aria-label="Zamknij menu" onClick={() => setIsMenuOpen(false)} className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20"><X className="h-5 w-5" /></button></div><div className="mt-10 flex flex-col border-t border-white/10">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="border-b border-white/10 px-2 py-5 text-sm font-bold uppercase hover:text-[#ebc256]">{item.label}</a>)}</div><MailSendLink href={mailto()} className="mt-8 flex w-full items-center justify-center gap-2 bg-[#ebc256] px-6 py-4 text-sm font-black uppercase text-[#111113]"><Envelope className="h-4 w-5" />{mailCtaLabel}</MailSendLink></aside></>;
};

const Footer = () => <footer className="selection-boundary border-t border-white/10 bg-[#0b0b0d] px-5 text-white md:px-8"><div className="relative selection-boundary mx-auto flex max-w-7xl flex-col justify-between gap-10 py-12 md:flex-row"><div><Brand /><p className="mt-4 max-w-md text-sm leading-relaxed text-[#9d9da4]">Precyzyjne pisma. Skuteczne rozwiązania. Profesjonalne wsparcie.</p><p className="mt-2 text-sm text-[#9d9da4]">Działam zdalnie na terenie całej Polski.</p><div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm"><a href={mailto()} className="font-bold text-white underline underline-offset-4 hover:text-[#ebc256]">{contactEmail}</a><CopyEmailButton className="text-xs font-bold text-[#c9c9cf] hover:text-[#ebc256]" /><a href={tiktokUrl} target="_blank" rel="noreferrer" className="text-[#c9c9cf] hover:text-[#ebc256]">TikTok</a></div></div><div className="flex flex-wrap gap-5 text-sm text-[#c9c9cf]">{navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-[#ebc256]">{item.label}</a>)}</div></div><div className="relative selection-boundary mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 py-5 text-xs text-[#7f7f86] md:flex-row md:items-center md:justify-between"><span>© Pismo w Sprawie</span><div className="flex flex-wrap gap-4"><a href="/polityka-prywatnosci/" className="hover:text-white">Polityka prywatności</a><a href="/nota-prawna/" className="hover:text-white">Nota prawna</a><a href="/wazne-informacje/" className="hover:text-white">Ważne informacje</a></div></div></footer>;
const PageShell = ({ children }: { children: ReactNode }) => <div className="relative selection-boundary min-h-screen overflow-x-clip bg-[#111113] font-sans text-white selection:bg-[#ebc256] selection:text-[#111113]"><Navigation /><main className="selection-boundary">{children}</main><Footer /></div>;

const HomePage = () => <PageShell><AnimatedHero /><HomeSections /></PageShell>;

const CooperationSection = () => <section className="mt-24 border-t-4 border-[#ebc256] pt-16"><SectionHeading level="h2" eyebrow="Współpraca" title="Jak będzie wyglądała nasza współpraca?" /><div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]"><Reveal className="relative selection-boundary" x={-28}><ol className="divide-y divide-white/10 border border-white/10 bg-[#17171a]">{cooperationSteps.map((step, index) => <li key={step} className="flex gap-5 p-6 md:p-8"><span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#ebc256] font-black text-[#111113]">{index + 1}</span><span className="leading-relaxed text-[#d8d8dc]">{step}</span></li>)}</ol></Reveal><Reveal x={28} delay={0.1}><aside className="relative selection-boundary border border-white/10 bg-[#29292d] p-6 text-[#c4c4ca] md:p-7"><h2 className="mb-4 text-sm font-black uppercase tracking-wide text-[#e0e0e3]">Czego nie obejmuje usługa?</h2><div className="space-y-3 text-xs leading-relaxed md:text-sm"><p>Pismo w Sprawie nie jest kancelarią adwokacką ani radcowską. Nie prowadzimy zastępstwa procesowego, nie występujemy przed sądami, urzędami ani innymi instytucjami jako pełnomocnik klienta oraz nie podpisujemy pism w imieniu klienta.</p><p>Przygotowane materiały pomagają uporządkować sprawę, przedstawić stanowisko i stworzyć dokument dopasowany do opisanej sytuacji. Klient samodzielnie decyduje o jego wykorzystaniu.</p><p>Realizacja usługi nie oznacza gwarancji konkretnego wyniku sprawy.</p></div></aside></Reveal></div></section>;

const ServicesPage = () => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="relative selection-boundary mx-auto max-w-7xl"><SectionHeading eyebrow="Usługi" title="W czym mogę Ci pomóc?">Ceny są minimalne. Ostateczna wycena zależy od rodzaju sprawy, objętości dokumentów i terminu realizacji.</SectionHeading><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => <article key={service.number} style={entranceStyle(index * 0.06)} className="page-enter relative selection-boundary flex min-h-[350px] flex-col border border-white/10 bg-[#1a1a1e] p-7 transition-colors hover:border-[#ebc256]"><div className="mb-8 flex items-start justify-between border-b border-white/10 pb-5"><span className="text-2xl font-black text-[#ebc256]">{service.number}</span><span className="bg-[#ebc256] px-3 py-2 text-xs font-black uppercase text-[#111113]">{service.price}</span></div><h2 className="text-3xl font-black uppercase">{service.title}</h2><p className="mt-4 text-sm leading-relaxed text-[#b7b7bd]">{service.description}</p><ul className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm leading-relaxed text-[#d1d1d5]">{service.details.map((detail) => { const label = 'JUŻ WKRÓTCE'; const upcoming = detail.endsWith(label); return <li key={detail} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 bg-[#ebc256]" /><span>{upcoming ? detail.slice(0, -label.length).trim() : detail}{upcoming && <span className="ml-2 text-xs font-black uppercase text-[#ebc256]">{label}</span>}</span></li>; })}</ul></article>)}</div><CooperationSection /></div></section></PageShell>;

const PracticePage = () => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="relative selection-boundary mx-auto max-w-7xl"><SectionHeading eyebrow="Praktyka" title="Obszary, w których działam">Każda sprawa jest analizowana indywidualnie, z uwzględnieniem jej celu, ryzyka i dokumentów.</SectionHeading><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{practiceAreas.map((area, index) => {
  const Icon = area.icon;
  const content = practiceContent[area.slug];
  const category = content.category ? findCategoryByName(content.category) : undefined;
  const ebook = ebooks.find(item => item.id === content.ebookId);
  return <article id={area.slug} key={area.title} style={entranceStyle(index * 0.06)} className={`page-enter relative selection-boundary scroll-mt-28 grid min-h-60 gap-y-0 border p-7 md:row-span-6 md:grid-rows-subgrid ${index === 0 ? 'border-[#ebc256] bg-[#ebc256] text-[#111113]' : 'border-white/10 bg-[#1a1a1e] text-white'}`}>
    <Icon className="h-9 w-9" strokeWidth={1.7} />
    <p className={`mb-3 mt-8 text-xs font-black uppercase ${index === 0 ? 'text-[#111113]/60' : 'text-[#ebc256]'}`}>0{index + 1}</p>
    <div className="relative selection-boundary @container min-w-0">
      <h2 className={`font-black uppercase leading-tight ${area.slug === 'legal-tech-i-cyberbezpieczenstwo' ? 'text-xl @[280px]:text-2xl @[340px]:text-3xl' : 'text-3xl'}`}>{area.title}</h2>
    </div>
    <p className={`mt-5 text-sm leading-relaxed ${index === 0 ? 'text-[#111113]/85' : 'text-[#c9c9cf]'}`}>{content.description}</p>
    <p className={`mt-4 text-sm leading-relaxed ${index === 0 ? 'text-[#111113]/75' : 'text-[#b7b7bd]'}`}>{content.examples}</p>
    <div className="mt-6 flex flex-wrap content-start items-start gap-x-5 gap-y-3 text-xs font-black uppercase">
      <a href={servicesEnabled ? '/uslugi/' : mailto(`Zapytanie: ${area.title}`)} className="underline underline-offset-4">{servicesEnabled ? 'Zakres usług' : 'Opisz swoją sprawę'}</a>
      {category && <a href={categoryPath(category)} className="underline underline-offset-4">Artykuły i przykłady</a>}
      {ebook && <a href={ebookPath(ebook)} className="underline underline-offset-4">E-book o RODO</a>}
    </div>
  </article>;
})}</div></div></section></PageShell>;

const AboutPage = () => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="relative selection-boundary mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[390px_1fr]"><Entrance className="order-2 lg:order-1 lg:sticky lg:top-28" x={-28}><figure className="border-t-8 border-[#ebc256] bg-[#1a1a1e]"><ResponsiveImage src="/karolina-zdrojek.jpg" alt="Karolina Zdrojek" width="600" height="750" decoding="async" sizes="(min-width: 1024px) 390px, calc(100vw - 40px)" className="block aspect-[4/5] w-full object-cover object-top" /></figure></Entrance><div className="relative selection-boundary order-1 lg:order-2"><SectionHeading eyebrow="O mnie" title="Karolina Zdrojek" /><Entrance delay={0.1} x={28}><div className="relative selection-boundary space-y-6 text-justify text-lg leading-[1.8] text-[#c9c9cf]">{aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Entrance></div></div></section></PageShell>;

const articleWord = (count: number) => {
  if (count === 1) return 'artykuł';
  const lastDigit = count % 10;
  const lastTwo = count % 100;
  return lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14) ? 'artykuły' : 'artykułów';
};
const blogCategories = ['Wszystkie', ...blogCategoryPages.map(category => category.name)];
const BlogPage = ({ category }: { category?: BlogCategory }) => {
  const reduceMotion = useReducedMotion();
  const activeCategory = category?.name || 'Wszystkie';
  useEffect(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get('kategoria');
    const legacyCategory = requestedCategory ? findCategoryByName(requestedCategory) : undefined;
    if (!category && legacyCategory) {
      window.history.replaceState(null, '', categoryPath(legacyCategory));
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, []);
  const visiblePosts = activeCategory === 'Wszystkie' ? blogPosts : blogPosts.filter((post) => post.category === activeCategory);
  const selectCategory = (name: string) => {
    const selected = findCategoryByName(name);
    const href = selected ? categoryPath(selected) : '/blog/';
    if (window.location.pathname === href) return;
    window.history.pushState(null, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  return <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="relative selection-boundary mx-auto max-w-7xl"><SectionHeading eyebrow="Blog" title={category?.name || "Prawo w życiu codziennym"}>{category && <div className="space-y-4">{category.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{ebooks.filter(ebook => ebook.blogCategory === category.name).map(ebook => <p key={ebook.id}><a href={ebookPath(ebook)} className="inline-flex items-center gap-2 font-bold text-[#ebc256] underline underline-offset-4 hover:text-white">E-book: {ebook.title}<ArrowRight className="h-4 w-4 shrink-0" /></a></p>)}</div>}</SectionHeading><div className="mb-12 border-y border-white/10 py-5"><p className="mb-4 text-[10px] font-black uppercase text-[#77777f]">Wybierz obszar</p><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Kategorie artykułów">{blogCategories.map((category, index) => { const count = category === 'Wszystkie' ? blogPosts.length : blogPosts.filter((post) => post.category === category).length; const active = category === activeCategory; return <a key={category} data-blog-category={category} href={category === 'Wszystkie' ? '/blog/' : categoryPath(findCategoryByName(category)!)} aria-current={active ? 'page' : undefined} onClick={event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      selectCategory(category);
    }} className={`group grid min-h-14 w-full grid-cols-[2rem_1fr_2rem] items-center gap-3 border px-4 py-3 text-left transition-colors ${active ? 'border-[#ebc256] bg-[#ebc256] text-[#111113]' : 'border-white/10 bg-[#17171a] text-white hover:border-[#ebc256]'}`}><span className={`text-[10px] font-black ${active ? 'text-[#111113]/55' : 'text-[#ebc256]'}`}>{String(index + 1).padStart(2, '0')}</span><span className="text-xs font-black uppercase leading-snug">{category}</span><span className={`flex h-7 w-7 items-center justify-center text-[10px] font-black ${active ? 'bg-[#111113] text-white' : 'bg-white/10 text-[#b7b7bd]'}`}>{count}</span></a>; })}</div></div><motion.p layout className="mb-5 text-sm text-[#8f8f96]">{visiblePosts.length} {articleWord(visiblePosts.length)} w kategorii <strong className="text-white">{activeCategory.toLowerCase()}</strong></motion.p><motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"><AnimatePresence mode="popLayout" initial={false}>{visiblePosts.map((post) => <motion.article layout key={post.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: reduceMotion ? 0 : 0.28 }}><BlogCard post={post} /></motion.article>)}</AnimatePresence></motion.div></div></section></PageShell>;
};

// Links to "/..." stay on the site; full addresses open sources in a new tab.
const renderInline = (text: string) => text.split(/(\*\*.*?\*\*|\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\)|\*[^*\n]+\*)/g).map((part, index) => {
  const link = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)]+)\)$/);
  const linkClass = 'font-bold text-[#ebc256] underline decoration-1 underline-offset-4 hover:text-white';
  if (link?.[2].startsWith('/')) return <a key={index} href={link[2]} className={linkClass}>{link[1]}</a>;
  if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer" className={linkClass}>{link[1]}</a>;
  if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="font-black text-white">{part.slice(2, -2)}</strong>;
  if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
  return part;
});
const articleBlocks = (content: string) => content.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
const headingId = (text: string) => text.toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Section anchors shared by the table of contents and the headings themselves.
const articleHeadings = (content: string) => {
  const seen = new Map<string, number>();
  return articleBlocks(content).filter(block => block.startsWith('## ')).map(block => {
    const text = block.slice(3);
    const base = headingId(text) || 'sekcja';
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    return { text, id: count ? `${base}-${count + 1}` : base };
  });
};
const ArticleContent = ({ content }: { content: string }) => { const blocks = articleBlocks(content); const headings = articleHeadings(content); let headingIndex = 0; return <div className="relative selection-boundary space-y-6">{blocks.map((block, index) => { if (block.startsWith('## ')) { const heading = headings[headingIndex++]; return <h2 key={index} id={heading.id} className="scroll-mt-28 border-l-4 border-[#ebc256] pl-4 pt-1 text-2xl font-black uppercase md:text-3xl">{heading.text}</h2>; } if (block.startsWith('> ')) return <div key={index} className="article-letter" role="figure" aria-label="Przykładowe pismo">{block.split(/\n>\s*\n/).map((part, partIndex) => <p key={partIndex}>{part.split('\n').map((line, lineIndex) => <span key={lineIndex}>{lineIndex > 0 && <br />}{renderInline(line.replace(/^>\s?/, ''))}</span>)}</p>)}</div>; if (block.startsWith('**Czytaj też:**')) return <aside key={index} className="border-l-4 border-[#ebc256] bg-[#111113] px-5 py-4 text-base leading-relaxed text-[#d8d8dc]">{renderInline(block)}</aside>; if (block.startsWith('- ')) return <ul key={index} className="space-y-2">{block.split('\n').map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-2 w-2 shrink-0 bg-[#ebc256]" /><span>{renderInline(item.replace(/^- /, ''))}</span></li>)}</ul>; return <p key={index} className="text-justify text-lg leading-[1.85] text-[#c9c9cf]">{renderInline(block)}</p>; })}</div>; };
const ArticleToc = ({ content }: { content: string }) => {
  const headings = articleHeadings(content).filter(heading => !/^bibliografia/i.test(heading.text));
  if (headings.length < 4) return null;
  return <details className="article-toc mb-10 border border-white/10 bg-[#111113]"><summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-black uppercase text-[#ebc256]"><span>W tym artykule · {headings.length} {[2, 3, 4].includes(headings.length % 10) && ![12, 13, 14].includes(headings.length % 100) ? 'sekcje' : 'sekcji'}</span><span className="article-toc-icon" aria-hidden="true" /></summary><nav aria-label="Spis treści" className="border-t border-white/10 px-5 py-4"><ol className="space-y-2 text-sm leading-relaxed">{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`} className="text-[#d8d8dc] underline-offset-4 hover:text-[#ebc256] hover:underline">{heading.text}</a></li>)}</ol></nav></details>;
};
const ArticlePage = ({ slug }: { slug: string }) => { const post = blogPosts.find((item) => item.slug === slug); if (!post) return <NotFoundPage />; const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3); const category = findCategoryByName(post.category); const practiceArea = practiceAreas.find(area => area.slug === category?.practiceId); return <PageShell><ArticleProgress bodyId="article-body" headings={articleHeadings(post.content)} /><article className="px-5 pb-24 pt-32 md:px-8"><div className="relative selection-boundary mx-auto max-w-5xl"><nav aria-label="Okruszki" className="mb-8 text-sm"><ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#8f8f96]"><li><a href="/" className="hover:text-[#ebc256]">Strona główna</a></li><li aria-hidden="true">›</li><li><a href="/blog/" className="hover:text-[#ebc256]">Blog</a></li>{category && <><li aria-hidden="true">›</li><li><a href={categoryPath(category)} className="font-bold text-[#c9c9cf] hover:text-[#ebc256]">{category.name}</a></li></>}</ol></nav><ResponsiveImage src={post.coverImage || defaultCover} alt={post.coverAlt || post.title} width={post.coverWidth} height={post.coverHeight} sizes="(min-width: 1088px) 1024px, calc(100vw - 40px)" fetchPriority="high" decoding="async" className="max-h-[560px] w-full border-b-8 border-[#ebc256] object-cover object-top" /><header className="border-b border-white/10 py-10 md:py-14"><a href={category ? categoryPath(category) : '/blog/'} className="mb-4 inline-flex text-xs font-black uppercase text-[#ebc256] hover:text-white">{post.category}</a><h1 className="text-3xl font-black leading-tight md:text-5xl">{post.title}</h1><div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#8f8f96]"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time><span>{post.readTime} czytania</span>{post.updatedAt && post.updatedAt !== post.publishedAt && <span className="bg-[#ebc256]/10 px-2 font-bold text-[#ebc256]">Zaktualizowano: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span>}<a href="/o-mnie/" rel="author" className="underline underline-offset-4 hover:text-white">{authorName}</a></div></header><div className="relative selection-boundary border-x border-b border-white/10 bg-[#17171a] p-7 md:p-12" id="article-body"><ArticleToc content={post.content} /><ArticleContent content={post.content} /></div><section className="mt-16"><p className="mb-3 text-xs font-black uppercase text-[#ebc256]">Dalsza lektura</p><h2 className="text-3xl font-black md:text-4xl">Przeczytaj również</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{relatedPosts.map((related) => <a key={related.slug} href={`/blog/${related.slug}/`} className="relative selection-boundary group flex min-h-52 flex-col justify-between border border-white/10 bg-[#1a1a1e] p-5 transition-colors hover:border-[#ebc256]"><span className="text-[10px] font-black uppercase text-[#ebc256]">{related.category}</span><h3 className="my-5 text-lg font-black leading-snug">{related.title}</h3><span className="inline-flex items-center gap-2 text-xs font-black uppercase">Czytaj dalej<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></a>)}</div></section><section className="mt-8 grid gap-4 md:grid-cols-2"><a href={practiceArea ? `/praktyka/#${practiceArea.slug}` : category ? categoryPath(category) : '/blog/'} className="relative selection-boundary group flex min-h-44 flex-col justify-between border border-white/15 bg-[#1a1a1e] p-6 hover:border-[#ebc256]"><span className="text-xs font-black uppercase text-[#ebc256]">{practiceArea ? 'Obszar praktyki' : 'Więcej w kategorii'}</span><span className="flex items-end justify-between gap-4 text-2xl font-black">{practiceArea?.title || post.category}<ArrowRight className="h-5 w-5 text-[#ebc256] transition-transform group-hover:translate-x-1" /></span></a><div className="relative selection-boundary flex min-h-44 flex-col justify-between bg-[#ebc256] p-6 text-[#111113]"><span className="text-xs font-black uppercase">Podobna sprawa?</span><div><p className="mb-4 text-xl font-black">{servicesEnabled ? 'Sprawdź zakres usług lub opisz swoją sytuację.' : 'Opisz swoją sytuację.'}</p><div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-black">{servicesEnabled && <a href="/uslugi/" className="underline decoration-2 underline-offset-4">Zobacz usługi</a>}<a href={mailto(`Zapytanie: ${post.category}`)} className="inline-flex items-center gap-2 underline decoration-2 underline-offset-4">{mailCtaLabel}<ArrowRight className="h-4 w-4" /></a></div></div></div></section></div></article></PageShell>; };

const ContactPage = () => <PageShell><section className="flex min-h-[85vh] items-center px-5 pb-24 pt-36 md:px-8"><div className="relative selection-boundary mx-auto w-full max-w-6xl"><SectionHeading eyebrow="Kontakt" title="Porozmawiajmy o Twojej sprawie" titleClassName="text-2xl sm:text-4xl md:text-6xl">Napisz bezpośrednio na adres: <strong className="font-black text-white">{contactEmail}</strong> <CopyEmailButton className="ml-1 align-middle text-sm font-bold text-[#ebc256] underline-offset-4 hover:underline" /></SectionHeading><div className="grid max-w-3xl gap-4 md:grid-cols-2"><Entrance x={-24}><MailSendLink href={mailto('Zapytanie o współpracę')} className="relative selection-boundary group flex min-h-40 flex-col justify-between bg-[#ebc256] p-6 text-[#111113]"><Envelope className="h-8 w-10" /><span className="flex items-end justify-between gap-4 text-xl font-black uppercase"><span className="min-w-0">{mailCtaLabel}</span><ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" /></span></MailSendLink></Entrance><Entrance x={24} delay={0.08}><a href={tiktokUrl} target="_blank" rel="noreferrer" className="relative selection-boundary group flex min-h-40 flex-col justify-between border border-white/20 bg-[#1a1a1e] p-6 text-white"><span className="text-xs font-black uppercase text-[#ebc256]">Social media</span><span className="flex items-end justify-between text-xl font-black uppercase">TikTok<ArrowRight className="h-5 w-5 text-[#ebc256] transition-transform group-hover:translate-x-1" /></span></a></Entrance></div></div></section></PageShell>;

const LegalPage = ({ page }: { page: LegalPageData }) => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="relative selection-boundary mx-auto max-w-4xl"><a href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold uppercase text-[#b7b7bd]"><ArrowLeft className="h-4 w-4" />Wróć na stronę główną</a><SectionHeading eyebrow="Informacje" title={page.title}>{page.intro}</SectionHeading><Entrance delay={0.08}><article className="relative selection-boundary space-y-10 border border-white/10 bg-[#17171a] p-7 md:p-10">{page.sections.map((section) => <section key={section.title}><h2 className="mb-4 border-l-4 border-[#ebc256] pl-4 text-2xl font-black uppercase">{section.title}</h2><div className="space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-relaxed text-[#c9c9cf]">{paragraph}</p>)}</div></section>)}</article></Entrance></div></section></PageShell>;
const NotFoundPage = () => <PageShell><section className="flex min-h-[75vh] items-center px-5 pt-28"><div className="relative selection-boundary mx-auto max-w-3xl text-center"><p className="text-2xl font-black text-[#ebc256]">404</p><h1 className="mt-4 text-5xl font-black uppercase">Nie znaleziono strony</h1><a href="/" className="mt-8 inline-flex bg-[#ebc256] px-7 py-4 text-sm font-black uppercase text-[#111113]">Wróć na stronę główną</a></div></section></PageShell>;

const EbookDownload = ({ ebook }: { ebook: Ebook }) => <a href={ebook.file} download={ebook.file.split('/').at(-1)} aria-label={`Pobierz e-book: ${ebook.title} (PDF, ${ebook.pages} stron)`} className="inline-flex items-center gap-3 bg-[#ebc256] px-6 py-4 text-sm font-black uppercase text-[#111113] transition-colors hover:bg-white"><Download className="h-5 w-5" />Pobierz PDF</a>;

const EbookSummary = ({ ebook, detail = false, priority = detail }: { ebook: Ebook; detail?: boolean; priority?: boolean }) => {
  const Heading = detail ? 'h1' : 'h2';
  return <article id={ebook.id} className="relative selection-boundary grid gap-8 py-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
    <Entrance x={-24}>
      <figure className="relative selection-boundary mx-auto max-w-[260px] md:max-w-none"><img src={ebook.cover} alt={`Okładka e-booka: ${ebook.title}`} width={ebook.coverWidth} height={ebook.coverHeight} decoding="async" {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })} className="block h-auto w-full border border-white/15" /></figure>
    </Entrance>
    <Entrance delay={0.08} x={24} className="relative selection-boundary min-w-0">
      <p className="mb-4 text-xs font-black uppercase text-[#ebc256]">{ebook.category}</p>
      <Heading className="max-w-3xl text-2xl font-black leading-tight md:text-3xl">{detail ? ebook.title : <a href={ebookPath(ebook)} className="transition-colors hover:text-[#ebc256]">{ebook.title}</a>}</Heading>
      <p className="mt-4 text-sm text-[#b7b7bd]"><a href="/o-mnie/" rel="author" className="underline underline-offset-4 hover:text-white">{ebook.author}</a></p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-white/10 py-4 text-sm text-[#c9c9cf]"><span>PDF</span><span>{ebook.pages} stron</span><span>Stan prawny: {ebook.legalState}</span></div>
      <p className="mt-6 max-w-3xl leading-relaxed text-[#c9c9cf]">{ebook.description}</p>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#c9c9cf]">{ebook.topics.map(topic => <li key={topic} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#ebc256]" /><span>{topic}</span></li>)}</ul>
      <div className="mt-8 flex flex-wrap items-center gap-5"><EbookDownload ebook={ebook} />{!detail && <a href={ebookPath(ebook)} className="inline-flex items-center gap-2 text-sm font-black text-white underline underline-offset-4 hover:text-[#ebc256]">Poznaj e-book<ArrowRight className="h-4 w-4" /></a>}</div>
      <p className="mt-5 text-xs leading-relaxed text-[#9d9da4]">Plik z ograniczeniami kopiowania i edycji. Drukowanie jest dozwolone.</p>
      <p className="mt-2 text-xs leading-relaxed text-[#9d9da4]">© {ebook.copyrightYear} {ebook.author}. Wszelkie prawa zastrzeżone. <a href="/nota-prawna/" className="underline underline-offset-4 hover:text-white">Prawa autorskie</a></p>
    </Entrance>
  </article>;
};

const EbooksPage = () => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="relative selection-boundary mx-auto max-w-7xl">
  <SectionHeading eyebrow="Publikacje" title="E-booki i kursy" />
  <div className="divide-y divide-white/10 border-y border-white/10">{ebooks.map((ebook, index) => <div key={ebook.id}><EbookSummary ebook={ebook} priority={index === 0} /></div>)}</div>
</div></section></PageShell>;

const EbookPage = ({ ebook }: { ebook: Ebook }) => <PageShell><section className="px-5 pb-24 pt-32 md:px-8"><div className="relative selection-boundary mx-auto max-w-7xl">
  <a href="/e-booki/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase text-[#b7b7bd] hover:text-[#ebc256]"><ArrowLeft className="h-4 w-4" />Wróć do e-booków</a>
  <div className="border-y border-white/10"><EbookSummary ebook={ebook} detail /></div>
  <nav aria-label="Informacje o e-booku" className="flex flex-wrap gap-x-6 gap-y-4 border-b border-white/10 py-6 text-sm font-bold text-[#c9c9cf]">{[
    ['#o-ebooku', 'O e-booku'], ['#spis-tresci', 'Spis treści'], ['#fragment', 'Przeczytaj fragment'], ['#autorka', 'Autorka'],
  ].map(([href, label]) => <a key={href} href={href} className="underline underline-offset-4 hover:text-[#ebc256]">{label}</a>)}</nav>
  <div className="relative selection-boundary max-w-4xl space-y-14 pt-14">
    <section id="o-ebooku" className="scroll-mt-28"><h2 className="mb-6 text-2xl font-black md:text-3xl">{ebook.aboutTitle}</h2><div className="relative selection-boundary space-y-5 leading-relaxed text-[#c9c9cf]">{ebook.details.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><h3 className="mb-3 mt-8 text-xl font-black">Dla kogo jest ten przewodnik?</h3><p className="leading-relaxed text-[#c9c9cf]">{ebook.audience}</p></section>
    <section id="spis-tresci" className="scroll-mt-28"><h2 className="mb-6 text-2xl font-black md:text-3xl">Spis treści</h2>
      <ol className="divide-y divide-white/10 border-y border-white/10">{ebook.chapters.map((chapter, index) => <li key={chapter.title} className="flex items-baseline gap-3 py-4 text-sm leading-relaxed"><span className="w-6 shrink-0 font-black tabular-nums text-[#ebc256]">{index + 1}.</span><span className="min-w-0 flex-1 text-[#d8d8dc]">{chapter.title}</span><span className="w-12 shrink-0 text-right tabular-nums text-[#9d9da4]">str. {chapter.page}</span></li>)}</ol>
      <ul className="mt-4 space-y-3">{ebook.appendices.map(item => <li key={item.title} className="flex justify-between gap-4 text-sm text-[#c9c9cf]"><span>{item.title}</span><span className="shrink-0 tabular-nums text-[#9d9da4]">str. {item.page}</span></li>)}</ul>
      <h3 className="mb-4 mt-8 text-xl font-black">Checklisty w publikacji</h3><ul className="space-y-3 text-sm text-[#c9c9cf]">{ebook.checklists.map(title => <li key={title} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#ebc256]" /><span>{title}</span></li>)}</ul>
    </section>
    <section id="fragment" className="scroll-mt-28"><h2 className="mb-6 text-2xl font-black md:text-3xl">Przeczytaj fragment</h2><blockquote cite={`${ebook.file}#page=${ebook.sample.page}`} className="border-l-4 border-[#ebc256] pl-5 md:pl-7"><h3 className="mb-5 text-xl font-black">{ebook.sample.title}</h3><div className="relative selection-boundary space-y-5 text-justify leading-[1.8] text-[#c9c9cf]">{ebook.sample.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><footer className="mt-6 text-xs text-[#9d9da4]"><a href={`${ebook.file}#page=${ebook.sample.page}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">Fragment e-booka, str. {ebook.sample.page}.</a></footer></blockquote></section>
    <section id="autorka" className="scroll-mt-28"><h2 className="mb-5 text-2xl font-black md:text-3xl">Autorka</h2><p className="leading-relaxed text-[#c9c9cf]">{ebook.author} jest prawnikiem i założycielką Pismo w Sprawie. W swojej pracy zajmuje się dokumentacją prawną, analizą umów i przygotowywaniem pism.</p><a href="/o-mnie/" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#ebc256] underline underline-offset-4 hover:text-white">Poznaj autorkę<ArrowRight className="h-4 w-4" /></a></section>
    <section className="border-t border-white/10 pt-8"><h2 className="mb-5 text-2xl font-black">Cały przewodnik w PDF</h2><EbookDownload ebook={ebook} /><p className="mt-4 text-xs leading-relaxed text-[#9d9da4]">{ebook.pages} stron. Plik z ograniczeniami kopiowania i edycji. Drukowanie jest dozwolone.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">{ebook.relatedLinks.map(link => <a key={link.href} href={link.href} className="underline underline-offset-4 hover:text-[#ebc256]">{link.label}</a>)}</div></section>
  </div>
</div></section></PageShell>;

const routePages: Record<string, ComponentType> = {
  '/': HomePage,
  ...(servicesEnabled ? { '/uslugi': ServicesPage } : {}),
  '/praktyka': PracticePage,
  '/o-mnie': AboutPage,
  '/blog': BlogPage,
  '/kontakt': ContactPage,
  '/e-booki': EbooksPage,
};

export default function App({ pathname = '/' }: { pathname?: string }) {
  const [currentPath, setCurrentPath] = useState(pathname);
  useEffect(() => {
    const syncPath = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', syncPath);
    syncPath();
    return () => window.removeEventListener('popstate', syncPath);
  }, []);
  const path = normalizePath(currentPath);
  const category = findBlogCategory(path);
  const article = blogPosts.find(post => path === `/blog/${post.slug}`);
  const ebook = findEbook(path);
  const legalPage = legalPages[path];
  const Page = routePages[path];
  const metadata = getPageMetadata(path);
  const { title, description, noindex = false } = metadata;
  const image = pageShareImage(metadata);
  useEffect(() => {
    const completeTitle = fullTitle(title);
    document.title = completeTitle;
    const values = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': completeTitle,
      'meta[property="og:type"]': article ? 'article' : 'website',
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': pageUrl(path),
      'meta[property="og:image"]': `${siteUrl}${image.url}`,
      'meta[property="og:image:width"]': String(image.width ?? ''),
      'meta[property="og:image:height"]': String(image.height ?? ''),
      'meta[property="og:image:alt"]': image.alt,
      'meta[name="twitter:image:alt"]': image.alt,
      'meta[name="twitter:title"]': completeTitle,
      'meta[name="twitter:description"]': description,
      'meta[name="twitter:image"]': `${siteUrl}${image.url}`,
      'meta[name="robots"]': noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    };
    for (const [selector, content] of Object.entries(values)) {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.content = content;
    }
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      if (noindex) canonical.remove();
      else canonical.href = pageUrl(path);
    }
    if (noindex) {
      document.querySelector('meta[property="og:url"]')?.remove();
      document.querySelector('#structured-data')?.remove();
    } else {
      const schema = getPageSchema(path);
      const script = document.querySelector<HTMLScriptElement>('#structured-data');
      if (script && schema) script.textContent = JSON.stringify(schema);
    }
  }, [title, description, image.url, image.width, image.height, image.alt, noindex, path]);
  if (category || path === '/blog') return <BlogPage category={category} />;
  if (article) return <ArticlePage slug={article.slug} />;
  if (ebook) return <EbookPage ebook={ebook} />;
  if (legalPage) return <LegalPage page={legalPage} />;
  return Page ? <Page /> : <NotFoundPage />;
}
