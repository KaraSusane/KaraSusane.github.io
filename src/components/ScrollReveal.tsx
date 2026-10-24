import type { CSSProperties, ReactNode } from 'react';
import { useRevealOnce } from './useRevealOnce';

type Props = {
  children: ReactNode;
  as?: 'div' | 'figure';
  className?: string;
  id?: string;
  x?: number;
  y?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
};

// Fades and slides content in when it scrolls into view. Unlike Motion's whileInView it also
// reveals content the browser jumped past (restored scroll on back navigation).
export function ScrollReveal({ children, as = 'div', className = '', id, x = 0, y = 24, scale = 1, delay = 0, duration = 0.6, threshold = 0.05 }: Props) {
  const [ref, state] = useRevealOnce<HTMLElement>(threshold);
  const Tag = as;
  const style = { '--reveal-x': `${x}px`, '--reveal-y': `${y}px`, '--reveal-scale': scale, '--reveal-delay': `${delay}s`, '--reveal-duration': `${duration}s` } as CSSProperties;
  return <Tag ref={ref as never} id={id} className={`reveal ${className}`} data-reveal={state} style={style}>{children}</Tag>;
}
