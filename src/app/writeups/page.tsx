import { groq } from 'next-sanity';
import { client } from '@/lib/sanity';
import type { Article, Category } from '@/lib/types';
import { WriteupsClient } from './writeupsClient';

const articlesQuery = groq`*[_type=="article"]|order(publishedAt desc){_id,title,slug,excerpt,readingTime,publishedAt,tags,"category": category->{_id,title,slug}}`;
const categoriesQuery = groq`*[_type=="category"]|order(title asc){_id,title,slug}`;

export default async function WriteupsPage() {
  let articles: Article[] = [];
  let categories: Category[] = [];
  try {
    articles = await client.fetch(articlesQuery, {}, { next: { revalidate: 300 } });
    categories = await client.fetch(categoriesQuery, {}, { next: { revalidate: 300 } });
  } catch {
    articles = [];
    categories = [];
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-primary dark:text-accent font-semibold">
          Latest Write-ups
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Devotionals, reflections, and scripture-inspired thoughts.
        </p>
      </div>

      <WriteupsClient articles={articles} categories={categories} />
    </div>
  );
}
