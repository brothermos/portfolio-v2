import hooray from "../../public/images/hooray.png";
import { SKILL_HIGHLIGHT_WORDS, SOFTWARE_DEVELOPER_HIGHLIGHT_WORDS, INTRO_PARAGRAPHS } from "../data/about";
import useAboutSection from "../hooks/useAboutSection";

const AboutSection = () => {
  const { introRef, hoorayRef, headingRef } = useAboutSection();

  return (
    <section
      id="about"
      ref={introRef}
      className="h-screen flex flex-col items-center justify-center px-4 md:px-6 gap-4 md:gap-8"
    >
      <div ref={headingRef} className="flex items-center gap-4 font-bold text-6xl md:text-6xl lg:text-8xl">
        <span>About me</span>
      </div>
      <div className="max-w-5xl text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed tracking-tight text-black space-y-4 md:space-y-8">
        {INTRO_PARAGRAPHS.map((paragraph, pIdx) => (
          <p key={pIdx} className="flex flex-wrap gap-y-2">
            {paragraph.split(" ").map((word, wIdx) => {
              const clean = word.replace(/[.,;:!?]/g, "");
              const isSkill = SKILL_HIGHLIGHT_WORDS.has(clean);
              const isDev = SOFTWARE_DEVELOPER_HIGHLIGHT_WORDS.has(clean);
              const hasHighlight = isSkill || isDev;
              return (
                <span key={wIdx} className={`word relative mr-[0.3em] inline-block ${hasHighlight ? "px-2" : ""}`}>
                  <span className={`word-text opacity-0 ${hasHighlight ? "relative z-10" : ""}`}>{word}</span>
                  <span className="word-bg absolute inset-0 rounded-md bg-black/15" />
                  {isSkill && (
                    <span className="word-highlight absolute inset-0 rounded-md bg-blue-400/45 backdrop-blur-sm border border-blue-400/50 opacity-0" />
                  )}
                  {isDev && (
                    <span className="word-highlight absolute inset-0 rounded-md bg-green/45 backdrop-blur-sm border border-green/50 opacity-0" />
                  )}
                </span>
              );
            })}
          </p>
        ))}
      </div>
      <img ref={hoorayRef} src={hooray} alt="Hooray" className="w-0 opacity-0" />
    </section>
  );
};

export default AboutSection;
