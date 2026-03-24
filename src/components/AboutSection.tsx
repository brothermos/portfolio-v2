import hooray from '@/images/hooray.png';
import {
  SKILL_HIGHLIGHT_WORDS,
  SOFTWARE_DEVELOPER_HIGHLIGHT_WORDS,
  INTRO_PARAGRAPHS,
} from '@/data/about';
import useAboutSection from '@/hooks/useAboutSection';

const AboutSection = () => {
  const { introRef, hoorayRef, headingRef } = useAboutSection();

  return (
    <section
      id="about"
      ref={introRef}
      className="flex h-screen flex-col items-center justify-center gap-4 px-4 md:gap-8 md:px-6"
    >
      <div
        ref={headingRef}
        className="flex items-center gap-4 text-6xl font-bold md:text-6xl lg:text-8xl"
      >
        <span>About me</span>
      </div>
      <div
        className="theme-text max-w-5xl space-y-4 text-xl leading-relaxed font-semibold
          tracking-tight md:space-y-8 md:text-2xl lg:text-3xl"
      >
        {INTRO_PARAGRAPHS.map((paragraph, pIdx) => (
          <p key={pIdx} className="flex flex-wrap gap-y-2">
            {paragraph.split(' ').map((word, wIdx) => {
              const clean = word.replace(/[.,;:!?]/g, '');
              const isSkill = SKILL_HIGHLIGHT_WORDS.has(clean);
              const isDev = SOFTWARE_DEVELOPER_HIGHLIGHT_WORDS.has(clean);
              const hasHighlight = isSkill || isDev;
              return (
                <span
                  key={wIdx}
                  className={`word relative mr-[0.3em] inline-block ${hasHighlight ? 'px-2' : ''}`}
                >
                  <span className={`word-text opacity-0 ${hasHighlight ? 'relative z-10' : ''}`}>
                    {word}
                  </span>
                  <span className="word-bg theme-highlight absolute inset-0 rounded-md" />
                  {isSkill && (
                    <span
                      className="word-highlight absolute inset-0 rounded-md border
                        border-blue-400/50 bg-blue-400/45 opacity-0 backdrop-blur-sm"
                    />
                  )}
                  {isDev && (
                    <span
                      className="word-highlight bg-green/45 border-green/50 absolute inset-0
                        rounded-md border opacity-0 backdrop-blur-sm"
                    />
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
