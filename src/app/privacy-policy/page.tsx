import { siteConfig } from '@/lib/site';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">
      <h1 className="font-heading text-3xl md:text-4xl text-primary dark:text-accent font-semibold mb-6">
        Privacy &amp; Cookie Policy
      </h1>
      <div className="space-y-6 text-sm md:text-base leading-relaxed">
        <p>
          At <strong>{siteConfig.name}</strong>, we are committed to protecting your privacy and being transparent about how we use personal data in line with UK GDPR and PECR.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">What we collect</h2>
          <ul className="list-disc ml-6">
            <li>Contact form details (name, email, message)</li>
            <li>Technical data (IP address, browser type, device)</li>
            <li>Analytics data (only if you consent)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">Cookies</h2>
          <p>
            We use essential cookies to ensure the site works. We also offer optional analytics cookies (GA4) that remain disabled unless you opt in.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">Your rights</h2>
          <ul className="list-disc ml-6">
            <li>Access, correction, deletion, and objection</li>
            <li>Withdraw cookie consent at any time (use “Manage cookies” in the footer)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">Contact</h2>
          <p>
            For privacy concerns, contact: <a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>
      </div>
    </div>
  );
}
