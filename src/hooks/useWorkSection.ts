import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useWorkSection = () => {
  const workRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            },
          },
        );
      }

      const panels = workRef.current
        ? Array.from(workRef.current.querySelectorAll<HTMLElement>('.work-panel'))
        : [];

      if (!panels.length) return;

      mm.add(
        {
          isMobile: '(max-width: 767px)',
          isTablet: '(min-width: 768px) and (max-width: 1023px)',
          isDesktop: '(min-width: 1024px)',
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions as {
            isMobile?: boolean;
            isTablet?: boolean;
          };

          panels.forEach((panel, i) => {
            let fromX = 0;
            let fromY = 0;
            let fromRotation = 0;

            if (isMobile) {
              fromY = 44;
            } else if (isTablet) {
              const isLeft = i % 2 === 0;
              fromX = isLeft ? -80 : 80;
              fromRotation = isLeft ? -4 : 4;
            } else {
              const column = i % 3;
              if (column === 0) {
                fromX = -90;
                fromRotation = -4;
              } else if (column === 2) {
                fromX = 90;
                fromRotation = 4;
              } else {
                fromY = 44;
              }
            }

            gsap.fromTo(
              panel,
              { x: fromX, y: fromY, opacity: 0, rotation: fromRotation },
              {
                x: 0,
                y: 0,
                opacity: 1,
                rotation: 0,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 82%',
                  end: 'top 55%',
                  scrub: 1,
                },
              },
            );
          });
        },
      );
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return {
    workRef,
    headingRef,
  };
};

export default useWorkSection;
