import { groq } from 'next-sanity';
import { client } from '@/lib/sanity';
import type { Doodle } from '@/lib/types';
import { DoodlesClient } from './doodlesClient';

const query = groq`*[_type=="doodle"]|order(publishedAt desc){_id,title,excerpt,label,publishedAt,videoUrl,tags}`;

export default async function DoodlesPage() {
  let items: Doodle[] = [];
  try {
    items = await client.fetch(query, {}, { next: { revalidate: 300 } });
  } catch {
    items = [];
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
      <section className="mb-8">
        <p className="text-xs tracking-[0.2em] font-semibold text-accent uppercase mb-2">GospelQuote Doodles</p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary dark:text-accent font-semibold">Bible Stories Through Simple Doodle Videos</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">Visual, simple, and memorable animations that bring key Bible passages to life for all ages.</p>
      </section>

      <DoodlesClient items={items} />
    </div>
  );
}
