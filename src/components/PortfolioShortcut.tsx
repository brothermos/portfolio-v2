import { LuPiggyBank } from 'react-icons/lu';

/** Floating shortcut to the Wealth Stocks app at /portfolio */
const PortfolioShortcut = () => {
  return (
    <a
      href="/portfolio"
      className="theme-dock theme-dock-button fixed top-5 right-19 z-50 flex h-12 w-12
        items-center justify-center rounded-2xl border
        shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-md
        transition-transform duration-200 ease-out hover:scale-110 md:right-5"
      aria-label="Wealth Portfolio"
      title="Wealth Portfolio"
    >
      <LuPiggyBank className="theme-text h-6 w-6 opacity-80" strokeWidth={1.75} />
    </a>
  );
};

export default PortfolioShortcut;
