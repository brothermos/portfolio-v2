import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const useWorkSection = () => {
  const workRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
      }

      const panels = workRef.current
        ? Array.from(workRef.current.querySelectorAll<HTMLElement>(".work-panel"))
        : [];

      if (!panels.length) return;

      panels.forEach((panel, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          panel,
          { x: isLeft ? -80 : 80, opacity: 0, rotation: isLeft ? -4 : 4 },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return {
    workRef,
    headingRef,
  };
};

export default useWorkSection;
