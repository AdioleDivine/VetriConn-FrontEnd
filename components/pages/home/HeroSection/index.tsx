"use client";
import Image from "next/image";
import styles from "./index.module.scss";
import DottedBox from "@/public/images/dotted_box.svg";
import { Header } from "@/components/ui/Header";
import Advert from "@/components/ui/Advert";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Carousel images array - using the same image 8 times for now
const carouselImages = [
  "/images/Hero/4.svg",
  "/images/Hero/5.svg",
  "/images/Hero/6.svg",
  "/images/Hero/7.svg",
  "/images/Hero/8.svg",
  "/images/Hero/1.svg",
  "/images/Hero/2.svg",
  "/images/Hero/3.svg",
];

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-switch images every 10 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return; // Don't start interval when hovered

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 5000); // Increased to 5 seconds for better morphing appreciation

    return () => clearInterval(interval);
  }, [isHovered]);

  // Animation variants for seamless crossfade
  const imageVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <header className={styles.hero}>
      {/* Navigation */}
      <Header />
      <Advert />
      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <DottedBox className={styles.dottedBoxTop} />
          <h1>Connecting talent to meaningful causes</h1>
          <p className={styles.subtitle}>
            Work for a cause you love. Make an impact. Use your skills to get
            hired
          </p>

          <div className={styles.ctaButtons}>
            {/* Commented out due to design changes that may be temporary */}
            {/*
            <button className={styles.primaryBtn}>I&apos;m here to work</button>
            <button className={styles.secondaryBtn}>
              I&apos;m here to hire
            </button>
            */}
            <form className={styles.newsletterForm}>
              <label
                htmlFor="newsletter-email"
                className={styles.newsletterLabel}
              >
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder=""
                className={styles.newsletterInput}
                required
              />
              <div className={styles.newsletterCheckboxRow}>
                <input
                  id="newsletter-checkbox"
                  type="checkbox"
                  className={styles.newsletterCheckbox}
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
          <div
            className={styles.carouselContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence>
              <motion.div
                key={currentImageIndex}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 1.8, ease: "easeInOut" },
                }}
                className={styles.carouselImage}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={carouselImages[currentImageIndex]}
                    alt={`Hero image ${currentImageIndex + 1}`}
                    fill
                    className={styles.heroImage}
                    priority={currentImageIndex === 0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
