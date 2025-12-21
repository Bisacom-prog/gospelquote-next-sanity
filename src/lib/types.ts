export type Doodle = {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  label?: string   // ✅ FIX — THIS LINE
  videoUrl?: string
  publishedAt?: string
}
;