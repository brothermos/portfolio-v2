import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

const useQuoteSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.q-word');
      const icons = gsap.utils.toArray<HTMLElement>('.q-icon');
      const tags = gsap.utils.toArray<HTMLElement>('.q-tag');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 1,
        },
      });

      tl.fromTo(
        words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, ease: 'power3.out' },
      )
        .fromTo(
          icons,
          { scale: 0 },
          { scale: 1, stagger: 0.12, ease: 'back.out(2)' },
          '<',
        )
        .fromTo(
          descRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power3.out' },
          '<0.2',
        )
        .fromTo(
          tags,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.08, ease: 'back.out(2)' },
          '<0.1',
        );

      tags.forEach((tag, i) => {
        gsap.to(tag, {
          y: '+=14',
          duration: 2 + (i % 3) * 0.45,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.15,
        });
      });

      icons.forEach((icon, i) => {
        gsap.fromTo(
          icon,
          { rotate: -10 },
          {
            rotate: 10,
            transformOrigin: 'center center',
            duration: 0.45,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.12,
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef, titleRef, descRef, tagsRef };
};

export default useQuoteSection;
