import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
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
        ? Array.from(
            skillsRef.current.querySelectorAll<HTMLElement>(".skill-badge"),
          )
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

  return (
    <section
      id="skills"
      className="h-screen flex flex-col gap-12 md:gap-20 lg:gap-28 items-center justify-center px-4 md:px-6 py-16 text-black font-bold"
    >
      <div ref={headingRef} className="flex items-center gap-4">
        <span className="text-6xl md:text-6xl lg:text-8xl font-bold">
          Skills
        </span>
      </div>
      <div
        ref={skillsRef}
        className="flex flex-col items-center gap-4 md:gap-8 lg:gap-12"
      >
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
          {SKILLS.slice(0, 4).map((skill) => (
            <span
              key={skill.name}
              className={`skill-badge px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full backdrop-blur-xl ${skill.color} ${skill.border} ${skill.shadow} text-white text-base md:text-2xl lg:text-5xl font-semibold will-change-transform`}
            >
              {skill.name}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
          {SKILLS.slice(4).map((skill) => (
            <span
              key={skill.name}
              className={`skill-badge px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full backdrop-blur-xl ${skill.color} ${skill.border} ${skill.shadow} text-white text-base md:text-2xl lg:text-5xl font-semibold will-change-transform`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
