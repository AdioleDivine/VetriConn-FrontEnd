import React from "react";
import styles from "./index.module.scss";

export interface FieldProps {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Field: React.FC<FieldProps> = ({
  label,
  helperText,
  errorText,
  optionalText,
  children,
  className,
}) => (
  <div className={`${styles.field} ${className || ""}`}>
    {label && (
      <label className={styles.label}>
        {label}
        {optionalText && (
          <span className={styles.optional}>{optionalText}</span>
        )}
      </label>
    )}
    {children}
    {helperText && <div className={styles.helper}>{helperText}</div>}
    {errorText && <div className={styles.error}>{errorText}</div>}
  </div>
);

export default Field;
