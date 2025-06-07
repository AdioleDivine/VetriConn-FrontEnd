import React from "react";
import styles from "./index.module.scss";
import DottedBox from "@/public/images/dotted_box.svg";
import BlueCircle from "@/public/images/blue_circle.svg";
import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    text: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."`,
    name: "John Doe",
    role: "Front-end Developer",
    org: "Charity13",
    orgColor: "#E53E3E",
  },
  {
    text: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."`,
    name: "John Doe",
    role: "Front-end Developer",
    org: "Charity13",
    orgColor: "#E53E3E",
  },
];

const TestimonialsSection = () => {
  return (
    <section className={styles.testimonialsSection}>
      <DottedBox className={styles.dotsTL} />
      <BlueCircle className={styles.circleTL} />
      <DottedBox className={styles.dotsBR} />
      <BlueCircle className={styles.circleBR} />
      <h2 className={styles.title}>What other&apos;s have to say</h2>
      <div className={styles.cardsRow}>
        <span className={styles.navDot} />
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
        <span className={`${styles.navDot} ${styles.activeDot}`} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
