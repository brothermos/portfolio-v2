import { useEffect } from "react";
import ProjectDetailCard from "./ProjectDetailCard";
import type { Project } from "../data/projects";

type ProjectDetailProps = {
  project: Project;
  onClose: () => void;
  embedded?: boolean;
};

const ProjectDetail = (props: ProjectDetailProps) => {
  const { project, onClose, embedded = false } = props;

  useEffect(() => {
    if (embedded) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [embedded, onClose]);

  if (embedded) {
    return <ProjectDetailCard project={project} showBackButton={false} onClose={onClose} standalone={false} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <ProjectDetailCard project={project} showBackButton onClose={onClose} standalone />
      </div>
    </div>
  );
};

export default ProjectDetail;
