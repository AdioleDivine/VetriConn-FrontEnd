"use client";
import React from "react";
import styles from "./index.module.scss";

interface ProfessionalSummaryProps {
  summary?: string;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({
  summary = "",
  isEditing,
  onInputChange,
}) => {
  return (
    <div className={styles.summarySection}>
      <div className={styles.summaryHeader}>
        <h2 className={styles.summaryTitle}>Professional Summary</h2>
      </div>

      {isEditing ? (
        <textarea
          value={summary}
          onChange={(e) => onInputChange("professionalSummary", e.target.value)}
          className={styles.summaryTextarea}
          placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives..."
        />
      ) : (
        <p className={styles.summaryText}>
          {summary || "No professional summary added yet."}
        </p>
      )}
    </div>
  );
};
