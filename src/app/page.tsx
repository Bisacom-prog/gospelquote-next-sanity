import Link from 'next/link';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity';
import type { Article } from '@/lib/types';

const latestArticlesQuery = groq`*[_type=="article"]|order(publishedAt desc)[0...3]{_id,title,slug,excerpt,readingTime, publishedAt, "category": category->...{_id,title,slug}}`;

export default async function HomePage() {
  let latest: Article[] = [];
  try {
    latest = await client.fetch(latestArticlesQuery, {}, { next: { revalidate: 300 } });
  } catch {
    latest = [];
  }

  return (
    <div>
      <section className="bg-cream dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] font-semibold text-accent uppercase mb-3">GospelQuote</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary dark:text-white leading-tight">
              Inspiring Faith Through Write-ups, Podcasts &amp; Doodle Videos
            </h1>
            <p className="mt-4 md:mt-5 text-slate-600 dark:text-slate-300 text-base md:text-lg">
              “Let your light so shine before others, that they may see your good deeds and glorify your Father in heaven.” — Matthew 5:16
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/writeups" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow hover:bg-primary/90 transition">
                Read Devotionals
              </Link>
              <Link href="/podcasts" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary text-primary dark:text-white dark:border-slate-200 text-sm font-semibold hover:bg-primary hover:text-white transition">
                Listen to Podcasts
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 shadow-soft rounded-2xl p-6 md:p-7 space-y-4">
            <h2 className="font-heading text-xl md:text-2xl text-primary dark:text-white">Today’s Highlight</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300 uppercase tracking-wide">Featured Quote</p>
            <p className="text-slate-700 dark:text-slate-100 italic">
              “When you feel like you are at the end of yourself, you are at the beginning of God’s grace.”
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-300">New reflections every week • Stay encouraged.</p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-primary dark:text-white mb-1">Latest Write-ups</h2>
              <p className="text-slate-500 dark:text-slate-300 text-sm md:text-base">Short devotionals and reflections rooted in Scripture.</p>
            </div>
            <Link href="/writeups" className="text-xs md:text-sm font-semibold text-primary dark:text-accent hover:text-accent">
              View all posts →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(latest.length ? latest : fallbackCards).map((p) => (
              <article key={p._id} className="bg-cream dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-soft transition flex flex-col">
                <p className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                  {p.category?.title ?? 'Devotional'}{p.readingTime ? ` • ${p.readingTime}` : ''}
                </p>
                <h3 className="font-semibold text-base md:text-lg text-primary dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-200 flex-1">{p.excerpt ?? 'A short reflection rooted in Scripture.'}</p>
                <Link
                  href={p.slug?.current ? `/writeups/${p.slug.current}` : '/writeups'}
                  className="mt-4 inline-flex items-center text-xs font-semibold text-primary dark:text-accent hover:text-accent"
                >
                  Read more <span className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream dark:bg-slate-950 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/podcasts" className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-soft transition">
              <h3 className="font-heading text-xl text-primary dark:text-white">Podcasts</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Short audio encouragements designed for daily life.</p>
            </Link>
            <Link href="/doodles" className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-soft transition">
              <h3 className="font-heading text-xl text-primary dark:text-white">Doodles</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Bible stories through simple, memorable doodle videos.</p>
            </Link>
            <Link href="/contact" className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-soft transition">
              <h3 className="font-heading text-xl text-primary dark:text-white">Contact</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Share a testimony, ask a question, or collaborate.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const fallbackCards: Article[] = [
  {
    _id: 'fallback-1',
    title: 'Finding Peace in Uncertain Times',
    slug: { current: 'finding-peace-in-uncertain-times' },
    excerpt: 'How God reminds us to trust Him when life feels fragile and the future unclear…',
    readingTime: '5 min read',
    category: { _id: 'cat-1', title: 'Devotional', slug: { current: 'devotional' } }
  },
  {
    _id: 'fallback-2',
    title: 'Walking in Purpose Daily',
    slug: { current: 'walking-in-purpose-daily' },
    excerpt: 'Purpose is not a destination but a journey of small, obedient steps with Jesus…',
    readingTime: '4 min read',
    category: { _id: 'cat-2', title: 'Christian Living', slug: { current: 'christian-living' } }
  },
  {
    _id: 'fallback-3',
    title: 'Grace That Lifts You Up',
    slug: { current: 'grace-that-lifts-you-up' },
    excerpt: 'God’s grace doesn’t just forgive you — it strengthens, restores and sends you back out with hope.',
    readingTime: '6 min read',
    category: { _id: 'cat-3', title: 'Grace', slug: { current: 'grace' } }
  }
];
