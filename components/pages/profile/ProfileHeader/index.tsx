"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  FaEdit,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaUserCircle,
} from "react-icons/fa";
import Image from "next/image";

interface ProfileHeaderProps {
  userProfile: {
    name: string;
    title: string;
    avatar: string;
    bio: string | null;
    socials?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  };
  isEditing: boolean;
  isSaving?: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel?: () => void;
  onInputChange: (field: string, value: string | string[]) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfile,
  isEditing,
  isSaving = false,
  onEditToggle,
  onSave,
  onCancel,
  onInputChange,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {userProfile.avatar && userProfile.avatar.trim() && !imageError ? (
              <Image
                src={userProfile.avatar}
                alt={userProfile.name}
                width={140}
                height={140}
                className={styles.avatarImage}
                onError={() => setImageError(true)}
              />
            ) : (
              <FaUserCircle className={styles.avatarIcon} size={140} />
            )}
          </div>
        </div>

        <div className={styles.profileInfo}>
          {isEditing ? (
            <div className={styles.editForm}>
              <div className={styles.basicInfoSection}>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => onInputChange("name", e.target.value)}
                  className={styles.editInput}
                  placeholder="Enter your full name"
                />
                <input
                  type="text"
                  value={userProfile.title}
                  onChange={(e) => onInputChange("title", e.target.value)}
                  className={styles.editInput}
                  placeholder="Enter your profession"
                />
                <textarea
                  value={userProfile.bio || ""}
                  onChange={(e) => onInputChange("bio", e.target.value)}
                  className={styles.editTextarea}
                  placeholder="Tell others about yourself..."
                  rows={3}
                />
              </div>

              {/* Social Links Edit Section */}
              <div className={styles.socialEditSection}>
                <h4 className={styles.socialEditTitle}>Social Links</h4>
                <div className={styles.socialInputs}>
                  <div className={styles.socialInputGroup}>
                    <FaLinkedin className={styles.socialIcon} />
                    <input
                      type="url"
                      value={userProfile.socials?.linkedin || ""}
                      onChange={(e) =>
                        onInputChange("socials.linkedin", e.target.value)
                      }
                      className={styles.socialInput}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className={styles.socialInputGroup}>
                    <FaTwitter className={styles.socialIcon} />
                    <input
                      type="url"
                      value={userProfile.socials?.twitter || ""}
                      onChange={(e) =>
                        onInputChange("socials.twitter", e.target.value)
                      }
                      className={styles.socialInput}
                      placeholder="https://x.com/yourusername"
                    />
                  </div>
                  <div className={styles.socialInputGroup}>
                    <FaGithub className={styles.socialIcon} />
                    <input
                      type="url"
                      value={userProfile.socials?.github || ""}
                      onChange={(e) =>
                        onInputChange("socials.github", e.target.value)
                      }
                      className={styles.socialInput}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className={styles.name}>{userProfile.name}</h1>
              <p className={styles.title}>
                {userProfile.title || "Professional"}
              </p>
              {userProfile.bio && (
                <p className={styles.bio}>{userProfile.bio}</p>
              )}
              <div className={styles.socialIcons}>
                {userProfile.socials?.linkedin && (
                  <a
                    href={userProfile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaLinkedin className={styles.socialIcon} />
                  </a>
                )}
                {userProfile.socials?.twitter && (
                  <a
                    href={userProfile.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaTwitter className={styles.socialIcon} />
                  </a>
                )}
                {userProfile.socials?.github && (
                  <a
                    href={userProfile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaGithub className={styles.socialIcon} />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className={styles.editSection}>
          <button className={styles.editBtn} onClick={onEditToggle}>
            Edit <FaEdit className={styles.editIcon} />
          </button>
        </div>
      )}
    </div>
  );
};
