'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Article, Category } from '@/lib/types';

export function WriteupsClient({ articles, categories }: { articles: Article[]; categories: Category[] }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>('all');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesQ = !q || (a.title?.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q));
      const matchesC = cat === 'all' || a.category?.slug?.current === cat;
      return matchesQ && matchesC;
    });
  }, [articles, query, cat]);

  const filters: { key: string; label: string }[] = [
    { key: 'all', label: 'All' },
    ...categories.map((c) => ({ key: c.slug.current, label: c.title }))
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setCat(f.key)}
              className={`px-3 py-1 rounded-full border ${
                cat === f.key
                  ? 'bg-primary text-white border-primary'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64 relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2 text-xs md:text-sm"
            placeholder="Search devotionals..."
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <article key={a._id} className="bg-cream dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-soft transition flex flex-col">
            <p className="text-xs text-slate-500 dark:text-slate-300 mb-1">
              {a.category?.title ?? 'Write-up'}{a.readingTime ? ` • ${a.readingTime}` : ''}
            </p>
            <h2 className="font-semibold text-base md:text-lg text-primary dark:text-white mb-2">{a.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-200 flex-1">{a.excerpt ?? ''}</p>
            <Link
              href={`/writeups/${a.slug.current}`}
              className="mt-4 inline-flex items-center text-xs font-semibold text-primary dark:text-accent hover:text-accent"
            >
              Read more <span className="ml-2">→</span>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-6 text-xs text-slate-500 dark:text-slate-300">
        Showing {filtered.length} of {articles.length} posts
      </div>
    </div>
  );
}
