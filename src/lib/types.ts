export type Slug = {
  current: string
}

export type Writeup = {
  _id: string
  title: string
  slug: Slug
  body?: any
  excerpt?: string
  publishedAt?: string
}

export type Podcast = {
  _id: string
  title: string
  slug: Slug
  description?: string
  audioUrl?: string
  publishedAt?: string
}

export type Doodle = {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  videoUrl?: string
  publishedAt?: string
}
;