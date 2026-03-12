import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo_macbook from "../assets/macbook.png";

gsap.registerPlugin(ScrollTrigger);

const NAME = "Natdanai Kanyakoon";
const TITLE = "Frontend Developer";

export default function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hiRef = useRef<HTMLDivElement>(null);

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
        { x: 20, y: 10, xPercent: 0, yPercent: 0, scale: 0.3 },
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={navRef} className="fixed top-0 inset-x-0 h-16" />

      <div
        ref={logoRef}
        className="fixed top-0 left-0 z-10 flex gap-4 items-center will-change-transform"
      >
        <div className="flex flex-col items-center justify-center">
          <img
            src={logo_macbook}
            className="h-48 md:h-72 lg:h-96 pointer-events-none drop-shadow-[0_0_1.5rem_rgba(100,108,255,0.4)]"
            alt="Logo"
          />
          <div ref={hiRef} className="text-black text-2xl md:text-3xl lg:text-4xl font-bold">
            Hi 👋
          </div>
        </div>
      </div>

      <section
        id="home"
        ref={heroRef}
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div ref={titleRef} className="z-20 flex flex-col items-center">
          <h1
            className="font-bold text-black tracking-tight flex flex-wrap justify-center px-4"
            style={{ fontSize: "clamp(2rem, 5vw + 2rem, 8rem)" }}
          >
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
          <h2 className="text-xl md:text-4xl lg:text-6xl font-bold text-black tracking-widest flex flex-wrap justify-center mt-2 md:mt-4">
            {TITLE.split(" ").map((word, wIdx) => (
              <span
                key={`tw${wIdx}`}
                className={`inline-flex ${word === "Developer" ? "title-dev-word" : ""}`}
                style={wIdx > 0 ? { marginLeft: "0.3em" } : undefined}
              >
                {word.split("").map((char, cIdx) => (
                  <span key={`tc${wIdx}-${cIdx}`} className="char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
      </section>
    </>
  );
}
