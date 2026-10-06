import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Building2, Gavel, Handshake, Mail, Menu,
  ScrollText, Sparkles, Stethoscope, Wheat, X, type LucideIcon,
} from 'lucide-react';
import { blogPosts } from './data/blogPosts';
import { AnimatedHero, HomeSections } from './HomeExperience';
import { legalPages, type LegalPageData } from './data/legalPages';
import { services } from './data/services';
import { contactEmail, tiktokUrl, defaultCover, mailto, navItems, siteName, siteUrl, pageUrl, normalizePath, getPageMetadata } from './data/site';
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

const practiceAreas: Array<{ title: string; slug: string; icon: LucideIcon }> = [
  { title: 'Prawo medyczne', slug: 'prawo-medyczne', icon: Stethoscope }, { title: 'Prawo beauty', slug: 'prawo-beauty', icon: Sparkles },
  { title: 'Prawo nieruchomości', slug: 'prawo-nieruchomosci', icon: Building2 }, { title: 'Prawo spadkowe', slug: 'prawo-spadkowe', icon: ScrollText },
  { title: 'Prawo rolne', slug: 'prawo-rolne', icon: Wheat }, { title: 'Mediacje', slug: 'mediacje', icon: Handshake },
  { title: 'Prawo karne', slug: 'prawo-karne', icon: Gavel },
];

const categoryPracticeIds: Record<string, string> = {
  'Prawo medyczne': 'prawo-medyczne', 'Prawo spadkowe': 'prawo-spadkowe',
  'Prawo rolne': 'prawo-rolne', Mediacje: 'mediacje',
};

const Brand = () => <span className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-8 items-center justify-center bg-[#ebc256] px-1.5 py-1"><img src="/logo-pismo-w-sprawie.svg" alt="" width="20" height="32" className="h-full w-full object-contain" /></span><span className="text-sm font-black uppercase text-white">Pismo w Sprawie</span></span>;

const Reveal = ({ children, className = '', delay = 0, x = 0, y = 24, id }: { children: ReactNode; className?: string; delay?: number; x?: number; y?: number; id?: string }) => {
  const reduceMotion = useReducedMotion();
  return <motion.div id={id} className={className} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
};

const SectionHeading = ({ eyebrow, title, children, level = 'h1', titleClassName = 'text-4xl md:text-6xl' }: { eyebrow: string; title: string; children?: ReactNode; level?: 'h1' | 'h2'; titleClassName?: string }) => {
  const Heading = level;
  const Wrapper = level === 'h1' ? Entrance : Reveal;
  return <Wrapper className="mb-12 border-l-4 border-[#ebc256] pl-5 md:pl-7"><p className="mb-4 text-xs font-black uppercase text-[#ebc256]">{eyebrow}</p><Heading className={`max-w-5xl font-black uppercase leading-[1.02] text-white ${titleClassName}`}>{title}</Heading>{children && <div className="mt-6 max-w-3xl text-lg leading-relaxed text-[#c9c9cf]">{children}</div>}</Wrapper>;
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
  return <><nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111113]/95 px-5 py-3 backdrop-blur-md md:px-8"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5"><a href="/" onClick={() => setIsMenuOpen(false)}><Brand /></a><div className="hidden items-center gap-7 text-xs font-bold uppercase text-[#b7b7bd] lg:flex">{navItems.map((item) => <a key={item.href} href={item.href} className="transition-colors hover:text-[#ebc256]">{item.label}</a>)}</div><div className="flex items-center gap-2"><a href={mailto()} className="hidden items-center gap-2 bg-[#ebc256] px-5 py-3 text-xs font-black uppercase text-[#111113] transition-colors hover:bg-white md:inline-flex"><Mail className="h-4 w-4" />Napisz maila</a><button type="button" aria-label="Otwórz menu" aria-controls="mobile-menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(true)} className="flex h-11 w-11 items-center justify-center border border-white/20 text-white lg:hidden"><Menu className="h-5 w-5" /></button></div></div></nav><button type="button" tabIndex={-1} aria-hidden="true" aria-label="Zamknij menu" onClick={() => setIsMenuOpen(false)} className={`fixed inset-0 z-40 bg-black/70 transition-opacity lg:hidden ${isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} /><aside id="mobile-menu" ref={menuPanel} role="dialog" aria-label="Menu nawigacyjne" aria-modal={isMenuOpen} inert={!isMenuOpen} aria-hidden={!isMenuOpen} className={`fixed right-0 top-0 z-50 h-dvh w-[min(86vw,360px)] border-l border-white/10 bg-[#17171a] overflow-y-auto p-6 text-white transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}><div className="flex items-center justify-between gap-3"><Brand /><button type="button" aria-label="Zamknij menu" onClick={() => setIsMenuOpen(false)} className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20"><X className="h-5 w-5" /></button></div><div className="mt-10 flex flex-col border-t border-white/10">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="border-b border-white/10 px-2 py-5 text-sm font-bold uppercase hover:text-[#ebc256]">{item.label}</a>)}</div><a href={mailto()} className="mt-8 flex w-full items-center justify-center gap-2 bg-[#ebc256] px-6 py-4 text-sm font-black uppercase text-[#111113]"><Mail className="h-4 w-4" />Napisz maila</a></aside></>;
};

const Footer = () => <footer className="border-t border-white/10 bg-[#0b0b0d] px-5 text-white md:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 py-12 md:flex-row"><div><Brand /><p className="mt-4 max-w-md text-sm leading-relaxed text-[#9d9da4]">Precyzyjne pisma. Skuteczne rozwiązania. Profesjonalne wsparcie.</p></div><div className="flex flex-wrap gap-5 text-sm text-[#c9c9cf]">{navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-[#ebc256]">{item.label}</a>)}</div></div><div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 py-5 text-xs text-[#7f7f86] md:flex-row md:items-center md:justify-between"><span>© Pismo w Sprawie</span><div className="flex flex-wrap gap-4"><a href="/polityka-prywatnosci/" className="hover:text-white">Polityka prywatności</a><a href="/nota-prawna/" className="hover:text-white">Nota prawna</a><a href="/wazne-informacje/" className="hover:text-white">Ważne informacje</a></div></div></footer>;
const PageShell = ({ children }: { children: ReactNode }) => <div className="relative min-h-screen overflow-x-clip bg-[#111113] font-sans text-white selection:bg-[#ebc256] selection:text-[#111113]"><Navigation /><main>{children}</main><Footer /></div>;

const HomePage = () => <PageShell><AnimatedHero /><HomeSections /></PageShell>;

const CooperationSection = () => <section className="mt-24 border-t-4 border-[#ebc256] pt-16"><SectionHeading level="h2" eyebrow="Współpraca" title="Jak będzie wyglądała nasza współpraca?" /><div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]"><Reveal x={-28}><ol className="divide-y divide-white/10 border border-white/10 bg-[#17171a]">{cooperationSteps.map((step, index) => <li key={step} className="flex gap-5 p-6 md:p-8"><span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#ebc256] font-black text-[#111113]">{index + 1}</span><span className="leading-relaxed text-[#d8d8dc]">{step}</span></li>)}</ol></Reveal><Reveal x={28} delay={0.1}><aside className="border border-white/10 bg-[#29292d] p-6 text-[#c4c4ca] md:p-7"><h2 className="mb-4 text-sm font-black uppercase tracking-wide text-[#e0e0e3]">Czego nie obejmuje usługa?</h2><div className="space-y-3 text-xs leading-relaxed md:text-sm"><p>Pismo w Sprawie nie jest kancelarią adwokacką ani radcowską. Nie prowadzimy zastępstwa procesowego, nie występujemy przed sądami, urzędami ani innymi instytucjami jako pełnomocnik klienta oraz nie podpisujemy pism w imieniu klienta.</p><p>Przygotowane materiały pomagają uporządkować sprawę, przedstawić stanowisko i stworzyć dokument dopasowany do opisanej sytuacji. Klient samodzielnie decyduje o jego wykorzystaniu.</p><p>Realizacja usługi nie oznacza gwarancji konkretnego wyniku sprawy.</p></div></aside></Reveal></div></section>;

const ServicesPage = () => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Usługi" title="W czym mogę Ci pomóc?">Ceny są minimalne. Ostateczna wycena zależy od rodzaju sprawy, objętości dokumentów i terminu realizacji.</SectionHeading><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => <article key={service.number} style={entranceStyle(index * 0.06)} className="page-enter flex min-h-[350px] flex-col border border-white/10 bg-[#1a1a1e] p-7 transition-colors hover:border-[#ebc256]"><div className="mb-8 flex items-start justify-between border-b border-white/10 pb-5"><span className="text-2xl font-black text-[#ebc256]">{service.number}</span><span className="bg-[#ebc256] px-3 py-2 text-xs font-black uppercase text-[#111113]">{service.price}</span></div><h2 className="text-3xl font-black uppercase">{service.title}</h2><p className="mt-4 text-sm leading-relaxed text-[#b7b7bd]">{service.description}</p><ul className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm leading-relaxed text-[#d1d1d5]">{service.details.map((detail) => { const label = 'JUŻ WKRÓTCE'; const upcoming = detail.endsWith(label); return <li key={detail} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 bg-[#ebc256]" /><span>{upcoming ? detail.slice(0, -label.length).trim() : detail}{upcoming && <span className="ml-2 text-xs font-black uppercase text-[#ebc256]">{label}</span>}</span></li>; })}</ul></article>)}</div><CooperationSection /></div></section></PageShell>;

const PracticePage = () => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Praktyka" title="Obszary, w których działam">Każda sprawa jest analizowana indywidualnie, z uwzględnieniem jej celu, ryzyka i dokumentów.</SectionHeading><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{practiceAreas.map((area, index) => { const Icon = area.icon; return <article id={area.slug} key={area.title} style={entranceStyle(index * 0.06)} className={`page-enter scroll-mt-28 flex min-h-60 flex-col justify-between border p-7 ${index === 0 ? 'border-[#ebc256] bg-[#ebc256] text-[#111113]' : 'border-white/10 bg-[#1a1a1e] text-white'}`}><Icon className="h-9 w-9" strokeWidth={1.7} /><div><p className={`mb-3 text-xs font-black uppercase ${index === 0 ? 'text-[#111113]/60' : 'text-[#ebc256]'}`}>0{index + 1}</p><h2 className="text-3xl font-black uppercase leading-tight">{area.title}</h2></div></article>; })}</div></div></section></PageShell>;

const AboutPage = () => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[390px_1fr]"><Entrance className="order-2 lg:order-1 lg:sticky lg:top-28" x={-28}><figure className="border-t-8 border-[#ebc256] bg-[#1a1a1e]"><img src="/karolina-zdrojek.jpg" alt="Karolina Zdrojek" width="600" height="750" className="block aspect-[4/5] w-full object-cover object-top" /></figure></Entrance><div className="order-1 lg:order-2"><SectionHeading eyebrow="O mnie" title="Karolina Zdrojek" /><Entrance delay={0.1} x={28}><div className="space-y-6 text-justify text-lg leading-[1.8] text-[#c9c9cf]">{aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Entrance></div></div></section></PageShell>;

const formatDate = (date: string) => new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
const blogCategories = ['Wszystkie', ...Array.from(new Set(blogPosts.map((post) => post.category)))];
const BlogCard = ({ post }: { post: (typeof blogPosts)[number] }) => <a href={`/blog/${post.slug}/`} className="group block h-full overflow-hidden border border-white/10 bg-[#1a1a1e] transition-colors hover:border-[#ebc256]"><img src={post.coverImage || defaultCover} alt={post.coverAlt || post.title} className="aspect-[16/10] w-full object-cover object-top" /><div className="border-t-4 border-[#ebc256] p-6"><div className="mb-4 flex items-center justify-between gap-3 text-xs font-bold uppercase text-[#ebc256]"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div><h2 className="text-2xl font-black leading-tight">{post.title}</h2><p className="mt-4 line-clamp-5 text-sm leading-relaxed text-[#b7b7bd]">{post.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase">Czytaj dalej<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></a>;
const BlogPage = () => {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  useEffect(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get('kategoria');
    if (requestedCategory && blogCategories.includes(requestedCategory)) setActiveCategory(requestedCategory);
  }, []);
  const visiblePosts = activeCategory === 'Wszystkie' ? blogPosts : blogPosts.filter((post) => post.category === activeCategory);
  const selectCategory = (category: string) => { setActiveCategory(category); window.history.replaceState(null, '', category === 'Wszystkie' ? '/blog/' : `/blog/?kategoria=${encodeURIComponent(category)}`); };
  return <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Blog" title="Prawo w życiu codziennym" /><div className="mb-12 border-y border-white/10 py-5"><p className="mb-4 text-[10px] font-black uppercase text-[#77777f]">Wybierz obszar</p><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Kategorie artykułów">{blogCategories.map((category, index) => { const count = category === 'Wszystkie' ? blogPosts.length : blogPosts.filter((post) => post.category === category).length; const active = category === activeCategory; return <button key={category} type="button" aria-pressed={active} onClick={() => selectCategory(category)} className={`group grid min-h-14 w-full grid-cols-[2rem_1fr_2rem] items-center gap-3 border px-4 py-3 text-left transition-colors ${active ? 'border-[#ebc256] bg-[#ebc256] text-[#111113]' : 'border-white/10 bg-[#17171a] text-white hover:border-[#ebc256]'}`}><span className={`text-[10px] font-black ${active ? 'text-[#111113]/55' : 'text-[#ebc256]'}`}>{String(index + 1).padStart(2, '0')}</span><span className="text-xs font-black uppercase leading-snug">{category}</span><span className={`flex h-7 w-7 items-center justify-center text-[10px] font-black ${active ? 'bg-[#111113] text-white' : 'bg-white/10 text-[#b7b7bd]'}`}>{count}</span></button>; })}</div></div><motion.p layout className="mb-5 text-sm text-[#8f8f96]">{visiblePosts.length} {visiblePosts.length === 1 ? 'artykuł' : visiblePosts.length < 5 ? 'artykuły' : 'artykułów'} w kategorii <strong className="text-white">{activeCategory.toLowerCase()}</strong></motion.p><motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"><AnimatePresence mode="popLayout">{visiblePosts.map((post) => <motion.article layout key={post.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: reduceMotion ? 0 : 0.28 }}><BlogCard post={post} /></motion.article>)}</AnimatePresence></motion.div></div></section></PageShell>;
};

const renderInline = (text: string) => text.split(/(\*\*.*?\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\)|\*[^*\n]+\*)/g).map((part, index) => {
  if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="font-black text-white">{part.slice(2, -2)}</strong>;
  const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
  if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer" className="font-bold text-[#ebc256] underline decoration-1 underline-offset-4 hover:text-white">{link[1]}</a>;
  if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
  return part;
});
const ArticleContent = ({ content }: { content: string }) => { const blocks = content.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean); return <div className="space-y-6">{blocks.map((block, index) => { if (block.startsWith('## ')) return <h2 key={index} className="border-l-4 border-[#ebc256] pl-4 pt-1 text-2xl font-black uppercase md:text-3xl">{block.slice(3)}</h2>; if (block.startsWith('- ')) return <ul key={index} className="space-y-2">{block.split('\n').map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-2 w-2 shrink-0 bg-[#ebc256]" /><span>{renderInline(item.replace(/^- /, ''))}</span></li>)}</ul>; return <p key={index} className="text-justify text-lg leading-[1.85] text-[#c9c9cf]">{renderInline(block)}</p>; })}</div>; };
const ArticlePage = ({ slug }: { slug: string }) => { const post = blogPosts.find((item) => item.slug === slug); if (!post) return <NotFoundPage />; const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3); const practiceId = categoryPracticeIds[post.category]; return <PageShell><article className="px-5 pb-24 pt-32 md:px-8"><div className="mx-auto max-w-5xl"><a href="/blog/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase text-[#b7b7bd] hover:text-[#ebc256]"><ArrowLeft className="h-4 w-4" />Wróć do bloga</a><img src={post.coverImage || defaultCover} alt={post.coverAlt || post.title} className="max-h-[560px] w-full border-b-8 border-[#ebc256] object-cover object-top" /><header className="border-b border-white/10 py-10 md:py-14"><a href={`/blog/?kategoria=${encodeURIComponent(post.category)}`} className="mb-4 inline-flex text-xs font-black uppercase text-[#ebc256] hover:text-white">{post.category}</a><h1 className="text-4xl font-black uppercase leading-[1.03] md:text-6xl">{post.title}</h1><div className="mt-6 flex gap-4 text-sm text-[#8f8f96]"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time><span>{post.readTime} czytania</span></div></header><div className="border-x border-b border-white/10 bg-[#17171a] p-7 md:p-12"><ArticleContent content={post.content} /></div><section className="mt-16"><p className="mb-3 text-xs font-black uppercase text-[#ebc256]">Dalsza lektura</p><h2 className="text-3xl font-black md:text-4xl">Przeczytaj również</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{relatedPosts.map((related) => <a key={related.slug} href={`/blog/${related.slug}/`} className="group flex min-h-52 flex-col justify-between border border-white/10 bg-[#1a1a1e] p-5 transition-colors hover:border-[#ebc256]"><span className="text-[10px] font-black uppercase text-[#ebc256]">{related.category}</span><h3 className="my-5 text-lg font-black leading-snug">{related.title}</h3><span className="inline-flex items-center gap-2 text-xs font-black uppercase">Czytaj dalej<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></a>)}</div></section><section className="mt-8 grid gap-4 md:grid-cols-2"><a href={practiceId ? `/praktyka/#${practiceId}` : '/praktyka/'} className="group flex min-h-44 flex-col justify-between border border-white/15 bg-[#1a1a1e] p-6 hover:border-[#ebc256]"><span className="text-xs font-black uppercase text-[#ebc256]">Obszar praktyki</span><span className="flex items-end justify-between text-2xl font-black">{post.category}<ArrowRight className="h-5 w-5 text-[#ebc256] transition-transform group-hover:translate-x-1" /></span></a><div className="flex min-h-44 flex-col justify-between bg-[#ebc256] p-6 text-[#111113]"><span className="text-xs font-black uppercase">Podobna sprawa?</span><div><p className="mb-4 text-xl font-black">Sprawdź zakres usług lub opisz swoją sytuację.</p><div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-black"><a href="/uslugi/" className="underline decoration-2 underline-offset-4">Zobacz usługi</a><a href={mailto(`Zapytanie: ${post.category}`)} className="inline-flex items-center gap-2 underline decoration-2 underline-offset-4">Napisz maila<ArrowRight className="h-4 w-4" /></a></div></div></div></section></div></article></PageShell>; };

const ContactPage = () => <PageShell><section className="flex min-h-[85vh] items-center px-5 pb-24 pt-36 md:px-8"><div className="mx-auto w-full max-w-6xl"><SectionHeading eyebrow="Kontakt" title="Porozmawiajmy o Twojej sprawie" titleClassName="text-2xl sm:text-4xl md:text-6xl">Napisz bezpośrednio na adres: <strong className="font-black text-white">{contactEmail}</strong></SectionHeading><div className="grid max-w-3xl gap-4 md:grid-cols-2"><Entrance x={-24}><a href={mailto('Zapytanie o współpracę')} className="group flex min-h-40 flex-col justify-between bg-[#ebc256] p-6 text-[#111113]"><Mail className="h-7 w-7" /><span className="flex items-end justify-between text-xl font-black uppercase">Napisz maila<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span></a></Entrance><Entrance x={24} delay={0.08}><a href={tiktokUrl} target="_blank" rel="noreferrer" className="group flex min-h-40 flex-col justify-between border border-white/20 bg-[#1a1a1e] p-6 text-white"><span className="text-xs font-black uppercase text-[#ebc256]">Social media</span><span className="flex items-end justify-between text-xl font-black uppercase">TikTok<ArrowRight className="h-5 w-5 text-[#ebc256] transition-transform group-hover:translate-x-1" /></span></a></Entrance></div></div></section></PageShell>;

const LegalPage = ({ page }: { page: LegalPageData }) => <PageShell><section className="px-5 pb-24 pt-36 md:px-8"><div className="mx-auto max-w-4xl"><a href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold uppercase text-[#b7b7bd]"><ArrowLeft className="h-4 w-4" />Wróć na stronę główną</a><SectionHeading eyebrow="Informacje" title={page.title}>{page.intro}</SectionHeading><Reveal><article className="space-y-10 border border-white/10 bg-[#17171a] p-7 md:p-10">{page.sections.map((section) => <section key={section.title}><h2 className="mb-4 border-l-4 border-[#ebc256] pl-4 text-2xl font-black uppercase">{section.title}</h2><div className="space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-relaxed text-[#c9c9cf]">{paragraph}</p>)}</div></section>)}</article></Reveal></div></section></PageShell>;
const NotFoundPage = () => <PageShell><section className="flex min-h-[75vh] items-center px-5 pt-28"><div className="mx-auto max-w-3xl text-center"><p className="text-2xl font-black text-[#ebc256]">404</p><h1 className="mt-4 text-5xl font-black uppercase">Nie znaleziono strony</h1><a href="/" className="mt-8 inline-flex bg-[#ebc256] px-7 py-4 text-sm font-black uppercase text-[#111113]">Wróć na stronę główną</a></div></section></PageShell>;

const routePages: Record<string, ComponentType> = {
  '/': HomePage,
  '/uslugi': ServicesPage,
  '/praktyka': PracticePage,
  '/o-mnie': AboutPage,
  '/blog': BlogPage,
  '/kontakt': ContactPage,
};

export default function App({ pathname = '/' }: { pathname?: string }) {
  const path = normalizePath(pathname);
  const article = blogPosts.find(post => path === `/blog/${post.slug}`);
  const legalPage = legalPages[path];
  const Page = routePages[path];
  const { title, description, image = defaultCover, noindex = false } = getPageMetadata(path);
  useEffect(() => {
    document.title = `${title} | ${siteName}`;
    const values = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': pageUrl(path),
      'meta[property="og:image"]': `${siteUrl}${image}`,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
      'meta[name="twitter:image"]': `${siteUrl}${image}`,
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
  }, [title, description, image, noindex, path]);
  if (article) return <ArticlePage slug={article.slug} />;
  if (legalPage) return <LegalPage page={legalPage} />;
  return Page ? <Page /> : <NotFoundPage />;
}
