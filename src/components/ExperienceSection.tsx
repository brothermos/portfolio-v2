import { HiOutlineBriefcase, HiOutlineComputerDesktop } from 'react-icons/hi2';
import { EXPERIENCE } from '@/data/experience';
import useExperienceSection from '@/hooks/useExperienceSection';

const EXP_ICON_MAP: Record<
  import('../data/experience').ExperienceIconKey,
  React.ComponentType<{ className?: string }>
> = {
  briefcase: HiOutlineBriefcase,
  laptop: HiOutlineComputerDesktop,
};

const ExperienceSection = () => {
  const { headingRef, cardsRef, lineRef } = useExperienceSection();

  return (
    <section
      id="experience"
      className="theme-text flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-24
        font-bold md:gap-20 md:px-6 md:py-32 lg:gap-28"
    >
      <div ref={headingRef} className="flex items-center gap-4">
        <span className="text-6xl font-bold md:text-6xl lg:text-8xl">Experience</span>
      </div>

      <div ref={cardsRef} className="relative w-full max-w-4xl">
        <div
          ref={lineRef}
          className="theme-line absolute top-0 bottom-0 left-6 w-1 origin-top md:left-1/2
            md:-translate-x-1/2"
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {EXPERIENCE.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="exp-card relative flex items-start md:items-center">
                <div
                  className={`exp-dot theme-border absolute left-6 h-5 w-5 rounded-full border-4
                  md:left-1/2 ${exp.dotColor} top-8 z-10 -translate-x-1/2 md:top-1/2
                  md:-translate-y-1/2`}
                />

                <div
                  className={`ml-14 w-[calc(100%-3.5rem)] min-w-0 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
                  }`}
                >
                  <div
                    className={`${exp.color} rounded-[32px] border-4 border-black p-6 text-white
                    backdrop-blur-xl md:p-8 lg:p-10 ${exp.shadow} ${exp.hoverShadow} transition-all
                    duration-300 ease-out md:hover:-translate-y-2 md:hover:scale-[1.02]`}
                  >
                    <span className="mb-3 block text-3xl text-white md:text-4xl lg:text-5xl">
                      {(() => {
                        const Icon = EXP_ICON_MAP[exp.iconKey];
                        return Icon ? (
                          <Icon className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" />
                        ) : null;
                      })()}
                    </span>
                    <h3
                      className="text-lg leading-tight font-bold text-white md:text-2xl lg:text-3xl"
                    >
                      {exp.company}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-white/80 md:text-lg lg:text-xl">
                      {exp.role}
                    </p>
                    {exp.description?.length ? (
                      <ul
                        className="mt-2 list-disc space-y-1 pl-5 text-sm font-medium text-white/65
                          marker:text-white/70 md:text-base lg:text-lg"
                      >
                        {exp.description.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    <div
                      className="mt-4 inline-block rounded-full bg-black/20 px-4 py-1.5 md:px-5
                        md:py-2"
                    >
                      <span
                        className="text-xs font-bold tracking-wide text-white md:text-sm
                          lg:text-base"
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
