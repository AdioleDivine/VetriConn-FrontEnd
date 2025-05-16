import React from "react";
import styles from "./index.module.scss";

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  org: string;
  orgColor?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  text,
  name,
  role,
  org,
  orgColor = "#E53E3E",
}) => {
  return (
    <div className={styles.card}>
      <p className={styles.text}>{text}</p>
      <div className={styles.divider} />
      <div className={styles.userRow}>
        <div className={styles.profileInfo}>
          <div className={styles.name}>{name}</div>
          <div className={styles.roleOrg}>
            <span className={styles.role}>{role}</span>
            <span style={{ color: orgColor }}> @ {org}</span>
          </div>
        </div>
        <div className={styles.avatar} />
      </div>
    </div>
  );
};

export default TestimonialCard;
