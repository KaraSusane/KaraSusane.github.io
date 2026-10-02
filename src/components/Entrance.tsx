import type { CSSProperties, ReactNode } from 'react';

type EntranceProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
};

// CSS starts with the first paint; hydration must not restart the entrance.
export const entranceStyle = (delay = 0, x = 0, y = 24): CSSProperties => ({
  '--enter-delay': `${delay}s`,
  '--enter-x': `${x}px`,
  '--enter-y': `${y}px`,
} as CSSProperties);

export function Entrance({ children, className = '', delay = 0, x = 0, y = 24 }: EntranceProps) {
  return <div className={`page-enter ${className}`} style={entranceStyle(delay, x, y)}>{children}</div>;
}
