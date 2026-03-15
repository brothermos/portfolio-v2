import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import WorkSection from "./components/WorkSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import Dock from "./components/Dock";
import ProjectDetail from "./components/ProjectDetail";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { getProjectByNumber } from "./data/projects";

const parseProjectHash = (): string | null => {
  const hash = window.location.hash.slice(1);
  const m = hash.match(/^project\/(\d{2})$/);
  return m ? m[1] : null;
};

const App = () => {
  const [projectNumber, setProjectNumber] = useState<string | null>(() =>
    parseProjectHash(),
  );

  useEffect(() => {
    const handler = () => setProjectNumber(parseProjectHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const project = projectNumber ? getProjectByNumber(projectNumber) : null;

  const closeDetail = () => {
    const scrollY = sessionStorage.getItem("scrollBeforeProjectDetail");
    window.location.hash = "";
    setProjectNumber(null);
    if (scrollY !== null) {
      requestAnimationFrame(() => window.scrollTo(0, Number(scrollY)));
      sessionStorage.removeItem("scrollBeforeProjectDetail");
    }
  };

  return (
    <div className="w-full px-4">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorkSection />
      <EducationSection />
      <ContactSection />
      <Dock />
      <SpeedInsights />
      {project && <ProjectDetail project={project} onClose={closeDetail} />}
    </div>
  );
};

export default App;
