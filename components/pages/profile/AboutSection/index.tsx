"use client";
import React from "react";
import styles from "./index.module.scss";

interface AboutSectionProps {
  bio: string;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  bio,
  isEditing,
  onInputChange,
}) => {
  return (
    <div className={styles.bioSection}>
      <h3 className={styles.sectionTitle}>About</h3>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => onInputChange("bio", e.target.value)}
          className={styles.editTextarea}
          rows={4}
        />
      ) : (
        <p className={styles.bio}>{bio}</p>
      )}
    </div>
  );
};
