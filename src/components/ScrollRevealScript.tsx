'use client';

import { useEffect } from 'react';

/**
 * Adds simple intersection-observer based reveal animations to elements
 * marked with `.scroll-reveal` and initial Tailwind classes like `opacity-0 translate-y-6`.
 * On reveal it adds `opacity-100 translate-y-0` and unobserves the element.
 */
export function ScrollRevealScript() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.scroll-reveal'));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-6');
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
