import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types';
import { defaultCover } from '../data/site';
import { ResponsiveImage } from './ResponsiveImage';

export const formatDate = (date: string) => new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`));

export function BlogCard({ post, headingLevel = 'h2' }: { post: BlogPost; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return <a href={`/blog/${post.slug}/`} className="relative selection-boundary group block h-full overflow-hidden border border-white/10 bg-[#1a1a1e] transition-colors hover:border-[#ebc256]"><ResponsiveImage src={post.coverImage || defaultCover} alt={post.coverAlt || post.title} width={post.coverWidth} height={post.coverHeight} sizes="(min-width: 1280px) 410px, (min-width: 768px) calc((100vw - 80px) / 2), calc(100vw - 40px)" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" /><div className="border-t-4 border-[#ebc256] p-6"><div className="mb-4 flex items-center justify-between gap-3 text-xs font-bold uppercase text-[#ebc256]"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div><Heading className="text-2xl font-black leading-tight">{post.title}</Heading><p className="mt-4 line-clamp-5 text-sm leading-relaxed text-[#b7b7bd]">{post.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase">Czytaj dalej<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></a>;
}
