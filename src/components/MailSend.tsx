import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from 'react';

// Hover slides the letter into the envelope; a click sends it off before the mail app opens.
export function Envelope({ className = '' }: { className?: string }) {
  const clip = `envelope-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  // At rest a closed envelope; on hover the flap opens and the letter rises out of it.
  return <svg className={`envelope ${className}`} viewBox="0 0 32 26" fill="none" aria-hidden="true">
    <clipPath id={clip}><rect x="-4" y="-20" width="40" height="26" /></clipPath>
    <path className="envelope-flap" d="M3 7l13 9 13-9" />
    <g clipPath={`url(#${clip})`}>
      <rect className="envelope-letter" x="8" y="-3" width="16" height="15" />
      <path className="envelope-letter-lines" d="M11 1h10M11 4h7" />
    </g>
    <rect className="envelope-body" x="2" y="6" width="28" height="18" rx="2" />
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
    }, 760);
  };
  return <a href={href} onClick={send} data-sending={sending || undefined} className={`mail-send ${className}`}>{children}</a>;
}
