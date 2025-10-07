import React from "react";
import styles from "./index.module.scss";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

// Specific skeleton components for profile sections
export const ProfileHeaderSkeleton: React.FC = () => {
  return (
    <div className={styles.profileHeaderSkeleton}>
      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <Skeleton width="120px" height="120px" borderRadius="50%" />
        </div>
        <div className={styles.profileInfo}>
          <Skeleton width="200px" height="28px" borderRadius="6px" />
          <Skeleton width="150px" height="20px" borderRadius="4px" />
          <Skeleton width="180px" height="16px" borderRadius="4px" />
          <div className={styles.socialsSkeleton}>
            <Skeleton width="24px" height="24px" borderRadius="4px" />
            <Skeleton width="24px" height="24px" borderRadius="4px" />
            <Skeleton width="24px" height="24px" borderRadius="4px" />
          </div>
        </div>
      </div>
      <div className={styles.editButton}>
        <Skeleton width="100%" height="36px" borderRadius="6px" />
      </div>
    </div>
  );
};

export const ProfileStatsSkeleton: React.FC = () => {
  return (
    <div className={styles.profileStatsSkeleton}>
      <div className={styles.statItem}>
        <Skeleton width="80px" height="16px" borderRadius="4px" />
        <Skeleton width="100px" height="20px" borderRadius="4px" />
      </div>
      <div className={styles.statItem}>
        <Skeleton width="80px" height="16px" borderRadius="4px" />
        <Skeleton width="120px" height="20px" borderRadius="4px" />
      </div>
      <div className={styles.statItem}>
        <Skeleton width="90px" height="16px" borderRadius="4px" />
        <Skeleton width="140px" height="20px" borderRadius="4px" />
      </div>
      <div className={styles.statItem}>
        <Skeleton width="90px" height="16px" borderRadius="4px" />
        <div className={styles.tagsContainer}>
          <Skeleton width="80px" height="24px" borderRadius="12px" />
          <Skeleton width="60px" height="24px" borderRadius="12px" />
        </div>
      </div>
    </div>
  );
};
