import type { ComponentProps } from 'react';

type SvgProps = ComponentProps<'svg'>;

function Base(props: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function IconX(props: SvgProps) {
  return (
    <Base {...props}>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </Base>
  );
}

export function IconInstagram(props: SvgProps) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
      <path d="M17.5 6.5h.01" />
    </Base>
  );
}

export function IconYouTube(props: SvgProps) {
  return (
    <Base {...props}>
      <path d="M21.5 7.5a2.5 2.5 0 0 0-1.7-1.7C18.3 5.3 12 5.3 12 5.3s-6.3 0-7.8.5A2.5 2.5 0 0 0 2.5 7.5 26 26 0 0 0 2 12a26 26 0 0 0 .5 4.5 2.5 2.5 0 0 0 1.7 1.7c1.5.5 7.8.5 7.8.5s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.7-1.7A26 26 0 0 0 22 12a26 26 0 0 0-.5-4.5Z" />
      <path d="M10 9.5 15 12l-5 2.5z" />
    </Base>
  );
}

export function IconTikTok(props: SvgProps) {
  return (
    <Base {...props}>
      <path d="M14 3v11.5a4.5 4.5 0 1 1-3.5-4.4" />
      <path d="M14 6c1.2 1.6 2.8 2.5 5 2.5" />
    </Base>
  );
}

export function IconFacebook(props: SvgProps) {
  return (
    <Base {...props}>
      <path d="M14 8h3V5h-3a4 4 0 0 0-4 4v3H7v3h3v6h3v-6h3l1-3h-4V9a1 1 0 0 1 1-1Z" />
    </Base>
  );
}
