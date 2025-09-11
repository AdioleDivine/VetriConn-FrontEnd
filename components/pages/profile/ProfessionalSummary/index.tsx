"use client";
import React from "react";
import styles from "./index.module.scss";
import { FaEdit } from "react-icons/fa";

interface ProfessionalSummaryProps {
  summary?: string;
}

export const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({
  summary = "Lorem ipsum dolor sit amet consectetur. Uma vulputate neque arcu eget. Senectus scelerisque egestas quisque tortor elit eget bibendum amet aliquam. Pellentesque consectetur non non imperdiet. Sed tincidunt viverra a aliquet placerat porta tortor. Adipiscing tortor eu commodo sem in enim sit libero",
}) => {
  return (
    <div className={styles.summarySection}>
      <div className={styles.summaryHeader}>
        <h2 className={styles.summaryTitle}>Professional Summary</h2>
        <button className={styles.summaryEditBtn}>
          Edit <FaEdit style={{ marginLeft: 4 }} />
        </button>
      </div>
      <p className={styles.summaryText}>{summary}</p>
    </div>
  );
};
