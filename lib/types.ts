export interface Track {
  id: string;
  title: string;
  artist: string;
  year?: string;
  category?: 'album' | 'ep' | 'single' | 'collab' | 'production' | 'mix-master';
  coverUrl?: string;
  audioSrc?: string;
  duration?: string;
  bpm?: number;
  key?: string;
  bandcampUrl?: string;
  notes?: string;
  accentColor?: string; // e.g. #ACE1AF or #C9A84C
}

export interface ComparisonPair {
  id: string;
  title: string;
  genre: string;
  description: string;
  unmixedSrc: string;
  masteredSrc: string;
}

export interface Beat {
  id: string;
  title: string;
  bpm: number;
  key: string;
  tags: string[];
  audioSrc: string;
  leasePrice: number;
  exclusivePrice: number;
  accentColor?: string;
}

export interface CartItem {
  id: string;
  beatId: string;
  title: string;
  bpm: number;
  key: string;
  licenseType: 'lease' | 'exclusive';
  price: number;
}
