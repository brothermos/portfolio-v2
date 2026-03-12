import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import WorkSection from "./components/WorkSection";
import ContactSection from "./components/ContactSection";
import Dock from "./components/Dock";
import ScrollTopButton from "./components/ScrollTopButton";

function App() {
  return (
    <div className="w-full px-4">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorkSection />
      <ContactSection />
      <Dock />
      <ScrollTopButton />
    </div>
  );
}

export default App;
