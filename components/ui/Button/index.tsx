import React from "react";
import styles from "./index.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, loadingText, disabled, children, className, ...rest }, ref) => (
    <button
      ref={ref}
      className={`${styles.button} ${className || ""}`}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        loadingText ? (
          <>
            <span className={styles.spinner} />
            {loadingText}
          </>
        ) : (
          <span className={styles.spinner} />
        )
      ) : (
        children
      )}
    </button>
  )
);

export default Button;
