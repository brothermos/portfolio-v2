import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: "01",
    title: "Project Alpha",
    color: "bg-[#77DD77]",
    shadow: "shadow-[0_20px_40px_rgba(20,184,166,0.45)]",
  },
  {
    number: "02",
    title: "Project Beta",
    color: "bg-[#FF746C]",
    shadow: "shadow-[0_20px_40px_rgba(244,63,94,0.45)]",
  },
  {
    number: "03",
    title: "Project Gamma",
    color: "bg-indigo-500",
    shadow: "shadow-[0_20px_40px_rgba(99,102,241,0.45)]",
  },
  {
    number: "04",
    title: "Project Delta",
    color: "bg-yellow",
    shadow: "shadow-[0_20px_40px_rgba(250,185,91,0.45)]",
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
            className={`work-panel w-full md:w-[900px] lg:w-[1200px] max-w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-[40px] lg:rounded-[56px] flex flex-col items-center justify-center text-white ${project.shadow} ${project.color}`}
          >
            <span className="text-6xl md:text-[8rem] lg:text-[12rem] font-bold text-white/15 leading-none">
              {project.number}
            </span>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-4">{project.title}</h3>
          </section>
        ))}
      </section>
    </>
  );
}
