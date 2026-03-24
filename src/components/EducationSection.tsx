import { HiOutlineAcademicCap, HiOutlineRocketLaunch } from 'react-icons/hi2';
import { EDUCATION } from '@/data/education';
import useEducationSection from '@/hooks/useEducationSection';

const EDU_ICON_MAP: Record<
  import('@/data/education').EducationIconKey,
  React.ComponentType<{ className?: string }>
> = {
  rocket: HiOutlineRocketLaunch,
  graduation: HiOutlineAcademicCap,
};

const EducationSection = () => {
  const { headingRef, cardsRef, lineRef } = useEducationSection();

  return (
    <section
      id="education"
      className="theme-text flex min-h-screen flex-col items-center justify-center gap-12 px-4
        py-24 font-bold md:gap-20 md:px-6 md:py-32 lg:gap-28"
    >
      <div ref={headingRef} className="flex items-center gap-4">
        <span className="text-6xl font-bold md:text-6xl lg:text-8xl">Education</span>
      </div>

      <div ref={cardsRef} className="relative w-full max-w-4xl">
        <div
          ref={lineRef}
          className="theme-line absolute top-0 bottom-0 left-6 w-1 origin-top md:left-1/2
            md:-translate-x-1/2"
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {EDUCATION.map((edu, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="edu-card relative flex items-start md:items-center">
                <div
                  className={`edu-dot theme-border absolute left-6 h-5 w-5 rounded-full border-4
                  md:left-1/2 ${edu.dotColor} top-8 z-10 -translate-x-1/2 md:top-1/2
                  md:-translate-y-1/2`}
                />

                <div
                  className={`ml-14 w-[calc(100%-3.5rem)] min-w-0 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
                  }`}
                >
                  <div
                    className={`${edu.color} ${edu.border} rounded-[32px] p-6 text-white
                    backdrop-blur-xl md:p-8 lg:p-10 ${edu.shadow} ${edu.hoverShadow} transition-all
                    duration-300 ease-out md:hover:-translate-y-2 md:hover:scale-[1.02]`}
                  >
                    <span className="mb-3 block text-3xl text-white md:text-4xl lg:text-5xl">
                      {(() => {
                        const Icon = EDU_ICON_MAP[edu.iconKey];
                        return Icon ? (
                          <Icon className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" />
                        ) : null;
                      })()}
                    </span>
                    <h3
                      className="text-lg leading-tight font-bold text-white md:text-2xl lg:text-3xl"
                    >
                      {edu.institution}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-white/80 md:text-lg lg:text-xl">
                      {edu.program}
                    </p>
                    {edu.detail && (
                      <p className="mt-1 text-sm font-medium text-white/65 md:text-base lg:text-lg">
                        {edu.detail}
                      </p>
                    )}
                    <div
                      className="mt-4 inline-block rounded-full bg-black/20 px-4 py-1.5 md:px-5
                        md:py-2"
                    >
                      <span
                        className="text-xs font-bold tracking-wide text-white md:text-sm
                          lg:text-base"
                      >
                        {edu.period}
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

export default EducationSection;
