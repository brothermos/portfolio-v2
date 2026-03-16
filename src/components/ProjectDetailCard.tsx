import type { Project } from '../data/projects';

type ProjectDetailCardProps = {
  project: Project;
  embedded?: boolean;
  showBackButton?: boolean;
  standalone?: boolean;
};

const ProjectDetailCard = (props: ProjectDetailCardProps) => {
  const { project, showBackButton, standalone } = props;

  const ringClass = standalone ? `${project.shadow} ${project.border}` : '';

  return (
    <div
      className={`flex h-full min-h-0 w-full cursor-default flex-col overflow-hidden rounded-[32px]
        text-white md:rounded-[40px] ${ringClass} ${project.color} backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between px-6 pt-6 pb-2 md:px-10 md:pt-10">
        {showBackButton ? (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-white/15 px-4 py-2
              text-sm font-semibold text-white transition-colors hover:bg-white/25"
            aria-label="Close and go back"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <span className="text-4xl leading-none font-bold text-white/20 md:text-6xl">
          {project.number}
        </span>
      </div>

      <div className="flex flex-col gap-6 px-6 py-4 md:flex-row md:items-center md:px-10 md:py-6">
        <div
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-3
            shadow-xl md:h-32 md:w-32 md:p-4"
        >
          <img src={project.logo} alt={project.company} className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium tracking-wide text-white/90 uppercase md:text-base">
            {project.company}
          </p>
          <h1
            id="project-detail-title"
            className="mt-1 text-2xl leading-tight font-bold text-white md:text-4xl lg:text-5xl"
          >
            {project.title}
          </h1>
        </div>
      </div>

      <div className="px-6 py-4 md:px-10">
        <p className="text-base leading-relaxed text-white/90 md:text-lg">{project.description}</p>
      </div>

      <div className="px-6 pt-2 pb-8 md:px-10 md:pb-10">
        <p className="mb-3 text-xs font-semibold tracking-widest text-white/80 uppercase">
          Tech & tools
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`rounded-full border bg-white/20 px-3 py-1.5 text-sm font-semibold
              backdrop-blur-sm ${project.borderColor} text-white`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailCard;
