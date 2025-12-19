import type { ConsentState } from './site';

const KEY = 'gq-consent-v1';

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function applyAnalyticsConsent(granted: boolean) {
  // GA4 Consent Mode hook.
  // The global gtag is injected in <RootLayout/> only when NEXT_PUBLIC_GA4_ID is set.
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
  if (typeof gtag !== 'function') return;
  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied'
  });
}
