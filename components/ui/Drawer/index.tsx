import React from "react";
import styles from "./index.module.scss";
import CloseButton from "../CloseButton";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  side = "right",
  className,
}) => {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={`${styles.drawer} ${styles[side]} ${className || ""}`}>
        <CloseButton className={styles.close} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Drawer;
