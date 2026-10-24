import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from 'react';

// Hover slides the letter into the envelope; a click sends it off before the mail app opens.
export function Envelope({ className = '' }: { className?: string }) {
  const clip = `envelope-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return <svg className={`envelope ${className}`} viewBox="0 0 30 24" fill="none" aria-hidden="true">
    <clipPath id={clip}><rect x="-4" y="-12" width="38" height="21" /></clipPath>
    <g clipPath={`url(#${clip})`}>
      <rect className="envelope-letter" x="7" y="1.5" width="16" height="13" />
      <path className="envelope-letter-lines" d="M10 5.5h10M10 8.5h7" />
    </g>
    <path className="envelope-body" d="M2 9h26v13H2z" />
    <path className="envelope-flap" d="M2 9l13 8 13-8" />
  </svg>;
}

export function MailSendLink({ href, className = '', children }: { href: string; className?: string; children: ReactNode }) {
  const [sending, setSending] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const send = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    setSending(true);
    timer.current = window.setTimeout(() => {
      window.location.href = href;
      setSending(false);
    }, 480);
  };
  return <a href={href} onClick={send} data-sending={sending || undefined} className={`mail-send ${className}`}>{children}</a>;
}
