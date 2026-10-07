export type Language = 'zh' | 'en';

export interface ProjectCase {
  id: string;
  titleZh: string;
  titleEn: string;
  tagZh: string;
  tagEn: string;
  cityZh: string;
  cityEn: string;
  year: string;
  summaryZh: string;
  summaryEn: string;
  deliverablesZh: string[];
  deliverablesEn: string[];
  impactZh: string;
  impactEn: string;
  category: 'core' | 'attract' | 'planning' | 'media';
  gradient: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  titleZh: string;
  titleEn: string;
  category: 'group' | 'milestone' | 'insight' | 'announcement';
  date: string;
  authorZh: string;
  authorEn: string;
  summaryZh: string;
  summaryEn: string;
  contentZh: string;
  contentEn: string;
  coverImage?: string;
  galleryImages?: string[];
  videoUrl?: string;
  videoType?: 'url' | 'file';
  tagsZh: string[];
  tagsEn: string[];
  views: number;
  isOfficial?: boolean;
}

export interface ServiceEngine {
  id: string;
  num: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  highlightsZh: string[];
  highlightsEn: string[];
  clientsZh: string[];
  clientsEn: string[];
}
