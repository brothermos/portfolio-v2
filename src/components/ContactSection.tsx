import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = {
  location: "Bangkok, Thailand",
  email: "moss10612@gmail.com",
  phone: "(+66) 83 653 6262",
  github: "https://github.com/brothermos",
  linkedin: "https://www.linkedin.com/in/natdanai-kanyakoon-3a0526228/",
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      if (cardsRef.current) {
        const items = cardsRef.current.querySelectorAll(".contact-item");
        gsap.fromTo(
          items,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 md:px-6 py-16 text-black"
    >
      <div className="w-full max-w-5xl">
        <div
          ref={headingRef}
          className="mb-8 md:mb-10 flex justify-center text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Let&apos;s work together
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-4 md:gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)]"
        >
          {/* Left: location + primary contact */}
          <div className="contact-item rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_18px_45px_rgba(0,0,0,0.08)] px-5 py-6 md:px-7 md:py-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-medium tracking-wide">
                <span className="text-lg">📍</span>
                <span className="uppercase text-black/70">
                  {CONTACT_INFO.location}
                </span>
              </div>

              <div>
                <div className="text-xs font-semibold tracking-[0.22em] text-black/50 uppercase mb-1.5">
                  Primary contact
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="inline-flex items-center gap-2 text-base md:text-lg font-semibold hover:text-navy-light transition-colors"
                >
                  <span className="text-lg" aria-hidden>
                    ✉️
                  </span>
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-black/5 flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-2 text-sm text-black/70">
                <span className="text-lg" aria-hidden>
                  📞
                </span>
                <a
                  href="tel:+66836536262"
                  className="font-medium hover:text-navy-light transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="text-xs text-black/50">
                Local time: Bangkok (UTC+7)
              </div>
            </div>
          </div>

          {/* Right: social links */}
          <div className="contact-item rounded-2xl bg-white/25 backdrop-blur-md border border-white/60 shadow-[0_18px_45px_rgba(0,0,0,0.06)] px-5 py-6 md:px-7 md:py-7 flex flex-col gap-4">
            <div className="text-xs font-semibold tracking-[0.22em] text-black/50 uppercase">
              Find me online
            </div>

            <div className="space-y-3">
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-black/5 bg-white/60 px-3.5 py-2.5 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden>
                    🧑‍💻
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">GitHub</span>
                    <span className="text-xs text-black/60 truncate">
                      brothermos
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium text-black/60 group-hover:translate-x-0.5 transition-transform">
                  View projects →
                </span>
              </a>

              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-black/5 bg-white/60 px-3.5 py-2.5 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden>
                    💼
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">LinkedIn</span>
                    <span className="text-xs text-black/60 truncate">
                      Natdanai Kanyakoon
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium text-black/60 group-hover:translate-x-0.5 transition-transform">
                  View profile →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
