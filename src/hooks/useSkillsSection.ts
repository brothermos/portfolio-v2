import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const useSkillsSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
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

      if (skillsRef.current) {
        gsap.fromTo(
          skillsRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      }

      const badges = skillsRef.current
        ? Array.from(skillsRef.current.querySelectorAll<HTMLElement>(".skill-badge"))
        : [];

      badges.forEach((badge, i) => {
        gsap.to(badge, {
          y: gsap.utils.random(-12, -20),
          rotation: gsap.utils.random(-3, 3),
          duration: gsap.utils.random(1.8, 2.8),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return {
    skillsRef,
    headingRef,
  };
};

export default useSkillsSection;
