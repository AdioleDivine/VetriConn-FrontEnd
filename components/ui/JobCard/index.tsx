import React from "react";
import styles from "./index.module.scss";
import { FaRegStar } from "react-icons/fa";

interface Tag {
  name: string;
  color?: string;
}

interface JobCardProps {
  role: string;
  name: string;
  description: string;
  tags: Tag[];
}

export const JobCard: React.FC<JobCardProps> = ({
  role,
  name,
  description,
  tags,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{name.charAt(0)}</div>
        <div className={styles.info}>
          <h3 className={styles.role}>{role}</h3>
          <p className={styles.name}>{name}</p>
        </div>
        <button className={styles.bookmark}>
          <FaRegStar className={styles.star} />
        </button>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`${styles.tag} ${tag.color ? styles[tag.color] : ""}`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};
