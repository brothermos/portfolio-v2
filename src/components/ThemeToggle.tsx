import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

type ThemeToggleProps = {
  theme: 'light' | 'dark';
  onToggle: () => void;
};

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`theme-dock fixed top-5 right-20 z-50 flex h-12 w-12 items-center justify-center
        rounded-2xl border shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]
        backdrop-blur-md transition-all duration-200 md:right-5 ${
          isDark ? 'theme-dock-button-active' : 'theme-dock-button'
        }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      {isDark ? (
        <HiOutlineSun className="h-5 w-5 shrink-0" aria-hidden />
      ) : (
        <HiOutlineMoon className="h-5 w-5 shrink-0" aria-hidden />
      )}
    </button>
  );
};

export default ThemeToggle;
