import Link from 'next/link';
import { IconFacebook, IconInstagram, IconTikTok, IconX, IconYouTube } from './SocialIcons';

const social = [
  { href: 'https://x.com/gospelquot', label: 'X', Icon: IconX },
  { href: 'https://www.facebook.com/share/193V7VV76n/?mibextid=wwXIfr', label: 'Facebook', Icon: IconFacebook },
  { href: 'https://www.instagram.com/gospel_quote25', label: 'Instagram', Icon: IconInstagram },
  { href: 'https://youtube.com/@gospelquote', label: 'YouTube', Icon: IconYouTube },
  { href: 'https://www.tiktok.com/@gospelquot', label: 'TikTok', Icon: IconTikTok }
];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-heading text-lg">
            Gospel<span className="text-accent">Quote</span>
          </p>
          <p className="text-xs text-white/80">© 2025 GospelQuote — Revealing Christ.</p>

          <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-3 text-[0.7rem] text-white/80">
            <Link href="/privacy-policy" className="underline hover:text-accent">
              Privacy &amp; Cookie Policy
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/terms-of-use" className="underline hover:text-accent">
              Terms of Use
            </Link>
            <span aria-hidden="true">•</span>
            <a href="#" className="underline hover:text-accent" data-manage-consent>
              Manage cookies
            </a>
            <span className="mx-2 opacity-60">•</span>
            <a href="#" data-enable-analytics className="underline hover:text-accent transition">
              Enable analytics cookies
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {social.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/10 hover:text-accent transition"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
