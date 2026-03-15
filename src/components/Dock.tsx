import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBolt,
  HiOutlineBriefcase,
  HiOutlineComputerDesktop,
  HiOutlineAcademicCap,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import type { DockIconKey } from "../data/dock";
import { DOCK_ITEMS } from "../data/dock";
import useDock from "../hooks/useDock";

const DOCK_ICON_MAP: Record<
  DockIconKey,
  React.ComponentType<{ className?: string }>
> = {
  home: HiOutlineHome,
  user: HiOutlineUser,
  skills: HiOutlineBolt,
  experience: HiOutlineBriefcase,
  work: HiOutlineComputerDesktop,
  education: HiOutlineAcademicCap,
  contact: HiOutlineEnvelope,
};

const Dock = () => {
  const { dockRef, itemRefs, activeHref, handleMouseMove, handleMouseLeave, handleClick } = useDock();

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex justify-center">
      <ul
        ref={dockRef}
        className="inline-flex justify-center items-end h-full m-0 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl list-none shadow-[0_4px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]"
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
            className="w-14 h-14 mx-[3px] will-change-transform"
          >
            <button
              onClick={() => handleClick(item.href)}
              className={`group flex flex-col items-center justify-center w-full h-full rounded-xl cursor-pointer transition-all duration-200 p-0 relative hover:bg-white/85 ${
                isActive ? "bg-white/90 shadow-md ring-2 ring-black/10" : "bg-white/60"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={`text-[22px] leading-none flex items-center justify-center transition-colors ${isActive ? "text-black" : "text-black/80"}`}>
                {IconComponent ? <IconComponent className="w-6 h-6" /> : null}
              </span>
              <span
                className={`absolute -top-9 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-white px-3 py-1 rounded-lg whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 shadow-lg group-hover:opacity-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent ${item.bubbleBg} ${item.arrowColor}`}
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
