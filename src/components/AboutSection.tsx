import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hooray from "../assets/hooray.png";

gsap.registerPlugin(ScrollTrigger);

const SKILL_HIGHLIGHT_WORDS = new Set(["React", "TypeScript"]);
const SOFTWARE_DEVELOPER_HIGHLIGHT_WORDS = new Set(["Software", "Developer"]);

const INTRO_PARAGRAPHS = [
  "A Software Developer with 3+ years of experience delivering production-grade web applications. Specialized in React and TypeScript with a focus on scalable architecture and complex business logic. Experienced in building systems used in enterprise and financial domains. Collaborative team player with a strong sense of ownership and attention to detail.",
];

export default function AboutSection() {
  const introRef = useRef<HTMLElement>(null);
  const hoorayRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = introRef.current
        ? Array.from(introRef.current.querySelectorAll(".word"))
        : [];

      if (!wordEls.length) return;

      const LOOKAHEAD = 7;
      const textEls = wordEls.map(
        (w) => w.querySelector(".word-text") as HTMLElement
      );
      const bgEls = wordEls.map(
        (w) => w.querySelector(".word-bg") as HTMLElement
      );
      const highlightEls = wordEls.map(
        (w) => w.querySelector(".word-highlight") as HTMLElement | null
      );

      gsap.set(textEls, { opacity: 0 });
      gsap.set(bgEls, { opacity: 0 });

      const fadeSteps = Array.from(
        { length: LOOKAHEAD },
        (_, i) => 1 - i / LOOKAHEAD
      );

      const total = wordEls.length;
      const HOORAY_STEPS = 15;
      const allSteps = LOOKAHEAD + total + HOORAY_STEPS;
      const introPhase = LOOKAHEAD / allSteps;
      const revealPhase = (LOOKAHEAD + total) / allSteps;
      let prevRevealed = -1;
      let prevIntroCount = -1;

      ScrollTrigger.create({
        trigger: introRef.current,
        start: "top top",
        end: () => `+=${allSteps * 40}`,
        pin: true,
        onUpdate: (self) => {
          if (self.progress <= introPhase) {
            const introProgress = self.progress / introPhase;
            const boxCount = Math.round(introProgress * LOOKAHEAD);

            if (boxCount === prevIntroCount && prevRevealed <= 0) return;

            for (let i = 0; i < total; i++) {
              if (i < boxCount) {
                gsap.set(textEls[i], { opacity: i === 0 ? 0.4 : 0 });
                gsap.set(bgEls[i], { opacity: fadeSteps[i] });
              } else {
                gsap.set(textEls[i], { opacity: 0 });
                gsap.set(bgEls[i], { opacity: 0 });
              }
            }
            prevIntroCount = boxCount;
            prevRevealed = 0;
            return;
          }

          const revealProgress = Math.min(
            (self.progress - introPhase) / (revealPhase - introPhase),
            1
          );
          const revealed = Math.round(revealProgress * total);

          if (revealed !== prevRevealed) {
            for (let i = 0; i < total; i++) {
              if (i < revealed) {
                gsap.set(textEls[i], { opacity: 1 });
                gsap.set(bgEls[i], { opacity: 0 });
                if (highlightEls[i])
                  gsap.set(highlightEls[i], { opacity: 1 });
              } else if (i < revealed + LOOKAHEAD) {
                const pos = i - revealed;
                gsap.set(textEls[i], { opacity: pos === 0 ? 0.4 : 0 });
                gsap.set(bgEls[i], { opacity: fadeSteps[pos] });
                if (highlightEls[i])
                  gsap.set(highlightEls[i], { opacity: 0 });
              } else {
                gsap.set(textEls[i], { opacity: 0 });
                gsap.set(bgEls[i], { opacity: 0 });
                if (highlightEls[i])
                  gsap.set(highlightEls[i], { opacity: 0 });
              }
            }
            prevRevealed = revealed;
            prevIntroCount = -1;
          }

          if (hoorayRef.current) {
            if (self.progress > revealPhase) {
              const hoorayProgress =
                (self.progress - revealPhase) / (1 - revealPhase);
              const w = hoorayProgress * 30;
              gsap.set(hoorayRef.current, {
                width: `${w}%`,
                opacity: hoorayProgress,
              });
            } else {
              gsap.set(hoorayRef.current, { width: "0%", opacity: 0 });
            }
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={introRef}
      className="h-screen flex flex-col items-center justify-center px-4 md:px-6 gap-4 md:gap-8"
    >
      <div className="max-w-5xl text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed tracking-tight text-black space-y-4 md:space-y-8">
        {INTRO_PARAGRAPHS.map((paragraph, pIdx) => (
          <p key={pIdx} className="flex flex-wrap gap-y-2">
            {paragraph.split(" ").map((word, wIdx) => {
              const clean = word.replace(/[.,;:!?]/g, "");
              const isSkill = SKILL_HIGHLIGHT_WORDS.has(clean);
              const isDev = SOFTWARE_DEVELOPER_HIGHLIGHT_WORDS.has(clean);
              const hasHighlight = isSkill || isDev;
              return (
                <span
                  key={wIdx}
                  className={`word relative mr-[0.3em] inline-block ${
                    hasHighlight ? "px-2" : ""
                  }`}
                >
                  <span
                    className={`word-text opacity-0 ${
                      hasHighlight ? "relative z-10" : ""
                    }`}
                  >
                    {word}
                  </span>
                  <span className="word-bg absolute inset-0 rounded-md bg-black/15" />
                  {isSkill && (
                    <span className="word-highlight absolute inset-0 rounded-md bg-blue-400 opacity-0 border-2 border-black" />
                  )}
                  {isDev && (
                    <span className="word-highlight absolute inset-0 rounded-md bg-green opacity-0 border-2 border-black" />
                  )}
                </span>
              );
            })}
          </p>
        ))}
      </div>
      <img
        ref={hoorayRef}
        src={hooray}
        alt="Hooray"
        className="w-0 opacity-0"
      />
    </section>
  );
}
