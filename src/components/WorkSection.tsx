import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: "01",
    title: "Project Alpha",
    color: "bg-teal-500",
    shadow: "shadow-[0_20px_40px_rgba(20,184,166,0.45)]",
  },
  {
    number: "02",
    title: "Project Beta",
    color: "bg-rose-500",
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
    color: "bg-amber-500",
    shadow: "shadow-[0_20px_40px_rgba(245,158,11,0.45)]",
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
          }
        );
      }

      const panels = workRef.current
        ? Array.from(
            workRef.current.querySelectorAll<HTMLElement>(".work-panel")
          )
        : [];

      if (!panels.length) return;

      const TOP_SPACE = 80;

      panels.forEach((panel, i) => {
        panel.style.zIndex = String(i + 1);

        ScrollTrigger.create({
          trigger: panel,
          start: `top ${TOP_SPACE}px`,
          endTrigger: workRef.current!,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            if (i === panels.length - 1) return;

            const p = self.progress;
            const scale = 1 - p * 0.15;
            const rotate = p * -10;
            const yShift = p * 120;
            panel.style.transform = `translateY(${yShift}px) rotate(${rotate}deg) scale(${scale})`;
            panel.style.transformOrigin = "center bottom";
          },
        });
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
          <span className="text-black text-4xl md:text-6xl lg:text-8xl font-bold">
            My Work
          </span>
        </div>
        {PROJECTS.map((project, i) => (
          <section
            key={i}
            className={`work-panel w-full md:w-[900px] lg:w-[1200px] max-w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-[40px] lg:rounded-[56px] flex flex-col items-center justify-center text-white ${project.shadow} ${project.color}`}
          >
            <span className="text-6xl md:text-[8rem] lg:text-[12rem] font-bold text-white/15 leading-none">
              {project.number}
            </span>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-4">
              {project.title}
            </h3>
          </section>
        ))}
      </section>
    </>
  );
}
