import { useEffect, useCallback, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
  originRect: DOMRect;
  onClose: () => void;
};

const colorMap: Record<string, string> = {
  'bg-blue': 'from-blue/50 via-blue/20 to-zinc-900',
  'bg-yellow': 'from-yellow/50 via-yellow/20 to-zinc-900',
  'bg-green': 'from-green/50 via-green/20 to-zinc-900',
  'bg-coral': 'from-coral/50 via-coral/20 to-zinc-900',
  'bg-pink': 'from-pink/50 via-pink/20 to-zinc-900',
};

const ringColorMap: Record<string, string> = {
  'bg-blue': 'ring-blue',
  'bg-yellow': 'ring-yellow',
  'bg-green': 'ring-green',
  'bg-coral': 'ring-coral',
  'bg-pink': 'ring-pink',
};

type CarouselBannerProps = { project: Project };

const CarouselBanner = ({ project }: CarouselBannerProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({ containScroll: 'keepSnaps', dragFree: true });

  const ringColor = ringColorMap[project.color] ?? 'ring-white';

  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => {
      const i = mainApi.selectedScrollSnap();
      setSelectedIndex(i);
      thumbApi?.scrollTo(i);
    };
    mainApi.on('select', onSelect);
    return () => {
      mainApi.off('select', onSelect);
    };
  }, [mainApi, thumbApi]);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      mainApi?.scrollPrev();
    },
    [mainApi],
  );
  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      mainApi?.scrollNext();
    },
    [mainApi],
  );
  const goTo = useCallback(
    (e: React.MouseEvent, i: number) => {
      e.stopPropagation();
      mainApi?.scrollTo(i);
    },
    [mainApi],
  );

  const total = project.previews.length;

  return (
    <div>
      <div className="group relative aspect-video w-full overflow-hidden bg-zinc-950">
        <div ref={mainRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {project.previews.map((src, i) => (
              <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]">
                <img
                  src={src}
                  alt={`${project.title} preview ${i + 1}`}
                  className="h-full w-full object-contain"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute top-3 left-4 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs
            font-semibold text-white/80 backdrop-blur-sm"
        >
          {selectedIndex + 1} / {total}
        </div>

        <button
          type="button"
          aria-label="Previous image"
          onClick={scrollPrev}
          className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center
            justify-center rounded-full bg-black/50 text-white opacity-0 ring-1 ring-white/20
            backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/70 md:left-4
            md:h-10 md:w-10"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={scrollNext}
          className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center
            justify-center rounded-full bg-black/50 text-white opacity-0 ring-1 ring-white/20
            backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/70 md:right-4
            md:h-10 md:w-10"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="bg-zinc-950 px-3 py-2.5 md:px-4 md:py-3">
        <div ref={thumbRef} className="overflow-hidden">
          <div className="flex gap-2 md:gap-2.5">
            {project.previews.map((src, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={(e) => goTo(e, i)}
                className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md ring-2
                transition-all duration-200 md:h-14 md:w-24 ${
                  i === selectedIndex
                    ? `${ringColor} opacity-100`
                    : 'opacity-40 ring-transparent hover:opacity-70'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NetflixProjectModal = ({ project, originRect, onClose }: Props) => {
  const hasPreviews = project.previews.length > 0;
  const gradient = colorMap[project.color] ?? 'from-zinc-700/40 via-zinc-700/20 to-zinc-900';

  const modalRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const getCollapsedStyle = (): React.CSSProperties => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const padding = vw < 768 ? 16 : 24;
    const modalW = Math.min(vw - padding * 2, 1024);
    const modalH = Math.min(vh * 0.92, vh - padding * 2);
    const cardCX = originRect.left + originRect.width / 2;
    const cardCY = originRect.top + originRect.height / 2;
    const dx = cardCX - vw / 2;
    const dy = cardCY - vh / 2;
    const scale = Math.min(originRect.width / modalW, originRect.height / modalH);
    return { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0 };
  };

  const handleClose = () => {
    setClosing(true);
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (closing && e.propertyName === 'transform') onClose();
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const isOpen = ready && !closing;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-6"
      style={{
        backgroundColor: isOpen ? 'rgba(0,0,0,0.75)' : 'transparent',
        transition: 'background-color 350ms ease',
      }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nfx-title"
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-zinc-900
          shadow-[0_32px_80px_rgba(0,0,0,0.8)] will-change-transform"
        style={{
          maxHeight: '92dvh',
          overflowY: 'auto',
          ...(isOpen
            ? {
                transform: 'translate(0,0) scale(1)',
                opacity: 1,
                transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease',
              }
            : {
                ...getCollapsedStyle(),
                transition: ready
                  ? 'transform 380ms cubic-bezier(0.4,0,1,1), opacity 250ms ease'
                  : 'none',
              }),
        }}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        {hasPreviews ? (
          <CarouselBanner project={project} />
        ) : (
          <div
            className={`relative flex h-64 items-center justify-center bg-linear-to-b ${gradient}
              md:h-80 lg:h-96`}
          >
            <img
              src={project.logo}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-contain opacity-10
                blur-2xl"
            />
            <div
              className="relative z-10 flex h-32 w-32 items-center justify-center rounded-3xl
                bg-white p-4 shadow-2xl ring-1 ring-white/10 md:h-40 md:w-40 lg:h-48 lg:w-48"
            >
              <img
                src={project.logo}
                alt={project.company}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center
            rounded-full bg-zinc-900/80 text-white ring-1 ring-white/15 backdrop-blur-sm
            transition-colors hover:bg-zinc-700 md:top-4 md:right-4 md:h-10 md:w-10"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-5 pt-4 pb-8 md:px-8 md:pt-5 md:pb-10">
          <h2 id="nfx-title" className="mb-2 text-lg font-black text-white md:text-2xl">
            {project.title}
          </h2>
          <p className="text-sm leading-relaxed text-white/85 md:text-base">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetflixProjectModal;
