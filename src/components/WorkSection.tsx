import { PROJECTS } from "../data/projects";
import useWorkSection from "../hooks/useWorkSection";
import ProjectDetail from "./ProjectDetail";

const WorkSection = () => {
  const { workRef, headingRef } = useWorkSection();

  return (
    <>
      <section
        id="work"
        ref={workRef}
        className="min-h-screen flex flex-col gap-12 md:gap-20 lg:gap-28 items-center justify-center px-4 md:px-6 py-24 md:py-32 text-black font-bold"
      >
        <div ref={headingRef} className="flex items-center gap-4">
          <span className="text-6xl md:text-6xl lg:text-8xl font-bold">My Work</span>
        </div>
        {PROJECTS.map((project, i) => (
          <section
            key={i}
            className="work-panel w-full md:w-[900px] lg:w-[1200px] max-w-full min-h-[420px] md:min-h-0 h-auto md:h-[450px] lg:h-[600px] overflow-visible"
          >
            <div
              className={`w-full h-full min-h-[420px] md:min-h-0 rounded-[32px] md:rounded-[40px] lg:rounded-[56px] flex flex-col overflow-hidden transition-all duration-300 ease-out md:hover:scale-[1.02] md:hover:-translate-y-2 ${project.shadow} ${project.hoverShadow} ${project.border}`}
            >
              <div className="flex-1 md:hidden min-h-[420px] w-full">
                <ProjectDetail project={project} embedded />
              </div>

              <div
                className={`hidden md:flex flex-col justify-between text-white px-12 lg:px-16 py-12 lg:py-16 overflow-hidden backdrop-blur-xl h-full min-h-full rounded-[32px] md:rounded-[40px] lg:rounded-[56px] ${project.color}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-7xl lg:text-9xl font-bold text-white/20 leading-none">{project.number}</span>
                  <div className="flex flex-wrap gap-2 justify-end max-w-[55%]">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-sm font-semibold bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border ${project.borderColor}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-3 min-w-0">
                    <p className="text-xl lg:text-2xl font-medium text-white/90">{project.company}</p>
                    <h3 className="text-5xl lg:text-7xl font-bold leading-tight text-white">{project.title}</h3>
                    <p className="text-xl lg:text-2xl font-medium text-white/90">{project.description}</p>
                  </div>
                  <div className="shrink-0 w-48 h-48 lg:w-80 lg:h-80 rounded-3xl bg-white shadow-2xl flex items-center justify-center p-5 lg:p-10">
                    <img src={project.logo} alt={project.company} className="w-full h-full object-contain" />
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
