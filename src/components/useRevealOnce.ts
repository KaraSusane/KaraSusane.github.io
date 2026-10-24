import { useEffect, useRef, useState } from 'react';

export type RevealState = 'idle' | 'waiting' | 'shown';

// Server HTML and visitors without JavaScript get the finished state ("idle").
// After hydration the element waits and plays its CSS transition once it scrolls into view.
// Position is checked on every scroll rather than with IntersectionObserver, so jumps such as
// the scroll restored by the back button also reveal everything at or above the viewport.
export function useRevealOnce<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('idle');
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const reached = () => {
      const rect = element.getBoundingClientRect();
      const needed = Math.min(rect.height * threshold, window.innerHeight * 0.25);
      return rect.bottom <= 0 || window.innerHeight - rect.top >= needed;
    };
    // Already scrolled past when the page opens (e.g. back navigation): keep it as it is.
    if (element.getBoundingClientRect().bottom <= 0) return;
    setState('waiting');
    let frame = 0;
    const check = () => {
      frame = 0;
      if (!reached()) return;
      stop();
      frame = requestAnimationFrame(() => setState('shown'));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };
    const stop = () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return [ref, state] as const;
}
