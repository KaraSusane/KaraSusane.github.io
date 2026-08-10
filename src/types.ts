export interface Service {
  slug: string;
  title: string;
  category: string;
  lawArea: string;
  summary: string;
  description: string;
  benefits: string[];
  process: string[];
  priceFrom: string;
}

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
  coverAlt?: string;
}
