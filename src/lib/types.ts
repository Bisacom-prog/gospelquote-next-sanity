export type Slug = { current: string };

export type Category = {
  _id: string;
  title: string;
  slug: Slug;
};

export type Author = {
  _id: string;
  name: string;
  slug: Slug;
};

export type Article = {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  readingTime?: string;
  publishedAt?: string;
  category?: Category;
  tags?: string[];
};

export type Podcast = {
  _id: string;
  title: string;
  excerpt?: string;
  duration?: string;
  publishedAt?: string;
  audioUrl?: string;
  tags?: string[];
};

export type Doodle = {
  _id: string;
  title: string;
  excerpt?: string;
  label?: string;
  publishedAt?: string;
  videoUrl?: string;
  tags?: string[];
};

export type Writeup = {
  _id: string
  title: string
  slug: {
    current: string
  }
  body?: any
  publishedAt?: string
};

