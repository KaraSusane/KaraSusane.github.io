import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { servicesEnabled } from './data/features';
import { mailto, mailCtaLabel } from './data/site';
import { ResponsiveImage } from './components/ResponsiveImage';
import { BlogCard } from './components/BlogCard';
import { blogPosts } from './data/blogPosts';
import { practiceAreas } from './data/practiceAreas';
import { Entrance } from './components/Entrance';

const reveal = { opacity: 1, y: 0 };

const faq = [
  { question: 'Czy Pismo w Sprawie to kancelaria adwokacka lub radcowska?', answer: 'Nie. Pismo w Sprawie nie jest kancelarią adwokacką ani radcowską. Nie prowadzę zastępstwa procesowego i nie podpisuję pism w imieniu klienta. Przygotowuję dokumenty i analizy, a o ich wykorzystaniu decydujesz samodzielnie.' },
  { question: 'Jak wygląda współpraca?', answer: 'Opisujesz sprawę w mailu i przesyłasz dokumenty. Otrzymujesz wycenę, ewentualne pytania, zakres i termin realizacji. Po akceptacji i płatności przygotowuję dokument, który otrzymujesz w pliku edytowalnym i PDF, z jedną turą poprawek w ustalonym zakresie.' },
  { question: 'Ile trwa przygotowanie pisma?', answer: 'Termin ustalamy indywidualnie. Proste pismo przygotowuję zwykle w 2–3 dni robocze. W sprawach pilnych możliwa jest szybsza realizacja po potwierdzeniu dostępności.' },
  { question: 'Ile to kosztuje?', answer: 'Każdą sprawę wyceniam indywidualnie, po zapoznaniu się z jej opisem i dokumentami. Wycena zależy od rodzaju sprawy, objętości dokumentów i terminu.' },
];

const latestPosts = () => [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);

// The hero animates with CSS so it is visible before the script loads.
export function AnimatedHero() {
  return <section className="home-hero">
    <div className="home-slash" aria-hidden="true" />
    <div className="home-hero-inner selection-boundary">
      <p className="home-eyebrow">Precyzyjne pisma / Skuteczne rozwiązania</p>
      <h1 className="home-title">{['Pismo', 'w Sprawie'].map((line, index) => <span key={line} className="home-title-mask">{index > 0 && ' '}<span style={{ animationDelay: `${index * 0.13}s` }}>{line}</span></span>)}</h1>
      <div className="home-rule" aria-hidden="true" />
      <Entrance className="relative selection-boundary" delay={0.35} y={12}>
        <h2 className="home-tagline">Prawo po Twojej stronie.</h2>
        <p className="home-intro relative">Prawne wsparcie, precyzyjna argumentacja i dokumenty przygotowane z myślą o realnym celu Twojej sprawy.</p>
        <div className="home-actions"><a className="home-button" href="/praktyka/">Poznaj obszary praktyki <ArrowRight size={20} /></a>{servicesEnabled && <a className="home-text-link" href="/uslugi/">Zobacz usługi <ArrowRight size={20} /></a>}</div>
      </Entrance>
      <a href="#od-sprawy-do-pisma" className="home-scroll">Od sprawy do pisma <ArrowDown size={17} /></a>
    </div>
  </section>;
}

function DocumentAssembly() {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start 90%', 'center 45%'] });
  const x = useTransform(scrollYProgress, [0, 1], [-42, 0]);
  const right = useTransform(scrollYProgress, [0, 1], [42, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-7, 0]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [6, 0]);
  return <div ref={target} className="document-scene relative selection-boundary" aria-label="Przykładowe pismo: fakty, argumenty i wniosek">
    <motion.div className="document-sheet relative selection-boundary" initial={{ opacity: 0, x: 52, y: 24, scale: 0.96 }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}>
      <div className="document-top"><span>PISMO W SPRAWIE</span><span>01 / 01</span></div>
      <h3>Twoje stanowisko.<br />Jasno sformułowane.</h3>
      <p className="document-caption">Schemat pisma</p>
      <motion.div className="document-block" style={{ x, rotate }}><span>01 — Fakty</span><p>Co się wydarzyło i jakie dokumenty to potwierdzają.</p></motion.div>
      <motion.div className="document-block" style={{ x: right, rotate: rotateRight }}><span>02 — Argumenty</span><p>Stanowisko oparte na okolicznościach Twojej sprawy.</p></motion.div>
      <motion.div className="document-block document-conclusion" style={{ x, rotate }}><span>03 — Wniosek</span><p>Precyzyjnie określony cel pisma.</p></motion.div>
      <div className="document-bottom">Precyzja ma znaczenie.<span>Pismo w Sprawie</span></div>
    </motion.div>
  </div>;
}

export function HomeSections() {
  const reduced = useReducedMotion();
  return <>
    <section id="od-sprawy-do-pisma" className="home-process home-band relative selection-boundary">
      <motion.div className="home-section-copy relative selection-boundary" initial={{ opacity: 0, y: 38 }} whileInView={reveal} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}><p className="home-eyebrow">Od sprawy do pisma</p><h2>Trudna sprawa.<br /><span>Jasne stanowisko.</span></h2><p>Wezwanie, umowa, odpowiedź. Zaczynam od zrozumienia Twojej sytuacji. Porządkuję fakty, analizuję dokumenty i dobieram argumenty, które mają znaczenie.</p><p>Efektem jest pismo dopasowane do Twojej sprawy, z czytelną strukturą i konkretnym celem.</p><a href={servicesEnabled ? '/uslugi/' : '/praktyka/'} className="home-text-link">Sprawdź, jak mogę Ci pomóc <ArrowRight size={20} /></a></motion.div>
      <DocumentAssembly />
    </section>
    <section className="home-practice home-wide" aria-labelledby="home-practice-title">
      <div className="home-section-copy home-wide-head"><p className="home-eyebrow">Obszary praktyki</p><h2 id="home-practice-title">W czym mogę pomóc?</h2><p>Pracuję na dokumentach i faktach konkretnej sprawy. Najczęściej pomagam w sprawach z poniższych obszarów.</p></div>
      <ul className="home-practice-grid">{practiceAreas.map((area, index) => {
        const Icon = area.icon;
        return <li key={area.slug}><a href={`/praktyka/#${area.slug}`} className="home-practice-tile"><span className="home-practice-top"><Icon size={26} strokeWidth={1.7} aria-hidden="true" /><span>{String(index + 1).padStart(2, '0')}</span></span><h3>{area.title}</h3><p>{area.summary}</p></a></li>;
      })}</ul>
      <a href="/praktyka/" className="home-text-link">Zobacz wszystkie obszary praktyki <ArrowRight size={20} /></a>
    </section>
    <section className="home-about home-band relative selection-boundary">
      <motion.figure initial={{ opacity: 0, y: 24 }} whileInView={reveal} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.6 }}><ResponsiveImage src="/karolina-zdrojek.jpg" alt="Karolina Zdrojek, założycielka Pismo w Sprawie" width="600" height="750" loading="lazy" sizes="(min-width: 761px) 410px, 270px" /></motion.figure>
      <div className="home-section-copy relative selection-boundary"><p className="home-eyebrow">Za każdym pismem stoi człowiek</p><h2>Karolina Zdrojek</h2><p className="home-about-lead">Wiedza prawnicza.<br />Uważność na Twoją sprawę.</p><p>Jestem prawnikiem i założycielką Pismo w Sprawie. Łączę analizę prawną z dbałością o język, strukturę dokumentów i ich praktyczne zastosowanie.</p><a href="/o-mnie/" className="home-button">Poznaj mnie <ArrowRight size={20} /></a></div>
    </section>
    <section className="home-blog home-wide" aria-labelledby="home-blog-title">
      <div className="home-section-copy home-wide-head"><p className="home-eyebrow">Z bloga</p><h2 id="home-blog-title">Prawo w życiu codziennym</h2><p>Analizy prawdziwych sytuacji: od praw pacjenta, przez RODO w firmie, po zakup używanego auta.</p></div>
      <div className="home-blog-grid">{latestPosts().map(post => <Fragment key={post.slug}><BlogCard post={post} headingLevel="h3" /></Fragment>)}</div>
      <a href="/blog/" className="home-text-link">Wszystkie artykuły <ArrowRight size={20} /></a>
    </section>
    <section className="home-faq home-wide" aria-labelledby="home-faq-title">
      <div className="home-section-copy"><p className="home-eyebrow">Najczęstsze pytania</p><h2 id="home-faq-title">Zanim napiszesz</h2></div>
      <div className="home-faq-list">{faq.map(item => <details key={item.question}><summary><h3>{item.question}</h3><span className="home-faq-icon" aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </section>
    <section className="home-contact"><div className="relative selection-boundary"><p className="home-eyebrow">Zacznijmy od rozmowy</p><h2>Opisz swoją sprawę.</h2><p>Otrzymasz indywidualną wycenę i proponowany termin realizacji.</p></div><a className="home-button" href={mailto()}>{mailCtaLabel} <ArrowRight size={20} /></a></section>
  </>;
}
