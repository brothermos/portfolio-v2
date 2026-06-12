import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useWorkSection = () => {
  const workRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const hoverCleanups: (() => void)[] = [];

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

      if (!workRef.current) return;

      const cardHovers =
        workRef.current.querySelectorAll<HTMLElement>('.work-card-hover');

      if (cardHovers.length) {
        gsap.fromTo(
          cardHovers,
          { x: 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: workRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        const canHover = window.matchMedia('(hover: hover)').matches;
        if (canHover) {
          cardHovers.forEach((card) => {
            gsap.set(card, { transformOrigin: 'center center', force3D: true });

            const yTo = gsap.quickTo(card, 'y', { duration: 0.55, ease: 'power3.out' });
            const scaleTo = gsap.quickTo(card, 'scale', {
              duration: 0.55,
              ease: 'power3.out',
            });

            const onEnter = () => {
              yTo(-8);
              scaleTo(1.02);
            };
            const onLeave = () => {
              yTo(0);
              scaleTo(1);
            };

            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mouseleave', onLeave);
            hoverCleanups.push(() => {
              card.removeEventListener('mouseenter', onEnter);
              card.removeEventListener('mouseleave', onLeave);
            });
          });
        }
      }

      const controls = workRef.current.querySelector<HTMLElement>('.work-controls');
      if (controls) {
        gsap.fromTo(
          controls,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.45,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: workRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
    });

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return {
    workRef,
    headingRef,
  };
};

export default useWorkSection;
