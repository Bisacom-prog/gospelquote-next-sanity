import type { Metadata } from 'next';
import Script from 'next/script';
import { Poppins, Playfair_Display } from 'next/font/google';
import { siteConfig } from '@/lib/site';
import { ThemeScript } from '@/components/ThemeScript';
import { ScrollRevealScript } from '@/components/ScrollRevealScript';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CookieBanner } from '@/components/CookieBanner';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-heading',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Christian Inspiration Blog`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga4 = process.env.NEXT_PUBLIC_GA_ID ?? process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${playfair.variable}`}>
      <head>
        <ThemeScript />
        <ScrollRevealScript />
      </head>
      <body className="bg-cream text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        {ga4 ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
            <Script id="ga4-consent" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent','default', { 'analytics_storage': 'denied', 'ad_storage': 'denied' });
                gtag('js', new Date());
                gtag('config', '${ga4}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}

        <SiteHeader />

        <main className="pt-24 md:pt-28">{children}</main>

        <SiteFooter />

        <ThemeToggle />
        <CookieBanner />
      </body>
    </html>
  );
}
