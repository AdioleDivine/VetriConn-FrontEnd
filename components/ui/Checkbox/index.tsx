import React from "react";
import styles from "./index.module.scss";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, children, className, ...rest }, ref) => (
    <label className={`${styles.checkboxLabel} ${className || ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        ref={ref}
        className={styles.checkbox}
        {...rest}
      />
      <span className={styles.checkmark} />
      {children && <span className={styles.text}>{children}</span>}
    </label>
  )
);

export default Checkbox;
