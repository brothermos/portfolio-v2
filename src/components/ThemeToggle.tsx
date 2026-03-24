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
      className="theme-toggle-surface fixed top-5 right-5 z-50 inline-flex items-center gap-2
        rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-xl"
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
