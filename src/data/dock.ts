export type DockIconKey =
  | "home"
  | "user"
  | "skills"
  | "experience"
  | "work"
  | "education"
  | "contact";

export interface DockItem {
  label: string;
  iconKey: DockIconKey;
  href: string;
  bubbleBg: string;
  arrowColor: string;
}

export const DOCK_ITEMS: DockItem[] = [
  {
    label: "Home",
    iconKey: "home",
    href: "#home",
    bubbleBg: "bg-red-500",
    arrowColor: "after:border-t-red-500",
  },
  {
    label: "About",
    iconKey: "user",
    href: "#about",
    bubbleBg: "bg-blue-500",
    arrowColor: "after:border-t-blue-500",
  },
  {
    label: "Skills",
    iconKey: "skills",
    href: "#skills",
    bubbleBg: "bg-yellow-500",
    arrowColor: "after:border-t-yellow-500",
  },
  {
    label: "Experience",
    iconKey: "experience",
    href: "#experience",
    bubbleBg: "bg-amber-500",
    arrowColor: "after:border-t-amber-500",
  },
  {
    label: "Work",
    iconKey: "work",
    href: "#work",
    bubbleBg: "bg-purple-500",
    arrowColor: "after:border-t-purple-500",
  },
  {
    label: "Education",
    iconKey: "education",
    href: "#education",
    bubbleBg: "bg-indigo-500",
    arrowColor: "after:border-t-indigo-500",
  },
  {
    label: "Contact",
    iconKey: "contact",
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
