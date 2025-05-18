import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { AvatarProps, AvatarGroupProps } from "@/types/component";

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  alt,
  fallback,
  size = 40,
  className,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";
  return (
    <div
      className={`${styles.avatar} ${className || ""}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || name || "Avatar"}
          className={styles.image}
          width={size ||"80"}
          height={size}
        />
      ) : fallback ? (
        fallback
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  className,
}) => <div className={`${styles.group} ${className || ""}`}>{children}</div>;

// Re-export the types
export type { AvatarProps, AvatarGroupProps };
