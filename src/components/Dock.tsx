import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBolt,
  HiOutlineBriefcase,
  HiOutlineComputerDesktop,
  HiOutlineAcademicCap,
  HiOutlineEnvelope,
} from 'react-icons/hi2';
import type { DockIconKey } from '../data/dock';
import { DOCK_ITEMS } from '../data/dock';
import useDock from '../hooks/useDock';

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

  return (
    <div className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 justify-center">
      <ul
        ref={dockRef}
        className="m-0 inline-flex h-full list-none items-end justify-center rounded-2xl border
          border-white/20 bg-white/10 px-3 py-2
          shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-md"
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
                justify-center rounded-xl p-0 transition-all duration-200 hover:bg-white/85 ${
                  isActive ? 'bg-white/90 shadow-md ring-2 ring-black' : 'bg-white/60'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className={`flex items-center justify-center text-[22px] leading-none
                  transition-colors ${isActive ? 'text-black' : 'text-black/80'}`}
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
