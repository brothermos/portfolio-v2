import HeroSection from '@/components/HeroSection';
import QuoteSection from '@/components/QuoteSection';
import AboutSection from './components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import WorkSection from '@/components/WorkSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Dock from '@/components/Dock';
import PortfolioShortcut from '@/components/PortfolioShortcut';
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
  return (
    <div className="theme-text w-full px-4">
      <HeroSection />
      <QuoteSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <WorkSection />
      <EducationSection />
      <ContactSection />
      <PortfolioShortcut />
      <Dock />
      <SpeedInsights />
    </div>
  );
};

export default App;
