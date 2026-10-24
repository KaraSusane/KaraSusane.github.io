import { useEffect, useState } from 'react';

// A thin bar under the navigation: how far the reader is and which section they are in.
// It also marks that section in the table of contents.
export function ArticleProgress({ bodyId, headings }: { bodyId: string; headings: Array<{ id: string; text: string }> }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const body = document.getElementById(bodyId);
    if (!body) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = body.getBoundingClientRect();
      const distance = Math.max(rect.height - window.innerHeight * 0.6, 1);
      setProgress(Math.min(1, Math.max(0, (140 - rect.top) / distance)));
      setVisible(rect.top < 100 && rect.bottom > 160);
      let current: string | null = null;
      for (const heading of body.querySelectorAll<HTMLElement>('h2[id]')) {
        if (heading.getBoundingClientRect().top > 160) break;
        current = heading.id;
      }
      setActive(current);
      for (const link of document.querySelectorAll<HTMLAnchorElement>('.article-toc a')) {
        if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [bodyId]);
  const section = headings.find(heading => heading.id === active)?.text;
  return <div className="article-progress" data-visible={visible || undefined} aria-hidden="true">
    <div className="article-progress-label"><span>§</span>{section || 'Wprowadzenie'}</div>
    <div className="article-progress-bar" style={{ transform: `scaleX(${progress})` }} />
  </div>;
}
