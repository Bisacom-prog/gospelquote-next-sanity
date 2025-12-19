'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { IconInstagram, IconTikTok, IconX, IconYouTube } from './SocialIcons';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/writeups', label: 'Write-ups' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/doodles', label: 'Doodles' },
  { href: '/contact', label: 'Contact' }
];

const social = [
  { href: 'https://x.com/gospelquot', label: 'X', Icon: IconX },
  { href: 'https://www.instagram.com/gospel_quote25', label: 'Instagram', Icon: IconInstagram },
  { href: 'https://youtube.com/@gospelquote', label: 'YouTube', Icon: IconYouTube },
  { href: 'https://www.tiktok.com/@gospelquot', label: 'TikTok', Icon: IconTikTok }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change (fixes mobile menu staying open after navigation).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-primary/95 text-white shadow-md backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="GospelQuote Home">
          <span className="text-xl md:text-2xl font-heading font-semibold tracking-wide">
            Gospel<span className="text-accent">Quote</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-accent transition">
              {n.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {social.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 hover:text-accent transition"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10 transition"
          >
            <span className="text-sm font-semibold">Menu</span>
            <span aria-hidden="true" className="text-xs">▾</span>
          </button>

          {open ? (
            <div
              id="mobile-nav"
              className="absolute right-0 mt-2 w-56 rounded-2xl bg-primary/95 border border-white/10 shadow-soft p-2"
            >
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="block rounded-xl px-3 py-2 text-sm hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}

              <div className="mt-2 border-t border-white/10 pt-2 flex items-center justify-between px-1">
                {social.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 hover:text-accent transition"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
