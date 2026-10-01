import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { motion, useAnimationControls, useInView, useReducedMotion, type TargetAndTransition, type Transition } from 'motion/react';

type EntranceProps = {
  as?: 'div' | 'span' | 'figure';
  children?: ReactNode;
  className?: string;
  id?: string;
  'aria-hidden'?: boolean;
  from: TargetAndTransition;
  to?: TargetAndTransition;
  transition?: Transition;
  when?: 'mount' | 'in-view';
  amount?: number;
};

export function Entrance({ as = 'div', children, className, id, 'aria-hidden': ariaHidden, from, to = { opacity: 1, x: 0, y: 0 }, transition, when = 'in-view', amount = 0.14 }: EntranceProps) {
  const target = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const inView = useInView(target, { once: true, amount });
  const reduced = useReducedMotion();
  const animation = useRef({ from, to, transition });

  // Arm the entrance after hydration, leaving the server-rendered content visible.
  useLayoutEffect(() => {
    const { from, to, transition } = animation.current;
    controls.set(reduced ? to : from);
    if (reduced || when === 'mount') void controls.start(to, reduced ? { duration: 0 } : transition);
    return () => controls.stop();
  }, [controls, reduced, when]);

  useLayoutEffect(() => {
    if (when === 'in-view' && inView) {
      void controls.start(animation.current.to, reduced ? { duration: 0 } : animation.current.transition);
    }
  }, [controls, inView, reduced, when]);

  const Element = as === 'span' ? motion.span : as === 'figure' ? motion.figure : motion.div;
  return <Element ref={target} id={id} className={className} aria-hidden={ariaHidden} initial={false} animate={controls}>{children}</Element>;
}
