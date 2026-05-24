export interface Article {
  id: number;
  category: string; // Dynamic custom categories or default ones
  title: string;
  excerpt: string;
  body?: string; // HTML rich content from WYSIWYG
  author: string;
  authorAvatar?: string;
  time: string; // Display relative time or scheduled date
  timestamp: number;
  views: string;
  image: string;
  duration?: string;
  specs?: string;
  rating?: number;
  quote?: string;
  trendingScore?: number;
  
  // Custom properties from uploaders
  slug?: string;
  subcategory?: string;
  status?: 'draft' | 'published' | 'scheduled';
  isBreaking?: boolean;
  isTrending?: boolean;
  videoUrl?: string;
  source?: string;
  sourceName?: string;
  sourceUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  tags?: string[];
  lastUpdated?: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  socialFacebook: string;
  socialTwitter: string;
  socialInstagram: string;
  socialYoutube: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ScoreState {
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  status: string;
  overs?: string;
}

