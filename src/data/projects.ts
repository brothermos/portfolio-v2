import logoINSKRU from '../images/inskru.jpg';
import logoSET from '../images/set.jpg';
import logoSKL from '../images/skl.jpg';
import logoTTB from '../images/ttb.jpg';
import logoFoodBank from '../images/food_bank.png';

export type Project = {
  number: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  logo: string;
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
    color: 'bg-coral',
    tint: 'bg-coral',
    border: 'border border-coral',
    borderColor: 'border-coral/60',
    shadow: 'shadow-[0_20px_40px_rgba(245,121,59,0.35)]',
    hoverShadow: 'md:hover:shadow-[0_28px_56px_rgba(245,121,59,0.5)]',
  },
];

export const getProjectByNumber = (number: string): Project | null =>
  PROJECTS.find((p) => p.number === number) ?? null;
