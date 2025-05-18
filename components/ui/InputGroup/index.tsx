import React from "react";
import styles from "./index.module.scss";

export interface InputGroupProps {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  startElement,
  endElement,
  children,
  className,
}) => (
  <div className={`${styles.inputGroup} ${className || ""}`}>
    {startElement && <span className={styles.start}>{startElement}</span>}
    {children}
    {endElement && <span className={styles.end}>{endElement}</span>}
  </div>
);

export default InputGroup;
