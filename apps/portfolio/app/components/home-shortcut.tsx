/** Home link back to the main Vite site (outside Next.js basePath). */
export function HomeShortcut() {
  return (
    <a
      href="/"
      className="group fixed top-5 right-5 z-50 flex h-12 w-12 items-center justify-center
        rounded-2xl border border-stone-200/80 bg-white/70 text-stone-800 shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]
        backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5"
      aria-label="กลับหน้าหลัก"
      title="กลับหน้าหลัก"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 opacity-80 transition-transform duration-300 group-hover:scale-110"
        aria-hidden
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="M9.5 20v-6h5v6" />
      </svg>
      <span
        className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 rounded-lg
          bg-stone-800 px-3 py-1 text-[11px] font-semibold whitespace-nowrap text-white opacity-0
          shadow-lg transition-opacity duration-150 group-hover:opacity-100
          after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2
          after:border-[5px] after:border-transparent after:border-b-stone-800 after:content-['']"
      >
        หน้าหลัก
      </span>
    </a>
  );
}
