"use client";
import React from "react";
import styles from "./index.module.scss";
import { ExperienceSection } from "../ExperienceSection";
import { EducationSection } from "../EducationSection";

export const ExperienceEducationSection: React.FC = () => {
  return (
    <div className={styles.experienceEducationContainer}>
      <div className={styles.leftColumn}>
        <ExperienceSection />
      </div>
      <div className={styles.rightColumn}>
        <EducationSection />
      </div>
    </div>
  );
};
