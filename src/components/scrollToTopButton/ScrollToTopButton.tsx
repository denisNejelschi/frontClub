import React, { useEffect, useState } from "react";
import styles from "./scrollToTopButton.module.css";

const ScrollToTopButton: React.FC = () => {
  const [isScrollButtonVisible, setScrollButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollButtonVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isScrollButtonVisible && (
        <button
          className={`${styles["bs-scroll-to-top-button"]} ${
            isScrollButtonVisible
              ? styles["bs-scroll-to-top-button--visible"]
              : ""
          }`}
          onClick={handleScrollToTop}
          aria-label="Наверх"
        >
          <svg
            className={styles["bs-scroll-to-top-button__icon"]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 22"
          >
            <path d="M14.4565 5.4005v16.529h-2.98V5.3845l-8.544 8.545-1.945-1.944 11.97-11.973 11.972 11.973-1.945 1.944z"></path>
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
