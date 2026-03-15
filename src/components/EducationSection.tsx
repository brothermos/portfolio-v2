import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EDUCATION } from "../data/education";

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 75%",
              end: "bottom 50%",
              scrub: 1,
            },
          },
        );
      }

      const cards = cardsRef.current ? Array.from(cardsRef.current.querySelectorAll<HTMLElement>(".edu-card")) : [];

      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { x: isLeft ? -80 : 80, opacity: 0, rotation: isLeft ? -4 : 4 },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });

      const dots = cardsRef.current ? Array.from(cardsRef.current.querySelectorAll<HTMLElement>(".edu-dot")) : [];

      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: dot,
              start: "top 75%",
              end: "top 60%",
              scrub: 1,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      className="min-h-screen flex flex-col gap-12 md:gap-20 lg:gap-28 items-center justify-center px-4 md:px-6 py-24 md:py-32 text-black font-bold"
    >
      <div ref={headingRef} className="flex items-center gap-4">
        <span className="text-6xl md:text-6xl lg:text-8xl font-bold">Education</span>
      </div>

      <div ref={cardsRef} className="relative w-full max-w-4xl">
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-black/15 origin-top md:-translate-x-1/2"
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {EDUCATION.map((edu, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="edu-card relative flex items-start md:items-center">
                <div
                  className={`edu-dot absolute left-6 md:left-1/2 w-5 h-5 rounded-full border-4 border-black ${edu.dotColor} z-10 -translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2`}
                />

                <div
                  className={`ml-14 md:ml-0 min-w-0 w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] ${
                    isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  }`}
                >
                  <div
                    className={`${edu.color} ${edu.border} backdrop-blur-xl rounded-[32px] p-6 md:p-8 lg:p-10 text-white ${edu.shadow} ${edu.hoverShadow} md:hover:scale-[1.02] md:hover:-translate-y-2 transition-all duration-300 ease-out`}
                  >
                    <span className="text-3xl md:text-4xl lg:text-5xl block mb-3">{edu.icon}</span>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {edu.institution}
                    </h3>
                    <p className="text-sm md:text-lg lg:text-xl font-semibold text-white/80 mt-2">{edu.program}</p>
                    {edu.detail && (
                      <p className="text-sm md:text-base lg:text-lg font-medium text-white/65 mt-1">{edu.detail}</p>
                    )}
                    <div className="mt-4 inline-block bg-black/20 rounded-full px-4 py-1.5 md:px-5 md:py-2">
                      <span className="text-xs md:text-sm lg:text-base font-bold text-white tracking-wide">
                        {edu.period}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
