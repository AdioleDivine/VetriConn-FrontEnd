import React from "react";
import styles from "./index.module.scss";
import { FaRegStar } from "react-icons/fa";
import { Job } from "@/types/job";
import { BsBuildings } from "react-icons/bs";
type JobDescriptorProps = Job;

const JobDescriptor: React.FC<JobDescriptorProps> = ({
  role,
  company_name,
  company_logo: _company_logo,
  tags,
  full_description,
  responsibilities,
  qualifications,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.centeredHeader}>
        {/* <Avatar
          src={company_logo}
          alt={`${company_name} logo`}
          name={company_name}
          size={90}
          className={styles.logo}
        /> */}
        <BsBuildings className={styles.logo} fontSize={50} />
        <div className={styles.titleSection}>
          <h2 className={styles.role}>{role}</h2>
          <p className={styles.companyName}>{company_name}</p>
        </div>
        <div className={styles.tagsRow}>
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`${styles.tag} ${tag.color ? styles[tag.color] : ""}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <button className={styles.bookmark}>
          <FaRegStar className={styles.star} />
        </button>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Job Description</div>
        <div className={styles.description}>{full_description}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Responsibilities</div>
        <ol className={styles.list}>
          {responsibilities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Qualifications</div>
        <ol className={styles.list}>
          {qualifications.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
      <button className={styles.cta}>Send Resume</button>
    </div>
  );
};

export default JobDescriptor;
