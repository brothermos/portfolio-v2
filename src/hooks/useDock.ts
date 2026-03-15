import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useLayoutEffect, useRef } from "react";
import { DOCK_BOUND as BOUND, DOCK_MIN_SIZE, DOCK_MAX_SIZE as MAX_SIZE, DOCK_MIN_SIZE as MIN_SIZE } from "../data/dock";

const useDock = () => {
  const dockRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  useLayoutEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    gsap.set(items, { transformOrigin: "50% 100%", width: DOCK_MIN_SIZE, height: MIN_SIZE });
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

    const trigger = ScrollTrigger.getAll().find((t) => t.trigger === el || (t.pin && t.pin === el));

    const scrollTarget = trigger ? trigger.end : href;

    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: scrollTarget, autoKill: false },
      ease: "power2.inOut",
    });
  }, []);

  return {
    dockRef,
    itemRefs,
    handleMouseMove,
    handleMouseLeave,
    handleClick,
  };
};

export default useDock;
