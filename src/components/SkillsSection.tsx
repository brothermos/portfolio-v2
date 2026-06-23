import { SKILLS } from '@/data/skills';
import useSkillsSection from '@/hooks/useSkillsSection';

const SkillsSection = () => {
  const { skillsRef, headingRef } = useSkillsSection();

  return (
    <section
      id="skills"
      className="theme-text flex h-screen flex-col items-center justify-center gap-12 px-4 py-16
        font-bold md:gap-20 md:px-6 lg:gap-28"
    >
      <div ref={headingRef} className="flex items-center gap-4">
        <span className="text-6xl font-bold md:text-6xl lg:text-8xl">Skills</span>
      </div>
      <div ref={skillsRef} className="flex flex-col items-center gap-4 md:gap-8 lg:gap-12">
        <div className="flex w-full flex-col items-center gap-6 md:hidden">
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.slice(0, 3).map((skill) => (
              <span
                key={skill.name}
                className={`skill-badge rounded-full border-4 border-black px-5 py-2.5
                backdrop-blur-xl ${skill.color} ${skill.shadow} text-lg font-semibold text-white
                will-change-transform`}
              >
                {skill.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.slice(3, 5).map((skill) => (
              <span
                key={skill.name}
                className={`skill-badge rounded-full border-4 border-black px-5 py-2.5
                backdrop-blur-xl ${skill.color} ${skill.shadow} text-lg font-semibold text-white
                will-change-transform`}
              >
                {skill.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.slice(5, 8).map((skill) => (
              <span
                key={skill.name}
                className={`skill-badge rounded-full border-4 border-black px-5 py-2.5
                backdrop-blur-xl ${skill.color} ${skill.shadow} text-lg font-semibold text-white
                will-change-transform`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden w-full flex-col items-center gap-4 md:flex md:gap-8 lg:gap-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
            {SKILLS.slice(0, 4).map((skill) => (
              <span
                key={skill.name}
                className={`skill-badge rounded-full border-4 border-black px-5 py-2.5
                backdrop-blur-xl md:px-6 md:py-3 lg:px-8 lg:py-4 ${skill.color} ${skill.shadow}
                text-lg font-semibold text-white will-change-transform md:text-2xl lg:text-5xl`}
              >
                {skill.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
            {SKILLS.slice(4, 8).map((skill) => (
              <span
                key={skill.name}
                className={`skill-badge rounded-full border-4 border-black px-5 py-2.5
                backdrop-blur-xl md:px-6 md:py-3 lg:px-8 lg:py-4 ${skill.color} ${skill.shadow}
                text-lg font-semibold text-white will-change-transform md:text-2xl lg:text-5xl`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
