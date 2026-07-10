'use client';

/** Full-page boot loader with bouncing piggy bank */
export function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-page-bg"
      role="status"
      aria-live="polite"
      aria-label="กำลังโหลด"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16 animate-pig-bounce text-emerald-700"
        aria-hidden
      >
        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
        <path d="M2 9v1c0 1.1.9 2 2 2h1" />
        <path d="M16 11h.01" />
      </svg>
      <p className="text-sm text-stone-500">กำลังโหลดพอร์ต…</p>
    </div>
  );
}
