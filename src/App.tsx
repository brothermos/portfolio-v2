import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import WorkSection from '@/components/WorkSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Dock from '@/components/Dock';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ThemeToggle from '@/components/ThemeToggle';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'portfolio-theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const App = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="theme-text w-full px-4">
      <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <WorkSection />
      <EducationSection />
      <ContactSection />
      <Dock />
      <SpeedInsights />
    </div>
  );
};

export default App;
