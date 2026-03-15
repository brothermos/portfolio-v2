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
    description:
      "Core banking web app replacing a legacy system for TTB Bank's financial operations",
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
    description:
      "Multi-step form platform under the Stock Exchange of Thailand's Corporate Value Up initiative",
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
    description:
      "Digital fundraising platform supporting SMEs and startups listed on SET",
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
    description:
      "Full UI revamp of the LiVE Platform with mobile-first responsive design",
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
    description:
      "Educational community platform for teachers to share classroom ideas and resources",
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
    description:
      "Website for agricultural and construction machinery loans and leasing services",
    tech: ["Vue.js", "LIFF"],
    logo: logoSKL,
    color: "bg-emerald-600/45",
    border: "border border-emerald-500/50",
    borderColor: "border-emerald-500/50",
    shadow: "shadow-[0_20px_40px_rgba(5,150,105,0.35)]",
    hoverShadow: "md:hover:shadow-[0_28px_56px_rgba(5,150,105,0.5)]",
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

      const panels = workRef.current
        ? Array.from(
            workRef.current.querySelectorAll<HTMLElement>(".work-panel"),
          )
        : [];

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
        className="min-h-screen flex flex-col gap-12 md:gap-20 lg:gap-28 items-center justify-center px-4 md:px-6 py-24 md:py-32 text-black font-bold"
      >
        <div ref={headingRef} className="flex items-center gap-4">
          <span className="text-black text-4xl md:text-6xl lg:text-8xl font-bold">
            My Work
          </span>
        </div>
        {PROJECTS.map((project, i) => (
          <section
            key={i}
            className="work-panel w-full md:w-[900px] lg:w-[1200px] max-w-full h-[360px] md:h-[450px] lg:h-[600px] overflow-visible"
          >
            <div
              className={`w-full h-full rounded-[32px] md:rounded-[40px] lg:rounded-[56px] flex flex-col overflow-hidden transition-all duration-300 ease-out md:hover:scale-[1.02] md:hover:-translate-y-2 ${project.shadow} ${project.hoverShadow} ${project.border}`}
            >
              <div className="flex flex-col flex-1 md:hidden min-h-0">
                <div className="relative flex-1 min-h-0 flex flex-col bg-white justify-between px-6 pt-6 pb-3 overflow-hidden">
                  <img
                    src={project.logo}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full p-4 mt-2 object-cover"
                  />
                  <div className="relative z-10 flex items-start justify-between gap-2">
                    <span className="text-3xl font-bold text-white leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                      {project.number}
                    </span>
                    <div className="flex flex-wrap gap-1.5 justify-end min-w-0 max-w-[75%]">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-xs font-semibold bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-gray-800 drop-shadow-sm border ${project.borderColor}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className={`shrink-0 flex flex-col justify-center px-6 py-4 backdrop-blur-xl text-white ${project.color}`}
                >
                  <p className="text-sm font-medium text-white/80">
                    {project.company}
                  </p>
                  <h3 className="text-xl font-bold leading-tight mt-0.5">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-white/90 leading-snug mt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              <div
                className={`hidden md:flex flex-col justify-between text-white px-12 lg:px-16 py-12 lg:py-16 overflow-hidden backdrop-blur-xl h-full min-h-full rounded-[32px] md:rounded-[40px] lg:rounded-[56px] ${project.color}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-7xl lg:text-9xl font-bold text-white/15 leading-none">
                    {project.number}
                  </span>
                  <div className="flex flex-wrap gap-2 justify-end max-w-[55%]">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border ${project.borderColor}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-3 min-w-0">
                    <p className="text-xl lg:text-2xl font-medium text-white/70">
                      {project.company}
                    </p>
                    <h3 className="text-5xl lg:text-7xl font-bold leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xl lg:text-2xl font-medium text-white/80">
                      {project.description}
                    </p>
                  </div>
                  <div className="shrink-0 w-48 h-48 lg:w-80 lg:h-80 rounded-3xl bg-white shadow-2xl flex items-center justify-center p-5 lg:p-10">
                    <img
                      src={project.logo}
                      alt={project.company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>
    </>
  );
}
