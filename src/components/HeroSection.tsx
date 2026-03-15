import logo_macbook from "../assets/macbook.png";
import { NAME, TITLE } from "../data/hero";
import useHeroSection from "../hooks/useHeroSection";

const HeroSection = () => {
  const { logoRef, navRef, heroRef, titleRef, hiRef } = useHeroSection();

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
          <div
            ref={hiRef}
            className="text-black text-2xl md:text-3xl lg:text-4xl font-bold"
          >
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
          <h1 className="font-bold text-black tracking-tight flex flex-col items-center px-4">
            <span
              className="flex flex-col items-center leading-none md:hidden"
              style={{ fontSize: "clamp(3.75rem, 13vw, 5.25rem)" }}
            >
              <span className="flex">
                {"Natdanai".split("").map((char, i) => (
                  <span key={`m-first-${i}`} className="char inline-block">
                    {char}
                  </span>
                ))}
              </span>
              <span className="flex mt-1">
                {"Kanyakoon".split("").map((char, i) => (
                  <span key={`m-last-${i}`} className="char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </span>

            <span
              className="hidden md:flex flex-wrap justify-center leading-none"
              style={{ fontSize: "clamp(3.5rem, 5vw + 1rem, 8rem)" }}
            >
              {NAME.split("").map((char, i) => (
                <span
                  key={`d-${i}`}
                  className="char inline-block"
                  style={char === " " ? { width: "0.3em" } : undefined}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-black tracking-widest flex flex-wrap justify-center mt-2 md:mt-4">
            {TITLE.split(" ").map((word, wIdx) => (
              <span
                key={`tw${wIdx}`}
                className={`inline-flex ${word === "Developer" ? "title-dev-word" : ""}`}
                style={wIdx > 0 ? { marginLeft: "0.3em" } : undefined}
              >
                {word.split("").map((char, cIdx) => (
                  <span
                    key={`tc${wIdx}-${cIdx}`}
                    className="char inline-block"
                  >
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
};

export default HeroSection;
