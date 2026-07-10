import { FaPiggyBank } from 'react-icons/fa';

const PortfolioShortcut = () => {
  return (
    <a
      href="/portfolio"
      className="theme-dock theme-dock-button group fixed top-5 right-[4.75rem] z-50 flex h-12 w-12
        items-center justify-center rounded-2xl border
        shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-md
        transition-transform duration-200 hover:-translate-y-0.5 md:right-5"
      aria-label="Open wealth portfolio"
      title="Wealth Portfolio"
    >
      <FaPiggyBank
        className="theme-text h-5 w-5 opacity-80 transition-transform duration-300
          group-hover:scale-110 group-hover:rotate-[-8deg]"
      />
      <span
        className="pointer-events-none absolute -bottom-9 left-1/2 hidden -translate-x-1/2
          rounded-lg bg-green px-3 py-1 text-[11px] font-semibold whitespace-nowrap text-white
          opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 md:block
          after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2
          after:border-[5px] after:border-transparent after:border-b-green after:content-['']"
      >
        Portfolio
      </span>
    </a>
  );
};

export default PortfolioShortcut;
