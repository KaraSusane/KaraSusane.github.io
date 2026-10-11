export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  keywords?: string[];
  coverImage?: string;
  coverWidth: number;
  coverHeight: number;
  coverAlt?: string;
}
