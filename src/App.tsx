import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import WorkSection from "./components/WorkSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import Dock from "./components/Dock";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
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
    </div>
  );
};

export default App;
