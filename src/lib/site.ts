export const siteConfig = {
  name: 'GospelQuote',
  description: 'Inspiring faith through Christian write-ups, podcasts and doodle videos.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  twitterHandle: '@gospelquot',
  email: 'gospelquoteblog@gmail.com'
};

export type ConsentState = {
  analytics: boolean;
};
