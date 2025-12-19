export function ThemeScript() {
  // Ensures correct theme class is applied before hydration (prevents flash).
  const script = `(() => {
    try {
      const key = 'gq-theme';
      const stored = localStorage.getItem(key);
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (e) {}
  })();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
