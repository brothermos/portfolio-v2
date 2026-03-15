export interface DockItem {
  label: string;
  icon: string;
  href: string;
  bubbleBg: string;
  arrowColor: string;
}

export const DOCK_ITEMS: DockItem[] = [
  {
    label: "Home",
    icon: "🏠",
    href: "#home",
    bubbleBg: "bg-red-500",
    arrowColor: "after:border-t-red-500",
  },
  {
    label: "About",
    icon: "👤",
    href: "#about",
    bubbleBg: "bg-blue-500",
    arrowColor: "after:border-t-blue-500",
  },
  {
    label: "Skills",
    icon: "⚡",
    href: "#skills",
    bubbleBg: "bg-yellow-500",
    arrowColor: "after:border-t-yellow-500",
  },
  {
    label: "Work",
    icon: "💼",
    href: "#work",
    bubbleBg: "bg-purple-500",
    arrowColor: "after:border-t-purple-500",
  },
  {
    label: "Education",
    icon: "🎓",
    href: "#education",
    bubbleBg: "bg-indigo-500",
    arrowColor: "after:border-t-indigo-500",
  },
  {
    label: "Contact",
    icon: "✉️",
    href: "#contact",
    bubbleBg: "bg-green-500",
    arrowColor: "after:border-t-green-500",
  },
];

const MIN_SIZE = 48;
const MAX_SIZE = 96;

export const DOCK_MIN_SIZE = MIN_SIZE;
export const DOCK_MAX_SIZE = MAX_SIZE;
export const DOCK_BOUND = MIN_SIZE * Math.PI;
