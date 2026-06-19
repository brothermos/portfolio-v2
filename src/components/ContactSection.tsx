import {
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCodeBracketSquare,
  HiOutlineBriefcase,
  HiOutlineArrowTopRightOnSquare,
} from 'react-icons/hi2';
import starAvatar from '@/images/star.png';
import useContactSection from '@/hooks/useContactSection';
import { CONTACT_INFO } from '@/data/contact';

const ContactSection = () => {
  const { sectionRef, headingRef, cardsRef } = useContactSection();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="theme-text flex min-h-screen items-center justify-center px-4 py-24 md:px-6
        md:py-32"
    >
      <div className="w-full max-w-5xl">
        <div ref={headingRef} className="mb-12 flex justify-center text-center md:mb-12">
          <span className="text-6xl font-bold md:text-6xl lg:text-8xl">Contact me</span>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-12 md:gap-7">
          <div className="contact-card min-h-0 w-full min-w-0 md:col-span-7">
            <div
              className="contact-item border-blue bg-blue relative flex h-full min-h-[300px] w-full
                flex-col justify-between overflow-hidden rounded-[32px] border px-5 py-6 text-white
                shadow-[0_20px_40px_rgba(153,183,245,0.35)] transition-all duration-300 ease-out
                md:px-7 md:py-8 md:hover:-translate-y-2 md:hover:scale-[1.01]
                md:hover:shadow-[0_28px_56px_rgba(153,183,245,0.5)]"
            >
              <div
                className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full
                  bg-white/15 blur-2xl"
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full
                  bg-white/10 blur-2xl"
              />

              <div
                className="relative flex w-full min-w-0 flex-col gap-4 md:flex-row md:items-center
                  md:justify-between"
              >
                <div className="min-w-0 space-y-4">
                  <div
                    className="theme-soft inline-flex items-center gap-2 rounded-full px-3 py-1
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
                      Let&apos;s collaborate
                    </div>
                    <h3 className="text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
                      Build something meaningful together.
                    </h3>
                  </div>
                  <div>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="hover:text-yellow-light inline-flex items-center gap-2 text-sm
                        font-semibold tracking-wide uppercase transition-colors"
                    >
                      <HiOutlineEnvelope className="h-5 w-5 shrink-0" aria-hidden />
                      <span>Primary contact</span>
                    </a>
                  </div>
                </div>

                <img
                  src={starAvatar}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none mx-auto h-36 w-36 shrink-0 object-contain md:mx-0
                    md:h-72 md:w-72"
                />
              </div>

              <div className="relative mt-6 grid gap-3 border-t border-white/20 pt-4 md:grid-cols-2">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="theme-soft theme-soft-hover flex min-h-[70px] items-center gap-3
                    rounded-2xl px-3.5 py-3 transition-colors"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                      bg-white/15"
                  >
                    <HiOutlineEnvelope className="h-5 w-5 shrink-0" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/70">Email</p>
                    <p className="truncate text-sm font-semibold">{CONTACT_INFO.email}</p>
                  </div>
                </a>
                <a
                  href="tel:+66836536262"
                  className="theme-soft theme-soft-hover flex min-h-[70px] items-center gap-3
                    rounded-2xl px-3.5 py-3 transition-colors"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                      bg-white/15"
                  >
                    <HiOutlinePhone className="h-5 w-5 shrink-0" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/70">Phone</p>
                    <p className="truncate text-sm font-semibold">{CONTACT_INFO.phone}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-card min-h-0 w-full md:col-span-5">
            <div className="grid h-full gap-6">
              <div
                className="contact-item border-yellow bg-yellow flex min-h-[164px] flex-col
                  justify-between rounded-[32px] border px-5 py-6 text-white
                  shadow-[0_20px_40px_rgba(252,202,89,0.35)] transition-all duration-300 ease-out
                  md:px-7 md:py-7 md:hover:-translate-y-1.5 md:hover:scale-[1.01]
                  md:hover:shadow-[0_28px_56px_rgba(252,202,89,0.5)]"
              >
                <div className="space-y-3">
                  <a
                    href={CONTACT_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-soft theme-soft-hover group flex items-center justify-between
                      rounded-2xl px-3.5 py-2.5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HiOutlineCodeBracketSquare className="h-6 w-6 shrink-0" aria-hidden />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">GitHub</span>
                        <span className="truncate text-xs text-white/65">brothermos</span>
                      </div>
                    </div>
                    <HiOutlineArrowTopRightOnSquare className="h-4 w-4 text-white/80" aria-hidden />
                  </a>

                  <a
                    href={CONTACT_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-soft theme-soft-hover group flex items-center justify-between
                      rounded-2xl px-3.5 py-2.5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HiOutlineBriefcase className="h-6 w-6 shrink-0" aria-hidden />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">LinkedIn</span>
                        <span className="truncate text-xs text-white/65">Natdanai Kanyakoon</span>
                      </div>
                    </div>
                    <HiOutlineArrowTopRightOnSquare className="h-4 w-4 text-white/80" aria-hidden />
                  </a>
                </div>
              </div>

              <div
                className="contact-item theme-panel theme-border bg-green flex min-h-[130px]
                  items-center justify-between rounded-[28px] border px-5 py-5 text-white
                  backdrop-blur-xl transition-all duration-300 ease-out md:px-6
                  md:hover:-translate-y-1.5"
              >
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase">Based in</p>
                  <p className="mt-1 text-lg font-bold">{CONTACT_INFO.location}</p>
                  <p className="text-sm">Local time: Bangkok (UTC+7)</p>
                </div>
                <div className="theme-soft flex h-12 w-12 items-center justify-center rounded-xl">
                  <HiOutlineMapPin className="h-6 w-6" aria-hidden />
                </div>
              </div>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="contact-item theme-panel theme-border theme-soft-hover bg-coral flex
                  min-h-[110px] items-center justify-between rounded-[28px] border px-5 py-5
                  text-white backdrop-blur-xl transition-all duration-300 ease-out md:px-6
                  md:hover:-translate-y-1.5"
              >
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase">Quick CTA</p>
                  <p className="mt-1 text-base font-semibold">Start a project with me</p>
                </div>
                <div className="theme-soft flex h-10 w-10 items-center justify-center rounded-full">
                  <HiOutlineArrowTopRightOnSquare className="h-5 w-5" aria-hidden />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
