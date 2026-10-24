import { useEffect, useRef, useState } from 'react';

export type RevealState = 'idle' | 'waiting' | 'shown';

// Server HTML and visitors without JavaScript get the finished state ("idle").
// After hydration the element waits and plays its CSS transition once it scrolls into view.
export function useRevealOnce<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('idle');
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setState('waiting');
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      frame = requestAnimationFrame(() => setState('shown'));
    }, { threshold });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return [ref, state] as const;
}
