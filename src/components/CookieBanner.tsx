'use client';

import { useEffect, useMemo, useState } from 'react';
import { applyAnalyticsConsent, readConsent, writeConsent } from '@/lib/consent';

export function CookieBanner() {
  const existing = useMemo(() => readConsent(), []);
  const [open, setOpen] = useState(() => !existing);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(() => existing?.analytics ?? false);

  // Apply stored consent on load, and wire footer controls.
  useEffect(() => {
    const s = readConsent();
    if (s) applyAnalyticsConsent(s.analytics);

    // Event delegation: footer links/buttons can reopen settings reliably.
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const manage = target?.closest?.('[data-manage-consent]') as HTMLElement | null;
      const enable = target?.closest?.('[data-enable-analytics]') as HTMLElement | null;

      if (manage) {
        e.preventDefault();
        const s2 = readConsent();
        setAnalytics(s2?.analytics ?? false);
        setOpen(true);
        setSettingsOpen(true);
        return;
      }

      if (enable) {
        e.preventDefault();
        writeConsent({ analytics: true });
        applyAnalyticsConsent(true);
        setAnalytics(true);
        setOpen(false);
        setSettingsOpen(false);
        return;
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const rejectAll = () => {
    writeConsent({ analytics: false });
    applyAnalyticsConsent(false);
    setAnalytics(false);
    setOpen(false);
    setSettingsOpen(false);
  };

  const enableAnalytics = () => {
    writeConsent({ analytics: true });
    applyAnalyticsConsent(true);
    setAnalytics(true);
    setOpen(false);
    setSettingsOpen(false);
  };

  const savePreferences = () => {
    writeConsent({ analytics });
    applyAnalyticsConsent(analytics);
    setOpen(false);
    setSettingsOpen(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Banner */}
      <div className="fixed inset-x-0 bottom-0 z-[70] p-4">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white text-slate-800 border border-slate-200 shadow-soft dark:bg-slate-900 dark:text-white dark:border-slate-700 p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Cookies & analytics</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
                We use essential cookies to make this site work. With your permission, we also use analytics cookies
                (Google Analytics 4 in Consent Mode) to understand usage and improve content.
              </p>
              <a
                href="/privacy-policy"
                className="text-xs font-semibold underline text-primary dark:text-accent hover:opacity-80 transition"
              >
                Privacy & Cookie Policy
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                onClick={rejectAll}
              >
                Reject
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow hover:bg-primary/90 transition"
                onClick={enableAnalytics}
              >
                Enable analytics cookies
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                onClick={() => setSettingsOpen(true)}
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings modal */}
      {settingsOpen ? (
        <div className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-cream dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/70 dark:border-slate-700 shadow-soft p-6">
            <h3 className="text-lg font-bold mb-3 text-primary dark:text-white">Manage Cookie Preferences</h3>
            <p className="text-sm mb-4">
              Choose which cookies you&apos;d like to allow. You can update these at any time.
            </p>

            <div className="mb-5 space-y-4">
              <div>
                <p className="font-semibold">Strictly Necessary Cookies</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Required for the website to function. These cannot be switched off.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/70 dark:border-slate-700 p-4 bg-white/60 dark:bg-slate-950/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">Analytics Cookies</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Help us understand how people use the site so we can improve content and experience.
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 text-sm font-semibold select-none">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="h-4 w-4 accent-primary"
                    />
                    Enable
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full px-4 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                onClick={savePreferences}
              >
                Save Settings
              </button>

              <button
                type="button"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                onClick={rejectAll}
              >
                Reject All
              </button>

              <button
                type="button"
                className="text-sm font-semibold text-primary dark:text-accent underline mx-auto block hover:opacity-80 transition"
                onClick={() => setSettingsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
