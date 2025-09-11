"use client";
import React from "react";
import styles from "./index.module.scss";
import { FaEdit } from "react-icons/fa";

interface ProfessionalSummaryProps {
  summary?: string;
}

export const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({
  summary = "Over 5 years’ experience in Project design, implementation and management which includes, successfully managing projects of different sizes, budgets and complexities, peaking at a project valuation of over 1 billion dollars with 20 team members with a proven ability to provide organized and analytical financial management, with over 5 million dollars in cost savings Conversant in project planning, execution and closeout. Knowledgeable in scheduling, critical path analysis, budgeting, risk assessment and management, action item log and project tracking the project development using management software including but not limited to Basware, Procore, JD Edwards, Egnyte, MS Project, Excel.",
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
