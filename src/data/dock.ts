export type DockIconKey =
  | 'home'
  | 'user'
  | 'skills'
  | 'experience'
  | 'work'
  | 'education'
  | 'contact';

export interface DockItem {
  label: string;
  iconKey: DockIconKey;
  href: string;
  bubbleBg: string;
  arrowColor: string;
  hideOnMobile?: boolean;
}

export const DOCK_ITEMS: DockItem[] = [
  {
    label: 'Home',
    iconKey: 'home',
    href: '#home',
    bubbleBg: 'bg-coral',
    arrowColor: 'after:border-t-coral',
  },
  {
    label: 'About',
    iconKey: 'user',
    href: '#about',
    bubbleBg: 'bg-blue',
    arrowColor: 'after:border-t-blue',
  },
  {
    label: 'Skills',
    iconKey: 'skills',
    href: '#skills',
    bubbleBg: 'bg-yellow',
    arrowColor: 'after:border-t-yellow',
  },
  {
    label: 'Experience',
    iconKey: 'experience',
    href: '#experience',
    bubbleBg: 'bg-coral',
    arrowColor: 'after:border-t-coral',
    hideOnMobile: true,
  },
  {
    label: 'Work',
    iconKey: 'work',
    href: '#work',
    bubbleBg: 'bg-pink',
    arrowColor: 'after:border-t-pink',
  },
  {
    label: 'Education',
    iconKey: 'education',
    href: '#education',
    bubbleBg: 'bg-blue',
    arrowColor: 'after:border-t-blue',
    hideOnMobile: true,
  },
  {
    label: 'Contact',
    iconKey: 'contact',
    href: '#contact',
    bubbleBg: 'bg-green',
    arrowColor: 'after:border-t-green',
  },
];

const MIN_SIZE = 48;
const MAX_SIZE = 96;

export const DOCK_MIN_SIZE = MIN_SIZE;
export const DOCK_MAX_SIZE = MAX_SIZE;
export const DOCK_BOUND = MIN_SIZE * Math.PI;
