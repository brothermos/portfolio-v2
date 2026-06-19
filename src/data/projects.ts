import logoINSKRU from '../images/logo-without-bg/inskru-removebg-preview.png';
import logoSET from '../images/logo-without-bg/set-removebg-preview.png';
import logoSKL from '../images/logo-without-bg/skl-removebg-preview.png';
import logoTTB from '../images/logo-without-bg/ttb-removebg-preview.png';
import logoFoodBank from '../images/food_bank.png';

import ttb1 from '../images/ttb/ttb.png';

import cvup1 from '../images/cvup/cvup.png';

import livex1 from '../images/livex/livex_1.png';
import livex2 from '../images/livex/livex_2.png';
import livex3 from '../images/livex/livex_3.png';
import livex4 from '../images/livex/livex_4.png';
import livex5 from '../images/livex/livex_5.png';
import livex6 from '../images/livex/livex_6.png';

import livePlatform1 from '../images/live-platform/live_platform_1.png';
import livePlatform2 from '../images/live-platform/live_platform_2.png';
import livePlatform3 from '../images/live-platform/live_platform_3.png';
import livePlatform4 from '../images/live-platform/live_platform_4.png';
import livePlatform5 from '../images/live-platform/live_platform_5.png';
import livePlatform6 from '../images/live-platform/live_platform_6.png';
import livePlatform7 from '../images/live-platform/live_platform_7.png';
import livePlatform8 from '../images/live-platform/live_platform_8.png';
import livePlatform9 from '../images/live-platform/live_platform_9.png';
import livePlatform10 from '../images/live-platform/live_platform_10.png';
import livePlatform11 from '../images/live-platform/live_platform_11.png';

import inskru1 from '../images/inskru/inskru_1.png';
import inskru2 from '../images/inskru/inskru_2.png';
import inskru3 from '../images/inskru/inskru_3.png';
import inskru4 from '../images/inskru/inskru_4.png';
import inskru5 from '../images/inskru/inskru_5.png';
import inskru6 from '../images/inskru/inskru_6.png';
import inskru7 from '../images/inskru/inskru_7.png';
import inskru8 from '../images/inskru/inskru_8.png';
import inskru9 from '../images/inskru/inskru_9.png';

import foodbank1 from '../images/foodbank/foodbank_1.png';
import foodbank2 from '../images/foodbank/foodbank_2.png';
import foodbank3 from '../images/foodbank/foodbank_3.png';
import foodbank4 from '../images/foodbank/foodbank_4.png';

import skl1 from '../images/skl/skl.png';

export type Project = {
  number: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  logo: string;
  previews: string[];
  color: string;
  tint: string;
  border: string;
  borderColor: string;
  shadow: string;
  hoverShadow: string;
};

export const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'FINOVA',
    company: 'Odd-e Thailand × TTB Bank',
    description:
      "Core banking web app replacing a legacy system for TTB Bank's financial operations",
    tech: ['React', 'TypeScript'],
    logo: logoTTB,
    previews: [ttb1],
    color: 'bg-blue',
    tint: 'bg-blue',
    border: 'border border-blue',
    borderColor: 'border-blue/60',
    shadow: 'shadow-[0_20px_40px_rgba(153,183,245,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(153,183,245,0.5)]',
  },
  {
    number: '02',
    title: 'Corporate Value Up',
    company: 'Odd-e Thailand × SET',
    description:
      "Multi-step form platform under the Stock Exchange of Thailand's Corporate Value Up initiative",
    tech: ['React', 'TypeScript'],
    logo: logoSET,
    previews: [cvup1],
    color: 'bg-yellow',
    tint: 'bg-yellow',
    border: 'border border-yellow',
    borderColor: 'border-yellow/60',
    shadow: 'shadow-[0_20px_40px_rgba(252,202,89,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(252,202,89,0.5)]',
  },
  {
    number: '03',
    title: 'LiVE Exchange',
    company: 'Odd-e Thailand × SET',
    description: 'Digital fundraising platform supporting SMEs and startups listed on SET',
    tech: ['Next.js', 'TypeScript'],
    logo: logoSET,
    previews: [livex1, livex2, livex3, livex4, livex5, livex6],
    color: 'bg-yellow',
    tint: 'bg-yellow',
    border: 'border border-yellow',
    borderColor: 'border-yellow/60',
    shadow: 'shadow-[0_20px_40px_rgba(252,202,89,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(252,202,89,0.5)]',
  },
  {
    number: '04',
    title: 'SET LiVE Platform',
    company: 'Odd-e Thailand × SET',
    description: 'Full UI revamp of the LiVE Platform with mobile-first responsive design',
    tech: ['Next.js', 'TypeScript'],
    logo: logoSET,
    previews: [
      livePlatform1,
      livePlatform2,
      livePlatform3,
      livePlatform4,
      livePlatform5,
      livePlatform6,
      livePlatform7,
      livePlatform8,
      livePlatform9,
      livePlatform10,
      livePlatform11,
    ],
    color: 'bg-yellow',
    tint: 'bg-yellow',
    border: 'border border-yellow',
    borderColor: 'border-yellow/60',
    shadow: 'shadow-[0_20px_40px_rgba(252,202,89,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(252,202,89,0.5)]',
  },
  {
    number: '05',
    title: 'BKK FOOD BANK',
    company: 'BKK FOOD BANK',
    description:
      'Developed a web application for managing food donations and distributions to underprivileged communities, using React, Typescript',
    tech: ['React', 'TypeScript'],
    logo: logoFoodBank,
    previews: [foodbank1, foodbank2, foodbank3, foodbank4],
    color: 'bg-green',
    tint: 'bg-green',
    border: 'border border-green',
    borderColor: 'border-green/60',
    shadow: 'shadow-[0_20px_40px_rgba(38,127,83,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(38,127,83,0.5)]',
  },
  {
    number: '06',
    title: 'INSKRU',
    company: 'INSKRU.com',
    description:
      'Educational community platform for teachers to share classroom ideas and resources',
    tech: ['Next.js', 'TypeScript'],
    logo: logoINSKRU,
    previews: [inskru1, inskru2, inskru3, inskru4, inskru5, inskru6, inskru7, inskru8, inskru9],
    color: 'bg-pink',
    tint: 'bg-pink',
    border: 'border border-pink',
    borderColor: 'border-pink/60',
    shadow: 'shadow-[0_20px_40px_rgba(242,150,189,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(242,150,189,0.5)]',
  },
  {
    number: '07',
    title: 'SKL (Siam Kubota Leasing)',
    company: 'Dosetech Co., Ltd.',
    description: 'Website for agricultural and construction machinery loans and leasing services',
    tech: ['Vue.js', 'LIFF'],
    logo: logoSKL,
    previews: [skl1],
    color: 'bg-coral',
    tint: 'bg-yellow',
    border: 'border border-yellow',
    borderColor: 'border-coral/60',
    shadow: 'shadow-[0_20px_40px_rgba(245,121,59,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(245,121,59,0.5)]',
  },
];

export const getProjectByNumber = (number: string): Project | null =>
  PROJECTS.find((p) => p.number === number) ?? null;

export type ProjectContent = Pick<
  Project,
  'number' | 'title' | 'company' | 'description' | 'tech'
> & {
  sortOrder?: number;
  published?: boolean;
};

export const PROJECT_CONTENT_FALLBACK: ProjectContent[] = PROJECTS.map((project, index) => ({
  number: project.number,
  title: project.title,
  company: project.company,
  description: project.description,
  tech: project.tech,
  sortOrder: index + 1,
  published: true,
}));

export const mergeProjectsWithContent = (content: ProjectContent[]): Project[] => {
  const byNumber = new Map(PROJECTS.map((project) => [project.number, project]));

  return content
    .filter((item) => item.published !== false)
    .sort(
      (a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER),
    )
    .flatMap((item) => {
      const baseProject = byNumber.get(item.number);
      if (!baseProject) {
        return [];
      }

      return [
        {
          ...baseProject,
          number: item.number,
          title: item.title,
          company: item.company,
          description: item.description,
          tech: item.tech,
        },
      ];
    });
};
