'use client';

import { useEffect, useState } from 'react';

const SHOW_AFTER_PX = 400;

/** Floating button to return to the top of the page */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="animate-scroll-hint fixed right-5 bottom-5 z-40">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-900 text-white shadow-[0_4px_30px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] transition-transform duration-200 ease-out hover:scale-110 hover:bg-stone-800"
        aria-label="กลับขึ้นบน"
        title="กลับขึ้นบน"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
