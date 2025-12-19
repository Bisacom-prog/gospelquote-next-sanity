'use client';

import { useMemo, useState } from 'react';
import type { Doodle } from '@/lib/types';

export function DoodlesClient({ items }: { items: Doodle[] }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Doodle | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((d) => {
      const hay = `${d.title} ${d.excerpt || ''}`.toLowerCase();
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
          placeholder="Search doodle videos..."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((d) => (
          <article key={d._id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-soft transition flex flex-col">
            <h2 className="font-semibold text-primary dark:text-white">{d.title}</h2>
            {d.excerpt ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-200 flex-1">{d.excerpt}</p> : <div className="flex-1" />}
            <button
              type="button"
              onClick={() => setActive(d)}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90"
            >
              {d.label || 'Watch Video'}
            </button>
          </article>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-[80] bg-black/70 flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="bg-slate-900 text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-soft">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h3 className="font-semibold text-sm md:text-base">{active.title}</h3>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="text-white/80 hover:text-white text-xl"
                aria-label="Close video"
              >
                &times;
              </button>
            </div>
            <div className="bg-black">
              {active.videoUrl ? (
                <video className="w-full h-full max-h-[70vh]" controls src={active.videoUrl} />
              ) : (
                <div className="p-6 text-sm text-white/80">Video URL not set yet.</div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-6 text-xs text-slate-500 dark:text-slate-300">Showing {filtered.length} of {items.length} doodles</div>
    </div>
  );
}
