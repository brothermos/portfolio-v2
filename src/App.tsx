import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo_macbook from "./assets/macbook.png";
import hooray from "./assets/hooray.png";

gsap.registerPlugin(ScrollTrigger);

const NAME = "Natdanai Kanyakoon";
const TITLE = "FRONTEND DEVELOPER";

const SKILL_HIGHLIGHT_WORDS = new Set(["React", "TypeScript"]);
const SOFTWARE_DEVELOPER_HIGHLIGHT_WORDS = new Set(["Software", "Developer"]);

const PROJECTS = [
  { number: "01", title: "Project Alpha", color: "bg-orange-500" },
  { number: "02", title: "Project Beta", color: "bg-blue-500" },
  { number: "03", title: "Project Gamma", color: "bg-yellow-500" },
  { number: "04", title: "Project Delta", color: "bg-pink-500" },
];

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Vue.js",
];

const INTRO_PARAGRAPHS = [
  "A Software Developer with 3+ years of experience delivering production-grade web applications. Specialized in React and TypeScript with a focus on scalable architecture and complex business logic. Experienced in building systems used in enterprise and financial domains. Collaborative team player with a strong sense of ownership and attention to detail.",
];

function App() {
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const hiRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const hoorayRef = useRef<HTMLImageElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, {
        x: () => window.innerWidth / 2,
        y: () => window.innerHeight / 2,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "top left",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        logoRef.current,
        {
          x: 20,
          y: 10,
          xPercent: 0,
          yPercent: 0,
          scale: 0.3,
        },
        0
      );

      tl.fromTo(navRef.current, { opacity: 0 }, { opacity: 1 }, 0.4);

      tl.to(hiRef.current, { opacity: 0, duration: 0.3 }, 0);

      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars) {
        tl.fromTo(
          chars,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.03, ease: "power2.out" },
          0
        );
      }

      const wordEls = introRef.current
        ? Array.from(introRef.current.querySelectorAll(".word"))
        : [];

      if (wordEls.length) {
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
      }
      const skillBadges = skillsRef.current
        ? Array.from(
            skillsRef.current.querySelectorAll<HTMLElement>(".skill-badge")
          )
        : [];

      skillBadges.forEach((badge, i) => {
        gsap.to(badge, {
          y: gsap.utils.random(-12, -20),
          rotation: gsap.utils.random(-3, 3),
          duration: gsap.utils.random(1.8, 2.8),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });
      });

      const panels = workRef.current
        ? Array.from(
            workRef.current.querySelectorAll<HTMLElement>(".work-panel")
          )
        : [];

      if (panels.length) {
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
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full px-4">
      <div ref={navRef} className="fixed top-0 inset-x-0 h-16 " />

      <div
        ref={logoRef}
        className="fixed top-0 left-0 z-10 flex gap-4 items-center will-change-transform"
      >
        <div className=" flex flex-col items-center justify-center">
          <img
            src={logo_macbook}
            className=" h-96 pointer-events-none drop-shadow-[0_0_1.5rem_rgba(100,108,255,0.4)]"
            alt="Vite logo"
          />
          <div ref={hiRef} className="text-black text-4xl font-bold">
            Hi 👋
          </div>
        </div>
      </div>

      <section
        ref={heroRef}
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div ref={titleRef} className="z-20 flex flex-col items-center">
          <h1 className="text-9xl font-bold text-black tracking-tight flex flex-wrap justify-center">
            {NAME.split("").map((char, i) => (
              <span
                key={`n${i}`}
                className="char inline-block"
                style={char === " " ? { width: "0.3em" } : undefined}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <h2 className="text-6xl font-bold text-black tracking-widest uppercase flex flex-wrap justify-center mt-4">
            {TITLE.split("").map((char, i) => (
              <span
                key={`t${i}`}
                className="char inline-block"
                style={char === " " ? { width: "0.3em" } : undefined}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>
      </section>

      <section
        ref={introRef}
        className="h-screen flex flex-col items-center justify-center px-6 gap-8"
      >
        <div className="max-w-5xl text-2xl md:text-3xl font-semibold leading-relaxed tracking-tight text-black space-y-8">
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

      <section className="h-screen flex flex-col gap-28 items-center justify-center px-6 text-black text-8xl font-bold">
        <div className="flex items-center gap-6">
          <span>Skills</span>
        </div>
        <div ref={skillsRef} className="flex flex-col items-center gap-12">
          <div className="flex gap-6">
            {SKILLS.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="skill-badge px-8 py-4 border-4 border-black rounded-full bg-purple-500 text-white text-5xl font-semibold will-change-transform"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex gap-6">
            {SKILLS.slice(4).map((skill) => (
              <span
                key={skill}
                className="skill-badge px-8 py-4 border-4 border-black rounded-full bg-green-500 text-white text-5xl font-semibold will-change-transform"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center px-6 text-black text-8xl font-bold">
        My Work
      </section>

      <div ref={workRef} className="flex flex-col items-center gap-10">
        {PROJECTS.map((project, i) => (
          <section
            key={i}
            className={`work-panel w-[1200px] border-4 max-w-full h-[600px] rounded-[56px] flex flex-col items-center justify-center ${project.color}`}
          >
            <span className="text-[12rem] font-bold text-black/20 leading-none">
              {project.number}
            </span>
            <h3 className="text-5xl font-bold text-black mt-4">
              {project.title}
            </h3>
          </section>
        ))}
      </div>

      <section className="h-screen flex items-center justify-center px-6 text-black text-8xl font-bold">
        Contact Me
      </section>
    </div>
  );
}

export default App;
