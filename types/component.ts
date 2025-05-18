import { ReactNode } from "react";

export interface AvatarProps {
  name?: string;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: number;
  className?: string;
}

export interface AvatarGroupProps {
  children: ReactNode;
  className?: string;
}
