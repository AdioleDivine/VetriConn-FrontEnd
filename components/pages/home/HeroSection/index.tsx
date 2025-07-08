import Image from "next/image";
import styles from "./index.module.scss";
import DottedBox from "@/public/images/dotted_box.svg";
import { Header } from "@/components/ui/Header";
import Advert from "@/components/ui/Advert";
export const HeroSection = () => {
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
          <Image
            src="/Hero.svg"
            alt="Happy team working together"
            width={500}
            height={400}
            className={styles.heroImage}
          />
        </div>
      </div>
    </header>
  );
};
