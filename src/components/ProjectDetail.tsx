import { useEffect } from "react";
import type { Project } from "../data/projects";

type ProjectDetailProps = {
  project: Project;
  onClose: () => void;
  /** เมื่อ true = แสดงแค่การ์ด (ใช้ใน WorkSection มือถือ), ไม่มี overlay / Back / Esc */
  embedded?: boolean;
};

function ProjectDetailCard({
  project,
  showBackButton,
  onClose,
  standalone,
}: {
  project: Project;
  showBackButton: boolean;
  onClose: () => void;
  /** เมื่อ false = อยู่ภายใน wrapper ที่มี shadow/border อยู่แล้ว (embedded ใน WorkSection) */
  standalone?: boolean;
}) {
  const ringClass = standalone ? `${project.shadow} ${project.border}` : "";
  return (
    <div
      className={`w-full h-full min-h-0 flex flex-col text-white cursor-default rounded-[32px] md:rounded-[40px] overflow-hidden ${ringClass} ${project.color} backdrop-blur-xl`}
    >
      {/* Header: back (ถ้ามี) + number */}
      <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-10 pb-2">
        {showBackButton ? (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-sm font-semibold transition-colors cursor-pointer"
            aria-label="Close and go back"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <span className="text-4xl md:text-6xl font-bold text-white/20 leading-none">
          {project.number}
        </span>
      </div>

      {/* Logo + title block */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 px-6 md:px-10 py-4 md:py-6">
        <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white shadow-xl flex items-center justify-center p-3 md:p-4">
          <img
            src={project.logo}
            alt={project.company}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm md:text-base font-medium text-white/70 uppercase tracking-wide">
            {project.company}
          </p>
          <h1
            id="project-detail-title"
            className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mt-1"
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 md:px-10 py-4">
        <p className="text-base md:text-lg text-white/90 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech tags */}
      <div className="px-6 md:px-10 pb-8 md:pb-10 pt-2">
        <p className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3">
          Tech & tools
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border ${project.borderColor}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetail({
  project,
  onClose,
  embedded = false,
}: ProjectDetailProps) {
  useEffect(() => {
    if (embedded) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [embedded, onClose]);

  if (embedded) {
    return (
      <ProjectDetailCard
        project={project}
        showBackButton={false}
        onClose={onClose}
        standalone={false}
      />
    );
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
        <ProjectDetailCard
          project={project}
          showBackButton
          onClose={onClose}
          standalone
        />
      </div>
    </div>
  );
}
