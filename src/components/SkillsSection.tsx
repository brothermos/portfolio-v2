import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const SKILLS = [
  { name: "HTML", color: "bg-red-500" },
  { name: "CSS", color: "bg-blue-500" },
  { name: "JavaScript", color: "bg-yellow-500" },
  { name: "TypeScript", color: "bg-sky-500" },
  { name: "React.js", color: "bg-purple-500" },
  { name: "Next.js", color: "bg-green-500" },
  { name: "Vue.js", color: "bg-pink-500" },
];

export default function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const badges = skillsRef.current
        ? Array.from(
            skillsRef.current.querySelectorAll<HTMLElement>(".skill-badge")
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
      className="min-h-screen flex flex-col gap-12 md:gap-20 lg:gap-28 items-center justify-center px-4 md:px-6 py-16 text-black font-bold"
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl md:text-6xl lg:text-8xl">Skills</span>
      </div>
      <div
        ref={skillsRef}
        className="flex flex-col items-center gap-4 md:gap-8 lg:gap-12"
      >
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
          {SKILLS.slice(0, 4).map((skill) => (
            <span
              key={skill.name}
              className={`skill-badge px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 border-2 md:border-4 border-black rounded-full ${skill.color} text-white text-base md:text-2xl lg:text-5xl font-semibold will-change-transform`}
            >
              {skill.name}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
          {SKILLS.slice(4).map((skill) => (
            <span
              key={skill.name}
              className={`skill-badge px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 border-2 md:border-4 border-black rounded-full ${skill.color} text-white text-base md:text-2xl lg:text-5xl font-semibold will-change-transform`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
