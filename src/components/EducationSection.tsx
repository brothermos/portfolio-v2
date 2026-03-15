import { HiOutlineAcademicCap, HiOutlineRocketLaunch } from "react-icons/hi2";
import { EDUCATION } from "../data/education";
import useEducationSection from "../hooks/useEducationSection";

const EDU_ICON_MAP: Record<import("../data/education").EducationIconKey, React.ComponentType<{ className?: string }>> = {
  rocket: HiOutlineRocketLaunch,
  graduation: HiOutlineAcademicCap,
};

const EducationSection = () => {
  const { headingRef, cardsRef, lineRef } = useEducationSection();

  return (
    <section
      id="education"
      className="min-h-screen flex flex-col gap-12 md:gap-20 lg:gap-28 items-center justify-center px-4 md:px-6 py-24 md:py-32 text-black font-bold"
    >
      <div ref={headingRef} className="flex items-center gap-4">
        <span className="text-6xl md:text-6xl lg:text-8xl font-bold">
          Education
        </span>
      </div>

      <div ref={cardsRef} className="relative w-full max-w-4xl">
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-black/15 origin-top md:-translate-x-1/2"
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {EDUCATION.map((edu, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className="edu-card relative flex items-start md:items-center"
              >
                <div
                  className={`edu-dot absolute left-6 md:left-1/2 w-5 h-5 rounded-full border-4 border-black ${edu.dotColor} z-10 -translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2`}
                />

                <div
                  className={`ml-14 md:ml-0 min-w-0 w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] ${
                    isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  }`}
                >
                  <div
                    className={`${edu.color} ${edu.border} backdrop-blur-xl rounded-[32px] p-6 md:p-8 lg:p-10 text-white ${edu.shadow} ${edu.hoverShadow} md:hover:scale-[1.02] md:hover:-translate-y-2 transition-all duration-300 ease-out`}
                  >
                    <span className="text-3xl md:text-4xl lg:text-5xl block mb-3 text-white">
                      {(() => {
                        const Icon = EDU_ICON_MAP[edu.iconKey];
                        return Icon ? <Icon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" /> : null;
                      })()}
                    </span>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {edu.institution}
                    </h3>
                    <p className="text-sm md:text-lg lg:text-xl font-semibold text-white/80 mt-2">
                      {edu.program}
                    </p>
                    {edu.detail && (
                      <p className="text-sm md:text-base lg:text-lg font-medium text-white/65 mt-1">
                        {edu.detail}
                      </p>
                    )}
                    <div className="mt-4 inline-block bg-black/20 rounded-full px-4 py-1.5 md:px-5 md:py-2">
                      <span className="text-xs md:text-sm lg:text-base font-bold text-white tracking-wide">
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
