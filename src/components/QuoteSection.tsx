import { Fragment } from 'react';
import { QUOTE_SEGMENTS, type QuoteIcon } from '@/data/quote';
import useQuoteSection from '@/hooks/useQuoteSection';

const Thunder = () => (
  <svg
    viewBox="0 0 468 732"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <g filter="url(#quote_thunder_shadow)">
      <path
        d="M444.632 245.569C443.499 243.503 441.825 241.785 439.788 240.601C437.752 239.417 435.432 238.811 433.077 238.849L239.8 243.099L333.919 17.7884C334.755 15.8421 335.084 13.716 334.877 11.6079C334.67 9.49991 333.933 7.47854 332.734 5.73235C331.578 3.96039 329.995 2.50728 328.131 1.50592C326.268 0.504565 324.183 -0.0130457 322.068 0.000757552H73.1885C70.1108 -0.0328022 67.1251 1.04967 64.7831 3.04788C62.4411 5.04608 60.9009 7.82498 60.4478 10.871L0.104443 400.025C-0.123428 401.788 0.0225149 403.58 0.53303 405.282C1.04354 406.985 1.90705 408.561 3.06718 409.907C4.27636 411.347 5.78903 412.501 7.49651 413.287C9.20399 414.073 11.064 414.471 12.9434 414.453H189.332L134.223 671.386C133.79 673.265 133.788 675.218 134.218 677.098C134.649 678.978 135.499 680.736 136.707 682.239C137.914 683.742 139.447 684.951 141.19 685.776C142.932 686.601 144.838 687.019 146.766 686.999C148.869 687.006 150.942 686.496 152.801 685.514C154.661 684.532 156.251 683.108 157.432 681.367L443.841 258.416C445.1 256.537 445.837 254.357 445.976 252.1C446.115 249.842 445.651 247.588 444.632 245.569Z"
        fill="#1EB24D"
      />
      <path
        d="M73.1123 7L73.1504 7.00098H322.113C323.056 6.99482 323.987 7.225 324.818 7.67188C325.65 8.11884 326.357 8.76762 326.873 9.55859L326.917 9.62598L326.963 9.69336C327.493 10.466 327.819 11.3606 327.911 12.293C328.003 13.2249 327.857 14.1656 327.487 15.0273L327.46 15.0898L233.341 240.4L229.191 250.334L239.953 250.097L433.189 245.848L433.19 245.849C434.27 245.831 435.335 246.109 436.27 246.652C437.17 247.176 437.914 247.929 438.433 248.832C438.856 249.715 439.049 250.691 438.989 251.67C438.927 252.684 438.596 253.663 438.033 254.508L151.639 677.438C151.101 678.23 150.377 678.878 149.532 679.324C148.687 679.771 147.745 680.002 146.789 679.999H146.742L146.694 680C145.827 680.009 144.969 679.821 144.185 679.449C143.399 679.077 142.708 678.532 142.164 677.854C141.62 677.177 141.236 676.385 141.042 675.536C140.848 674.688 140.848 673.807 141.044 672.959L141.057 672.906L141.067 672.854L196.176 415.921L197.992 407.453H12.876C12.0305 407.461 11.1924 407.282 10.4229 406.928C9.6539 406.574 8.97255 406.054 8.42773 405.405L8.39941 405.371L8.37012 405.338L8.18164 405.107C7.75774 404.56 7.43782 403.937 7.23828 403.271C7.01349 402.522 6.94703 401.733 7.04297 400.955L67.3652 11.9434L67.3682 11.9229L67.3721 11.9014C67.5764 10.5275 68.2705 9.27388 69.3262 8.37305C70.3816 7.47252 71.727 6.98489 73.1123 7Z"
        stroke="#19154A"
        strokeWidth="14"
      />
    </g>
    <defs>
      <filter
        id="quote_thunder_shadow"
        x="0"
        y="0"
        width="468"
        height="732"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="22" dy="45" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0980392 0 0 0 0 0.0823529 0 0 0 0 0.290196 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const Smile = () => (
  <svg
    viewBox="0 0 643 665"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <g filter="url(#quote_smile_shadow)">
      <path
        d="M310.441 620C481.893 620 620.882 481.208 620.882 310C620.882 138.792 481.893 0 310.441 0C138.989 0 0 138.792 0 310C0 481.208 138.989 620 310.441 620Z"
        fill="#E681FF"
      />
      <path
        d="M310.441 7C478.036 7.00023 613.882 142.667 613.882 310C613.882 477.333 478.036 613 310.441 613C142.846 613 7 477.333 7 310C7 142.667 142.846 7 310.441 7Z"
        stroke="#3B0F46"
        strokeWidth="14"
      />
    </g>
    <path
      d="M501.422 289.196C503.18 288.871 504.986 288.917 506.724 289.332C510.235 290.238 513.304 292.391 515.358 295.398C517.387 298.368 518.286 301.969 517.897 305.548C508.143 353.216 482.491 396.127 445.167 427.204C407.789 458.326 360.945 475.718 312.382 476.508C263.819 477.297 216.439 461.437 178.076 431.547C139.73 401.669 112.687 359.56 101.419 312.175C100.698 308.729 101.342 305.138 103.212 302.161C105.091 299.17 108.057 297.04 111.476 296.218L111.628 296.181L111.776 296.135C113.524 295.597 115.366 295.434 117.18 295.656C118.995 295.879 120.743 296.481 122.311 297.425C123.879 298.37 125.234 299.636 126.284 301.142C127.335 302.647 128.06 304.359 128.409 306.165L128.432 306.284L128.461 306.402C138.49 347.443 162.115 383.853 195.471 409.667C228.827 435.481 269.935 449.167 312.062 448.479C354.188 447.792 394.831 432.771 427.332 405.883C459.833 378.994 482.265 341.831 490.957 300.485L490.993 300.312L491.018 300.135C491.263 298.345 491.878 296.629 492.822 295.097C493.765 293.564 495.021 292.248 496.503 291.231C497.984 290.215 499.66 289.522 501.422 289.196Z"
      fill="#3B0F46"
      stroke="#3B0F46"
      strokeWidth="10"
    />
    <path
      d="M229.304 145.228C237.59 145.228 245.565 148.481 251.546 154.319C257.487 160.119 260.998 168.021 261.339 176.387C260.998 184.753 257.487 192.655 251.546 198.454C245.565 204.293 237.59 207.546 229.304 207.546C221.017 207.546 213.043 204.293 207.062 198.454C201.12 192.654 197.608 184.752 197.267 176.387C197.608 168.021 201.12 160.119 207.062 154.319C213.043 148.481 221.017 145.228 229.304 145.228Z"
      fill="#3B0F46"
      stroke="#3B0F46"
      strokeWidth="10"
    />
    <path
      d="M385.909 145.233C390.104 145.161 394.272 145.916 398.175 147.454C402.077 148.992 405.634 151.282 408.646 154.193C411.657 157.103 414.063 160.576 415.725 164.413C417.369 168.212 418.251 172.294 418.326 176.431C417.994 184.767 414.45 192.658 408.423 198.457C402.364 204.286 394.272 207.546 385.848 207.546C377.424 207.546 369.331 204.286 363.272 198.457C357.242 192.655 353.697 184.76 353.368 176.419C353.439 172.288 354.316 168.209 355.956 164.412C357.613 160.576 360.013 157.103 363.021 154.193C366.028 151.282 369.584 148.992 373.482 147.454C377.381 145.916 381.546 145.161 385.739 145.233L385.824 145.234L385.909 145.233Z"
      fill="#3B0F46"
      stroke="#3B0F46"
      strokeWidth="10"
    />
    <defs>
      <filter
        id="quote_smile_shadow"
        x="0"
        y="0"
        width="642.883"
        height="665"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="22" dy="45" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.231373 0 0 0 0 0.0588235 0 0 0 0 0.27451 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const Heart = () => (
  <svg
    viewBox="0 0 612 508"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <g filter="url(#quote_heart_shadow)">
      <path
        d="M235.648 34.5303C175.891 -16.9124 85.7702 -10.0932 34.421 49.7567C-16.8644 109.532 -10.0608 199.589 49.622 250.968L292.067 459.68C292.524 460.074 292.952 460.502 293.345 460.961L294.662 462.496C294.823 462.736 295.177 462.736 295.338 462.496L296.655 460.961C297.048 460.502 297.476 460.074 297.933 459.68L540.378 250.968C600.061 199.589 606.864 109.532 555.579 49.7567C504.23 -10.0932 414.109 -16.9124 354.352 34.5303L302.829 78.8845C298.329 82.7587 291.671 82.7587 287.171 78.8845L235.648 34.5303Z"
        fill="#FA5424"
      />
      <path
        d="M358.919 39.835C415.742 -9.08174 501.437 -2.59835 550.267 54.3145C599.038 111.16 592.567 196.804 535.812 245.663L295 452.968L54.1885 245.663C-2.56707 196.804 -9.03808 111.16 39.7334 54.3145C88.5627 -2.59835 174.258 -9.08171 231.081 39.835L282.604 84.1895C289.73 90.3234 300.27 90.3234 307.396 84.1895L358.919 39.835Z"
        stroke="#19154A"
        strokeWidth="14"
      />
    </g>
    <defs>
      <filter
        id="quote_heart_shadow"
        x="0"
        y="0"
        width="612"
        height="507.676"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="22" dy="45" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0980392 0 0 0 0 0.0823529 0 0 0 0 0.290196 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const ICONS: Record<QuoteIcon, () => React.JSX.Element> = {
  thunder: Thunder,
  smile: Smile,
  heart: Heart,
};

const QuoteSection = () => {
  const { sectionRef, titleRef } = useQuoteSection();

  return (
    <section
      id="quote"
      ref={sectionRef}
      className="relative flex h-screen flex-col items-center justify-center gap-10 overflow-hidden
        px-4 md:gap-12 md:px-6"
    >
      <div className="flex flex-col items-center gap-8 md:gap-10">
        <div
          ref={titleRef}
          className="theme-text flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2
            text-center font-bold tracking-tight"
          style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 4.5rem)', lineHeight: 1.15 }}
        >
          {QUOTE_SEGMENTS.map((segment, sIdx) => {
            const Icon = ICONS[segment.icon];
            return (
              <Fragment key={sIdx}>
                {segment.text.split(' ').map((word, wIdx) => (
                  <span key={`${sIdx}-${wIdx}`} className="q-word inline-block">
                    {word}
                  </span>
                ))}
                <span
                  className="q-icon inline-flex h-[0.9em] w-[0.9em] shrink-0 will-change-transform"
                >
                  <Icon />
                </span>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
