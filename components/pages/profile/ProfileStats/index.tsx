"use client";
import React from "react";
import styles from "./index.module.scss";

interface ProfileStatsProps {
  userProfile: {
    current: string;
    experience: string;
    location: string;
    lookingFor: string[];
  };
  editingData?: {
    name: string;
    title: string;
    location: string;
    experience: string;
    current: string;
    lookingFor: string[];
    bio: string | null;
    avatar: string;
    socials: {
      linkedin: string;
      twitter: string;
      github: string;
    };
    professionalSummary: string;
  } | null;
  isEditing: boolean;
  onInputChange: (field: string, value: string | string[]) => void;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  userProfile,
  editingData,
  isEditing,
  onInputChange,
}) => {
  const displayData = isEditing && editingData ? editingData : userProfile;
  return (
    <div className={styles.profileStats}>
      <div className={styles.statItem}>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Current</span>
          {isEditing ? (
            <input
              type="text"
              value={displayData.current || ""}
              onChange={(e) => onInputChange("current", e.target.value)}
              className={styles.editInput}
              placeholder="Enter your current job"
            />
          ) : (
            <span className={styles.statValue}>
              {userProfile.current || "Not specified"}
            </span>
          )}
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Experience</span>
          {isEditing ? (
            <input
              type="text"
              value={displayData.experience || ""}
              onChange={(e) => onInputChange("experience", e.target.value)}
              className={styles.editInput}
            />
          ) : (
            <span className={styles.statValue}>
              {userProfile.experience || "Not specified"}
            </span>
          )}
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Location</span>
          {isEditing ? (
            <input
              type="text"
              value={displayData.location || ""}
              onChange={(e) => onInputChange("location", e.target.value)}
              className={styles.editInput}
            />
          ) : (
            <span className={styles.statValue}>
              {userProfile.location || "Not specified"}
            </span>
          )}
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Looking For</span>
          {isEditing ? (
            <input
              type="text"
              value={(displayData.lookingFor ?? []).join(", ")}
              onChange={(e) =>
                onInputChange(
                  "lookingFor",
                  e.target.value
                    .split(", ")
                    .map((s) => s.trim())
                    .filter((s) => s)
                )
              }
              className={styles.editInput}
              placeholder="e.g., Full time, Part time, Remote"
            />
          ) : (
            <span className={styles.statValue}>
              {(userProfile.lookingFor ?? []).length > 0
                ? (userProfile.lookingFor ?? []).join(", ")
                : "Not specified"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
