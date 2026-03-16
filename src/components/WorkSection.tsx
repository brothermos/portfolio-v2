import { PROJECTS } from '../data/projects';
import useWorkSection from '../hooks/useWorkSection';
import ProjectDetail from './ProjectDetail';

const WorkSection = () => {
  const { workRef, headingRef } = useWorkSection();

  return (
    <>
      <section
        id="work"
        ref={workRef}
        className="flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-24
          font-bold text-black md:gap-20 md:px-6 md:py-32 lg:gap-28"
      >
        <div ref={headingRef} className="flex items-center gap-4">
          <span className="text-6xl font-bold md:text-6xl lg:text-8xl">My Work</span>
        </div>
        {PROJECTS.map((project, i) => (
          <section
            key={i}
            className="work-panel h-auto min-h-[420px] w-full max-w-full overflow-visible
              md:h-[450px] md:min-h-0 md:w-[900px] lg:h-[600px] lg:w-[1200px]"
          >
            <div
              className={`flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-[32px]
              transition-all duration-300 ease-out md:min-h-0 md:rounded-[40px]
              md:hover:-translate-y-2 md:hover:scale-[1.02] lg:rounded-[56px] ${project.shadow}
              ${project.hoverShadow} ${project.border}`}
            >
              <div className="min-h-[420px] w-full flex-1 md:hidden">
                <ProjectDetail project={project} embedded />
              </div>

              <div
                className={`hidden h-full min-h-full flex-col justify-between overflow-hidden
                rounded-[32px] px-12 py-12 text-white backdrop-blur-xl md:flex md:rounded-[40px]
                lg:rounded-[56px] lg:px-16 lg:py-16 ${project.color}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-7xl leading-none font-bold text-white/20 lg:text-9xl">
                    {project.number}
                  </span>
                  <div className="flex max-w-[55%] flex-wrap justify-end gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border bg-white/10 px-3 py-1 text-sm font-semibold
                        backdrop-blur-sm ${project.borderColor}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex min-w-0 flex-col gap-3">
                    <p className="text-xl font-medium text-white/90 lg:text-2xl">
                      {project.company}
                    </p>
                    <h3 className="text-5xl leading-tight font-bold text-white lg:text-7xl">
                      {project.title}
                    </h3>
                    <p className="text-xl font-medium text-white/90 lg:text-2xl">
                      {project.description}
                    </p>
                  </div>
                  <div
                    className="flex h-48 w-48 shrink-0 items-center justify-center rounded-3xl
                      bg-white p-5 shadow-2xl lg:h-80 lg:w-80 lg:p-10"
                  >
                    <img
                      src={project.logo}
                      alt={project.company}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>
    </>
  );
};

export default WorkSection;
