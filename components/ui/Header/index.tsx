"use client";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Logo from "@/public/images/logo_1.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className={pathname === "/" ? styles.active : ""}>
          Home
        </Link>
        <a
          href="#about-section"
          className={styles.scrollLink}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          About
        </a>
        <Link
          href="/jobs"
          className={pathname === "/jobs" ? styles.active : ""}
        >
          Jobs
        </Link>
      </div>

      {/* Account section for desktop */}
      {/* <div className={styles.accountSection}>
        <Link href="/signin" className={styles.loginLink}>
          Already have an account?
        </Link>
        <Link href="/signin" className={styles.signInBtn}>
          Sign In
        </Link>
      </div> */}

      {/* Mobile menu container */}
      <div
        className={`${styles.mobileMenuContainer} ${
          isMenuOpen ? styles.active : ""
        }`}
      >
        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}
        >
          <Link href="/" className={pathname === "/" ? styles.active : ""}>
            Home
          </Link>
          <a
            href="#about-section"
            className={styles.scrollLink}
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              document.getElementById("about-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            About
          </a>
          <Link
            href="/jobs"
            className={pathname === "/jobs" ? styles.active : ""}
          >
            Jobs
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={toggleMenu}></div>
      )}
    </nav>
  );
};
