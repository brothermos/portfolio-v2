import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoTTB from "../assets/ttb.jpg";
import logoSET from "../assets/set.jpg";
import logoSKL from "../assets/skl.jpg";
import logoINSKRU from "../assets/inskru.jpg";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: "01",
    title: "FINOVA",
    company: "Odd-e Thailand × TTB Bank",
    description: "Core banking web app replacing a legacy system for TTB Bank's financial operations",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    logo: logoTTB,
    color: "bg-blue",
    shadow: "shadow-[0_20px_40px_rgba(13,141,255,0.45)]",
  },
  {
    number: "02",
    title: "SET Corporate Value Up",
    company: "Odd-e Thailand × SET",
    description: "Multi-step form platform under the Stock Exchange of Thailand's Corporate Value Up initiative",
    tech: ["React", "TypeScript", "MUI", "react-hook-form", "Yup"],
    logo: logoSET,
    color: "bg-[#FF746C]",
    shadow: "shadow-[0_20px_40px_rgba(255,116,108,0.45)]",
  },
  {
    number: "03",
    title: "LiVE Exchange",
    company: "Odd-e Thailand × SET",
    description: "Digital fundraising platform supporting SMEs and startups listed on SET",
    tech: ["React", "TypeScript", "Mantine UI"],
    logo: logoSET,
    color: "bg-indigo-500",
    shadow: "shadow-[0_20px_40px_rgba(99,102,241,0.45)]",
  },
  {
    number: "04",
    title: "SET LiVE Platform",
    company: "Odd-e Thailand × SET",
    description: "Full UI revamp of the LiVE Platform with mobile-first responsive design",
    tech: ["React", "TypeScript", "Figma"],
    logo: logoSET,
    color: "bg-[#FAB95B]",
    shadow: "shadow-[0_20px_40px_rgba(250,185,91,0.45)]",
  },
  {
    number: "05",
    title: "INSKRU",
    company: "INSKRU.com",
    description: "Educational community platform for teachers to share classroom ideas and resources",
    tech: ["React", "TypeScript"],
    logo: logoINSKRU,
    color: "bg-sky-500",
    shadow: "shadow-[0_20px_40px_rgba(14,165,233,0.45)]",
  },
  {
    number: "06",
    title: "SKL สยามคูโบต้า ลีสซิ่ง",
    company: "Dosetech Co., Ltd.",
    description: "Website for agricultural and construction machinery loans and leasing services",
    tech: ["Vue.js", "LIFF"],
    logo: logoSKL,
    color: "bg-emerald-600",
    shadow: "shadow-[0_20px_40px_rgba(5,150,105,0.45)]",
  },
];

export default function WorkSection() {
  const workRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
      }

      const panels = workRef.current ? Array.from(workRef.current.querySelectorAll<HTMLElement>(".work-panel")) : [];

      if (!panels.length) return;

      panels.forEach((panel, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          panel,
          { x: isLeft ? -80 : 80, opacity: 0, rotation: isLeft ? -4 : 4 },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="work"
        ref={workRef}
        className="min-h-screen flex flex-col gap-12 md:gap-20 lg:gap-28 items-center justify-center px-4 md:px-6 py-16 text-black font-bold"
      >
        <div ref={headingRef} className="flex items-center gap-4">
          <span className="text-black text-4xl md:text-6xl lg:text-8xl font-bold">My Work</span>
        </div>
        {PROJECTS.map((project, i) => (
          <section
            key={i}
            className={`work-panel w-full md:w-[900px] lg:w-[1200px] max-w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-[32px] md:rounded-[40px] lg:rounded-[56px] flex flex-col justify-between text-white px-6 md:px-12 lg:px-16 py-6 md:py-12 lg:py-16 overflow-hidden ${project.shadow} ${project.color}`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <span className="text-4xl md:text-7xl lg:text-9xl font-bold text-white/15 leading-none">
                {project.number}
              </span>
              <div className="flex flex-wrap gap-1.5 md:gap-2 justify-end max-w-[55%]">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] md:text-sm font-semibold bg-white/20 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-end justify-between gap-2 md:gap-4">
              {/* Left: text content */}
              <div className="flex flex-col gap-1 md:gap-3 min-w-0">
                <p className="text-xs md:text-xl lg:text-2xl font-medium text-white/70">{project.company}</p>
                <h3 className="text-xl md:text-5xl lg:text-7xl font-bold leading-tight">{project.title}</h3>
                <p className="text-xs md:text-xl lg:text-2xl font-medium text-white/80">{project.description}</p>
              </div>

              {/* Logo */}
              <div className="shrink-0 w-20 h-20 md:w-48 md:h-48 lg:w-80 lg:h-80 rounded-xl md:rounded-3xl bg-white shadow-2xl flex items-center justify-center p-2.5 md:p-5 lg:p-10">
                <img src={project.logo} alt={project.company} className="w-full h-full object-contain" />
              </div>
            </div>
          </section>
        ))}
      </section>
    </>
  );
}
