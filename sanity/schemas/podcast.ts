import { defineField, defineType } from 'sanity';

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcasts',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'audioUrl', title: 'Audio URL', type: 'url', description: 'URL to .mp3 or streaming file' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', description: 'e.g., 08:32' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] })
  ]
});
