export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  keywords?: string[];
  coverImage?: string;
  coverWidth: number;
  coverHeight: number;
  coverAlt?: string;
}
