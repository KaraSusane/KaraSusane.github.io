import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { contactEmail } from '../data/site';

// Mail links do nothing without a configured mail app, so the address can also be copied.
export function CopyEmailButton({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
    } catch {
      window.prompt('Skopiuj adres e-mail:', contactEmail);
    }
  };
  return <button type="button" onClick={copy} className={`inline-flex items-center gap-2 ${className}`}>
    {copied ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />}
    <span aria-live="polite">{copied ? 'Skopiowano adres' : 'Skopiuj adres'}</span>
  </button>;
}
