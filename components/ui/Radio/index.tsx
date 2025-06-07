import React from "react";
import styles from "./index.module.scss";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ checked, onChange, children, className, ...rest }, ref) => (
    <label className={`${styles.radioLabel} ${className || ""}`}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        ref={ref}
        className={styles.radio}
        {...rest}
      />
      <span className={styles.checkmark} />
      {children && <span className={styles.text}>{children}</span>}
    </label>
  )
);

export interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  children,
  className,
}) => (
  <div className={`${styles.radioGroup} ${className || ""}`}>
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            name,
            checked: child.props.value === value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value),
          })
        : child
    )}
  </div>
);
