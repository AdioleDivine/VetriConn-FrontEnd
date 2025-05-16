"use client";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Logo from "@/public/images/logo_1.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.header}>
      <Logo className={styles.logo} />

      {/* Mobile hamburger menu */}
      <button
        className={`${styles.mobileMenuButton} ${
          isMenuOpen ? styles.open : ""
        }`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburgerIcon}></span>
      </button>

      {/* Desktop navigation */}
      <div className={styles.navLinks}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Jobs</a>
      </div>

      {/* Account section for desktop */}
      <div className={styles.accountSection}>
        <a href="#" className={styles.loginLink}>
          Already have an account?
        </a>
        <button className={styles.signInBtn}>Sign In</button>
      </div>

      {/* Mobile menu container */}
      <div
        className={`${styles.mobileMenuContainer} ${
          isMenuOpen ? styles.active : ""
        }`}
      >
        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}
        >
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Jobs</a>
        </div>

        <div
          className={`${styles.accountSection} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <a href="#" className={styles.loginLink}>
            Already have an account?
          </a>
          <button className={styles.signInBtn}>Sign In</button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={toggleMenu}></div>
      )}
    </nav>
  );
};
