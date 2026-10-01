import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SiteImage } from './SiteImage';
import { Entrance } from './Entrance';
import { ArrowRight, ArrowDown } from 'lucide-react';

const reveal = { opacity: 1, y: 0 };

export function AnimatedHero() {
  return <section className="home-hero">
    <Entrance className="home-slash" aria-hidden from={{ x: 180, opacity: 0 }} to={{ x: 0, opacity: 1 }} when="mount" transition={{ duration: 0.85, ease: 'easeOut' }} />
    <div className="home-hero-inner">
      <p className="home-eyebrow">Precyzyjne pisma / Skuteczne rozwiązania</p>
      <h1 className="home-title">{['Pismo ', 'w Sprawie '].map((line, index) => <span key={line} className="home-title-mask"><Entrance as="span" from={{ y: '110%' }} to={{ y: 0 }} when="mount" transition={{ duration: 0.75, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}>{line}</Entrance></span>)}<span className="home-specialty">Prawnik · pisma prawne i analiza umów</span></h1>
      <Entrance className="home-rule" aria-hidden from={{ scaleX: 0 }} to={{ scaleX: 1 }} when="mount" transition={{ duration: 0.8, delay: 0.25 }} />
      <Entrance from={{ opacity: 0, y: 12 }} to={reveal} when="mount" transition={{ duration: 0.6, delay: 0.35 }}>
        <h2 className="home-tagline">Prawo po Twojej stronie.</h2>
        <p className="home-intro">Prawne wsparcie, precyzyjna argumentacja i dokumenty przygotowane z myślą o realnym celu Twojej sprawy.</p>
        <div className="home-actions"><a className="home-button" href="/praktyka/">Poznaj obszary praktyki <ArrowRight size={20} /></a><a className="home-text-link" href="/uslugi/">Zobacz usługi <ArrowRight size={20} /></a></div>
      </Entrance>
      <a href="#od-sprawy-do-pisma" className="home-scroll">Od sprawy do pisma <ArrowDown size={17} /></a>
    </div>
  </section>;
}

function DocumentAssembly() {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start 90%', 'center 45%'] });
  const x = useTransform(scrollYProgress, [0, 1], [-42, 0]);
  const right = useTransform(scrollYProgress, [0, 1], [42, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-7, 0]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [6, 0]);
  return <div ref={target} className="document-scene" aria-label="Przykładowe pismo: fakty, argumenty i wniosek">
    <Entrance className="document-sheet" from={{ opacity: 0, x: 52, y: 24, scale: 0.96 }} to={{ opacity: 1, x: 0, y: 0, scale: 1 }} amount={0.2} transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
      <div className="document-top"><span>PISMO W SPRAWIE</span><span>01 / 01</span></div>
      <h3>Twoje stanowisko.<br />Jasno sformułowane.</h3>
      <p className="document-caption">Schemat pisma</p>
      <motion.div className="document-block" style={{ x, rotate }}><span>01 — Fakty</span><p>Co się wydarzyło i jakie dokumenty to potwierdzają.</p></motion.div>
      <motion.div className="document-block" style={{ x: right, rotate: rotateRight }}><span>02 — Argumenty</span><p>Stanowisko oparte na okolicznościach Twojej sprawy.</p></motion.div>
      <motion.div className="document-block document-conclusion" style={{ x, rotate }}><span>03 — Wniosek</span><p>Precyzyjnie określony cel pisma.</p></motion.div>
      <div className="document-bottom">Precyzja ma znaczenie.<span>Pismo w Sprawie</span></div>
    </Entrance>
  </div>;
}

export function HomeSections() {
  return <>
    <section id="od-sprawy-do-pisma" className="home-process home-band">
      <Entrance className="home-section-copy" from={{ opacity: 0, y: 38 }} to={reveal} amount={0.3} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}><p className="home-eyebrow">Od sprawy do pisma</p><h2>Trudna sprawa.<br /><span>Jasne stanowisko.</span></h2><p>Wezwanie, umowa, odpowiedź. Zaczynam od zrozumienia Twojej sytuacji. Porządkuję fakty, analizuję dokumenty i dobieram argumenty, które mają znaczenie.</p><p>Efektem jest pismo dopasowane do Twojej sprawy, z czytelną strukturą i konkretnym celem.</p><a href="/uslugi/" className="home-text-link">Sprawdź, jak mogę Ci pomóc <ArrowRight size={20} /></a></Entrance>
      <DocumentAssembly />
    </section>
    <section className="home-about home-band">
      <Entrance as="figure" from={{ opacity: 0, y: 24 }} to={reveal} amount={0.2} transition={{ duration: 0.6 }}><SiteImage src="/karolina-zdrojek.jpg" alt="Karolina Zdrojek, założycielka Pismo w Sprawie" sizes="(min-width: 640px) 410px, 270px" /></Entrance>
      <div className="home-section-copy"><p className="home-eyebrow">Za każdym pismem stoi człowiek</p><h2>Karolina Zdrojek</h2><p className="home-about-lead">Wiedza prawnicza.<br />Uważność na Twoją sprawę.</p><p>Jestem prawnikiem i założycielką Pismo w Sprawie. Łączę analizę prawną z dbałością o język, strukturę dokumentów i ich praktyczne zastosowanie.</p><a href="/o-mnie/" className="home-button">Poznaj mnie <ArrowRight size={20} /></a></div>
    </section>
    <section className="home-contact"><div><p className="home-eyebrow">Zacznijmy od rozmowy</p><h2>Opisz swoją sprawę.</h2><p>Otrzymasz indywidualną wycenę i proponowany termin realizacji.</p></div><a className="home-button" href="mailto:pismowsprawie@gmail.com">Napisz maila <ArrowRight size={20} /></a></section>
  </>;
}
