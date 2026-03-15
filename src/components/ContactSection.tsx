import { CONTACT_INFO } from "../data/contact";
import useContactSection from "../hooks/useContactSection";

const ContactSection = () => {
  const { sectionRef, headingRef, cardsRef } = useContactSection();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 md:px-6 py-24 md:py-32 text-black"
    >
      <div className="w-full max-w-5xl">
        <div
          ref={headingRef}
          className="mb-12 md:mb-12 flex justify-center text-center"
        >
          <span className="text-6xl md:text-6xl lg:text-8xl font-bold">
            Get in touch
          </span>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-10 md:gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)]"
        >
          <div className="contact-card w-full min-h-0">
            <div className="contact-item w-full h-full min-h-[200px] rounded-[32px] bg-teal-500/45 border border-teal-400/50 backdrop-blur-xl text-white shadow-[0_20px_40px_rgba(20,184,166,0.35)] md:hover:shadow-[0_28px_56px_rgba(20,184,166,0.5)] md:hover:scale-[1.02] md:hover:-translate-y-2 transition-all duration-300 ease-out px-5 py-6 md:px-7 md:py-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-medium tracking-wide">
                  <span className="text-lg" aria-hidden>📍</span>
                  <span className="uppercase text-white/80">
                    {CONTACT_INFO.location}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-semibold tracking-[0.22em] text-white/70 uppercase mb-1.5">
                    Primary contact
                  </div>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="inline-flex items-center gap-2 text-base md:text-lg font-semibold hover:text-yellow-light transition-colors"
                  >
                    <span className="text-lg" aria-hidden>✉️</span>
                    <span>{CONTACT_INFO.email}</span>
                  </a>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-lg" aria-hidden>📞</span>
                  <a
                    href="tel:+66836536262"
                    className="font-medium hover:text-yellow-light transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="text-xs text-white/70">
                  Local time: Bangkok (UTC+7)
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card w-full min-h-0">
            <div className="contact-item w-full h-full min-h-[200px] rounded-[32px] bg-[#FAB95B]/55 border border-[#FAB95B]/60 backdrop-blur-xl text-black shadow-[0_20px_40px_rgba(250,185,91,0.35)] md:hover:shadow-[0_28px_56px_rgba(250,185,91,0.5)] md:hover:scale-[1.02] md:hover:-translate-y-2 transition-all duration-300 ease-out px-5 py-6 md:px-7 md:py-8 flex flex-col gap-4">
              <div className="text-xs font-semibold tracking-[0.22em] text-black/70 uppercase">
                Find me online
              </div>

              <div className="space-y-3">
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl bg-black/5 px-3.5 py-2.5 hover:bg-black/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden>🧑‍💻</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">GitHub</span>
                      <span className="text-xs text-black/65 truncate">
                        brothermos
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-black/70 group-hover:translate-x-0.5 transition-transform">
                    View projects →
                  </span>
                </a>

                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl bg-black/5 px-3.5 py-2.5 hover:bg-black/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden>💼</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">LinkedIn</span>
                      <span className="text-xs text-black/65 truncate">
                        Natdanai Kanyakoon
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-black/70 group-hover:translate-x-0.5 transition-transform">
                    View profile →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
