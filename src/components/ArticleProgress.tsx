import { useEffect, useState } from 'react';

// A thin strip under the navigation naming the section the reader is in.
// It also marks that section in the table of contents.
export function ArticleProgress({ bodyId, headings }: { bodyId: string; headings: Array<{ id: string; text: string }> }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const body = document.getElementById(bodyId);
    if (!body) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = body.getBoundingClientRect();
      // Sits flush under the fixed navigation, whatever its height.
      const navBottom = document.querySelector('nav')?.getBoundingClientRect().bottom ?? 64;
      document.documentElement.style.setProperty('--article-progress-top', `${Math.round(navBottom)}px`);
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
  </div>;
}
