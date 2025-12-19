import { siteConfig } from '@/lib/site';

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
      <section className="mb-8">
        <p className="text-xs tracking-[0.2em] font-semibold text-accent uppercase mb-2">Contact GospelQuote</p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary dark:text-accent font-semibold">We'd Love to Hear From You</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">
          Whether you have a testimony, a question, feedback, or a collaboration idea, feel free to reach out.
        </p>
      </section>

      <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-soft border border-slate-200 dark:border-slate-700">
        <form className="grid gap-6" action={`mailto:${siteConfig.email}`} method="post" encType="text/plain">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input name="name" type="text" placeholder="Your Name" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input name="email" type="email" placeholder="you@example.com" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input name="subject" type="text" placeholder="How can we help?" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:ring-2 focus:ring-primary/30" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea name="message" rows={6} placeholder="Write your message here..." className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:ring-2 focus:ring-primary/30" />
          </div>

          <button type="submit" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow hover:bg-primary/90 transition">
            Send Message
          </button>

          <p className="text-xs text-slate-500 dark:text-slate-300">
            Prefer email? Write to <a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </form>
      </section>
    </div>
  );
}
