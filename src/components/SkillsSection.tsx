import { SKILLS } from "../data/skills";
import useSkillsSection from "../hooks/useSkillsSection";

const SkillsSection = () => {
  const { skillsRef, headingRef } = useSkillsSection();

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
