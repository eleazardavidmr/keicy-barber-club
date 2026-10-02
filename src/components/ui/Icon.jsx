// One line weight, round joins, 24px grid: a single family for services and UI.
const paths = {
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.12 8.12 12 12M20 4 8.12 15.88M14.47 14.48 20 20" />
    </>
  ),
  beard: (
    <>
      <path d="M5.5 9.5a6.5 6.5 0 0 1 13 0" />
      <path d="M5.5 9.5v2.75a6.5 6.5 0 0 0 13 0V9.5" />
      <path d="M8.75 13.75c1.1-.9 2.2-.9 3.25 0 1.05-.9 2.15-.9 3.25 0" />
      <path d="M10.5 17.25h3" />
    </>
  ),
  gem: (
    <>
      <path d="M6 3.5h12l3.5 5.25L12 20.5 2.5 8.75z" />
      <path d="M2.5 8.75h19M9.25 3.5 8 8.75l4 11.75 4-11.75-1.25-5.25" />
    </>
  ),
  razor: (
    <>
      <path d="M10.25 13.75 19 5a1.77 1.77 0 0 1 2.5 2.5l-7.75 7.75a2 2 0 0 1-1.4.6h-1.6" />
      <path d="M10.25 13.75 4 20" />
      <circle cx="10.25" cy="13.75" r="1" />
    </>
  ),
  brow: (
    <>
      <path d="M3.5 8.5c3.5-3 10-3.75 15.5-1.25" />
      <path d="M2.5 15s3.5-4.25 9.5-4.25 9.5 4.25 9.5 4.25-3.5 4.25-9.5 4.25S2.5 15 2.5 15z" />
      <circle cx="12" cy="15" r="2" />
    </>
  ),
  sparkle: (
    <>
      <path d="M10 3.5 11.6 8a2 2 0 0 0 1.2 1.2L17.5 11l-4.7 1.7a2 2 0 0 0-1.2 1.2L10 18.5l-1.6-4.6a2 2 0 0 0-1.2-1.2L2.5 11l4.7-1.8A2 2 0 0 0 8.4 8z" />
      <path d="M18.5 3v4M16.5 5h4M19 16v3M17.5 17.5h3" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3.25s6.5 6.6 6.5 11a6.5 6.5 0 0 1-13 0c0-4.4 6.5-11 6.5-11z" />
      <path d="M9 14.75a3 3 0 0 0 3 3" />
    </>
  ),
  comb: (
    <>
      <path d="M3 7.5h18v3.25H3z" />
      <path d="M5 10.75v6.5M8 10.75v6.5M11 10.75v6.5M14 10.75v6.5M17 10.75v4.5M20 10.75v3" />
    </>
  ),

  // UI
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  arrowRight: <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  chevronRight: <path d="m9 5.5 6.5 6.5L9 18.5" />,
  chevronLeft: <path d="M15 5.5 8.5 12l6.5 6.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 7.25V12l3 2" />
    </>
  ),
  phone: (
    <path d="M8.6 3.5H6A2.5 2.5 0 0 0 3.5 6c0 8 6.5 14.5 14.5 14.5a2.5 2.5 0 0 0 2.5-2.5v-2.6l-4.25-1.7-1.7 2.1a11 11 0 0 1-6.3-6.3l2.1-1.7z" />
  ),
  chat: (
    <>
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.4 7.55L3.5 20.5l1.35-4.4A8.5 8.5 0 1 1 20.5 11.6z" />
      <path d="M8.75 9.5c.4 2.6 2.75 5 5.75 5.75" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  star: <path d="m12 3.5 2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r=".6" fill="currentColor" />
    </>
  ),
  tiktok: <path d="M14.5 3.5c.35 2.6 2 4.3 4.75 4.6v3.05a8.2 8.2 0 0 1-4.6-1.5v6.1A5.25 5.25 0 1 1 9.4 10.5v3.15a2.2 2.2 0 1 0 2.1 2.2V3.5z" />,
};

export default function Icon({ name, className = 'size-6', strokeWidth = 1.5, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
