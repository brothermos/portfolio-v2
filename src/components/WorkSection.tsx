import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { PROJECTS, type Project } from '@/data/projects';
import useWorkSection from '@/hooks/useWorkSection';
import NetflixProjectModal from './NetflixProjectModal';

type ActiveModal = { project: Project; originRect: DOMRect };

const PlusIcon = () => (
  <div
    className="absolute right-4 bottom-4 aspect-square w-8 transition-transform duration-300
      ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90 sm:w-7 xl:w-9"
    aria-hidden="true"
  >
    <svg
      className="h-full w-full"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z"
        fill="white"
      />
      <path d="M19.5 16.5H27V19.5H19.5V27H16.5V19.5H9V16.5H16.5V9H19.5V16.5Z" fill="black" />
    </svg>
  </div>
);

const ArrowIcon = () => (
  <svg
    className="h-4 w-auto"
    width="11"
    height="20"
    viewBox="0 0 11 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
      fill="currentColor"
    />
  </svg>
);

const WorkSection = () => {
  const { workRef, headingRef } = useWorkSection();
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const openModal = (e: React.MouseEvent<HTMLElement>, project: Project) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveModal({ project, originRect: rect });
  };

  const handleBeforeInit = (swiper: SwiperType) => {
    if (typeof swiper.params.navigation === 'object' && swiper.params.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
    if (typeof swiper.params.pagination === 'object' && swiper.params.pagination) {
      swiper.params.pagination.el = paginationRef.current;
    }
  };

  return (
    <>
      <section
        id="work"
        ref={workRef}
        className="theme-text flex min-h-screen flex-col items-center justify-center overflow-hidden
          px-4 py-10 font-bold sm:py-16 md:px-6 xl:py-20"
      >
        <div ref={headingRef} className="mb-6 flex items-center gap-4 sm:mb-8 md:mb-12">
          <span className="text-[34px] leading-snug font-bold md:text-[50px] xl:text-[64px]">
            My Work
          </span>
        </div>

        <div className="flex w-full max-w-6xl flex-col">
          <div className="work-controls order-2 mt-6 flex items-center justify-between gap-4">
            <div ref={paginationRef} className="work-pagination flex items-center gap-1" />

            <div className="flex items-center justify-end gap-3">
              <button
                ref={prevRef}
                type="button"
                aria-label="Previous slide"
                className="theme-soft theme-soft-hover flex h-10 w-10 items-center justify-center
                  rounded-full transition-opacity duration-200
                  [&.swiper-button-disabled]:pointer-events-none
                  [&.swiper-button-disabled]:opacity-30"
              >
                <span className="rotate-180">
                  <ArrowIcon />
                </span>
              </button>
              <button
                ref={nextRef}
                type="button"
                aria-label="Next slide"
                className="theme-soft theme-soft-hover flex h-10 w-10 items-center justify-center
                  rounded-full transition-opacity duration-200
                  [&.swiper-button-disabled]:pointer-events-none
                  [&.swiper-button-disabled]:opacity-30"
              >
                <ArrowIcon />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView="auto"
            spaceBetween={20}
            grabCursor
            pagination={{ clickable: true }}
            navigation={{}}
            onBeforeInit={handleBeforeInit}
            className="order-1 w-full overflow-visible!"
          >
            {PROJECTS.map((project) => (
              <SwiperSlide key={project.number} className="w-auto! py-3">
                <div
                  className={`work-card-hover rounded-3xl ${project.shadow} ${project.hoverShadow}`}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => openModal(e, project)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        (e.currentTarget as HTMLElement).click();
                      }
                    }}
                    className="work-card group relative flex aspect-848/866 w-[78vw] max-w-[400px]
                      cursor-pointer flex-col overflow-hidden rounded-3xl sm:w-[340px] lg:w-[400px]"
                  >
                    <div
                      className="relative flex min-h-0 flex-1 items-center justify-center
                        overflow-hidden bg-white"
                    >
                      <div className="absolute top-5 right-5 z-10 flex flex-wrap justify-end gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-black/10 bg-black/5 px-3 py-1
                              text-xs font-semibold text-neutral-900 backdrop-blur-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <img
                        src={project.logo}
                        alt={project.company}
                        loading="lazy"
                        className="h-28 w-28 object-contain md:h-32 md:w-32"
                      />
                    </div>

                    <div
                      className={`flex shrink-0 flex-col gap-1 p-5 py-8 text-neutral-900
                        ${project.tint}`}
                    >
                      <p
                        className="text-xs font-semibold tracking-[0.2em] uppercase opacity-80
                          md:text-sm"
                      >
                        {project.company}
                      </p>
                      <h3 className="pr-12 text-xl leading-snug font-bold md:text-2xl">
                        {project.title}
                      </h3>
                    </div>

                    <PlusIcon />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {activeModal && (
        <NetflixProjectModal
          project={activeModal.project}
          originRect={activeModal.originRect}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
};

export default WorkSection;
