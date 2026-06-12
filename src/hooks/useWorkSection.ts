import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

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

      const cards = workRef.current.querySelectorAll<HTMLElement>('.work-card');
      if (cards.length) {
        gsap.fromTo(
          cards,
          { x: 120, opacity: 0, scale: 0.94 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
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
      ctx.revert();
    };
  }, []);

  return {
    workRef,
    headingRef,
  };
};

export default useWorkSection;
