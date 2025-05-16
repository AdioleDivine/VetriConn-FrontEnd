import Image from "next/image";
import styles from "./index.module.scss";
import DottedBox from "@/public/images/dotted_box.svg";
import { Header } from "@/components/ui/Header";

export const HeroSection = () => {
  return (
    <header className={styles.hero}>
      {/* Navigation */}
      <Header />

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
            <button className={styles.primaryBtn}>I&apos;m here to work</button>
            <button className={styles.secondaryBtn}>
              I&apos;m here to hire
            </button>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <DottedBox className={styles.dottedBoxBottom} />
          <Image
            src="/images/hero-placeholder.jpg"
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
