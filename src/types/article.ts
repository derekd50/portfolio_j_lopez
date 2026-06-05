export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  url: string;
  publication?: string;
  image?: string;
  tags?: string[];
}

export type Category = 'News' | 'Features' | 'Opinion' | 'Investigation' | 'Other';

export interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  url: string;
}
