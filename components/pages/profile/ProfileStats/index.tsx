"use client";
import React from "react";
import styles from "./index.module.scss";

interface ProfileStatsProps {
  userProfile: {
    current: string;
    experience: string;
    location: string;
    lookingFor: string;
  };
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  userProfile,
  isEditing,
  onInputChange,
}) => {
  return (
    <div className={styles.profileStats}>
      <div className={styles.statItem}>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Current</span>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.current}
              onChange={(e) => onInputChange("current", e.target.value)}
              className={styles.editInput}
            />
          ) : (
            <span className={styles.statValue}>{userProfile.current}</span>
          )}
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Experience</span>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.experience}
              onChange={(e) => onInputChange("experience", e.target.value)}
              className={styles.editInput}
            />
          ) : (
            <span className={styles.statValue}>{userProfile.experience}</span>
          )}
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Location</span>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.location}
              onChange={(e) => onInputChange("location", e.target.value)}
              className={styles.editInput}
            />
          ) : (
            <span className={styles.statValue}>{userProfile.location}</span>
          )}
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Looking For</span>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.lookingFor}
              onChange={(e) => onInputChange("lookingFor", e.target.value)}
              className={styles.editInput}
            />
          ) : (
            <span className={styles.statValue}>{userProfile.lookingFor}</span>
          )}
        </div>
      </div>
    </div>
  );
};
