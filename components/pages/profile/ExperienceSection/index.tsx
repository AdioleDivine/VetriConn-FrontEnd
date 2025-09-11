"use client";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  logo: string;
}

interface ExperienceSectionProps {
  experiences?: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences = [
    {
      id: "1",
      company: "Google Inc.",
      role: "Product Designer",
      duration: "Oct 2022 - Present/Contract",
      location: "Ottawa, ON",
      logo: "/images/icons/google.svg",
    },
    {
      id: "2",
      company: "Facebook Inc.",
      role: "Product Designer",
      duration: "Oct 2018 - 2022",
      location: "Ottawa, ON",
      logo: "/images/icons/facebook.svg",
    },
  ],
}) => {
  return (
    <div className={styles.experienceSection}>
      <h3 className={styles.sectionTitle}>Experience</h3>
      <div className={styles.experienceList}>
        {experiences.map((experience) => (
          <div key={experience.id} className={styles.experienceItem}>
            <div className={styles.companyLogo}>
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={40}
                height={40}
                className={styles.logoImage}
              />
            </div>
            <div className={styles.experienceContent}>
              <h4 className={styles.role}>{experience.role}</h4>
              <p className={styles.company}>{experience.company}</p>
              <div className={styles.experienceDetails}>
                <span className={styles.duration}>{experience.duration}</span>
                <span className={styles.location}>{experience.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
