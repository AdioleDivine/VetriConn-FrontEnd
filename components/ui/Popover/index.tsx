import React from "react";
import styles from "./index.module.scss";
import CloseButton from "../CloseButton";

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  className?: string;
}

const Popover: React.FC<PopoverProps> = ({
  open,
  onClose,
  anchorEl,
  children,
  className,
}) => {
  const [position, setPosition] = React.useState<{ top: number; left: number }>(
    { top: 0, left: 0 }
  );

  React.useEffect(() => {
    if (open && anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [open, anchorEl]);

  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.popover} ${className || ""}`}
        style={{ top: position.top, left: position.left, position: "absolute" }}
      >
        <CloseButton className={styles.close} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Popover;
