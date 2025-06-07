import React from "react";
import styles from "./index.module.scss";
import { LuX } from "react-icons/lu";

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ onClick, className, size = "md", children, ...rest }, ref) => (
    <button
      ref={ref}
      className={`${styles.closeButton} ${styles[size]} ${className || ""}`}
      onClick={onClick}
      aria-label="Close"
      {...rest}
    >
      {children ?? <LuX />}
    </button>
  )
);

export default CloseButton;
