// ===== Shared helpers =====
export type Slug = {
  current: string
}

// ===== Categories =====
export type Category = {
  _id: string
  title: string
  slug: Slug
}

// ===== Articles / Writeups =====
export type Writeup = {
  _id: string
  title: string
  slug: Slug
  excerpt?: string
  body?: any
  readingTime?: number
  publishedAt?: string
  category?: Category
}

// Home page uses Article naming
export type Article = Writeup

// ===== Podcasts =====
export type Podcast = {
  _id: string
  title: string
  slug: Slug
  excerpt?: string
  duration?: string
  audioUrl?: string
  publishedAt?: string
}

// ===== Doodles =====
export type Doodle = {
  _id: string
  title: string
  slug: Slug
  excerpt?: string
  label?: string
  videoUrl?: string
  publishedAt?: string
}
