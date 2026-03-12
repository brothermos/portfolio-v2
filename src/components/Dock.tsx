import { useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface DockItem {
  label: string;
  icon: string;
  href: string;
  bubbleBg: string;
  arrowColor: string;
}

const DOCK_ITEMS: DockItem[] = [
  { label: "Home", icon: "🏠", href: "#home", bubbleBg: "bg-red-500", arrowColor: "after:border-t-red-500" },
  { label: "About", icon: "👤", href: "#about", bubbleBg: "bg-blue-500", arrowColor: "after:border-t-blue-500" },
  { label: "Skills", icon: "⚡", href: "#skills", bubbleBg: "bg-yellow-500", arrowColor: "after:border-t-yellow-500" },
  { label: "Work", icon: "💼", href: "#work", bubbleBg: "bg-purple-500", arrowColor: "after:border-t-purple-500" },
  { label: "Contact", icon: "✉️", href: "#contact", bubbleBg: "bg-green-500", arrowColor: "after:border-t-green-500" },
];

const MIN_SIZE = 48;
const MAX_SIZE = 96;
const BOUND = MIN_SIZE * Math.PI;

export default function Dock() {
  const dockRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useLayoutEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    gsap.set(items, { transformOrigin: "50% 100%", width: MIN_SIZE, height: MIN_SIZE });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const dock = dockRef.current;
    const firstItem = itemRefs.current[0];
    if (!dock || !firstItem) return;

    const offset = dock.getBoundingClientRect().left + firstItem.offsetLeft;
    const pointer = e.clientX - offset;
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];

    for (let i = 0; i < items.length; i++) {
      const distance = i * MIN_SIZE + MIN_SIZE / 2 - pointer;
      let x = 0;
      let scale = 1;

      if (-BOUND < distance && distance < BOUND) {
        const rad = (distance / MIN_SIZE) * 0.5;
        scale = 1 + (MAX_SIZE / MIN_SIZE - 1) * Math.cos(rad);
        x = 2 * (MAX_SIZE - MIN_SIZE) * Math.sin(rad);
      } else {
        x = (-BOUND < distance ? 2 : -2) * (MAX_SIZE - MIN_SIZE);
      }

      gsap.to(items[i], { duration: 0.3, x, scale });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    gsap.to(items, { duration: 0.3, scale: 1, x: 0 });
  }, []);

  const handleClick = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const trigger = ScrollTrigger.getAll().find(
      (t) => t.trigger === el || (t.pin && t.pin === el)
    );

    const scrollTarget = trigger ? trigger.end : href;

    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: scrollTarget, autoKill: false },
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex justify-center">
      <ul
        ref={dockRef}
        className="inline-flex justify-center items-end h-16 m-0 px-3 py-2 bg-white/45 backdrop-blur-xl border border-white/60 rounded-2xl list-none shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {DOCK_ITEMS.map((item, i) => (
          <li
            key={item.label}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="w-14 h-14 mx-[3px] will-change-transform"
          >
            <button
              onClick={() => handleClick(item.href)}
              className="group flex flex-col items-center justify-center w-full h-full rounded-xl bg-white/60 border border-black/8 cursor-pointer transition-colors duration-200 p-0 relative hover:bg-white/85"
              aria-label={item.label}
            >
              <span className="text-[22px] leading-none">{item.icon}</span>
              <span className={`absolute -top-9 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-white px-3 py-1 rounded-lg whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 shadow-lg group-hover:opacity-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent ${item.bubbleBg} ${item.arrowColor}`}>
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
