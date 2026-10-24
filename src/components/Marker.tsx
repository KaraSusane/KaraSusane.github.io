import type { CSSProperties, ReactNode } from 'react';
import { useRevealOnce } from './useRevealOnce';

// A highlighter stroke that sweeps under key words when they scroll into view.
export function Marker({ children, delay = 0.2 }: { children: ReactNode; delay?: number }) {
  const [ref, state] = useRevealOnce<HTMLElement>(0.8);
  return <mark ref={ref} className="marker" data-reveal={state} style={{ '--marker-delay': `${delay}s` } as CSSProperties}>{children}</mark>;
}
