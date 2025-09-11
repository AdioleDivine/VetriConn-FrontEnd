"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { FaEdit, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

interface ProfileHeaderProps {
  userProfile: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
  };
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onInputChange: (field: string, value: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfile,
  isEditing,
  onEditToggle,
  onSave,
  onInputChange,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          {!imageError ? (
            <Image
              src={userProfile.avatar}
              alt={userProfile.name}
              width={100}
              height={100}
              className={styles.avatarImage}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {userProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>
      </div>

      <div className={styles.profileInfo}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              className={styles.editInput}
            />
            <input
              type="text"
              value={userProfile.title}
              onChange={(e) => onInputChange("title", e.target.value)}
              className={styles.editInput}
            />
            <textarea
              value={userProfile.bio}
              onChange={(e) => onInputChange("bio", e.target.value)}
              className={styles.editTextarea}
              placeholder="Enter your bio..."
              rows={3}
            />
          </>
        ) : (
          <>
            <h1 className={styles.name}>{userProfile.name}</h1>
            <p className={styles.title}>{userProfile.title}</p>
            <p className={styles.bio}>{userProfile.bio}</p>
            <div className={styles.socialIcons}>
              <FaLinkedin className={styles.linkedinIcon} />
            </div>
          </>
        )}
      </div>

      <div className={styles.editSection}>
        <button
          className={styles.editBtn}
          onClick={isEditing ? onSave : onEditToggle}
        >
          Edit <FaEdit className={styles.editIcon} />
        </button>
      </div>
    </div>
  );
};
