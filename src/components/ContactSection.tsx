import {
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCodeBracketSquare,
  HiOutlineBriefcase,
} from 'react-icons/hi2';
import { CONTACT_INFO } from '../data/contact';
import useContactSection from '../hooks/useContactSection';

const ContactSection = () => {
  const { sectionRef, headingRef, cardsRef } = useContactSection();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex min-h-screen items-center justify-center px-4 py-24 text-black md:px-6
        md:py-32"
    >
      <div className="w-full max-w-5xl">
        <div ref={headingRef} className="mb-12 flex justify-center text-center md:mb-12">
          <span className="text-6xl font-bold md:text-6xl lg:text-8xl">Get in touch</span>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] md:gap-8"
        >
          <div className="contact-card min-h-0 w-full">
            <div
              className="contact-item flex h-full min-h-[200px] w-full flex-col justify-between
                rounded-[32px] border border-teal-400/50 bg-teal-500/45 px-5 py-6 text-white
                shadow-[0_20px_40px_rgba(20,184,166,0.35)] backdrop-blur-xl transition-all
                duration-300 ease-out md:px-7 md:py-8 md:hover:-translate-y-2 md:hover:scale-[1.02]
                md:hover:shadow-[0_28px_56px_rgba(20,184,166,0.5)]"
            >
              <div className="space-y-4">
                <div
                  className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1
                    text-xs font-medium tracking-wide"
                >
                  <HiOutlineMapPin className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="text-white/80 uppercase">{CONTACT_INFO.location}</span>
                </div>

                <div>
                  <div
                    className="mb-1.5 text-xs font-semibold tracking-[0.22em] text-white/70
                      uppercase"
                  >
                    Primary contact
                  </div>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="hover:text-yellow-light inline-flex items-center gap-2 text-base
                      font-semibold transition-colors md:text-lg"
                  >
                    <HiOutlineEnvelope className="h-5 w-5 shrink-0" aria-hidden />
                    <span>{CONTACT_INFO.email}</span>
                  </a>
                </div>
              </div>

              <div
                className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t
                  border-white/20 pt-4"
              >
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <HiOutlinePhone className="h-5 w-5 shrink-0" aria-hidden />
                  <a
                    href="tel:+66836536262"
                    className="hover:text-yellow-light font-medium transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="text-xs text-white/70">Local time: Bangkok (UTC+7)</div>
              </div>
            </div>
          </div>

          <div className="contact-card min-h-0 w-full">
            <div
              className="contact-item flex h-full min-h-[200px] w-full flex-col gap-4 rounded-[32px]
                border border-[#FAB95B]/60 bg-[#FAB95B]/55 px-5 py-6 text-black
                shadow-[0_20px_40px_rgba(250,185,91,0.35)] backdrop-blur-xl transition-all
                duration-300 ease-out md:px-7 md:py-8 md:hover:-translate-y-2 md:hover:scale-[1.02]
                md:hover:shadow-[0_28px_56px_rgba(250,185,91,0.5)]"
            >
              <div className="text-xs font-semibold tracking-[0.22em] text-black/70 uppercase">
                Find me online
              </div>

              <div className="space-y-3">
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl bg-black/5 px-3.5
                    py-2.5 transition-colors hover:bg-black/10"
                >
                  <div className="flex items-center gap-3">
                    <HiOutlineCodeBracketSquare className="h-6 w-6 shrink-0" aria-hidden />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">GitHub</span>
                      <span className="truncate text-xs text-black/65">brothermos</span>
                    </div>
                  </div>
                  <span
                    className="text-xs font-medium text-black/70 transition-transform
                      group-hover:translate-x-0.5"
                  >
                    View projects →
                  </span>
                </a>

                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl bg-black/5 px-3.5
                    py-2.5 transition-colors hover:bg-black/10"
                >
                  <div className="flex items-center gap-3">
                    <HiOutlineBriefcase className="h-6 w-6 shrink-0" aria-hidden />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">LinkedIn</span>
                      <span className="truncate text-xs text-black/65">Natdanai Kanyakoon</span>
                    </div>
                  </div>
                  <span
                    className="text-xs font-medium text-black/70 transition-transform
                      group-hover:translate-x-0.5"
                  >
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
