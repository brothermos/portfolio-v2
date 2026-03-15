import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

const useAboutSection = () => {
  const introRef = useRef<HTMLElement>(null);
  const hoorayRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

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

      const wordEls = introRef.current ? Array.from(introRef.current.querySelectorAll(".word")) : [];

      if (!wordEls.length) return;

      const LOOKAHEAD = 7;
      const textEls = wordEls.map((w) => w.querySelector(".word-text") as HTMLElement);
      const bgEls = wordEls.map((w) => w.querySelector(".word-bg") as HTMLElement);
      const highlightEls = wordEls.map((w) => w.querySelector(".word-highlight") as HTMLElement | null);

      gsap.set(textEls, { opacity: 0 });
      gsap.set(bgEls, { opacity: 0 });

      const fadeSteps = Array.from({ length: LOOKAHEAD }, (_, i) => 1 - i / LOOKAHEAD);

      const total = wordEls.length;
      const HOORAY_STEPS = 15;
      const allSteps = LOOKAHEAD + total + HOORAY_STEPS;
      const introPhase = LOOKAHEAD / allSteps;
      const revealPhase = (LOOKAHEAD + total) / allSteps;
      let prevRevealed = -1;
      let prevIntroCount = -1;

      ScrollTrigger.create({
        trigger: introRef.current,
        start: "top top",
        end: () => `+=${allSteps * 40}`,
        pin: true,
        onUpdate: (self) => {
          if (self.progress <= introPhase) {
            const introProgress = self.progress / introPhase;
            const boxCount = Math.round(introProgress * LOOKAHEAD);

            if (boxCount === prevIntroCount && prevRevealed <= 0) return;

            for (let i = 0; i < total; i++) {
              if (i < boxCount) {
                gsap.set(textEls[i], { opacity: i === 0 ? 0.4 : 0 });
                gsap.set(bgEls[i], { opacity: fadeSteps[i] });
              } else {
                gsap.set(textEls[i], { opacity: 0 });
                gsap.set(bgEls[i], { opacity: 0 });
              }
            }
            prevIntroCount = boxCount;
            prevRevealed = 0;
            return;
          }

          const revealProgress = Math.min((self.progress - introPhase) / (revealPhase - introPhase), 1);
          const revealed = Math.round(revealProgress * total);

          if (revealed !== prevRevealed) {
            for (let i = 0; i < total; i++) {
              if (i < revealed) {
                gsap.set(textEls[i], { opacity: 1 });
                gsap.set(bgEls[i], { opacity: 0 });
                if (highlightEls[i]) gsap.set(highlightEls[i], { opacity: 1 });
              } else if (i < revealed + LOOKAHEAD) {
                const pos = i - revealed;
                gsap.set(textEls[i], { opacity: pos === 0 ? 0.4 : 0 });
                gsap.set(bgEls[i], { opacity: fadeSteps[pos] });
                if (highlightEls[i]) gsap.set(highlightEls[i], { opacity: 0 });
              } else {
                gsap.set(textEls[i], { opacity: 0 });
                gsap.set(bgEls[i], { opacity: 0 });
                if (highlightEls[i]) gsap.set(highlightEls[i], { opacity: 0 });
              }
            }
            prevRevealed = revealed;
            prevIntroCount = -1;
          }

          if (hoorayRef.current) {
            if (self.progress > revealPhase) {
              const hoorayProgress = (self.progress - revealPhase) / (1 - revealPhase);
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              const maxW = isMobile ? 75 : 30;
              const w = hoorayProgress * maxW;
              gsap.set(hoorayRef.current, {
                width: `${w}%`,
                opacity: hoorayProgress,
              });
            } else {
              gsap.set(hoorayRef.current, { width: "0%", opacity: 0 });
            }
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return {
    introRef,
    hoorayRef,
    headingRef,
  };
};

export default useAboutSection;
