import React from "react";
import styles from "./index.module.scss";
import { FaRegStar } from "react-icons/fa";
import { Avatar } from "../Avatar";
import { Tag } from "@/types/tag";
import { FaArrowRight } from "react-icons/fa6";

interface JobCardProps {
  role: string;
  name: string;
  description: string;
  tags: Tag[] | string[];
  logo?: string;
  variant?: "default" | "sidebar";
  onSelect?: () => void;
  selected?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  role,
  name,
  description,
  tags,
  logo,
  variant = "default",
  onSelect,
  selected = false,
}) => {
  // Handler for card click (sidebar variant)
  const handleCardClick = () => {
    if (variant === "sidebar" && onSelect) {
      onSelect();
    }
  };

  return (
    <div
      className={
        `${styles.card} ` +
        (variant === "sidebar" ? styles.sidebar : "") +
        (selected ? ` ${styles.selected}` : "")
      }
      {...(variant === "sidebar"
        ? {
            onClick: handleCardClick,
            role: "button",
            tabIndex: 0,
            "aria-pressed": selected,
            style: { cursor: "pointer" },
          }
        : {})}
    >
      <div className={styles.header}>
        <Avatar name={name} src={logo} size={45} className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.role}>{role}</h3>
          <p className={styles.name}>{name}</p>
        </div>
        <button className={styles.bookmark}>
          <FaRegStar className={styles.star} />
        </button>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.tagsRowWithArrow}>
        <div className={styles.tags}>
          {tags.map((tag, index) => {
            const tagName = typeof tag === "string" ? tag : tag.name;
            const tagColor = typeof tag === "string" ? undefined : tag.color;

            return (
              <span
                key={index}
                className={`${styles.tag} ${tagColor ? styles[tagColor] : ""}`}
              >
                {tagName}
              </span>
            );
          })}
        </div>
        {variant === "sidebar" && (
          <button
            className={styles.arrowBtn}
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect();
            }}
            aria-label="Select job"
          >
            <FaArrowRight className={styles.arrowIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
