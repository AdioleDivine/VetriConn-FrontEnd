"use client";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  logo: string;
}

interface EducationSectionProps {
  educations?: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  educations = [
    {
      id: "1",
      institution: "Carleton University",
      degree: "BE, Electrical and Electronics Engineering",
      duration: "Oct 2017 - August 2022",
      location: "Ottawa, ON",
      logo: "/images/icons/carleton.svg",
    },
    {
      id: "2",
      institution: "Udemy",
      degree: "Data Architecture Nano-Degree",
      duration: "March 2021 - April 2022",
      location: "Ottawa, ON",
      logo: "/images/icons/udemy.png",
    },
  ],
}) => {
  return (
    <div className={styles.educationSection}>
      <h3 className={styles.sectionTitle}>Education & Certifications</h3>
      <div className={styles.educationList}>
        {educations.map((education) => (
          <div key={education.id} className={styles.educationItem}>
            <div className={styles.institutionLogo}>
              <Image
                src={education.logo}
                alt={`${education.institution} logo`}
                width={40}
                height={40}
                className={styles.logoImage}
              />
            </div>
            <div className={styles.educationContent}>
              <h4 className={styles.degree}>{education.degree}</h4>
              <p className={styles.institution}>{education.institution}</p>
              <div className={styles.educationDetails}>
                <span className={styles.duration}>{education.duration}</span>
                <span className={styles.location}>{education.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
