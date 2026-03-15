import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const useHeroSection = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hiRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, {
        x: () => window.innerWidth / 2,
        y: () => window.innerHeight / 2,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "top left",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(logoRef.current, { x: 20, y: 10, xPercent: 0, yPercent: 0, scale: 0.3 }, 0);
      tl.fromTo(navRef.current, { opacity: 0 }, { opacity: 1 }, 0.4);
      tl.to(hiRef.current, { opacity: 0, duration: 0.3 }, 0);

      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars) {
        tl.fromTo(chars, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.03, ease: "power2.out" }, 0);
      }
    });

    return () => ctx.revert();
  }, []);

  return {
    logoRef,
    navRef,
    heroRef,
    titleRef,
    hiRef,
  };
};

export default useHeroSection;
