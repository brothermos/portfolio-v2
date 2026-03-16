import logoMacbook from '@/images/macbook.png';
import { NAME, TITLE } from '@/data/hero';
import useHeroSection from '@/hooks/useHeroSection';

const HeroSection = () => {
  const { logoRef, navRef, heroRef, titleRef, hiRef, cvButtonRef } = useHeroSection();

  return (
    <>
      <div ref={navRef} className="fixed inset-x-0 top-0 h-16" />

      <div
        ref={logoRef}
        className="fixed top-0 left-0 z-10 flex items-center gap-4 will-change-transform"
      >
        <div className="flex flex-col items-center justify-center">
          <img
            src={logoMacbook}
            className="pointer-events-none h-48 drop-shadow-[0_0_1.5rem_rgba(100,108,255,0.4)]
              md:h-72 lg:h-96"
            alt="Logo"
          />
          <div ref={hiRef} className="text-2xl font-bold text-black md:text-3xl lg:text-4xl">
            Hi 👋
          </div>
        </div>
      </div>

      <section
        id="home"
        ref={heroRef}
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
      >
        <div ref={titleRef} className="z-20 flex flex-col items-center">
          <h1 className="flex flex-col items-center px-4 font-bold tracking-tight text-black">
            <span
              className="flex flex-col items-center leading-none md:hidden"
              style={{ fontSize: 'clamp(3.75rem, 13vw, 5.25rem)' }}
            >
              <span className="flex">
                {'Natdanai'.split('').map((char, i) => (
                  <span key={`m-first-${i}`} className="char inline-block">
                    {char}
                  </span>
                ))}
              </span>
              <span className="mt-1 flex">
                {'Kanyakoon'.split('').map((char, i) => (
                  <span key={`m-last-${i}`} className="char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </span>

            <span
              className="hidden flex-wrap justify-center leading-none md:flex"
              style={{ fontSize: 'clamp(3.5rem, 5vw + 1rem, 8rem)' }}
            >
              {NAME.split('').map((char, i) => (
                <span
                  key={`d-${i}`}
                  className="char inline-block"
                  style={char === ' ' ? { width: '0.3em' } : undefined}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>
          <h2
            className="mt-2 flex flex-wrap justify-center text-2xl font-bold tracking-widest
              text-black md:mt-4 md:text-4xl lg:text-6xl"
          >
            {TITLE.split(' ').map((word, wIdx) => (
              <span
                key={`tw${wIdx}`}
                className={`inline-flex ${word === 'Developer' ? 'title-dev-word' : ''}`}
                style={wIdx > 0 ? { marginLeft: '0.3em' } : undefined}
              >
                {word.split('').map((char, cIdx) => (
                  <span key={`tc${wIdx}-${cIdx}`} className="char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-12 md:gap-4 lg:gap-6">
            <a
              ref={cvButtonRef}
              href="/Natdanai_Kanyakoon_CV.pdf"
              download
              className={`skill-badge rounded-full border border-red-400/50 bg-red-500/45 px-4
                py-2 text-base font-semibold text-white shadow-[0_20px_40px_rgba(239,68,68,0.35)]
                backdrop-blur-xl will-change-transform md:px-6 md:py-3 md:text-2xl lg:px-8 lg:py-4
                lg:text-5xl`}
            >
              Download CV
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
