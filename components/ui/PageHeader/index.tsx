"use client";
import React from "react";
import styles from "./index.module.scss";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface PageHeaderProps {
  title: string;
  jobCount: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

const sortOptions = [
  { value: "updated", label: "Last updated" },
  { value: "created", label: "Recently posted" },
  { value: "title", label: "Job title" },
  { value: "company", label: "Company" },
];

const PageHeader = ({
  title,
  jobCount,
  sortBy,
  sortOrder,
  onSortChange,
}: PageHeaderProps) => {
  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      // Toggle order if same field
      onSortChange(newSortBy, sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Default to desc for new field
      onSortChange(newSortBy, "desc");
    }
  };

  const getSortIcon = (option: string) => {
    if (sortBy !== option) return <FaSort />;
    return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className={styles.pageHeader}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.count}>{jobCount}</span>
      </div>

      <div className={styles.sortSection}>
        <span className={styles.sortLabel}>Sort by:</span>
        <div className={styles.sortOptions}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.sortButton} ${
                sortBy === option.value ? styles.active : ""
              }`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
              <span className={styles.sortIcon}>
                {getSortIcon(option.value)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
