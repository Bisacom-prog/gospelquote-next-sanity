'use client';

import { useMemo, useState } from 'react';
import type { Podcast } from '@/lib/types';

export function PodcastsClient({ items }: { items: Podcast[] }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const hay = `${p.title} ${p.excerpt || ''}`.toLowerCase();
      return !q || hay.includes(q);
    });
  }, [items, query]);

  return (
    <div>
      <div className="w-full md:w-72 relative mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2 text-xs md:text-sm"
          placeholder="Search podcast episodes..."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <article key={p._id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-soft transition">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-primary dark:text-white">{p.title}</h2>
              {p.duration ? <span className="text-xs text-slate-500 dark:text-slate-300">{p.duration}</span> : null}
            </div>
            {p.excerpt ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">{p.excerpt}</p> : null}
            {p.audioUrl ? (
              <audio className="mt-4 w-full" controls preload="none">
                <source src={p.audioUrl} />
              </audio>
            ) : (
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-300">Audio URL not set yet.</p>
            )}
          </article>
        ))}
      </div>

      <div className="mt-6 text-xs text-slate-500 dark:text-slate-300">Showing {filtered.length} of {items.length} episodes</div>
    </div>
  );
}
