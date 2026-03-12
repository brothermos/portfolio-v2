import { useEffect, useState } from "react";
import btnTop from "../assets/btn-top.svg";

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;
      const skillsSection = document.getElementById("skills");

      if (!skillsSection) {
        setIsVisible(false);
        return;
      }

      const skillsTop =
        skillsSection.getBoundingClientRect().top + window.scrollY;

      const viewportMiddle = scrollTop + viewportHeight / 2;
      setIsVisible(viewportMiddle >= skillsTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 focus:outline-none"
    >
      <img
        src={btnTop}
        alt="Scroll to top"
        className="w-12 h-12 md:w16 md:h-16"
      />
    </button>
  );
};

export default ScrollTopButton;

