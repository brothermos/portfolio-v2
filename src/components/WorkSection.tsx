import { PROJECTS } from '@/data/projects';
import useWorkSection from '@/hooks/useWorkSection';

const WorkSection = () => {
  const { workRef, headingRef } = useWorkSection();

  return (
    <section
      id="work"
      ref={workRef}
      className="theme-text flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-24
        font-bold md:gap-20 md:px-6 md:py-32 lg:gap-28"
    >
      <div ref={headingRef} className="flex items-center gap-4">
        <span className="text-6xl font-bold md:text-6xl lg:text-8xl">My Work</span>
      </div>

      <div
        className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <article
            key={project.number}
            className={`work-panel group relative flex flex-col overflow-hidden rounded-[28px]
            border border-white/30 backdrop-blur-xl transition-all duration-300 ease-out
            md:rounded-[32px] md:hover:-translate-y-1.5 md:hover:scale-[1.01] ${project.tint}
            ${project.shadow} ${project.hoverShadow}`}
          >
            <div
              className="relative flex h-60 w-full items-center justify-center overflow-hidden
                bg-white md:h-60 lg:h-72"
            >
              <img
                src={project.logo}
                alt={project.company}
                className="h-28 w-28 object-contain transition-transform duration-500 ease-out
                  group-hover:scale-105 md:h-32 md:w-32"
              />

              <div
                className="absolute top-5 right-5 flex flex-wrap justify-end gap-2 md:top-6
                  md:right-6"
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs
                      font-semibold text-neutral-900 backdrop-blur-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-5 md:px-8 md:pt-8 md:pb-6">
              <p
                className="theme-text-muted text-[11px] font-semibold tracking-[0.24em] uppercase
                  md:text-xs"
              >
                {project.company}
              </p>
              <h3 className="text-2xl leading-tight font-bold md:text-[28px]">{project.title}</h3>
            </div>

            <div
              className="theme-border flex items-center justify-between gap-4 border-t px-6 py-4
                md:px-8 md:py-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white
                    p-1.5 shadow-md ring-1 ring-black/5"
                >
                  <img src={project.logo} alt="" className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{project.company}</p>
                  <p className="theme-text-muted truncate text-xs font-medium">
                    {project.tech.join(' · ')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label={`View ${project.title} case study`}
                className="theme-soft theme-soft-hover flex h-10 w-10 shrink-0 items-center
                  justify-center rounded-full transition-transform duration-200 hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
