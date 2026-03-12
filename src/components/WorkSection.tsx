import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { number: "01", title: "Project Alpha", color: "bg-orange-500" },
  { number: "02", title: "Project Beta", color: "bg-blue-500" },
  { number: "03", title: "Project Gamma", color: "bg-yellow-500" },
  { number: "04", title: "Project Delta", color: "bg-pink-500" },
];

export default function WorkSection() {
  const workRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
        className="h-screen flex items-center justify-center px-4 md:px-6 text-black text-4xl md:text-6xl lg:text-8xl font-bold"
      >
        My Work
      </section>

      <div ref={workRef} className="flex flex-col items-center gap-6 md:gap-10 px-4 md:px-0">
        {PROJECTS.map((project, i) => (
          <section
            key={i}
            className={`work-panel w-full md:w-[900px] lg:w-[1200px] border-2 md:border-4 max-w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-3xl md:rounded-[40px] lg:rounded-[56px] flex flex-col items-center justify-center ${project.color}`}
          >
            <span className="text-6xl md:text-[8rem] lg:text-[12rem] font-bold text-black/20 leading-none">
              {project.number}
            </span>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mt-2 md:mt-4">
              {project.title}
            </h3>
          </section>
        ))}
      </div>
    </>
  );
}
