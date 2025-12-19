import { siteConfig } from '@/lib/site';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">
      <h1 className="font-heading text-3xl md:text-4xl text-primary dark:text-accent font-semibold mb-6">Terms of Use</h1>
      <div className="space-y-6 text-sm md:text-base leading-relaxed">
        <p>
          By accessing or using <strong>{siteConfig.name}</strong>, you agree to these Terms of Use.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">Purpose</h2>
          <p>
            {siteConfig.name} provides devotionals, podcasts and doodle-style scripture videos for spiritual encouragement and educational reflection.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">Use of content</h2>
          <ul className="list-disc ml-6">
            <li>You may view and share links with clear attribution.</li>
            <li>You must not republish or sell content without prior written permission.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">Disclaimer</h2>
          <p>
            Content is provided “as is” without warranties. You are responsible for how you use any information on the site.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">Contact</h2>
          <p>
            Questions? Email <a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
