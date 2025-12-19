'use client';

import { useEffect, useState } from 'react';
import { getInitialTheme, toggleTheme } from '@/lib/theme';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = getInitialTheme();
    setIsDark(t === 'dark');
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
        setIsDark(document.documentElement.classList.contains('dark'));
      }}
      className="fixed bottom-6 right-5 z-50 h-11 w-11 rounded-full bg-primary text-white shadow-soft border border-white/15 hover:bg-primary/90 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="mx-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v2" />
          <path d="M12 19v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="mx-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
