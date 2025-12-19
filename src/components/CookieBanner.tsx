'use client';

import { useEffect, useMemo, useState } from 'react';
import { applyAnalyticsConsent, readConsent, writeConsent } from '@/lib/consent';

export function CookieBanner() {
  const existing = useMemo(() => readConsent(), []);
  const [open, setOpen] = useState(() => !existing);
  const [analytics, setAnalytics] = useState(() => existing?.analytics ?? false);

  useEffect(() => {
    // Apply stored consent on load
    const s = readConsent();
    if (s) applyAnalyticsConsent(s.analytics);

    // Wire footer "Manage cookies" link to re-open banner
    const handler = (e: Event) => {
      e.preventDefault();
      const s2 = readConsent();
      setAnalytics(s2?.analytics ?? false);
      setOpen(true);
    };
    const links = Array.from(document.querySelectorAll('[data-manage-consent]'));
    links.forEach((l) => l.addEventListener('click', handler));
    return () => {
      links.forEach((l) => l.removeEventListener('click', handler));
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white text-slate-900 shadow-soft border border-slate-200 dark:bg-slate-900 dark:text-white dark:border-slate-700 p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Cookies & analytics</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
              We use essential cookies to make this site work. With your permission, we also use analytics cookies
              (Google Analytics 4 in Consent Mode) to understand usage and improve content.
            </p>

            <label className="mt-2 inline-flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-600"
              />
              Enable analytics cookies
            </label>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/privacy-policy"
              className="text-xs font-semibold text-primary dark:text-accent underline"
            >
              Privacy & Cookie Policy
            </a>

            <button
              type="button"
              className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => {
                writeConsent({ analytics: false });
                applyAnalyticsConsent(false);
                setOpen(false);
              }}
            >
              Reject
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90"
              onClick={() => {
                writeConsent({ analytics });
                applyAnalyticsConsent(analytics);
                setOpen(false);
              }}
            >
              Save preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
