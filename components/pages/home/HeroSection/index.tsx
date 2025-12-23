"use client";
import Image from "next/image";
import styles from "./index.module.scss";
import DottedBox from "@/public/images/dotted_box.svg";
import { Header } from "@/components/ui/Header";
import Advert from "@/components/ui/Advert";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef, memo } from "react";
import { useRouter } from "next/navigation";

const CAROUSEL_IMAGES = [
  "/images/Hero/4.svg",
  "/images/Hero/5.svg",
  "/images/Hero/6.svg",
  "/images/Hero/7.svg",
  "/images/Hero/8.svg",
  "/images/Hero/1.svg",
  "/images/Hero/2.svg",
  "/images/Hero/3.svg",
] as const;

const CAROUSEL_INTERVAL = 5000;
const TRANSITION_DURATION = 1.8;

const imageVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const transition = { opacity: { duration: TRANSITION_DURATION, ease: "easeInOut" } } as const;

// Custom hook with ref-based pause to avoid re-renders
const useCarousel = (imageCount: number, interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentIndex((prev) => (prev + 1) % imageCount);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [imageCount, interval]);

  const pause = useCallback(() => { isPausedRef.current = true; }, []);
  const resume = useCallback(() => { isPausedRef.current = false; }, []);

  return { currentIndex, pause, resume };
};

// Memoized carousel to prevent re-renders from parent state changes
const HeroCarousel = memo(function HeroCarousel() {
  const { currentIndex, pause, resume } = useCarousel(
    CAROUSEL_IMAGES.length,
    CAROUSEL_INTERVAL
  );

  // Preload next image for smoother transitions
  const nextIndex = (currentIndex + 1) % CAROUSEL_IMAGES.length;

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Hidden preload for next image */}
      <link rel="preload" as="image" href={CAROUSEL_IMAGES[nextIndex]} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className={styles.carouselImage}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={CAROUSEL_IMAGES[currentIndex]}
              alt={`Hero image ${currentIndex + 1}`}
              fill
              className={styles.heroImage}
              priority={currentIndex === 0}
              loading={currentIndex === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPromotionalEmails(e.target.checked);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const params = new URLSearchParams({ email: trimmedEmail });
    if (promotionalEmails) params.set("promotional_emails", "true");

    router.push(`/signup?${params.toString()}`);
  }, [email, promotionalEmails, router]);

  return (
    <header className={styles.hero}>
      <Header />
      <Advert />
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <DottedBox className={styles.dottedBoxTop} />
          <h1>Reconnecting retirees and veterans through purposeful work</h1>
          <p className={styles.subtitle}>
            From careers to causes, we connect you to purposeful opportunities
            quickly, easily, and on your terms
          </p>

          <div className={styles.ctaButtons}>
            <form className={styles.newsletterForm} onSubmit={handleSubmit}>
              <label
                htmlFor="newsletter-email"
                className={styles.newsletterLabel}
              >
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                className={`${styles.newsletterInput} ${emailError ? styles.inputError : ""}`}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <span className={styles.errorMessage}>{emailError}</span>
              )}
              <div className={styles.newsletterCheckboxRow}>
                <input
                  id="newsletter-checkbox"
                  type="checkbox"
                  className={styles.newsletterCheckbox}
                  checked={promotionalEmails}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="newsletter-checkbox"
                  className={styles.newsletterCheckboxLabel}
                >
                  I would like to receive promotional emails from VetriConn Inc
                </label>
              </div>
              <button type="submit" className={styles.newsletterBtn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <DottedBox className={styles.dottedBoxBottom} />
          <HeroCarousel />
        </div>
      </div>
    </header>
  );
};
