import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    name: "HTML",
    color: "bg-red-500/45",
    border: "border border-red-400/50",
    shadow: "shadow-[0_20px_40px_rgba(239,68,68,0.35)]",
  },
  {
    name: "CSS",
    color: "bg-blue-500/45",
    border: "border border-blue-400/50",
    shadow: "shadow-[0_20px_40px_rgba(59,130,246,0.35)]",
  },
  {
    name: "JavaScript",
    color: "bg-yellow-400/55",
    border: "border border-yellow-300/60",
    shadow: "shadow-[0_20px_40px_rgba(250,204,21,0.35)]",
  },
  {
    name: "TypeScript",
    color: "bg-sky-500/45",
    border: "border border-sky-400/50",
    shadow: "shadow-[0_20px_40px_rgba(14,165,233,0.35)]",
  },
  {
    name: "React.js",
    color: "bg-purple-500/45",
    border: "border border-purple-400/50",
    shadow: "shadow-[0_20px_40px_rgba(168,85,247,0.35)]",
  },
  {
    name: "Next.js",
    color: "bg-green-500/45",
    border: "border border-green-400/50",
    shadow: "shadow-[0_20px_40px_rgba(34,197,94,0.35)]",
  },
  {
    name: "Vue.js",
    color: "bg-pink-500/45",
    border: "border border-pink-400/50",
    shadow: "shadow-[0_20px_40px_rgba(236,72,153,0.35)]",
  },
];

export default function SkillsSection() {
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
}
