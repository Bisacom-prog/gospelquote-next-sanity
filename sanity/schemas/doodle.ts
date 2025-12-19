import { defineField, defineType } from 'sanity';

export const doodle = defineType({
  name: 'doodle',
  title: 'Doodles',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'label', title: 'Button Label', type: 'string', initialValue: 'Watch Video' }),
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'url', description: 'URL to .mp4 or streaming file' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] })
  ]
});
