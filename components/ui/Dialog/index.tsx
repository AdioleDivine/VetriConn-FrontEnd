import React from "react";
import styles from "./index.module.scss";
import CloseButton from "../CloseButton";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  className,
}) => {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={`${styles.dialog} ${className || ""}`}>
        <CloseButton className={styles.close} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Dialog;
