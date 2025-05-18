import React, { useState, useRef } from "react";
import styles from "./index.module.scss";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  showArrow?: boolean;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  showArrow,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <span
      className={`${styles.wrapper} ${className || ""}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      ref={ref}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {visible && (
        <span className={styles.tooltip} role="tooltip">
          {content}
          {showArrow && <span className={styles.arrow} />}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
