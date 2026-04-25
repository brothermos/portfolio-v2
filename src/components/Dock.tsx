import {
  HiBars3,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBolt,
  HiOutlineBriefcase,
  HiOutlineComputerDesktop,
  HiOutlineAcademicCap,
  HiOutlineEnvelope,
  HiXMark,
} from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import type { DockIconKey } from '@/data/dock';
import { DOCK_ITEMS } from '@/data/dock';
import useDock from '@/hooks/useDock';

const DOCK_ICON_MAP: Record<DockIconKey, React.ComponentType<{ className?: string }>> = {
  home: HiOutlineHome,
  user: HiOutlineUser,
  skills: HiOutlineBolt,
  experience: HiOutlineBriefcase,
  work: HiOutlineComputerDesktop,
  education: HiOutlineAcademicCap,
  contact: HiOutlineEnvelope,
};

const Dock = () => {
  const { dockRef, itemRefs, activeHref, handleMouseMove, handleMouseLeave, handleClick } =
    useDock();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50 flex justify-center md:top-auto md:right-auto md:bottom-3 md:left-1/2 md:-translate-x-1/2">
      <div className="relative self-start md:hidden">
        {isMobileMenuOpen ? (
          <div
            id="mobile-dock-menu"
            className="theme-dock absolute top-14 right-0 flex w-[220px] flex-col gap-1 rounded-2xl
              border p-2 shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]
              backdrop-blur-md"
          >
            {DOCK_ITEMS.map((item) => {
              const IconComponent = DOCK_ICON_MAP[item.iconKey];
              const isActive = activeHref === item.href;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    handleClick(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all
                    duration-200 ${
                      isActive ? 'theme-dock-button-active shadow-sm' : 'theme-dock-button'
                    }`}
                  aria-label={item.label}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className={`theme-text ${isActive ? '' : 'opacity-80'}`}>
                    {IconComponent ? <IconComponent className="h-5 w-5" /> : null}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={`theme-dock ${
            isMobileMenuOpen ? 'theme-dock-button-active' : 'theme-dock-button'
          } flex h-12 w-12 items-center justify-center rounded-2xl border shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]
            backdrop-blur-md transition-all duration-200`}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-dock-menu"
        >
          {isMobileMenuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
        </button>
      </div>

      <ul
        ref={dockRef}
        className="theme-dock m-0 hidden h-full list-none items-end justify-center rounded-2xl
          border px-3 py-2
          shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-md
          md:inline-flex"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {DOCK_ITEMS.map((item, i) => {
          const IconComponent = DOCK_ICON_MAP[item.iconKey];
          const isActive = activeHref === item.href;
          return (
            <li
              key={item.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`mx-[3px] h-14 w-14 will-change-transform
              ${item.hideOnMobile ? 'hidden md:flex' : ''}`}
            >
              <button
                onClick={() => handleClick(item.href)}
                className={`group relative flex h-full w-full cursor-pointer flex-col items-center
                justify-center rounded-xl p-0 transition-all duration-200 ${
                  isActive ? 'theme-dock-button-active shadow-md' : 'theme-dock-button'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className={`theme-text flex items-center justify-center text-[22px] leading-none
                  transition-colors ${isActive ? '' : 'opacity-80'}`}
                >
                  {IconComponent ? <IconComponent className="h-6 w-6" /> : null}
                </span>
                <span
                  className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
                  rounded-lg px-3 py-1 text-[11px] font-semibold whitespace-nowrap text-white
                  opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100
                  after:absolute after:top-full after:left-1/2 after:-translate-x-1/2
                  after:border-[5px] after:border-transparent after:content-[''] ${item.bubbleBg}
                  ${item.arrowColor}`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dock;
