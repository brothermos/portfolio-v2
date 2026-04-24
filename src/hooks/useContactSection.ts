import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current
        ? Array.from(cardsRef.current.querySelectorAll<HTMLElement>('.contact-card'))
        : [];

      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { x: isLeft ? -70 : 70, opacity: 0, rotation: isLeft ? -3 : 3 },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'top 56%',
              scrub: 1,
            },
          },
        );
      });

      const items = cardsRef.current
        ? Array.from(cardsRef.current.querySelectorAll<HTMLElement>('.contact-item'))
        : [];

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 86%',
              end: 'top 64%',
              scrub: 1,
            },
            delay: i * 0.03,
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    headingRef,
    cardsRef,
  };
};

export default useContactSection;
