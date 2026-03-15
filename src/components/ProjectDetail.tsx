import ProjectDetailCard from "./ProjectDetailCard";
import type { Project } from "../data/projects";

type ProjectDetailProps = {
  project: Project;
  embedded?: boolean;
};

const ProjectDetail = (props: ProjectDetailProps) => {
  const { project, embedded = false } = props;

  if (embedded) {
    return <ProjectDetailCard project={project} showBackButton={false} standalone={false} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <ProjectDetailCard project={project} showBackButton standalone />
      </div>
    </div>
  );
};

export default ProjectDetail;
