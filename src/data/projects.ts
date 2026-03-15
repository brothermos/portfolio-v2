import logoINSKRU from "../../public/images/inskru.jpg";
import logoSET from "../../public/images/set.jpg";
import logoSKL from "../../public/images/skl.jpg";
import logoTTB from "../../public/images/ttb.jpg";

export type Project = {
  number: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  logo: string;
  color: string;
  border: string;
  borderColor: string;
  shadow: string;
  hoverShadow: string;
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "FINOVA",
    company: "Odd-e Thailand × TTB Bank",
    description: "Core banking web app replacing a legacy system for TTB Bank's financial operations",
    tech: ["React", "TypeScript"],
    logo: logoTTB,
    color: "bg-[#0D8DFF]/45",
    border: "border border-[#0D8DFF]/50",
    borderColor: "border-[#0D8DFF]/50",
    shadow: "shadow-[0_20px_40px_rgba(13,141,255,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(13,141,255,0.5)]",
  },
  {
    number: "02",
    title: "Corporate Value Up",
    company: "Odd-e Thailand × SET",
    description: "Multi-step form platform under the Stock Exchange of Thailand's Corporate Value Up initiative",
    tech: ["React", "TypeScript"],
    logo: logoSET,
    color: "bg-[#FAB95B]/55",
    border: "border border-[#FAB95B]/60",
    borderColor: "border-[#FAB95B]/60",
    shadow: "shadow-[0_20px_40px_rgba(250,185,91,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(250,185,91,0.5)]",
  },
  {
    number: "03",
    title: "LiVE Exchange",
    company: "Odd-e Thailand × SET",
    description: "Digital fundraising platform supporting SMEs and startups listed on SET",
    tech: ["Next.js", "TypeScript"],
    logo: logoSET,
    color: "bg-[#FAB95B]/55",
    border: "border border-[#FAB95B]/60",
    borderColor: "border-[#FAB95B]/60",
    shadow: "shadow-[0_20px_40px_rgba(250,185,91,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(250,185,91,0.5)]",
  },
  {
    number: "04",
    title: "SET LiVE Platform",
    company: "Odd-e Thailand × SET",
    description: "Full UI revamp of the LiVE Platform with mobile-first responsive design",
    tech: ["Next.js", "TypeScript"],
    logo: logoSET,
    color: "bg-[#FAB95B]/55",
    border: "border border-[#FAB95B]/60",
    borderColor: "border-[#FAB95B]/60",
    shadow: "shadow-[0_20px_40px_rgba(250,185,91,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(250,185,91,0.5)]",
  },
  {
    number: "05",
    title: "INSKRU",
    company: "INSKRU.com",
    description: "Educational community platform for teachers to share classroom ideas and resources",
    tech: ["Next.js", "TypeScript"],
    logo: logoINSKRU,
    color: "bg-sky-500/45",
    border: "border border-sky-400/50",
    borderColor: "border-sky-400/50",
    shadow: "shadow-[0_20px_40px_rgba(14,165,233,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(14,165,233,0.5)]",
  },
  {
    number: "06",
    title: "SKL สยามคูโบต้า ลีสซิ่ง",
    company: "Dosetech Co., Ltd.",
    description: "Website for agricultural and construction machinery loans and leasing services",
    tech: ["Vue.js", "LIFF"],
    logo: logoSKL,
    color: "bg-emerald-600/45",
    border: "border border-emerald-500/50",
    borderColor: "border-emerald-500/50",
    shadow: "shadow-[0_20px_40px_rgba(5,150,105,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(5,150,105,0.5)]",
  },
];

export const getProjectByNumber = (number: string): Project | null => PROJECTS.find((p) => p.number === number) ?? null;
