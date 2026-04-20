export type ExperienceIconKey = 'briefcase' | 'laptop';

export const EXPERIENCE: Array<{
  company: string;
  role: string;
  period: string;
  description?: string[];
  color: string;
  border: string;
  dotColor: string;
  shadow: string;
  hoverShadow: string;
  iconKey: ExperienceIconKey;
}> = [
  {
    company: 'Odd-e Thailand',
    role: 'Software Developer (Focus on Front End)',
    period: 'Jan 2023 - Present',
    description: [
      'Frontend development for FINOVA (TTB Bank), SET Corporate Value Up, SET LiVE Platform, and INSKRU.',
      'React, TypeScript, micro-frontend architecture.',
    ],
    color: 'bg-blue',
    border: 'border border-blue',
    dotColor: 'bg-blue',
    shadow: 'shadow-[0_20px_40px_rgba(153,183,245,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(153,183,245,0.5)]',
    iconKey: 'briefcase',
  },
  {
    company: 'Dosetech Co., Ltd.',
    role: 'Frontend Developer',
    period: 'Oct 2022 - Dec 2022',
    description: [
      'Developed SKL (Siam Kubota Leasing) for agricultural and construction machinery loans, leasing services, and online loan applications.',
      'Vue.js, Line LIFF.',
    ],
    color: 'bg-yellow',
    border: 'border border-yellow',
    dotColor: 'bg-yellow',
    shadow: 'shadow-[0_20px_40px_rgba(252,202,89,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(252,202,89,0.5)]',
    iconKey: 'laptop',
  },
];
