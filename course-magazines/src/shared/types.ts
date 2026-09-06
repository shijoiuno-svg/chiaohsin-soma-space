export type MagazineTheme = {
  paper: string;
  ink: string;
  accent: string;
  accentMid: string;
  accentSoft: string;
  accentSurface: string;
  line: string;
  muted: string;
};

export type CourseMagazineConfig = {
  slug: string;
  title: string;
  returnTarget: string;
  source: string;
  entry: string;
  theme: MagazineTheme;
};

export type VideoData = {
  provider: "youtube";
  videoId?: string;
  url?: string;
  title: string;
  caption?: string;
  description?: string;
  placeholder?: boolean;
};

export type LongformPage = {
  label?: string;
  title?: string;
  intro?: boolean;
  paragraphs: string[];
  placeholder?: boolean;
};

export type ScenerySlide = {
  src?: string;
  alt: string;
  caption?: string;
  credit?: string;
  aspectRatio?: string;
  label?: string;
  note?: string;
  placeholder?: boolean;
};

export type FurtherReadingItem = {
  type: string;
  title: string;
  url: string;
  order: number;
};
