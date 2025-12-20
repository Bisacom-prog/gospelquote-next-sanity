import Link from 'next/link';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity';
import type { Article, Podcast, Doodle } from '@/lib/types';

const latestArticlesQuery = groq`*[_type=="article"]|order(publishedAt desc)[0...3]{_id,title,slug,excerpt,readingTime,publishedAt,"category": category->{_id,title,slug}}`;
const latestPodcastsQuery = groq`*[_type=="podcast"]|order(publishedAt desc)[0...3]{_id,title,slug,excerpt,publishedAt,duration}`;
const latestDoodlesQuery = groq`*[_type=="doodle"]|order(publishedAt desc)[0...3]{_id,title,slug,excerpt,publishedAt}`;

export default async function HomePage() {
  let latestArticles: Article[] = [];
  let latestPodcasts: Podcast[] = [];
  let latestDoodles: Doodle[] = [];

  try {
    latestArticles = await client.fetch(latestArticlesQuery, {}, { next: { revalidate: 300 } });
  } catch {
    latestArticles = [];
  }

  try {
    latestPodcasts = await client.fetch(latestPodcastsQuery, {}, { next: { revalidate: 300 } });
  } catch {
    latestPodcasts = [];
  }

  try {
    latestDoodles = await client.fetch(latestDoodlesQuery, {}, { next: { revalidate: 300 } });
  } catch {
    latestDoodles = [];
  }

  return (
    <div>
      {/* HERO */}
      <section id="home" className="bg-cream dark:bg-slate-950 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
              <p className="text-xs tracking-[0.2em] font-semibold text-accent uppercase">GospelQuote</p>
              <h1 className="mt-3 font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary dark:text-white leading-tight">
                Inspiring Faith Through Write-ups, Podcasts &amp; Doodle Videos
              </h1>
              <p className="mt-4 md:mt-5 text-slate-600 dark:text-slate-300 text-base md:text-lg">
                “Let your light so shine before others, that they may see your good deeds and glorify your Father in heaven.” — Matthew 5:16
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/writeups"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow hover:bg-primary/90 transition"
                >
                  Read Devotionals
                </Link>
                <Link
                  href="/podcasts"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-primary dark:text-white text-sm font-semibold hover:bg-primary hover:text-white transition"
                >
                  Listen to Podcasts
                </Link>
              </div>
            </div>

            <div className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 bg-white dark:bg-slate-800 shadow-soft rounded-2xl p-6 md:p-7 space-y-4">
              <h2 className="font-heading text-xl md:text-2xl text-primary dark:text-white">Today’s Highlight</h2>
              <p className="text-sm text-slate-500 dark:text-slate-300 uppercase tracking-wide">Featured Quote</p>
              <p className="text-slate-700 dark:text-slate-100 italic">
                “When you feel like you are at the end of yourself, you are at the beginning of God’s grace.”
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-300">New reflections every week • Stay encouraged.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WRITEUPS */}
      <section id="writeups" className="bg-white dark:bg-slate-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-primary dark:text-white mb-1">Latest Write-ups</h2>
              <p className="text-slate-500 dark:text-slate-300 text-sm md:text-base">
                Short devotionals and reflections rooted in Scripture.
              </p>
            </div>
            <Link href="/writeups" className="text-xs md:text-sm font-semibold text-primary dark:text-accent hover:text-accent transition">
              View all posts →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(latestArticles.length ? latestArticles : []).map((post) => (
              <article
                key={post._id}
                className="bg-cream dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition flex flex-col"
              >
                <p className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                  {post.category?.title ?? 'Devotional'} • {post.readingTime ?? '5 min read'}
                </p>
                <h3 className="font-semibold text-base md:text-lg text-primary dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt ? (
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-1 line-clamp-3">{post.excerpt}</p>
                ) : null}
                <Link
                  href={`/writeups/${post.slug.current}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary dark:text-accent hover:text-accent transition"
                >
                  Read more <span className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PODCASTS */}
      <section id="podcasts" className="bg-cream dark:bg-slate-950 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-primary dark:text-white mb-1">Latest Podcasts</h2>
              <p className="text-slate-500 dark:text-slate-300 text-sm md:text-base">
                Audio encouragements designed for daily life.
              </p>
            </div>
            <Link href="/podcasts" className="text-xs md:text-sm font-semibold text-primary dark:text-accent hover:text-accent transition">
              View all episodes →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(latestPodcasts.length ? latestPodcasts : []).map((p) => (
              <article
                key={p._id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition flex flex-col"
              >
                <p className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                  Podcast • {p.duration ?? 'Short listen'}
                </p>
                <h3 className="font-semibold text-base md:text-lg text-primary dark:text-white mb-2 line-clamp-2">{p.title}</h3>
                {p.excerpt ? (
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-1 line-clamp-3">{p.excerpt}</p>
                ) : null}
                <Link
                  href={`/podcasts/${p.slug.current}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary dark:text-accent hover:text-accent transition"
                >
                  Listen <span className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DOODLES */}
      <section id="doodles" className="bg-white dark:bg-slate-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-primary dark:text-white mb-1">Gospel Doodles</h2>
              <p className="text-slate-500 dark:text-slate-300 text-sm md:text-base">
                Bible stories through simple, memorable doodle videos.
              </p>
            </div>
            <Link href="/doodles" className="text-xs md:text-sm font-semibold text-primary dark:text-accent hover:text-accent transition">
              View all doodles →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(latestDoodles.length ? latestDoodles : []).map((d) => (
              <article
                key={d._id}
                className="bg-cream dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition flex flex-col"
              >
                <p className="text-xs text-slate-500 dark:text-slate-300 mb-1">Doodle Video</p>
                <h3 className="font-semibold text-base md:text-lg text-primary dark:text-white mb-2 line-clamp-2">{d.title}</h3>
                {d.excerpt ? (
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-1 line-clamp-3">{d.excerpt}</p>
                ) : null}
                <Link
                  href={`/doodles/${d.slug.current}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary dark:text-accent hover:text-accent transition"
                >
                  Watch <span className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-cream dark:bg-slate-950 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="font-heading text-2xl md:text-3xl text-primary dark:text-white mb-4 text-center">
            About GospelQuote
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-200 leading-relaxed text-center">
            GospelQuote exists to encourage believers and seekers with simple, Scripture-anchored content. Through short
            write-ups, reflective podcast episodes and doodle-style videos, we desire to help you pause, breathe and
            remember that God is closer than you think. Every piece of content is crafted to point you back to Jesus and
            to the hope of the gospel in everyday life.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white dark:bg-slate-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-primary dark:text-white mb-2">Get in Touch</h2>
              <p className="text-slate-500 dark:text-slate-300 text-sm md:text-base">
                Have a testimony, a question, or a collaboration idea? Send a message and we’ll respond as soon as possible.
              </p>
              <div className="mt-5 rounded-2xl bg-cream dark:bg-slate-800 p-5 border border-slate-200/70 dark:border-slate-700">
                <p className="text-sm font-semibold text-primary dark:text-white">Quick links</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link href="/writeups" className="text-sm font-semibold underline hover:text-accent transition">Write-ups</Link>
                  <Link href="/podcasts" className="text-sm font-semibold underline hover:text-accent transition">Podcasts</Link>
                  <Link href="/doodles" className="text-sm font-semibold underline hover:text-accent transition">Doodles</Link>
                  <Link href="/contact" className="text-sm font-semibold underline hover:text-accent transition">Contact page</Link>
                </div>
              </div>
            </div>

            <div className="bg-cream dark:bg-slate-800 rounded-2xl p-6 md:p-7 border border-slate-200/70 dark:border-slate-700 shadow-soft">
              <form className="grid gap-4" action="/contact" method="get">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Write your message..."
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow hover:bg-primary/90 transition"
                >
                  Continue to Contact Page →
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  For a full form and direct email options, use the Contact page.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
